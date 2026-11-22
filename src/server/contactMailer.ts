import nodemailer from 'nodemailer';

export const TARGET_GMAIL = 'gmchedlishvilikhmaladze@gmail.com';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactDeliveryResult {
  ok: boolean;
  status: number;
  notConfigured?: boolean;
  provider?: 'gmail-smtp' | 'resend' | 'web3forms';
  error?: string;
}

export interface ContactMailerEnv {
  GMAIL_USER?: string;
  GMAIL_APP_PASSWORD?: string;
  RESEND_API_KEY?: string;
  WEB3FORMS_ACCESS_KEY?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseAndValidatePayload(
  raw: unknown
): { valid: true; data: ContactPayload } | { valid: false; error: string } {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const record = raw as Record<string, unknown>;
  const name = typeof record.name === 'string' ? record.name.trim() : '';
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const subject = typeof record.subject === 'string' ? record.subject.trim() : '';
  const message = typeof record.message === 'string' ? record.message.trim() : '';

  if (!name) return { valid: false, error: 'Name is required.' };
  if (!email || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'A valid email address is required.' };
  }
  if (!subject) return { valid: false, error: 'Subject is required.' };
  if (!message) return { valid: false, error: 'Message is required.' };

  return {
    valid: true,
    data: { name, email, subject, message },
  };
}

export async function deliverContactEmail(
  rawBody: unknown,
  env: ContactMailerEnv = process.env,
  fetchImpl: typeof fetch = fetch
): Promise<ContactDeliveryResult> {
  const parsed = parseAndValidatePayload(rawBody);
  if (!parsed.valid) {
    return { ok: false, status: 400, error: parsed.error };
  }

  const { name, email, subject, message } = parsed.data;
  const gmailUser = env.GMAIL_USER?.trim() || TARGET_GMAIL;
  const gmailAppPassword = env.GMAIL_APP_PASSWORD?.trim();
  const resendApiKey = env.RESEND_API_KEY?.trim();
  const web3formsKey = env.WEB3FORMS_ACCESS_KEY?.trim();

  // 1. Direct Gmail SMTP via App Password
  if (gmailAppPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      await transporter.sendMail({
        from: `"${name.replace(/"/g, '')}" <${gmailUser}>`,
        to: TARGET_GMAIL,
        replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });

      return { ok: true, status: 200, provider: 'gmail-smtp' };
    } catch (error) {
      return {
        ok: false,
        status: 502,
        error:
          error instanceof Error
            ? `Gmail SMTP error: ${error.message}`
            : 'Gmail SMTP delivery failed.',
      };
    }
  }

  // 2. Resend HTTPS API
  if (resendApiKey) {
    try {
      const res = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [TARGET_GMAIL],
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => null)) as {
          message?: string;
        } | null;
        return {
          ok: false,
          status: 502,
          error: errData?.message || `Resend failed (${res.status})`,
        };
      }

      return { ok: true, status: 200, provider: 'resend' };
    } catch (error) {
      return {
        ok: false,
        status: 502,
        error:
          error instanceof Error ? error.message : 'Resend delivery failed.',
      };
    }
  }

  // 3. Web3Forms HTTPS API
  if (web3formsKey) {
    try {
      const res = await fetchImpl('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          subject: `[Portfolio] ${subject}`,
          message,
          replyto: email,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!res.ok || !data?.success) {
        return {
          ok: false,
          status: 502,
          error: data?.message || `Web3Forms failed (${res.status})`,
        };
      }

      return { ok: true, status: 200, provider: 'web3forms' };
    } catch (error) {
      return {
        ok: false,
        status: 502,
        error:
          error instanceof Error ? error.message : 'Web3Forms delivery failed.',
      };
    }
  }

  return {
    ok: false,
    status: 200,
    notConfigured: true,
    error: 'Direct email server delivery is not configured yet.',
  };
}
