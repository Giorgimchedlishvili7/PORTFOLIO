import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, LogOut, Mail, Send, X } from 'lucide-react';
import type { User } from 'firebase/auth';
import {
  getAccessToken,
  googleSignIn,
  initAuth,
  logout,
  sendGmailMessage,
} from '../services/gmailAuth';
import {
  RECIPIENT_EMAIL,
  buildMailtoHref,
  buildMimeMessage,
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

  const [gmailUser, setGmailUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sentResultId, setSentResultId] = useState<string | null>(null);
  const [mailAppNotice, setMailAppNotice] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGmailUser(user);
        setAccessToken(token);
      },
      () => {
        setGmailUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!showConfirmModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSending) {
        setShowConfirmModal(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showConfirmModal, isSending]);

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
    if (mailAppNotice) setMailAppNotice(false);
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsSigningIn(true);
    try {
      const result = await googleSignIn();
      setGmailUser(result.user);
      setAccessToken(result.accessToken);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google sign-in failed.';
      setAuthError(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setGmailUser(null);
    setAccessToken(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError(null);
    setMailAppNotice(false);

    const validation = validateContactForm(values, t.contact.form.errors);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setShowConfirmModal(true);
  };

  const handleConfirmSendGmail = async () => {
    const token = accessToken ?? getAccessToken();
    if (!token) {
      setSendError('Please sign in with Google first.');
      return;
    }

    setIsSending(true);
    setSendError(null);
    try {
      const rawMime = buildMimeMessage({
        to: RECIPIENT_EMAIL,
        senderName: values.name,
        senderEmail: values.email,
        subject: values.subject,
        message: values.message,
      });

      const result = await sendGmailMessage(token, rawMime);
      setSentResultId(result.id || 'sent');
      setShowConfirmModal(false);
      setValues({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : 'Failed to send email.';
      setSendError(detail);
    } finally {
      setIsSending(false);
    }
  };

  const mailtoHref = buildMailtoHref({
    to: RECIPIENT_EMAIL,
    senderName: values.name,
    senderEmail: values.email,
    subject: values.subject,
    message: values.message,
  });

  const handleResetSent = () => {
    setSentResultId(null);
    setMailAppNotice(false);
    setSendError(null);
  };

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 py-16 lg:py-20 dark:border-zinc-800"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Direct Gmail details & Google Sign-In */}
        <div className="space-y-8 lg:col-span-5">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              {t.contact.sectionTitle}
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.contact.sectionLead}
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#111113]">
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
          </div>

          {/* Gmail OAuth Connection Box */}
          <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#111113]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {t.contact.gmailHeading}
              </h3>
              {gmailUser && accessToken && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.contact.gmailSignOut}</span>
                </button>
              )}
            </div>

            {gmailUser && accessToken ? (
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {t.contact.gmailConnectedAs}{' '}
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {gmailUser.email}
                </span>
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t.contact.gmailNotConnectedHint}
                </p>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="gsi-material-button"
                >
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        style={{ display: 'block' }}
                        aria-hidden="true"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {isSigningIn
                        ? t.contact.signingIn
                        : t.contact.signInWithGoogle}
                    </span>
                  </div>
                </button>

                {authError && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-[#D91E2A] dark:text-[#F87171]"
                  >
                    {authError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#111113]">
            {sentResultId ? (
              <div className="space-y-5 py-6">
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

                {mailAppNotice && (
                  <p
                    role="status"
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {t.contact.feedback.mailAppOpened}
                  </p>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D91E2A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] whitespace-nowrap shrink-0 dark:bg-[#E12D39] dark:hover:bg-[#C81E2A]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{t.contact.form.submitButton}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Confirmation / Send Choice Dialog */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-send-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => !isSending && setShowConfirmModal(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl sm:p-7 dark:border-zinc-800 dark:bg-[#111113]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="confirm-send-title"
                  className="font-display text-xl font-bold text-zinc-950 dark:text-zinc-50"
                >
                  {accessToken
                    ? t.contact.confirmModal.title
                    : t.contact.confirmModal.needGoogleTitle}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {accessToken
                    ? t.contact.confirmModal.description
                    : t.contact.confirmModal.needGoogleDesc}
                </p>
              </div>
              <button
                type="button"
                disabled={isSending}
                onClick={() => setShowConfirmModal(false)}
                aria-label={t.contact.confirmModal.cancel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {t.contact.confirmModal.toLabel}
                </span>
                <span className="font-medium text-zinc-950 dark:text-zinc-50">
                  {RECIPIENT_EMAIL}
                </span>
              </div>

              {gmailUser?.email && accessToken && (
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {t.contact.confirmModal.fromLabel}
                  </span>
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    {gmailUser.email}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {t.contact.confirmModal.replyToLabel}
                </span>
                <span className="font-medium text-zinc-950 dark:text-zinc-50">
                  {values.name} ({values.email})
                </span>
              </div>

              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {t.contact.confirmModal.subjectLabel}
                </span>
                <span className="font-medium text-zinc-950 dark:text-zinc-50">
                  {values.subject}
                </span>
              </div>

              <div className="border-t border-zinc-200 pt-2.5 dark:border-zinc-800">
                <p className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {t.contact.confirmModal.messageLabel}
                </p>
                <p className="max-h-32 overflow-y-auto whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
                  {values.message}
                </p>
              </div>
            </div>

            {sendError && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-[#D91E2A] dark:border-red-900/50 dark:bg-red-950/30 dark:text-[#F87171]"
              >
                {t.contact.feedback.errorPrefix} {sendError}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSending}
                onClick={() => setShowConfirmModal(false)}
                className="inline-flex min-h-[40px] items-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 whitespace-nowrap shrink-0 sm:mr-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {t.contact.confirmModal.cancel}
              </button>

              {accessToken ? (
                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleConfirmSendGmail}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#D91E2A] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] disabled:opacity-60 whitespace-nowrap shrink-0 dark:bg-[#E12D39]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {isSending
                      ? t.contact.confirmModal.sending
                      : t.contact.confirmModal.confirmSend}
                  </span>
                </button>
              ) : (
                <>
                  <a
                    href={mailtoHref}
                    onClick={() => {
                      setShowConfirmModal(false);
                      setMailAppNotice(true);
                    }}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>{t.contact.confirmModal.useMailAppInstead}</span>
                  </a>

                  <button
                    type="button"
                    disabled={isSigningIn}
                    onClick={handleGoogleSignIn}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#D91E2A] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#B91822] disabled:opacity-60 whitespace-nowrap shrink-0 dark:bg-[#E12D39]"
                  >
                    <span>
                      {isSigningIn
                        ? t.contact.signingIn
                        : t.contact.confirmModal.signInAndContinue}
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
