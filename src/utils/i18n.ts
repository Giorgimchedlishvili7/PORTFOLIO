export type LanguageCode = 'en' | 'ka' | 'de' | 'es';

export interface LanguageOption {
  code: LanguageCode;
  shortLabel: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', shortLabel: 'EN', nativeName: 'English' },
  { code: 'ka', shortLabel: 'KA', nativeName: 'ქართული' },
  { code: 'de', shortLabel: 'DE', nativeName: 'Deutsch' },
  { code: 'es', shortLabel: 'ES', nativeName: 'Español' },
];

export interface TranslationDictionary {
  brandName: string;
  nav: {
    home: string;
    websites: string;
    about: string;
    contact: string;
    primaryCta: string;
    openMenu: string;
    closeMenu: string;
  };
  controls: {
    languageLabel: string;
    switchToDark: string;
    switchToLight: string;
    darkLabel: string;
    lightLabel: string;
  };
  hero: {
    kicker: string;
    headline: string;
    lead: string;
    primaryAction: string;
    secondaryAction: string;
    flagAlt: string;
    flagCaptionTitle: string;
    flagCaptionSub: string;
    stripLocationLabel: string;
    stripLocationValue: string;
    stripFocusLabel: string;
    stripFocusValue: string;
    stripStatusLabel: string;
    stripStatusValue: string;
  };
  websites: {
    sectionTitle: string;
    comingSoon: string;
  };
  about: {
    sectionTitle: string;
    lead: string;
    body: string;
    principles: {
      oneTitle: string;
      oneBody: string;
      twoTitle: string;
      twoBody: string;
      threeTitle: string;
      threeBody: string;
    };
  };
  contact: {
    sectionTitle: string;
    sectionLead: string;
    directEmailLabel: string;
    copyEmail: string;
    copiedEmail: string;
    gmailHeading: string;
    gmailConnectedAs: string;
    gmailSignOut: string;
    gmailNotConnectedHint: string;
    signInWithGoogle: string;
    signingIn: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      openMailAppButton: string;
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        subjectRequired: string;
        messageRequired: string;
      };
    };
    confirmModal: {
      title: string;
      description: string;
      toLabel: string;
      fromLabel: string;
      replyToLabel: string;
      subjectLabel: string;
      messageLabel: string;
      cancel: string;
      confirmSend: string;
      sending: string;
      needGoogleTitle: string;
      needGoogleDesc: string;
      signInAndContinue: string;
      useMailAppInstead: string;
    };
    feedback: {
      sentTitle: string;
      sentBody: string;
      sendAnother: string;
      errorPrefix: string;
      mailAppOpened: string;
    };
  };
  footer: {
    rights: string;
    madeIn: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brandName: 'Giorgi',
    nav: {
      home: 'Home',
      websites: 'Websites',
      about: 'About',
      contact: 'Contact',
      primaryCta: 'Get in Touch',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    controls: {
      languageLabel: 'Language',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
      darkLabel: 'Dark',
      lightLabel: 'Light',
    },
    hero: {
      kicker: 'Tbilisi, Georgia · Web Designer & Developer',
      headline: "WELCOME TO Giorgi's PORTFOLIO",
      lead: 'Crafting clean, purposeful websites from the heart of Georgia. My upcoming web projects are currently in production and launching soon — reach out directly anytime.',
      primaryAction: 'Explore Websites',
      secondaryAction: 'Write a Message',
      flagAlt: 'National flag of Georgia (Sakartvelo) waving against the Caucasus mountains',
      flagCaptionTitle: 'Georgia · Sakartvelo',
      flagCaptionSub: 'Five-cross national flag in natural daylight',
      stripLocationLabel: 'Origin',
      stripLocationValue: 'Georgia (Sakartvelo)',
      stripFocusLabel: 'Discipline',
      stripFocusValue: 'Websites & Digital Craft',
      stripStatusLabel: 'Showcase Status',
      stripStatusValue: 'Coming Soon',
    },
    websites: {
      sectionTitle: 'Websites',
      comingSoon: 'Coming Soon',
    },
    about: {
      sectionTitle: 'About Giorgi',
      lead: 'Building thoughtful web experiences rooted in clarity, craft, and Georgian identity.',
      body: 'I am Giorgi, a web creator based in Georgia focused on responsive interfaces, multilingual accessibility, and clean engineering. While my newest websites are being finalized for launch, I am open for collaborations, feedback, and new web projects.',
      principles: {
        oneTitle: '01. Clear Structure',
        oneBody: 'Every page starts with readable typography, balanced spacing, and effortless navigation.',
        twoTitle: '02. Multilingual & Accessible',
        twoBody: 'Built to feel natural across languages as well as both light and dark viewing environments.',
        threeTitle: '03. Direct Communication',
        threeBody: 'Simple, reliable ways to connect directly via Gmail without unnecessary friction.',
      },
    },
    contact: {
      sectionTitle: 'Send a Message',
      sectionLead: 'Write your name, email, subject, and message below to send directly to my Gmail.',
      directEmailLabel: 'Direct Gmail Address',
      copyEmail: 'Copy email',
      copiedEmail: 'Copied',
      gmailHeading: 'Gmail Connection',
      gmailConnectedAs: 'Connected via Google as',
      gmailSignOut: 'Sign out',
      gmailNotConnectedHint: 'Sign in with Google to send directly through Gmail, or use your local email app after filling out the form.',
      signInWithGoogle: 'Sign in with Google',
      signingIn: 'Signing in...',
      form: {
        nameLabel: 'Your Name',
        namePlaceholder: 'Giorgi or your full name',
        emailLabel: 'Your Email',
        emailPlaceholder: 'you@example.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Website inquiry or collaboration',
        messageLabel: 'Message',
        messagePlaceholder: 'Write your message here...',
        submitButton: "Send to Giorgi's Gmail",
        openMailAppButton: 'Open in Email App',
        errors: {
          nameRequired: 'Please enter your name.',
          emailRequired: 'Please enter your email address.',
          emailInvalid: 'Please enter a valid email address.',
          subjectRequired: 'Please enter a subject.',
          messageRequired: 'Please write your message.',
        },
      },
      confirmModal: {
        title: 'Confirm Email to Gmail',
        description: 'Review your message before sending it to Giorgi.',
        toLabel: 'To',
        fromLabel: 'Gmail Account',
        replyToLabel: 'Sender',
        subjectLabel: 'Subject',
        messageLabel: 'Message',
        cancel: 'Cancel',
        confirmSend: 'Confirm & Send',
        sending: 'Sending via Gmail...',
        needGoogleTitle: 'Choose How to Send',
        needGoogleDesc: 'Connect your Google account to send directly through the Gmail API, or open this pre-filled message in your default email app.',
        signInAndContinue: 'Sign in with Google & Send',
        useMailAppInstead: 'Open in Email App',
      },
      feedback: {
        sentTitle: 'Message sent to Gmail',
        sentBody: 'Your email has been delivered to gmchedlishvilikhmaladze@gmail.com.',
        sendAnother: 'Write Another Message',
        errorPrefix: 'Could not send via Gmail:',
        mailAppOpened: 'Prepared your message for your default email app addressed to gmchedlishvilikhmaladze@gmail.com.',
      },
    },
    footer: {
      rights: "Giorgi's Portfolio. All rights reserved.",
      madeIn: 'Built in Georgia',
    },
  },
  ka: {
    brandName: 'გიორგი',
    nav: {
      home: 'მთავარი',
      websites: 'ვებსაიტები',
      about: 'ჩემ შესახებ',
      contact: 'კონტაქტი',
      primaryCta: 'დამიკავშირდით',
      openMenu: 'ნავიგაციის მენიუს გახსნა',
      closeMenu: 'ნავიგაციის მენიუს დახურვა',
    },
    controls: {
      languageLabel: 'ენა',
      switchToDark: 'მუქ რეჟიმზე გადართვა',
      switchToLight: 'ნათელ რეჟიმზე გადართვა',
      darkLabel: 'მუქი',
      lightLabel: 'ნათელი',
    },
    hero: {
      kicker: 'თბილისი, საქართველო · ვებ-დიზაინერი და დეველოპერი',
      headline: 'კეთილი იყოს თქვენი მობრძანება გიორგის პორტფოლიოში',
      lead: 'ვქმნი სუფთა და მიზანმიმართულ ვებსაიტებს საქართველოდან. ჩემი ვებ-პროექტები მზადების პროცესშია და მალე გამოქვეყნდება — მომწერეთ ნებისმიერ დროს.',
      primaryAction: 'ვებსაიტების ნახვა',
      secondaryAction: 'შეტყობინების გაგზავნა',
      flagAlt: 'საქართველოს ეროვნული დროშა კავკასიონის მთების ფონზე',
      flagCaptionTitle: 'საქართველო',
      flagCaptionSub: 'ხუთჯვრიანი ეროვნული დროშა მზის შუქზე',
      stripLocationLabel: 'მდებარეობა',
      stripLocationValue: 'საქართველო',
      stripFocusLabel: 'მიმართულება',
      stripFocusValue: 'ვებსაიტები და ციფრული დიზაინი',
      stripStatusLabel: 'სტატუსი',
      stripStatusValue: 'მალე (Coming Soon)',
    },
    websites: {
      sectionTitle: 'ვებსაიტები',
      comingSoon: 'მალე · Coming Soon',
    },
    about: {
      sectionTitle: 'გიორგის შესახებ',
      lead: 'ვქმნი ვებ-გამოცდილებებს, რომლებიც ეფუძნება სისუფთავეს, ხარისხსა და ქართულ იდენტობას.',
      body: 'მე ვარ გიორგი საქართველოდან. ვქმნი თანამედროვე, მრავალენოვან და სწრაფ ვებსაიტებს. სანამ ჩემი ახალი ვებსაიტები საბოლოო სახეს იძენს, სიამოვნებით მოვისმენ თქვენს იდეებსა და შემოთავაზებებს.',
      principles: {
        oneTitle: '01. სუფთა სტრუქტურა',
        oneBody: 'ყოველი გვერდი იწყება მკაფიო ტიპოგრაფიით, ჰარმონიული სივრცითა და მარტივი ნავიგაციით.',
        twoTitle: '02. მრავალენოვანი და ხელმისაწვდომი',
        twoBody: 'მორგებულია სხვადასხვა ენასა და როგორც ნათელ, ისე მუქ რეჟიმზე.',
        threeTitle: '03. პირდაპირი კავშირი',
        threeBody: 'მარტივი და საიმედო გზა პირდაპირ ჩემს Gmail-ზე მოსაწერად.',
      },
    },
    contact: {
      sectionTitle: 'მომწერეთ შეტყობინება',
      sectionLead: 'შეიყვანეთ თქვენი სახელი, ელფოსტა, თემა და ტექსტი, რათა პირდაპირ ჩემს Gmail-ზე მოვიდეს.',
      directEmailLabel: 'პირდაპირი Gmail მისამართი',
      copyEmail: 'კოპირება',
      copiedEmail: 'დაკოპირდა',
      gmailHeading: 'Gmail კავშირი',
      gmailConnectedAs: 'დაკავშირებულია Google-ით:',
      gmailSignOut: 'გასვლა',
      gmailNotConnectedHint: 'გაიარეთ ავტორიზაცია Google-ით Gmail-ით გასაგზავნად, ან გამოიყენეთ თქვენი ელფოსტის აპლიკაცია.',
      signInWithGoogle: 'Sign in with Google',
      signingIn: 'ავტორიზაცია...',
      form: {
        nameLabel: 'თქვენი სახელი',
        namePlaceholder: 'შეიყვანეთ სახელი',
        emailLabel: 'თქვენი ელფოსტა',
        emailPlaceholder: 'you@example.com',
        subjectLabel: 'თემა',
        subjectPlaceholder: 'შეკითხვა ან თანამშრომლობა',
        messageLabel: 'ტექსტი',
        messagePlaceholder: 'დაწერეთ თქვენი შეტყობინება აქ...',
        submitButton: 'გაგზავნა გიორგის Gmail-ზე',
        openMailAppButton: 'ელფოსტის აპში გახსნა',
        errors: {
          nameRequired: 'გთხოვთ შეიყვანოთ თქვენი სახელი.',
          emailRequired: 'გთხოვთ შეიყვანოთ ელფოსტის მისამართი.',
          emailInvalid: 'გთხოვთ შეიყვანოთ სწორი ელფოსტის მისამართი.',
          subjectRequired: 'გთხოვთ შეიყვანოთ თემა.',
          messageRequired: 'გთხოვთ დაწეროთ შეტყობინების ტექსტი.',
        },
      },
      confirmModal: {
        title: 'დაადასტურეთ გაგზავნა Gmail-ით',
        description: 'გადაამოწმეთ შეტყობინება გაგზავნამდე.',
        toLabel: 'მიმღები',
        fromLabel: 'Gmail ანგარიში',
        replyToLabel: 'გამომგზავნი',
        subjectLabel: 'თემა',
        messageLabel: 'ტექსტი',
        cancel: 'გაუქმება',
        confirmSend: 'დადასტურება და გაგზავნა',
        sending: 'იგზავნება Gmail-ით...',
        needGoogleTitle: 'აირჩიეთ გაგზავნის გზა',
        needGoogleDesc: 'შედით Google ანგარიშით პირდაპირ Gmail-ით გასაგზავნად, ან გახსენით შეტყობინება თქვენი ელფოსტის აპლიკაციაში.',
        signInAndContinue: 'Google-ით შესვლა და გაგზავნა',
        useMailAppInstead: 'ელფოსტის აპში გახსნა',
      },
      feedback: {
        sentTitle: 'შეტყობინება გაგზავნილია Gmail-ზე',
        sentBody: 'თქვენი წერილი წარმატებით გაიგზავნა მისამართზე gmchedlishvilikhmaladze@gmail.com.',
        sendAnother: 'კიდევ ერთი წერილის დაწერა',
        errorPrefix: 'Gmail-ით გაგზავნა ვერ მოხერხდა:',
        mailAppOpened: 'შეტყობინება მომზადდა თქვენს ელფოსტის აპში მისამართზე gmchedlishvilikhmaladze@gmail.com.',
      },
    },
    footer: {
      rights: 'გიორგის პორტფოლიო. ყველა უფლება დაცულია.',
      madeIn: 'შექმნილია საქართველოში',
    },
  },
  de: {
    brandName: 'Giorgi',
    nav: {
      home: 'Startseite',
      websites: 'Websites',
      about: 'Über mich',
      contact: 'Kontakt',
      primaryCta: 'Kontakt',
      openMenu: 'Navigationsmenü öffnen',
      closeMenu: 'Navigationsmenü schließen',
    },
    controls: {
      languageLabel: 'Sprache',
      switchToDark: 'Zum dunklen Modus wechseln',
      switchToLight: 'Zum hellen Modus wechseln',
      darkLabel: 'Dunkel',
      lightLabel: 'Hell',
    },
    hero: {
      kicker: 'Tiflis, Georgien · Webdesigner & Entwickler',
      headline: 'WILLKOMMEN IN Giorgis PORTFOLIO',
      lead: 'Ich gestalte klare, durchdachte Websites aus dem Herzen Georgiens. Meine kommenden Webprojekte befinden sich im Aufbau und erscheinen bald — schreib mir gerne direkt.',
      primaryAction: 'Websites ansehen',
      secondaryAction: 'Nachricht schreiben',
      flagAlt: 'Nationalflagge Georgiens (Sakartvelo) vor den Kaukasusbergen',
      flagCaptionTitle: 'Georgien · Sakartvelo',
      flagCaptionSub: 'Fünf-Kreuze-Flagge im natürlichen Tageslicht',
      stripLocationLabel: 'Herkunft',
      stripLocationValue: 'Georgien (Sakartvelo)',
      stripFocusLabel: 'Fokus',
      stripFocusValue: 'Websites & Digitales Design',
      stripStatusLabel: 'Projektstatus',
      stripStatusValue: 'Coming Soon',
    },
    websites: {
      sectionTitle: 'Websites',
      comingSoon: 'Coming Soon',
    },
    about: {
      sectionTitle: 'Über Giorgi',
      lead: 'Durchdachte Weberlebnisse mit Klarheit, Sorgfalt und georgischer Identität.',
      body: 'Ich bin Giorgi aus Georgien und konzentriere mich auf responsive Oberflächen, Mehrsprachigkeit und saubere Webentwicklung. Während meine neuen Websites fertiggestellt werden, freue ich mich über direkte Nachrichten.',
      principles: {
        oneTitle: '01. Klare Struktur',
        oneBody: 'Jede Seite beginnt mit lesbarer Typografie, ausgewogenen Abständen und intuitiver Führung.',
        twoTitle: '02. Mehrsprachig & Zugänglich',
        twoBody: 'Entwickelt für verschiedene Sprachen sowie helle und dunkle Darstellungsmodi.',
        threeTitle: '03. Direkter Kontakt',
        threeBody: 'Unkomplizierte Verbindung direkt zu meinem Gmail-Postfach.',
      },
    },
    contact: {
      sectionTitle: 'Nachricht senden',
      sectionLead: 'Gib deinen Namen, deine E-Mail-Adresse, den Betreff und deinen Text ein, um direkt an mein Gmail zu senden.',
      directEmailLabel: 'Direkte Gmail-Adresse',
      copyEmail: 'Kopieren',
      copiedEmail: 'Kopiert',
      gmailHeading: 'Gmail-Verbindung',
      gmailConnectedAs: 'Verbunden über Google als',
      gmailSignOut: 'Abmelden',
      gmailNotConnectedHint: 'Melde dich mit Google an, um direkt über Gmail zu senden, oder öffne dein E-Mail-Programm.',
      signInWithGoogle: 'Sign in with Google',
      signingIn: 'Anmeldung...',
      form: {
        nameLabel: 'Dein Name',
        namePlaceholder: 'Vor- und Nachname',
        emailLabel: 'Deine E-Mail',
        emailPlaceholder: 'du@beispiel.de',
        subjectLabel: 'Betreff',
        subjectPlaceholder: 'Website-Anfrage oder Zusammenarbeit',
        messageLabel: 'Nachricht',
        messagePlaceholder: 'Schreibe deine Nachricht hier...',
        submitButton: 'An Giorgis Gmail senden',
        openMailAppButton: 'In E-Mail-App öffnen',
        errors: {
          nameRequired: 'Bitte gib deinen Namen ein.',
          emailRequired: 'Bitte gib deine E-Mail-Adresse ein.',
          emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
          subjectRequired: 'Bitte gib einen Betreff ein.',
          messageRequired: 'Bitte schreibe eine Nachricht.',
        },
      },
      confirmModal: {
        title: 'E-Mail an Gmail bestätigen',
        description: 'Prüfe deine Nachricht vor dem Versand an Giorgi.',
        toLabel: 'An',
        fromLabel: 'Gmail-Konto',
        replyToLabel: 'Absender',
        subjectLabel: 'Betreff',
        messageLabel: 'Nachricht',
        cancel: 'Abbrechen',
        confirmSend: 'Bestätigen & Senden',
        sending: 'Wird über Gmail gesendet...',
        needGoogleTitle: 'Versandart wählen',
        needGoogleDesc: 'Verbinde dein Google-Konto für den direkten Versand über die Gmail-API oder öffne die Nachricht in deiner E-Mail-App.',
        signInAndContinue: 'Mit Google anmelden & senden',
        useMailAppInstead: 'In E-Mail-App öffnen',
      },
      feedback: {
        sentTitle: 'Nachricht an Gmail gesendet',
        sentBody: 'Deine E-Mail wurde an gmchedlishvilikhmaladze@gmail.com zugestellt.',
        sendAnother: 'Weitere Nachricht schreiben',
        errorPrefix: 'Gmail-Versand fehlgeschlagen:',
        mailAppOpened: 'Nachricht für deine Standard-E-Mail-App an gmchedlishvilikhmaladze@gmail.com vorbereitet.',
      },
    },
    footer: {
      rights: 'Giorgis Portfolio. Alle Rechte vorbehalten.',
      madeIn: 'Erstellt in Georgien',
    },
  },
  es: {
    brandName: 'Giorgi',
    nav: {
      home: 'Inicio',
      websites: 'Sitios Web',
      about: 'Sobre mí',
      contact: 'Contacto',
      primaryCta: 'Contactar',
      openMenu: 'Abrir menú de navegación',
      closeMenu: 'Cerrar menú de navegación',
    },
    controls: {
      languageLabel: 'Idioma',
      switchToDark: 'Cambiar a modo oscuro',
      switchToLight: 'Cambiar a modo claro',
      darkLabel: 'Oscuro',
      lightLabel: 'Claro',
    },
    hero: {
      kicker: 'Tiflis, Georgia · Diseñador y Desarrollador Web',
      headline: 'BIENVENIDO AL PORTAFOLIO DE Giorgi',
      lead: 'Creando sitios web limpios y con propósito desde el corazón de Georgia. Mis próximos proyectos web están en desarrollo y llegarán pronto — escríbeme cuando quieras.',
      primaryAction: 'Ver Sitios Web',
      secondaryAction: 'Enviar Mensaje',
      flagAlt: 'Bandera nacional de Georgia (Sakartvelo) ondeando frente a las montañas del Cáucaso',
      flagCaptionTitle: 'Georgia · Sakartvelo',
      flagCaptionSub: 'Bandera nacional de cinco cruces con luz natural',
      stripLocationLabel: 'Origen',
      stripLocationValue: 'Georgia (Sakartvelo)',
      stripFocusLabel: 'Enfoque',
      stripFocusValue: 'Sitios Web y Diseño Digital',
      stripStatusLabel: 'Estado',
      stripStatusValue: 'Próximamente (Coming Soon)',
    },
    websites: {
      sectionTitle: 'Sitios Web',
      comingSoon: 'Coming Soon',
    },
    about: {
      sectionTitle: 'Sobre Giorgi',
      lead: 'Construyendo experiencias web claras, cuidadas y con identidad georgiana.',
      body: 'Soy Giorgi, creador web en Georgia enfocado en interfaces adaptables, accesibilidad multilingüe y desarrollo limpio. Mientras preparo el lanzamiento de mis próximos sitios web, estoy disponible para nuevos proyectos.',
      principles: {
        oneTitle: '01. Estructura Clara',
        oneBody: 'Cada página comienza con tipografía legible, espacios equilibrados y navegación sencilla.',
        twoTitle: '02. Multilingüe y Accesible',
        twoBody: 'Diseñado para sentirse natural en varios idiomas y en modo claro u oscuro.',
        threeTitle: '03. Comunicación Directa',
        threeBody: 'Una forma directa y confiable de escribirme a mi Gmail sin fricciones.',
      },
    },
    contact: {
      sectionTitle: 'Enviar un Mensaje',
      sectionLead: 'Escribe tu nombre, tu correo, el asunto y el texto para enviarlo directamente a mi Gmail.',
      directEmailLabel: 'Correo Directo de Gmail',
      copyEmail: 'Copiar',
      copiedEmail: 'Copiado',
      gmailHeading: 'Conexión con Gmail',
      gmailConnectedAs: 'Conectado con Google como',
      gmailSignOut: 'Cerrar sesión',
      gmailNotConnectedHint: 'Inicia sesión con Google para enviar directamente por Gmail, o abre tu aplicación de correo.',
      signInWithGoogle: 'Sign in with Google',
      signingIn: 'Iniciando sesión...',
      form: {
        nameLabel: 'Tu Nombre',
        namePlaceholder: 'Tu nombre completo',
        emailLabel: 'Tu Correo',
        emailPlaceholder: 'tu@ejemplo.com',
        subjectLabel: 'Asunto',
        subjectPlaceholder: 'Consulta sobre sitio web o colaboración',
        messageLabel: 'Texto del Mensaje',
        messagePlaceholder: 'Escribe tu mensaje aquí...',
        submitButton: 'Enviar al Gmail de Giorgi',
        openMailAppButton: 'Abrir en App de Correo',
        errors: {
          nameRequired: 'Por favor escribe tu nombre.',
          emailRequired: 'Por favor escribe tu correo electrónico.',
          emailInvalid: 'Por favor ingresa un correo electrónico válido.',
          subjectRequired: 'Por favor escribe un asunto.',
          messageRequired: 'Por favor escribe tu mensaje.',
        },
      },
      confirmModal: {
        title: 'Confirmar Envío a Gmail',
        description: 'Revisa tu mensaje antes de enviarlo a Giorgi.',
        toLabel: 'Para',
        fromLabel: 'Cuenta de Gmail',
        replyToLabel: 'Remitente',
        subjectLabel: 'Asunto',
        messageLabel: 'Mensaje',
        cancel: 'Cancelar',
        confirmSend: 'Confirmar y Enviar',
        sending: 'Enviando por Gmail...',
        needGoogleTitle: 'Elige Cómo Enviar',
        needGoogleDesc: 'Conecta tu cuenta de Google para enviar directamente mediante Gmail o abre este mensaje en tu aplicación de correo.',
        signInAndContinue: 'Iniciar sesión con Google y Enviar',
        useMailAppInstead: 'Abrir en App de Correo',
      },
      feedback: {
        sentTitle: 'Mensaje enviado a Gmail',
        sentBody: 'Tu correo fue entregado a gmchedlishvilikhmaladze@gmail.com.',
        sendAnother: 'Escribir Otro Mensaje',
        errorPrefix: 'No se pudo enviar por Gmail:',
        mailAppOpened: 'Mensaje preparado en tu app de correo para gmchedlishvilikhmaladze@gmail.com.',
      },
    },
    footer: {
      rights: 'Portafolio de Giorgi. Todos los derechos reservados.',
      madeIn: 'Hecho en Georgia',
    },
  },
};

export function getTranslation(lang: LanguageCode): TranslationDictionary {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}
