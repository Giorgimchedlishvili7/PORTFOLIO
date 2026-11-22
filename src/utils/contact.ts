export const RECIPIENT_EMAIL = 'gmchedlishvilikhmaladze@gmail.com';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactErrorMessages {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  subjectRequired: string;
  messageRequired: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  values: ContactFormValues,
  messages: ContactErrorMessages
): { isValid: boolean; errors: ContactFormErrors } {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedSubject = values.subject.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = messages.nameRequired;
  }
  if (!trimmedEmail) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = messages.emailInvalid;
  }
  if (!trimmedSubject) {
    errors.subject = messages.subjectRequired;
  }
  if (!trimmedMessage) {
    errors.message = messages.messageRequired;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function toBase64Utf8(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (typeof btoa === 'function') {
    return btoa(binary);
  }
  return Buffer.from(bytes).toString('base64');
}

function toBase64UrlUtf8(input: string): string {
  return toBase64Utf8(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function encodeMimeHeaderUtf8(value: string): string {
  const sanitized = value.replace(/[\r\n]+/g, ' ').trim();
  return `=?UTF-8?B?${toBase64Utf8(sanitized)}?=`;
}

export interface BuildMimeParams {
  to?: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

export function buildMimeMessage(params: BuildMimeParams): string {
  const to = params.to ?? RECIPIENT_EMAIL;
  const cleanName = params.senderName.replace(/[\r\n"]+/g, ' ').trim();
  const cleanEmail = params.senderEmail.replace(/[\r\n<>]+/g, '').trim();
  const cleanSubject = params.subject.replace(/[\r\n]+/g, ' ').trim();

  const bodyLines = [
    `Portfolio Contact Message`,
    `Sender Name: ${cleanName}`,
    `Sender Email: ${cleanEmail}`,
    ``,
    params.message.trim(),
  ].join('\r\n');

  const headers = [
    `To: ${to}`,
    `Reply-To: "${cleanName}" <${cleanEmail}>`,
    `Subject: ${encodeMimeHeaderUtf8(`[Portfolio] ${cleanSubject}`)}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: base64`,
  ];

  const mime = `${headers.join('\r\n')}\r\n\r\n${toBase64Utf8(bodyLines)}`;
  return toBase64UrlUtf8(mime);
}

export function buildMailtoHref(params: BuildMimeParams): string {
  const to = params.to ?? RECIPIENT_EMAIL;
  const cleanSubject = params.subject.trim();
  const body = [
    `Name: ${params.senderName.trim()}`,
    `Email: ${params.senderEmail.trim()}`,
    ``,
    params.message.trim(),
  ].join('\n');

  const search = new URLSearchParams({
    subject: `[Portfolio] ${cleanSubject}`,
    body,
  });

  // URLSearchParams encodes spaces as '+', while mailto clients expect '%20'
  return `mailto:${to}?${search.toString().replace(/\+/g, '%20')}`;
}
