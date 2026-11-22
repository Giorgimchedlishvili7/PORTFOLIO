import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTACT_API_ENDPOINT,
  RECIPIENT_EMAIL,
  buildGmailComposeHref,
  buildMailtoHref,
  submitContactForm,
  validateContactForm,
  type FetchLike,
} from './contact';
import { deliverContactEmail } from '../server/contactMailer';
import { LANGUAGES, TRANSLATIONS } from './i18n';
import { GEORGIA_FLAG_IMAGE } from './projects';

const SAMPLE_ERRORS = TRANSLATIONS.en.contact.form.errors;

test('validateContactForm rejects empty fields with specific errors', () => {
  const result = validateContactForm(
    { name: '   ', email: '', subject: '', message: '' },
    SAMPLE_ERRORS
  );
  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, SAMPLE_ERRORS.nameRequired);
  assert.equal(result.errors.email, SAMPLE_ERRORS.emailRequired);
  assert.equal(result.errors.subject, SAMPLE_ERRORS.subjectRequired);
  assert.equal(result.errors.message, SAMPLE_ERRORS.messageRequired);
});

test('validateContactForm rejects malformed email addresses', () => {
  const result = validateContactForm(
    {
      name: 'Nino',
      email: 'not-an-email',
      subject: 'Hello',
      message: 'Testing message',
    },
    SAMPLE_ERRORS
  );
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, SAMPLE_ERRORS.emailInvalid);
  assert.equal(result.errors.name, undefined);
});

test('validateContactForm accepts complete valid payload', () => {
  const result = validateContactForm(
    {
      name: 'Nino Beridze',
      email: 'nino@example.com',
      subject: 'Project Inquiry',
      message: 'Hi Giorgi, love your portfolio!',
    },
    SAMPLE_ERRORS
  );
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('submitContactForm posts to /api/contact and returns ok only on real server confirmation', async () => {
  let capturedUrl = '';
  let capturedBody: Record<string, string> = {};

  const mockFetch: FetchLike = async (input, init) => {
    capturedUrl = String(input);
    capturedBody = JSON.parse(String(init?.body ?? '{}'));
    return new Response(JSON.stringify({ ok: true, provider: 'gmail-smtp' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const result = await submitContactForm(
    {
      name: 'გიორგი სტუმარი',
      email: 'visitor@example.com',
      subject: 'გამარჯობა',
      message: 'მოგესალმებით!',
    },
    mockFetch
  );

  assert.equal(result.ok, true);
  assert.equal(capturedUrl, CONTACT_API_ENDPOINT);
  assert.equal(capturedBody.name, 'გიორგი სტუმარი');
  assert.equal(capturedBody.email, 'visitor@example.com');
  assert.equal(capturedBody.subject, 'გამარჯობა');
});

test('submitContactForm never claims success when /api/contact returns notConfigured', async () => {
  const mockFetch: FetchLike = async () =>
    new Response(
      JSON.stringify({
        ok: false,
        notConfigured: true,
        error: 'Direct email server delivery is not configured yet.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  const result = await submitContactForm(
    {
      name: 'Levan',
      email: 'levan@example.com',
      subject: 'Hello',
      message: 'Testing unconfigured',
    },
    mockFetch
  );

  assert.equal(result.ok, false);
  assert.equal(result.notConfigured, true);
});

test('deliverContactEmail returns ok:false notConfigured when no mail credentials exist', async () => {
  const result = await deliverContactEmail(
    {
      name: 'Nino',
      email: 'nino@example.com',
      subject: 'Hello',
      message: 'Checking config',
    },
    {}
  );
  assert.equal(result.ok, false);
  assert.equal(result.status, 200);
  assert.equal(result.notConfigured, true);
});

test('deliverContactEmail validates payload and sends via Resend when RESEND_API_KEY is set', async () => {
  const badResult = await deliverContactEmail(
    { name: '', email: 'bad', subject: '', message: '' },
    { RESEND_API_KEY: 're_test_123' }
  );
  assert.equal(badResult.ok, false);
  assert.equal(badResult.status, 400);

  let sentTo: string[] = [];
  const okResult = await deliverContactEmail(
    {
      name: 'Nino',
      email: 'nino@example.com',
      subject: 'Question',
      message: 'Real message',
    },
    { RESEND_API_KEY: 're_test_123' },
    async (_url, init) => {
      const payload = JSON.parse(String(init?.body ?? '{}'));
      sentTo = payload.to;
      return new Response(JSON.stringify({ id: 'email_1' }), { status: 200 });
    }
  );
  assert.equal(okResult.ok, true);
  assert.equal(okResult.provider, 'resend');
  assert.deepEqual(sentTo, [RECIPIENT_EMAIL]);
});

test('buildMailtoHref and buildGmailComposeHref encode recipient, subject, and body cleanly', () => {
  const mailto = buildMailtoHref({
    senderName: 'Levan',
    senderEmail: 'levan@example.com',
    subject: 'Website Question',
    message: 'Hello Giorgi!',
  });
  assert.equal(mailto.startsWith(`mailto:${RECIPIENT_EMAIL}?`), true);
  assert.equal(mailto.includes('Website%20Question'), true);

  const gmail = buildGmailComposeHref({
    senderName: 'Levan',
    senderEmail: 'levan@example.com',
    subject: 'Website Question',
    message: 'Hello Giorgi!',
  });
  assert.equal(
    gmail.startsWith('https://mail.google.com/mail/?view=cm&fs=1&to='),
    true
  );
  assert.equal(gmail.includes(encodeURIComponent(RECIPIENT_EMAIL)), true);
  assert.equal(gmail.includes('Website%20Question'), true);
});

test('all supported languages include required welcome, coming soon, and contact copy', () => {
  assert.equal(
    TRANSLATIONS.en.hero.headline,
    "WELCOME TO Giorgi's PORTFOLIO"
  );
  assert.equal(TRANSLATIONS.en.websites.comingSoon, 'Coming Soon');
  for (const lang of LANGUAGES) {
    const dict = TRANSLATIONS[lang.code];
    assert.ok(dict.hero.headline.length > 0);
    assert.ok(dict.websites.comingSoon.length > 0);
    assert.ok(dict.contact.form.submitButton.length > 0);
    assert.ok(dict.contact.form.openGmailWebButton.length > 0);
  }
});

test('hero Georgia flag image path is defined', () => {
  assert.equal(GEORGIA_FLAG_IMAGE.startsWith('/src/assets/images/'), true);
});
