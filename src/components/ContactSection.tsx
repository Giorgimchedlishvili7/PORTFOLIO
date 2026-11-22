import { useState, type FormEvent } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import {
  RECIPIENT_EMAIL,
  buildMailtoHref,
  submitContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/contact';
import type { TranslationDictionary } from '../utils/i18n';

interface ContactSectionProps {
  t: TranslationDictionary;
}

export function ContactSection({ t }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [copied, setCopied] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RECIPIENT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleFieldChange = (
    field: keyof ContactFormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (sendError) setSendError(null);
    if (needsActivation) setNeedsActivation(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError(null);
    setNeedsActivation(false);

    const validation = validateContactForm(values, t.contact.form.errors);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSending(true);

    const result = await submitContactForm(values);
    setIsSending(false);

    if (result.ok) {
      setIsSent(true);
      setValues({ name: '', email: '', subject: '', message: '' });
      return;
    }

    if (result.needsActivation) {
      setNeedsActivation(true);
    }
    setSendError(result.error || 'Unknown error');
  };

  const mailtoHref = buildMailtoHref({
    to: RECIPIENT_EMAIL,
    senderName: values.name,
    senderEmail: values.email,
    subject: values.subject,
    message: values.message,
  });

  const handleResetSent = () => {
    setIsSent(false);
    setSendError(null);
    setNeedsActivation(false);
  };

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 py-16 lg:py-20 dark:border-zinc-800"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Direct Gmail Address */}
        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              {t.contact.sectionTitle}
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.contact.sectionLead}
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#111113]">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {t.contact.directEmailLabel}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href={`mailto:${RECIPIENT_EMAIL}`}
                className="break-all text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-[#D91E2A] dark:text-zinc-50 dark:decoration-zinc-700 dark:hover:text-[#F87171]"
              >
                {RECIPIENT_EMAIL}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.contact.copiedEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t.contact.copyEmail}</span>
                  </>
                )}
              </button>
            </div>

            <p className="border-t border-zinc-200 pt-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {t.contact.directMailAppHint}
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#111113]">
            {isSent ? (
              <div className="space-y-5 py-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                    {t.contact.feedback.sentTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {t.contact.feedback.sentBody}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {t.contact.feedback.activationTip}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetSent}
                  className="inline-flex min-h-[42px] items-center rounded-lg bg-[#D91E2A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] dark:bg-[#E12D39]"
                >
                  {t.contact.feedback.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      {t.contact.form.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder={t.contact.form.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#D91E2A] focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-[#E12D39]"
                    />
                    {errors.name && (
                      <p
                        id="error-name"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#D91E2A] dark:text-[#F87171]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      {t.contact.form.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) =>
                        handleFieldChange('email', e.target.value)
                      }
                      placeholder={t.contact.form.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'error-email' : undefined
                      }
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#D91E2A] focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-[#E12D39]"
                    />
                    {errors.email && (
                      <p
                        id="error-email"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#D91E2A] dark:text-[#F87171]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    {t.contact.form.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) =>
                      handleFieldChange('subject', e.target.value)
                    }
                    placeholder={t.contact.form.subjectPlaceholder}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? 'error-subject' : undefined
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#D91E2A] focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-[#E12D39]"
                  />
                  {errors.subject && (
                    <p
                      id="error-subject"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-[#D91E2A] dark:text-[#F87171]"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    {t.contact.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) =>
                      handleFieldChange('message', e.target.value)
                    }
                    placeholder={t.contact.form.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'error-message' : undefined
                    }
                    className="w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#D91E2A] focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-[#E12D39]"
                  />
                  {errors.message && (
                    <p
                      id="error-message"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-[#D91E2A] dark:text-[#F87171]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {sendError && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium leading-relaxed text-[#D91E2A] dark:border-red-900/50 dark:bg-red-950/30 dark:text-[#F87171]"
                  >
                    {needsActivation
                      ? t.contact.feedback.needsActivationMessage
                      : `${t.contact.feedback.errorPrefix} ${sendError}`}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D91E2A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:bg-[#E12D39] dark:hover:bg-[#C81E2A]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isSending
                        ? t.contact.form.sendingButton
                        : t.contact.form.submitButton}
                    </span>
                  </button>

                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>{t.contact.form.openMailAppButton}</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
