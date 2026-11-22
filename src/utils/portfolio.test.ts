import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RECIPIENT_EMAIL,
  buildMailtoHref,
  buildMimeMessage,
  validateContactForm,
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

test('buildMimeMessage produces valid base64url MIME targeting Giorgi Gmail with UTF-8 Georgian support', () => {
  const raw = buildMimeMessage({
    senderName: 'გიორგი მომხმარებელი',
    senderEmail: 'visitor@example.com',
    subject: 'გამარჯობა გიორგი',
    message: 'მოგესალმებით საქართველოდან!',
  });

  assert.equal(/^[A-Za-z0-9_-]+$/.test(raw), true);

  const normalized = raw.replace(/-/g, '+').replace(/_/g, '/');
  const decodedMime = Buffer.from(normalized, 'base64').toString('utf8');
  assert.match(decodedMime, new RegExp(`To: ${RECIPIENT_EMAIL}`));
  assert.match(decodedMime, /Reply-To: "გიორგი მომხმარებელი" <visitor@example\.com>/);
  assert.match(decodedMime, /Subject: =\?UTF-8\?B\?/);
  assert.match(decodedMime, /Content-Type: text\/plain; charset="UTF-8"/);
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
