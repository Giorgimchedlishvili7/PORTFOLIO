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
    directMailAppHint: string;
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
      sendingButton: string;
      openMailAppButton: string;
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        subjectRequired: string;
        messageRequired: string;
      };
    };
    feedback: {
      sentTitle: string;
      sentBody: string;
      activationTip: string;
      needsActivationMessage: string;
      sendAnother: string;
      errorPrefix: string;
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
      sectionLead: 'Write your name, email, subject, and message below to send directly to my Gmail — no sign-in required.',
      directEmailLabel: 'Direct Gmail Address',
      copyEmail: 'Copy email',
      copiedEmail: 'Copied',
      directMailAppHint: 'You can submit the form directly or open the message in your email app anytime.',
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
        sendingButton: 'Sending...',
        openMailAppButton: 'Open in Email App',
        errors: {
          nameRequired: 'Please enter your name.',
          emailRequired: 'Please enter your email address.',
          emailInvalid: 'Please enter a valid email address.',
          subjectRequired: 'Please enter a subject.',
          messageRequired: 'Please write your message.',
        },
      },
      feedback: {
        sentTitle: 'Message sent to Gmail',
        sentBody: 'Your message has been sent to gmchedlishvilikhmaladze@gmail.com.',
        activationTip: 'Note for the site owner: on the very first submission from a new domain, check gmchedlishvilikhmaladze@gmail.com (including Spam) to confirm FormSubmit’s one-time activation link.',
        needsActivationMessage: 'Form delivery needs one-time activation in gmchedlishvilikhmaladze@gmail.com. Check that inbox for the activation email, or click Open in Email App below.',
        sendAnother: 'Write Another Message',
        errorPrefix: 'Could not send directly:',
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
      sectionLead: 'შეიყვანეთ თქვენი სახელი, ელფოსტა, თემა და ტექსტი, რათა პირდაპირ ჩემს Gmail-ზე მოვიდეს — ავტორიზაციის გარეშე.',
      directEmailLabel: 'პირდაპირი Gmail მისამართი',
      copyEmail: 'კოპირება',
      copiedEmail: 'დაკოპირდა',
      directMailAppHint: 'შეგიძლიათ გააგზავნოთ პირდაპირ ფორმით ან გახსნათ თქვენს ელფოსტის აპლიკაციაში.',
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
        sendingButton: 'იგზავნება...',
        openMailAppButton: 'ელფოსტის აპში გახსნა',
        errors: {
          nameRequired: 'გთხოვთ შეიყვანოთ თქვენი სახელი.',
          emailRequired: 'გთხოვთ შეიყვანოთ ელფოსტის მისამართი.',
          emailInvalid: 'გთხოვთ შეიყვანოთ სწორი ელფოსტის მისამართი.',
          subjectRequired: 'გთხოვთ შეიყვანოთ თემა.',
          messageRequired: 'გთხოვთ დაწეროთ შეტყობინების ტექსტი.',
        },
      },
      feedback: {
        sentTitle: 'შეტყობინება გაგზავნილია Gmail-ზე',
        sentBody: 'თქვენი წერილი გაიგზავნა მისამართზე gmchedlishvilikhmaladze@gmail.com.',
        activationTip: 'შენიშვნა საიტის მფლობელისთვის: ახალ დომენზე პირველი გაგზავნისას შეამოწმეთ gmchedlishvilikhmaladze@gmail.com (სპამიც) ერთჯერადი აქტივაციის ბმულის დასადასტურებლად.',
        needsActivationMessage: 'ფორმას სჭირდება ერთჯერადი აქტივაცია მისამართზე gmchedlishvilikhmaladze@gmail.com. შეამოწმეთ ელფოსტა ან გამოიყენეთ ელფოსტის აპი.',
        sendAnother: 'კიდევ ერთი წერილის დაწერა',
        errorPrefix: 'პირდაპირი გაგზავნა ვერ მოხერხდა:',
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
      sectionLead: 'Gib deinen Namen, deine E-Mail-Adresse, den Betreff und deinen Text ein, um direkt an mein Gmail zu senden — ganz ohne Anmeldung.',
      directEmailLabel: 'Direkte Gmail-Adresse',
      copyEmail: 'Kopieren',
      copiedEmail: 'Kopiert',
      directMailAppHint: 'Du kannst das Formular direkt absenden oder die Nachricht jederzeit in deiner E-Mail-App öffnen.',
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
        sendingButton: 'Wird gesendet...',
        openMailAppButton: 'In E-Mail-App öffnen',
        errors: {
          nameRequired: 'Bitte gib deinen Namen ein.',
          emailRequired: 'Bitte gib deine E-Mail-Adresse ein.',
          emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
          subjectRequired: 'Bitte gib einen Betreff ein.',
          messageRequired: 'Bitte schreibe eine Nachricht.',
        },
      },
      feedback: {
        sentTitle: 'Nachricht an Gmail gesendet',
        sentBody: 'Deine Nachricht wurde an gmchedlishvilikhmaladze@gmail.com gesendet.',
        activationTip: 'Hinweis für den Inhaber: Bei der allerersten Anfrage von einer neuen Domain prüfe bitte gmchedlishvilikhmaladze@gmail.com (auch Spam) für die einmalige Aktivierung.',
        needsActivationMessage: 'Das Formular benötigt eine einmalige Aktivierung unter gmchedlishvilikhmaladze@gmail.com. Prüfe dein Postfach oder nutze die E-Mail-App.',
        sendAnother: 'Weitere Nachricht schreiben',
        errorPrefix: 'Direktversand fehlgeschlagen:',
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
      sectionLead: 'Escribe tu nombre, tu correo, el asunto y el texto para enviarlo directamente a mi Gmail — sin iniciar sesión.',
      directEmailLabel: 'Correo Directo de Gmail',
      copyEmail: 'Copiar',
      copiedEmail: 'Copiado',
      directMailAppHint: 'Puedes enviar el formulario directamente o abrir el mensaje en tu aplicación de correo.',
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
        sendingButton: 'Enviando...',
        openMailAppButton: 'Abrir en App de Correo',
        errors: {
          nameRequired: 'Por favor escribe tu nombre.',
          emailRequired: 'Por favor escribe tu correo electrónico.',
          emailInvalid: 'Por favor ingresa un correo electrónico válido.',
          subjectRequired: 'Por favor escribe un asunto.',
          messageRequired: 'Por favor escribe tu mensaje.',
        },
      },
      feedback: {
        sentTitle: 'Mensaje enviado a Gmail',
        sentBody: 'Tu mensaje fue enviado a gmchedlishvilikhmaladze@gmail.com.',
        activationTip: 'Nota para el propietario: en el primer envío desde un dominio nuevo, revisa gmchedlishvilikhmaladze@gmail.com (incluido Spam) para confirmar el enlace de activación.',
        needsActivationMessage: 'El formulario requiere activación única en gmchedlishvilikhmaladze@gmail.com. Revisa ese correo o usa Abrir en App de Correo.',
        sendAnother: 'Escribir Otro Mensaje',
        errorPrefix: 'No se pudo enviar directamente:',
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
