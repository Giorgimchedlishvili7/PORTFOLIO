export const RECIPIENT_EMAIL = 'gmchedlishvilikhmaladze@gmail.com';
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

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

export interface BuildMailtoParams {
  to?: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

export function buildMailtoHref(params: BuildMailtoParams): string {
  const to = params.to ?? RECIPIENT_EMAIL;
  const cleanSubject = params.subject.trim();
  const body = [
    `Name: ${params.senderName.trim()}`,
    `Email: ${params.senderEmail.trim()}`,
    ``,
    params.message.trim(),
  ].join('\n');

  const search = new URLSearchParams({
    subject: cleanSubject ? `[Portfolio] ${cleanSubject}` : 'Portfolio Inquiry',
    body,
  });

  return `mailto:${to}?${search.toString().replace(/\+/g, '%20')}`;
}

export interface SubmitContactResult {
  ok: boolean;
  needsActivation?: boolean;
  error?: string;
}

export type FetchLike = typeof fetch;

export async function submitContactForm(
  values: ContactFormValues,
  fetchImpl: FetchLike = fetch
): Promise<SubmitContactResult> {
  try {
    const response = await fetchImpl(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        _replyto: values.email.trim(),
        subject: values.subject.trim(),
        _subject: `[Portfolio] ${values.subject.trim()}`,
        message: values.message.trim(),
        _template: 'table',
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean | string;
      message?: string;
    } | null;

    const succeeded =
      response.ok && (data?.success === true || data?.success === 'true');

    if (succeeded) {
      return { ok: true };
    }

    const rawMessage = data?.message || `Request failed (${response.status})`;
    const needsActivation = /activat/i.test(rawMessage);

    return {
      ok: false,
      needsActivation,
      error: rawMessage,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
