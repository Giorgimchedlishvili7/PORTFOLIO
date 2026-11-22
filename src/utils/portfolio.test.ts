import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FORMSUBMIT_ENDPOINT,
  RECIPIENT_EMAIL,
  buildMailtoHref,
  submitContactForm,
  validateContactForm,
  type FetchLike,
} from './contact';
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

test('submitContactForm sends JSON payload to FormSubmit for Giorgi Gmail without sign-in', async () => {
  let capturedUrl = '';
  let capturedBody: Record<string, string> = {};

  const mockFetch: FetchLike = async (input, init) => {
    capturedUrl = String(input);
    capturedBody = JSON.parse(String(init?.body ?? '{}'));
    return new Response(
      JSON.stringify({ success: 'true', message: 'Sent' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
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
  assert.equal(capturedUrl, FORMSUBMIT_ENDPOINT);
  assert.equal(capturedBody.name, 'გიორგი სტუმარი');
  assert.equal(capturedBody._replyto, 'visitor@example.com');
  assert.equal(capturedBody._subject, '[Portfolio] გამარჯობა');
});

test('submitContactForm surfaces one-time activation instructions when returned', async () => {
  const mockFetch: FetchLike = async () =>
    new Response(
      JSON.stringify({
        success: 'false',
        message: 'This form needs Activation. Check your email.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  const result = await submitContactForm(
    {
      name: 'Levan',
      email: 'levan@example.com',
      subject: 'Hello',
      message: 'Testing activation',
    },
    mockFetch
  );

  assert.equal(result.ok, false);
  assert.equal(result.needsActivation, true);
});

test('submitContactForm handles network errors cleanly without throwing', async () => {
  const failingFetch: FetchLike = async () => {
    throw new Error('Offline');
  };

  const result = await submitContactForm(
    {
      name: 'Levan',
      email: 'levan@example.com',
      subject: 'Hello',
      message: 'Testing offline',
    },
    failingFetch
  );

  assert.equal(result.ok, false);
  assert.equal(result.error, 'Offline');
});

test('buildMailtoHref encodes recipient, subject, and body cleanly', () => {
  const href = buildMailtoHref({
    senderName: 'Levan',
    senderEmail: 'levan@example.com',
    subject: 'Website Question',
    message: 'When will the studio website launch?',
  });

  assert.equal(href.startsWith(`mailto:${RECIPIENT_EMAIL}?`), true);
  assert.equal(href.includes('Website%20Question'), true);
  assert.equal(href.includes('levan%40example.com'), true);
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
  }
});

test('hero Georgia flag image path is defined', () => {
  assert.equal(GEORGIA_FLAG_IMAGE.startsWith('/src/assets/images/'), true);
});
