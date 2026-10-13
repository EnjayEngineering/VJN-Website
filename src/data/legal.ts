import { company } from '@/data/company';
import type { Locale } from '@/i18n/context';

/**
 * Privacy Policy and Terms & Conditions, in both languages. The pop-up that
 * shows them is `src/components/legal/LegalSheet.tsx`.
 *
 * Inline markup in any string: **bold**, [label](href). An href of `#privacy`
 * or `#terms` switches to that page; mailto:, tel: and https: links work as usual.
 *
 * Written from what the site actually does (see README > "Privacy and terms").
 * Update the policy whenever that changes, e.g. when a form endpoint is added.
 */

export type LegalDocId = 'privacy' | 'terms';
export const legalDocIds: readonly LegalDocId[] = ['privacy', 'terms'];

/** A paragraph, or a bulleted list. */
export type LegalBlock = string | { list: string[] };

export interface LegalDoc {
  title: string;
  intro: string;
  sections: { heading: string; body: LegalBlock[] }[];
  /** Label of the link at the bottom that opens the other page. */
  otherLink: string;
}

export interface LegalText {
  /** Short names, used for footer and form links. */
  label: Record<LegalDocId, string>;
  updated: string;
  close: string;
  footerNav: string;
  /** Line under the enquiry form: before + link to the Privacy Policy + after. */
  formConsent: { before: string; after: string };
  /** Cookie banner (`CookieBanner`) and the footer link that reopens it. */
  cookies: { label: string; message: string; accept: string; decline: string; settings: string };
  /** Shown at the top of a translation; the English text prevails. */
  translationNote?: string;
  docs: Record<LegalDocId, LegalDoc>;
}

const email = `[${company.email}](mailto:${company.email})`;
const phone = `[${company.phone}](${company.phoneHref})`;

const en: LegalText = {
  label: { privacy: 'Privacy Policy', terms: 'Terms & Conditions' },
  updated: 'Last updated: 9 October 2026',
  close: 'Close',
  footerNav: 'Legal',
  formConsent: { before: 'By sending, you agree to our ', after: '.' },
  cookies: {
    label: 'Cookie consent',
    message:
      'With your permission, we use Google Analytics cookies to count visits and see which pages are useful, so we can improve the site. None are set unless you accept.',
    accept: 'Accept',
    decline: 'Decline',
    settings: 'Cookie settings',
  },
  docs: {
    privacy: {
      title: 'Privacy Policy',
      intro:
        'This policy explains what information this website (rnstechservice.com) handles, why, and the choices you have. It is written to match how the site actually works.',
      otherLink: 'Read our Terms & Conditions',
      sections: [
        {
          heading: 'Who we are',
          body: [
            'This website is run by VJN Technical Services LLC, P.O. Box 37932, Al Quoz Industrial Area 2, Dubai, United Arab Emirates. We are responsible for the personal information described in this policy.',
            'We aim to handle personal information in line with the data protection laws of the United Arab Emirates, including Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.',
          ],
        },
        {
          heading: 'What this site collects',
          body: [
            'This website has no user accounts, no logins, no customer database and no advertising tracking. It collects personal information only in the situations below.',
            {
              list: [
                '**Enquiry form.** The form asks for your name, email address, phone number (optional), the service you are interested in and your message. The website does not save or send these details itself. When you press "Send enquiry", your own email app opens with a message to us already filled in. Nothing reaches us unless you choose to send that email.',
                '**Emails and calls.** If you email or phone us, we receive your email address or phone number and whatever you tell us.',
                '**Technical information.** Like any website, when your browser loads a page, the server that hosts this site receives standard technical details such as your IP address, browser type, the page requested and the time. This is needed to deliver the page. Our hosting provider may keep these details in server logs for security and to keep the site running.',
                '**Visit statistics (only if you agree).** If you accept the cookie banner, Google Analytics records how the site is used, as described under "Other companies’ services" below.',
              ],
            },
          ],
        },
        {
          heading: 'How we use your information',
          body: [
            'We use the information you send us only to:',
            {
              list: [
                'reply to your enquiry and answer your questions;',
                'arrange a site visit and prepare a quotation;',
                'carry out and support work you ask us to do, including follow-up and maintenance;',
                'keep the business and accounting records that UAE law requires us to keep.',
              ],
            },
            'We do not sell your information. We do not use it for advertising, and we will not add you to a marketing list without your consent.',
            'We share it only with people who need it for the purposes above, such as our own team, or when the law requires us to.',
          ],
        },
        {
          heading: 'What is stored on your device',
          body: [
            'This website sets cookies only if you accept the cookie banner. Those are Google Analytics cookies, described in the next section.',
            'It saves three small settings in your browser’s local storage, so the site looks the way you left it and remembers your choice next time:',
            {
              list: [
                '**vjn-locale**: your language choice (English or Arabic);',
                '**vjn-theme**: your choice of light or dark display;',
                '**vjn-consent**: whether you accepted or declined analytics cookies.',
              ],
            },
            'These settings stay on your device. They are not sent to us and contain no personal information. They remain until you clear this site’s data in your browser settings, which you can do at any time.',
            'While you browse, the site also remembers your scroll position on each page in your browser’s session storage, so the Back button returns you to the same place. This is cleared when you close the tab.',
            'The embedded Google map may set its own cookies; see the next section.',
          ],
        },
        {
          heading: 'Other companies’ services',
          body: [
            'Some parts of the site rely on services run by other companies. Those companies handle your information under their own privacy policies.',
            {
              list: [
                '**Google Maps.** Pages with our contact section show an embedded Google map of our office. When it loads (as that part of the page comes into view), your browser connects to Google, which receives your IP address and browser details and may set or read cookies. Our address link also opens Google Maps. See [Google’s Privacy Policy](https://policies.google.com/privacy).',
                `**Email.** Our enquiry inbox (${company.email}) is a Gmail account provided by Google, so emails you send us, including enquiries from the form, are stored on Google’s systems. Your own email provider also handles the message.`,
                '**Google Analytics (only if you agree).** If you accept the cookie banner, Google Analytics sets cookies (named _ga and _ga_ followed by an ID) and records which pages you view, how you reached the site (for example from a search engine), your approximate location (city or country, worked out from your IP address) and your type of device and browser. We use these statistics only to understand how the site is used and to improve it. Advertising features are turned off. If you decline, Google Analytics is never loaded. You can change your choice at any time with "Cookie settings" at the bottom of every page; declining deletes the cookies. See [how Google uses information from sites that use its services](https://policies.google.com/technologies/partner-sites).',
                '**Website hosting.** The company that hosts this website receives the technical information described above in order to serve the pages.',
              ],
            },
            'Google may process information on servers outside the UAE.',
            'The site does not use Google Fonts, Facebook, Instagram, YouTube, WhatsApp widgets or any other social media plugins. Its fonts and images are served from our own website.',
          ],
        },
        {
          heading: 'How long we keep information',
          body: [
            'We keep enquiry emails and the details of your enquiry only for as long as we need them to respond to you and follow up on your request.',
            'If you become a client, we keep the records connected to your work for as long as UAE law requires us to keep business, tax and accounting records.',
            'Google Analytics statistics are kept for no longer than 14 months. Its cookies expire after at most two years, or straight away if you decline in "Cookie settings".',
            'When we no longer need information, we delete it. The settings stored on your device stay until you clear them (see above).',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You can ask us at any time to:',
            {
              list: [
                'tell you what personal information we hold about you and give you a copy;',
                'correct information that is wrong or incomplete;',
                'delete your information, unless the law requires us to keep it;',
                'stop or limit how we use it;',
                'withdraw any consent you have given. This does not affect anything we did before you withdrew it.',
              ],
            },
            'To make a request, contact us using the details at the end of this policy. We may need to confirm your identity first. We will reply as soon as we reasonably can, and within any time limit set by law.',
            'If you are not satisfied with our response, you may complain to the UAE Data Office or another competent authority.',
          ],
        },
        {
          heading: 'Security',
          body: [
            'We take reasonable steps to protect the information you send us, including limiting access to our enquiry inbox to the people who need it.',
            'No website, email or internet connection is completely secure. Please do not send sensitive information, such as Emirates ID or passport numbers, bank or card details, passwords or health information, through the form or by email.',
          ],
        },
        {
          heading: 'Children',
          body: [
            'This website is meant for adults: property owners, tenants, businesses and facility managers. It is not directed at children, and we do not knowingly collect information from them. If you believe a child has sent us personal information, please contact us and we will delete it.',
          ],
        },
        {
          heading: 'Changes to this policy',
          body: [
            'We may update this policy when the website or the law changes. The "Last updated" date at the top shows when it last changed. If we start collecting information in a new way, for example through a form that sends enquiries directly to us, we will update this policy before we do.',
          ],
        },
        {
          heading: 'Contact and complaints',
          body: [
            'For any question, request or complaint about your personal information, contact:',
            {
              list: [
                'VJN Technical Services LLC, P.O. Box 37932, Al Quoz Industrial Area 2, Dubai, U.A.E.',
                `Email: ${email} (please write "Privacy" in the subject line)`,
                `Phone: ${phone}, Monday to Saturday, 08:00 to 18:00`,
              ],
            },
            'We will look into every complaint and tell you the outcome.',
          ],
        },
      ],
    },

    terms: {
      title: 'Terms & Conditions',
      intro:
        'These terms apply to your use of this website (rnstechservice.com), which is run by VJN Technical Services LLC ("VJN", "we" or "us"). By using the site you agree to them; if you do not agree, please do not use the site. How we handle personal information is explained separately in our Privacy Policy.',
      otherLink: 'Read our Privacy Policy',
      sections: [
        {
          heading: 'Information on this website',
          body: [
            'Everything on this site, including service descriptions, sector pages and photographs, is general information about the kinds of work we do. It is not a quotation, a technical assessment or professional advice for your property. Photographs are for illustration.',
            'We try to keep the information accurate and up to date, but we may change it at any time without notice, and we do not promise that it is complete or free of errors. Please confirm anything with us before relying on it for your project.',
          ],
        },
        {
          heading: 'An enquiry is not a booking',
          body: [
            'Sending an enquiry, requesting a site visit or speaking with us does not create a booking or a contract, and does not oblige you or us to go ahead.',
            'Work is confirmed only when we have agreed it with you in writing, for example by your written acceptance of our quotation. That written quotation or agreement ("your booking terms") is what binds both of us.',
          ],
        },
        {
          heading: 'Prices, payment and cancellation',
          body: [
            'This website does not show prices. The price, scope of work, payment terms, timing, any warranty, and any rules on changes or cancellation for your job are given to you in writing in your booking terms.',
            'If anything in your booking terms differs from these website terms, your booking terms apply.',
          ],
        },
        {
          heading: 'Using this website',
          body: [
            'You may use this site for lawful purposes. Please do not:',
            {
              list: [
                'send false, misleading or spam enquiries, or enquiries in someone else’s name;',
                'try to break into, overload or disrupt the site, or introduce viruses or other harmful code;',
                'copy the site’s content in bulk, including with automated tools.',
              ],
            },
          ],
        },
        {
          heading: 'Site visits and work at your property',
          body: [
            'When we visit or work at your property, please:',
            {
              list: [
                'give us accurate information about the property and the work needed;',
                'arrange safe access at the agreed times, including any building, community or landlord permissions that your booking terms say you will obtain;',
                'tell us about any known hazards, such as damaged wiring, leaks or unstable structures;',
                'keep children, pets and other people away from work areas.',
              ],
            },
            'Our team may pause work if conditions on site are unsafe, until the issue is resolved. The details for each job, including working hours and who arranges which approvals, are set out in your booking terms.',
          ],
        },
        {
          heading: 'Copyright and brand',
          body: [
            'The text, photographs, graphics, the VJN name and logo, and the design of this website belong to VJN Technical Services LLC or are used with permission. They are protected by copyright and trademark law.',
            'You are welcome to view the site and share links to its pages. You may not download, copy, edit, republish or otherwise reuse our photographs, text or logo, for example on another website, in advertising or on social media, without our written permission.',
          ],
        },
        {
          heading: 'Links to other services',
          body: [
            'The site links to services run by other companies, such as Google Maps, and its contact links open your own email or phone app. We do not control these services and are not responsible for their content, availability or terms. Your use of them is governed by their own terms and policies.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'We provide this website as it is and as available. We do not guarantee that it will always be available, or free of errors or viruses.',
            'To the extent the law allows, we are not responsible for any loss or damage arising from your use of this website or from relying on its general information, including indirect loss or loss of profit or data.',
            'Our responsibility for work we carry out for you is set by your booking terms and by law, not by this website.',
            'Nothing in these terms limits or removes any rights you have under UAE consumer protection law, or any liability that cannot legally be limited or excluded.',
          ],
        },
        {
          heading: 'Governing law and courts',
          body: [
            'These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. The Dubai Courts have jurisdiction over any dispute about them, without affecting any right you have to complain to a consumer protection authority.',
            'Before going to court, please contact us so we can try to resolve the matter.',
          ],
        },
        {
          heading: 'Changes to these terms',
          body: [
            'We may update these terms from time to time. The version on this page, with its "Last updated" date, is the one that applies when you use the site. Changes do not affect booking terms already agreed with you.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            `Questions about these terms: email ${email} or call ${phone}, Monday to Saturday, 08:00 to 18:00.`,
          ],
        },
      ],
    },
  },
};

const ar: LegalText = {
  label: { privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام' },
  updated: 'آخر تحديث: 9 أكتوبر 2026',
  close: 'إغلاق',
  footerNav: 'روابط قانونية',
  formConsent: { before: 'بإرسال طلبك، فإنك توافق على ', after: '.' },
  cookies: {
    label: 'الموافقة على ملفات تعريف الارتباط',
    message:
      'بعد موافقتك، نستخدم ملفات تعريف الارتباط من Google Analytics لإحصاء الزيارات ومعرفة الصفحات المفيدة، حتى نتمكن من تحسين الموقع. ولا يُوضع أي منها ما لم توافق.',
    accept: 'موافق',
    decline: 'رفض',
    settings: 'إعدادات ملفات تعريف الارتباط',
  },
  translationNote:
    'هذه ترجمة عربية مقدَّمة للتيسير. في حال وجود أي اختلاف بين النصين العربي والإنجليزي، يُعتمد النص الإنجليزي.',
  docs: {
    privacy: {
      title: 'سياسة الخصوصية',
      intro:
        'توضح هذه السياسة المعلومات التي يتعامل معها هذا الموقع (rnstechservice.com)، وسبب ذلك، والخيارات المتاحة لك. وقد كُتبت لتطابق الطريقة التي يعمل بها الموقع فعليًا.',
      otherLink: 'اقرأ الشروط والأحكام',
      sections: [
        {
          heading: 'من نحن',
          body: [
            'يدير هذا الموقع شركة في جي إن للخدمات الفنية ذ.م.م، ص.ب 37932، منطقة القوز الصناعية 2، دبي، الإمارات العربية المتحدة. ونحن المسؤولون عن المعلومات الشخصية الموضحة في هذه السياسة.',
            'نحرص على التعامل مع المعلومات الشخصية وفقًا لقوانين حماية البيانات في دولة الإمارات العربية المتحدة، ومنها المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية.',
          ],
        },
        {
          heading: 'ما الذي يجمعه الموقع',
          body: [
            'لا يحتوي هذا الموقع على حسابات مستخدمين أو تسجيل دخول أو قاعدة بيانات للعملاء، ولا يستخدم أي أدوات تتبّع إعلاني. ولا يجمع معلومات شخصية إلا في الحالات التالية.',
            {
              list: [
                '**نموذج الاستفسار.** يطلب النموذج اسمك وبريدك الإلكتروني ورقم هاتفك (اختياري) والخدمة التي تهمك ورسالتك. لا يحفظ الموقع هذه البيانات ولا يرسلها بنفسه؛ فعند الضغط على "إرسال الطلب" يُفتح تطبيق البريد الإلكتروني لديك وفيه رسالة إلينا معبّأة مسبقًا، ولا يصلنا شيء ما لم تختر أنت إرسال تلك الرسالة.',
                '**البريد الإلكتروني والمكالمات.** إذا راسلتنا أو اتصلت بنا، نحصل على بريدك الإلكتروني أو رقم هاتفك وما تخبرنا به.',
                '**المعلومات التقنية.** كما هو الحال في أي موقع إلكتروني، عندما يحمّل متصفحك إحدى الصفحات، يتلقى الخادم الذي يستضيف الموقع تفاصيل تقنية معتادة مثل عنوان IP الخاص بك ونوع المتصفح والصفحة المطلوبة ووقت الطلب، وهذا ضروري لعرض الصفحة. وقد تحتفظ شركة الاستضافة بهذه التفاصيل في سجلات الخادم لأغراض الأمان ولضمان عمل الموقع.',
                '**إحصاءات الزيارات (بموافقتك فقط).** إذا وافقت على شريط ملفات تعريف الارتباط، يسجّل Google Analytics كيفية استخدام الموقع، كما هو موضح في قسم "خدمات الشركات الأخرى" أدناه.',
              ],
            },
          ],
        },
        {
          heading: 'كيف نستخدم معلوماتك',
          body: [
            'نستخدم المعلومات التي ترسلها إلينا فقط من أجل:',
            {
              list: [
                'الرد على استفسارك والإجابة عن أسئلتك؛',
                'ترتيب زيارة موقعية وإعداد عرض سعر؛',
                'تنفيذ الأعمال التي تطلبها منا ودعمها، بما في ذلك المتابعة والصيانة؛',
                'الاحتفاظ بالسجلات التجارية والمحاسبية التي يُلزمنا القانون الإماراتي بالاحتفاظ بها.',
              ],
            },
            'لا نبيع معلوماتك، ولا نستخدمها لأغراض إعلانية، ولن نضيفك إلى أي قائمة تسويقية دون موافقتك.',
            'لا نشارك معلوماتك إلا مع من يحتاجون إليها لتحقيق الأغراض المذكورة أعلاه، مثل فريق عملنا، أو عندما يُلزمنا القانون بذلك.',
          ],
        },
        {
          heading: 'ما الذي يُحفظ على جهازك',
          body: [
            'لا يضع هذا الموقع ملفات تعريف ارتباط (كوكيز) إلا إذا وافقت على ذلك في شريط ملفات تعريف الارتباط، وهي ملفات Google Analytics الموضحة في القسم التالي.',
            'يحفظ الموقع ثلاثة إعدادات صغيرة في التخزين المحلي لمتصفحك، حتى يظهر الموقع كما تركته ويتذكّر اختيارك في زيارتك التالية:',
            {
              list: [
                '**vjn-locale**: اللغة التي اخترتها (العربية أو الإنجليزية)؛',
                '**vjn-theme**: اختيارك للمظهر الفاتح أو الداكن؛',
                '**vjn-consent**: ما إذا كنت قد وافقت على ملفات تعريف الارتباط الخاصة بالتحليلات أو رفضتها.',
              ],
            },
            'تبقى هذه الإعدادات على جهازك، ولا تُرسل إلينا، ولا تحتوي على أي معلومات شخصية. وتظل محفوظة إلى أن تمسح بيانات هذا الموقع من إعدادات متصفحك، وهو ما يمكنك فعله في أي وقت.',
            'أثناء تصفحك، يحفظ الموقع أيضًا موضع التمرير في كل صفحة في تخزين الجلسة بمتصفحك، حتى يعيدك زر الرجوع إلى المكان نفسه. وتُمسح هذه البيانات عند إغلاق علامة التبويب.',
            'قد تضع خريطة Google المضمّنة ملفات تعريف ارتباط خاصة بها؛ راجع القسم التالي.',
          ],
        },
        {
          heading: 'خدمات الشركات الأخرى',
          body: [
            'تعتمد بعض أجزاء الموقع على خدمات تديرها شركات أخرى، وتتعامل هذه الشركات مع معلوماتك وفق سياسات الخصوصية الخاصة بها.',
            {
              list: [
                '**خرائط Google.** تعرض الصفحات التي تتضمن قسم التواصل خريطة Google مضمّنة لموقع مكتبنا. وعند تحميلها (حين يظهر ذلك الجزء من الصفحة)، يتصل متصفحك بشركة Google التي تتلقى عنوان IP الخاص بك وتفاصيل متصفحك، وقد تضع ملفات تعريف ارتباط أو تقرأها. كما يفتح رابط عنواننا خرائط Google. راجع [سياسة خصوصية Google](https://policies.google.com/privacy?hl=ar).',
                `**البريد الإلكتروني.** صندوق بريد الاستفسارات لدينا (${company.email}) هو حساب Gmail تقدمه شركة Google، لذا تُحفظ الرسائل التي ترسلها إلينا، بما فيها الاستفسارات المرسلة عبر النموذج، على أنظمة Google. كما يتعامل مزوّد بريدك الإلكتروني مع الرسالة أيضًا.`,
                '**Google Analytics (بموافقتك فقط).** إذا وافقت على شريط ملفات تعريف الارتباط، يضع Google Analytics ملفات تعريف ارتباط (باسم _ga و_ga_ متبوعًا بمعرّف) ويسجّل الصفحات التي تزورها، وكيف وصلت إلى الموقع (مثلًا من محرك بحث)، وموقعك التقريبي (المدينة أو الدولة، المستنتج من عنوان IP الخاص بك)، ونوع جهازك ومتصفحك. نستخدم هذه الإحصاءات فقط لفهم كيفية استخدام الموقع وتحسينه، وميزات الإعلانات معطّلة. وإذا رفضت، لا يُحمَّل Google Analytics إطلاقًا. ويمكنك تغيير اختيارك في أي وقت من خلال "إعدادات ملفات تعريف الارتباط" أسفل كل صفحة، ويؤدي الرفض إلى حذف هذه الملفات. راجع [كيف تستخدم Google المعلومات من المواقع التي تستخدم خدماتها](https://policies.google.com/technologies/partner-sites?hl=ar).',
                '**استضافة الموقع.** تتلقى الشركة التي تستضيف هذا الموقع المعلومات التقنية الموضحة أعلاه لعرض الصفحات.',
              ],
            },
            'قد تعالج Google المعلومات على خوادم خارج دولة الإمارات.',
            'لا يستخدم الموقع Google Fonts أو Facebook أو Instagram أو YouTube أو أدوات WhatsApp أو أي إضافات أخرى لوسائل التواصل الاجتماعي. وتُقدَّم خطوطه وصوره من موقعنا مباشرة.',
          ],
        },
        {
          heading: 'مدة الاحتفاظ بالمعلومات',
          body: [
            'نحتفظ برسائل الاستفسار وتفاصيله فقط طوال المدة التي نحتاجها للرد عليك ومتابعة طلبك.',
            'إذا أصبحت عميلًا لدينا، نحتفظ بالسجلات المتعلقة بالأعمال المنفذة لك طوال المدة التي يفرضها القانون الإماراتي للاحتفاظ بالسجلات التجارية والضريبية والمحاسبية.',
            'نحتفظ بإحصاءات Google Analytics مدة لا تزيد على 14 شهرًا، وتنتهي صلاحية ملفات تعريف الارتباط الخاصة به بعد عامين كحد أقصى، أو فورًا إذا رفضت من خلال "إعدادات ملفات تعريف الارتباط".',
            'وعندما لا نعود بحاجة إلى المعلومات، نحذفها. أما الإعدادات المحفوظة على جهازك فتبقى إلى أن تمسحها (انظر أعلاه).',
          ],
        },
        {
          heading: 'حقوقك',
          body: [
            'يمكنك أن تطلب منا في أي وقت:',
            {
              list: [
                'إبلاغك بالمعلومات الشخصية التي نحتفظ بها عنك وتزويدك بنسخة منها؛',
                'تصحيح المعلومات غير الصحيحة أو غير المكتملة؛',
                'حذف معلوماتك، ما لم يُلزمنا القانون بالاحتفاظ بها؛',
                'إيقاف استخدامنا لها أو تقييده؛',
                'سحب أي موافقة سبق أن منحتها، دون أن يؤثر ذلك على ما قمنا به قبل سحبها.',
              ],
            },
            'لتقديم طلب، تواصل معنا عبر البيانات الواردة في نهاية هذه السياسة. وقد نحتاج إلى التحقق من هويتك أولًا. وسنرد عليك في أقرب وقت ممكن، وضمن أي مهلة يحددها القانون.',
            'إذا لم تكن راضيًا عن ردنا، يمكنك تقديم شكوى إلى مكتب الإمارات للبيانات أو أي جهة مختصة أخرى.',
          ],
        },
        {
          heading: 'الأمان',
          body: [
            'نتخذ خطوات معقولة لحماية المعلومات التي ترسلها إلينا، ومنها قصر الوصول إلى صندوق بريد الاستفسارات على الأشخاص الذين يحتاجون إليه.',
            'لا يوجد موقع إلكتروني أو بريد إلكتروني أو اتصال بالإنترنت آمن تمامًا. لذا نرجو عدم إرسال معلومات حساسة، مثل رقم الهوية الإماراتية أو جواز السفر، أو بيانات الحساب المصرفي أو البطاقة، أو كلمات المرور، أو المعلومات الصحية، عبر النموذج أو البريد الإلكتروني.',
          ],
        },
        {
          heading: 'الأطفال',
          body: [
            'هذا الموقع موجّه للبالغين من ملاك العقارات والمستأجرين والشركات ومديري المرافق، وليس موجّهًا للأطفال، ولا نجمع معلومات منهم عن علم. إذا كنت تعتقد أن طفلًا أرسل إلينا معلومات شخصية، يُرجى التواصل معنا وسنحذفها.',
          ],
        },
        {
          heading: 'التغييرات على هذه السياسة',
          body: [
            'قد نحدّث هذه السياسة عند تغيّر الموقع أو القانون، ويوضح تاريخ "آخر تحديث" في أعلى الصفحة موعد آخر تعديل. وإذا بدأنا جمع المعلومات بطريقة جديدة، مثل نموذج يرسل الاستفسارات إلينا مباشرة، فسنحدّث هذه السياسة قبل ذلك.',
          ],
        },
        {
          heading: 'التواصل والشكاوى',
          body: [
            'لأي سؤال أو طلب أو شكوى تتعلق بمعلوماتك الشخصية، تواصل مع:',
            {
              list: [
                'في جي إن للخدمات الفنية ذ.م.م، ص.ب 37932، منطقة القوز الصناعية 2، دبي، الإمارات العربية المتحدة',
                `البريد الإلكتروني: ${email} (يُرجى كتابة "Privacy" في عنوان الرسالة)`,
                `الهاتف: ${phone}، من الاثنين إلى السبت، 08:00 – 18:00`,
              ],
            },
            'سننظر في كل شكوى ونبلغك بنتيجتها.',
          ],
        },
      ],
    },

    terms: {
      title: 'الشروط والأحكام',
      intro:
        'تسري هذه الشروط على استخدامك لهذا الموقع (rnstechservice.com) الذي تديره شركة في جي إن للخدمات الفنية ذ.م.م ("في جي إن" أو "نحن"). باستخدامك للموقع فإنك توافق عليها، وإن لم توافق عليها يُرجى عدم استخدام الموقع. أما طريقة تعاملنا مع المعلومات الشخصية فموضحة بشكل منفصل في سياسة الخصوصية.',
      otherLink: 'اقرأ سياسة الخصوصية',
      sections: [
        {
          heading: 'المعلومات الواردة في الموقع',
          body: [
            'كل ما في هذا الموقع، بما في ذلك أوصاف الخدمات وصفحات القطاعات والصور، هو معلومات عامة عن أنواع الأعمال التي نقوم بها، وليس عرض سعر أو تقييمًا فنيًا أو استشارة مهنية خاصة بعقارك. والصور لأغراض التوضيح.',
            'نحرص على أن تكون المعلومات دقيقة ومحدّثة، لكن قد نغيّرها في أي وقت دون إشعار، ولا نضمن أنها كاملة أو خالية من الأخطاء. يُرجى التأكد منا قبل الاعتماد على أي منها في مشروعك.',
          ],
        },
        {
          heading: 'الاستفسار ليس حجزًا',
          body: [
            'إرسال استفسار أو طلب زيارة موقعية أو التحدث معنا لا يُنشئ حجزًا أو عقدًا، ولا يُلزمك أو يُلزمنا بالمضي قدمًا.',
            'لا يُعتمد العمل إلا بعد أن نتفق عليه معك كتابيًا، كأن توافق كتابيًا على عرض السعر المقدم منا. ويُعد عرض السعر أو الاتفاق المكتوب ("شروط الحجز الخاصة بك") هو ما يُلزم الطرفين.',
          ],
        },
        {
          heading: 'الأسعار والدفع والإلغاء',
          body: [
            'لا يعرض هذا الموقع أسعارًا. وتُقدَّم إليك كتابيًا في شروط الحجز الخاصة بك تفاصيل السعر ونطاق العمل وشروط الدفع والمواعيد وأي ضمان، وأي قواعد تتعلق بالتعديل أو الإلغاء.',
            'إذا اختلف أي شيء في شروط الحجز الخاصة بك عن شروط هذا الموقع، تُطبَّق شروط الحجز.',
          ],
        },
        {
          heading: 'استخدام هذا الموقع',
          body: [
            'يمكنك استخدام هذا الموقع لأغراض مشروعة. ويُرجى عدم القيام بما يلي:',
            {
              list: [
                'إرسال استفسارات كاذبة أو مضللة أو مزعجة، أو باسم شخص آخر؛',
                'محاولة اختراق الموقع أو إثقاله أو تعطيله، أو إدخال فيروسات أو أي برمجيات ضارة؛',
                'نسخ محتوى الموقع بكميات كبيرة، بما في ذلك باستخدام أدوات آلية.',
              ],
            },
          ],
        },
        {
          heading: 'الزيارات الموقعية والأعمال في عقارك',
          body: [
            'عند زيارتنا لعقارك أو العمل فيه، يُرجى:',
            {
              list: [
                'تزويدنا بمعلومات دقيقة عن العقار والأعمال المطلوبة؛',
                'توفير وصول آمن في المواعيد المتفق عليها، بما في ذلك أي تصاريح من إدارة المبنى أو المجتمع السكني أو المالك تنص شروط الحجز على أنك ستحصل عليها؛',
                'إبلاغنا بأي مخاطر معروفة، مثل الأسلاك التالفة أو التسربات أو الهياكل غير المستقرة؛',
                'إبعاد الأطفال والحيوانات الأليفة والأشخاص الآخرين عن مناطق العمل.',
              ],
            },
            'يجوز لفريقنا إيقاف العمل مؤقتًا إذا كانت الظروف في الموقع غير آمنة، إلى أن تُعالَج المشكلة. وتُحدَّد تفاصيل كل عمل، بما في ذلك ساعات العمل والجهة المسؤولة عن كل موافقة، في شروط الحجز الخاصة بك.',
          ],
        },
        {
          heading: 'حقوق النشر والعلامة التجارية',
          body: [
            'النصوص والصور والرسومات واسم في جي إن وشعارها وتصميم هذا الموقع مملوكة لشركة في جي إن للخدمات الفنية ذ.م.م أو مستخدمة بإذن، وهي محمية بموجب قوانين حقوق المؤلف والعلامات التجارية.',
            'يسعدنا أن تتصفح الموقع وتشارك روابط صفحاته. ولا يجوز لك تنزيل صورنا أو نصوصنا أو شعارنا أو نسخها أو تعديلها أو إعادة نشرها أو استخدامها بأي شكل آخر، كأن تستخدمها في موقع آخر أو في إعلان أو على وسائل التواصل الاجتماعي، دون إذن كتابي منا.',
          ],
        },
        {
          heading: 'روابط الخدمات الأخرى',
          body: [
            'يتضمن الموقع روابط لخدمات تديرها شركات أخرى، مثل خرائط Google، كما تفتح روابط التواصل تطبيق البريد الإلكتروني أو الهاتف لديك. نحن لا نتحكم في هذه الخدمات ولسنا مسؤولين عن محتواها أو توفرها أو شروطها، ويخضع استخدامك لها لشروطها وسياساتها الخاصة.',
          ],
        },
        {
          heading: 'حدود المسؤولية',
          body: [
            'نقدّم هذا الموقع كما هو وحسب توفره، ولا نضمن أن يكون متاحًا دائمًا أو خاليًا من الأخطاء أو الفيروسات.',
            'في الحدود التي يسمح بها القانون، لا نتحمل المسؤولية عن أي خسارة أو ضرر ينشأ عن استخدامك لهذا الموقع أو عن اعتمادك على معلوماته العامة، بما في ذلك الخسائر غير المباشرة أو خسارة الأرباح أو البيانات.',
            'تُحدَّد مسؤوليتنا عن الأعمال التي ننفذها لك في شروط الحجز الخاصة بك وبموجب القانون، وليس في هذا الموقع.',
            'لا يحدّ أي شيء في هذه الشروط من أي حقوق مكفولة لك بموجب قانون حماية المستهلك في دولة الإمارات أو يلغيها، ولا من أي مسؤولية لا يجوز قانونًا تقييدها أو استبعادها.',
          ],
        },
        {
          heading: 'القانون الواجب التطبيق والمحاكم',
          body: [
            'تخضع هذه الشروط لقوانين إمارة دبي والقوانين الاتحادية لدولة الإمارات العربية المتحدة. وتختص محاكم دبي بالنظر في أي نزاع يتعلق بها، دون الإخلال بحقك في تقديم شكوى إلى جهات حماية المستهلك.',
            'قبل اللجوء إلى المحكمة، يُرجى التواصل معنا لنحاول حل المسألة.',
          ],
        },
        {
          heading: 'التغييرات على هذه الشروط',
          body: [
            'قد نحدّث هذه الشروط من وقت لآخر. والنسخة المنشورة في هذه الصفحة، مع تاريخ "آخر تحديث"، هي التي تسري عند استخدامك للموقع. ولا تؤثر التغييرات على شروط الحجز التي سبق الاتفاق عليها معك.',
          ],
        },
        {
          heading: 'التواصل',
          body: [
            `للاستفسار عن هذه الشروط: راسلنا على ${email} أو اتصل بنا على ${phone}، من الاثنين إلى السبت، 08:00 – 18:00.`,
          ],
        },
      ],
    },
  },
};

export const legal: Record<Locale, LegalText> = { en, ar };
