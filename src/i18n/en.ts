/**
 * English copy. `ar.ts` must provide the same shape (enforced by the
 * `Dictionary` type). In headline strings, *asterisks* mark highlighted words.
 */
export const en = {
  meta: {
    siteName: 'VJN Technical Services',
    defaultTitle: 'VJN Technical Services | MEP, Maintenance & Fit-out Works in Dubai',
    homeDescription:
      'VJN Technical Services LLC is licensed for ten technical and finishing activities in Dubai: air-conditioning, electromechanical, plumbing, electrical, tiling, carpentry, false ceilings, wallpaper, plaster, engraving and ornamentation works.',
    /** Search-result title for a service page; `{service}` is the service title. */
    serviceTitle: '{service} in Dubai',
    /** Search-result description for a service page; `{summary}` is the service summary. */
    serviceDescription: '{summary} Call +971 4 380 6877 to book a site visit anywhere in Dubai.',
  },

  nav: {
    home: 'Home',
    services: 'Services',
    sectors: 'Sectors',
    about: 'About',
    contact: 'Contact',
    careers: 'Careers',
    getQuote: 'Get a quote',
    primary: 'Primary',
    mobile: 'Mobile',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
    language: 'ع',
    languageLabel: 'التبديل إلى العربية',
    skip: 'Skip to content',
    breadcrumb: 'Breadcrumb',
    strip: '10 licensed activities · Dubai, U.A.E.',
  },

  company: {
    name: 'VJN Technical Services LLC',
    logoTagline: 'Technical Services L.L.C',
    hours: 'Mon – Sat, 08:00 – 18:00',
    poBox: 'P.O. Box 37932',
    addressLine: 'Al Quoz Industrial Area 2',
    city: 'Dubai, U.A.E.',
    sep: ', ',
    blurb:
      'Licensed MEP, maintenance and interior finishing works for homes, businesses and facilities across Dubai.',
    rights: 'All rights reserved.',
    homeLabel: 'VJN Technical Services, home',
  },

  hero: {
    eyebrow: 'VJN Technical Services L.L.C · Dubai',
    titleLines: ['Technical services', '& fine finishing,', 'across *Dubai.*'],
    lead: 'VJN Technical Services LLC installs and maintains air-conditioning, electromechanical plant, plumbing and electrical systems, and carries out plaster, tiling, carpentry, ceiling and decorative finishing works for homes, offices and facilities.',
    primary: 'Request a quote',
    secondary: 'View our services',
    facts: ['10 licensed activities', 'Homes, offices and industrial facilities', 'Al Quoz Industrial Area, Dubai'],
    licenceTitle: 'Dubai trade licence',
    licenceStatus: '10 licensed activities',
    photoAlt: 'VJN technicians hanging wallpaper in a bright room',
  },

  activities: {
    eyebrow: 'Licensed activities',
    title: 'Our licensed activities',
    lead: 'Every service we offer is a registered activity on our Dubai trade licence, so the work you hire us for is work we are licensed to carry out.',
    number: 'No.',
    activity: 'Activity',
    category: 'Discipline',
    status: 'Status',
    active: 'Active',
    view: 'View service',
  },

  about: {
    eyebrow: 'About VJN',
    title: 'One technical partner for everything *behind the walls* and on them.',
    lead: 'VJN Technical Services covers the systems that keep a building running and the finishes that make it worth being in: air-conditioning, electromechanical equipment, plumbing, electrical, carpentry, tiling, ceilings and decorative work.',
    body: 'Instead of coordinating separate contractors, you deal with one team that plans, installs and maintains the lot. Our commitment is simple: quality execution, safe working and on-time delivery.',
    cardTitle: 'Survey to handover',
    cardBody: 'One point of contact from the first site visit to long-term maintenance.',
    imageAlt: 'Technician servicing electromechanical equipment',
    more: 'More about us',
    commitments: [
      {
        title: 'Quality execution',
        body: 'Skilled trades, proven materials and supervised workmanship on every installation and repair.',
      },
      {
        title: 'Safety compliance',
        body: 'Work carried out in line with site safety requirements and local regulations, from survey to handover.',
      },
      {
        title: 'Timely delivery',
        body: 'Clear schedules agreed up front, so projects finish when they are meant to.',
      },
    ],
  },

  services: {
    eyebrow: 'Our services',
    title: 'What we do',
    lead: 'From the plant room to the final coat, we cover the technical systems and finishing works that make a building perform.',
    viewAll: 'View all services',
    view: 'View service',
    filterLabel: 'Filter services',
    filters: { All: 'All services', MEP: 'MEP systems', Finishing: 'Interior finishing' },
    categories: { MEP: 'MEP', Finishing: 'Finishing' },
    service: 'Service',
    licence: 'Licensed activity',
    included: 'What’s included',
    sectors: 'Sectors',
    requestQuote: 'Request a quote',
    allServices: 'All services',
    related: 'Related services',
    by: 'by VJN Technical Services',
  },

  disciplines: {
    eyebrow: 'Two disciplines, one team',
    title: 'Systems behind the walls, *finishes* on them.',
    lead: 'MEP works keep a building running; finishing works make it worth being in. We handle both, so nothing falls between two contractors.',
    mep: {
      title: 'MEP systems',
      body: 'Air-conditioning, electromechanical plant, plumbing and electrical: installed, serviced and repaired.',
    },
    finishing: {
      title: 'Interior finishing',
      body: 'Plaster, tiling, carpentry, ceilings, wallpaper and hand-finished ornamentation.',
    },
  },

  serviceItems: {
    hvac: {
      licence:
        'Air-Conditioning, Ventilations & Air Filtration Systems Installation & Maintenance',
      title: 'Air-conditioning, ventilation & air filtration',
      short: 'Air-conditioning',
      summary:
        'Installation and dependable upkeep of air-conditioning, ventilation and air filtration systems, keeping spaces cool and the air clean through the hottest months.',
      scope: [
        'Split, ducted and package unit installation',
        'Ventilation, ductwork, grilles and diffusers',
        'Air filtration and filter replacement',
        'Preventive maintenance and coil cleaning',
        'Fault diagnosis and repair',
      ],
    },
    electromechanical: {
      licence: 'Electromechanical Equipment Installation and Maintenance',
      title: 'Electromechanical equipment installation & maintenance',
      short: 'Electromechanical',
      summary:
        'Installation and maintenance of the pumps, motors, panels and mechanical plant that buildings depend on every day.',
      scope: [
        'Equipment installation and commissioning',
        'Pumps, motors and fans',
        'Scheduled maintenance programmes',
        'Breakdown response and repairs',
        'Performance checks and reporting',
      ],
    },
    plumbing: {
      licence: 'Plumbing & Sanitary Installation',
      title: 'Plumbing & sanitary installation',
      short: 'Plumbing',
      summary:
        'Clean, leak-free water supply and drainage, from new sanitary installations to pipe repairs in occupied buildings.',
      scope: [
        'Sanitary ware installation',
        'Water supply and drainage pipework',
        'Leak detection and pipe repairs',
        'Water heater installation',
        'Pump and tank servicing',
      ],
    },
    tiling: {
      licence: 'Floor & Wall Tiling Works',
      title: 'Floor & wall tiling works',
      short: 'Tiling',
      summary:
        'Precise tiling for kitchens, bathrooms, lobbies and high-traffic floors, with clean lines and durable finishes.',
      scope: [
        'Ceramic, porcelain and natural stone',
        'Floor levelling and preparation',
        'Wet-area waterproofing',
        'Heavy-duty industrial flooring',
        'Re-grouting and repairs',
      ],
    },
    carpentry: {
      licence: 'Carpentry & Wood Flooring Works',
      title: 'Carpentry & wood flooring works',
      short: 'Carpentry',
      summary:
        'Custom joinery and warm timber floors that bring character and quality to homes and workplaces.',
      scope: [
        'Wooden and laminate flooring',
        'Custom cabinetry and wardrobes',
        'Doors, frames and skirting',
        'Wall panelling',
        'Repair and refinishing',
      ],
    },
    ornamentation: {
      licence: 'Engraving & Ornamentation Works',
      title: 'Engraving & ornamentation works',
      short: 'Ornamentation',
      summary:
        'Decorative mouldings and engraved details that give interiors an artisan, premium finish.',
      scope: [
        'Decorative cornices and mouldings',
        'Engraved panels and feature walls',
        'Gypsum and plaster ornamentation',
        'Restoration of existing details',
      ],
    },
    wallpaper: {
      licence: 'Wallpaper Fixing Works',
      title: 'Wallpaper fixing works',
      short: 'Wallpaper',
      summary:
        'Seamless wallpaper hanging over properly prepared walls, from statement features to full rooms.',
      scope: [
        'Wall preparation and priming',
        'Residential and commercial-grade papers',
        'Feature walls and murals',
        'Removal and replacement',
      ],
    },
    'false-ceiling': {
      licence: 'False Ceiling & Light Partitions Installation',
      title: 'False ceiling & light partitions installation',
      short: 'Ceilings & partitions',
      summary:
        'Gypsum ceilings and light partitions that define spaces, conceal services and frame lighting.',
      scope: [
        'Gypsum board and tile ceilings',
        'Cove and indirect lighting details',
        'Light partition walls',
        'Access panels for services',
      ],
    },
    electrical: {
      licence: 'Electrical Fittings & Fixtures Repairing & Maintenance',
      title: 'Electrical fittings & fixtures repair & maintenance',
      short: 'Electrical',
      summary:
        'Safe, tidy repair and maintenance of electrical fittings and fixtures, from lighting and sockets to distribution boards.',
      scope: [
        'Lighting and fixture installation',
        'Sockets, switches and fittings',
        'Distribution board maintenance',
        'Fault finding and repair',
        'Planned electrical maintenance',
      ],
    },
    plastering: {
      licence: 'Plaster Works',
      title: 'Plaster works',
      short: 'Plaster',
      summary: 'Smooth, sound wall and ceiling surfaces: the foundation of every quality finish.',
      scope: [
        'Internal and external plastering',
        'Crack and surface repairs',
        'Skim coats and surface preparation',
        'Industrial-grade render',
      ],
    },
  },

  sectors: {
    eyebrow: 'Sectors we serve',
    title: 'Who we work for',
    lead: 'A villa, a showroom and a warehouse need very different things. We tailor our trades, materials and schedules to each.',
    tabsLabel: 'Sectors',
    servicesFor: 'Services for',
    projectBy: 'project by VJN',
    explore: 'Explore sector',
  },

  sectorItems: {
    residential: {
      title: 'Residential & luxury living',
      kicker: 'Villas · Apartments · Penthouses',
      intro:
        'We combine technical expertise with premium finishing to bring comfort and elegance to your home. From villas to modern apartments, we make sure every room is climate-controlled, functional and beautifully finished.',
      offer: [
        {
          label: 'Climate & comfort',
          detail: 'Air-conditioning, ventilation and air filtration for every room.',
        },
        {
          label: 'Premium interiors',
          detail: 'Custom carpentry, wood flooring and decorative wallpaper.',
        },
        {
          label: 'Artistic finishing',
          detail: 'Engraving, ornamentation and high-end tiling.',
        },
        {
          label: 'Essential utilities',
          detail: 'Plumbing, sanitary installation and electrical fixtures.',
        },
        {
          label: 'Structural refinement',
          detail: 'Plaster and false ceiling designs that elevate every room.',
        },
      ],
    },
    commercial: {
      title: 'Commercial & retail spaces',
      kicker: 'Offices · Showrooms · Retail',
      intro:
        'We deliver dependable technical systems and sharp fit-outs for professional settings. From offices to retail outlets, your space stays efficient, safe and ready to welcome clients and staff.',
      offer: [
        {
          label: 'Integrated systems',
          detail: 'Air-conditioning and electromechanical equipment installation.',
        },
        {
          label: 'Smart partitions',
          detail: 'False ceilings and light partition systems.',
        },
        {
          label: 'Durable surfaces',
          detail: 'High-traffic tiling and wood flooring.',
        },
        {
          label: 'Utility reliability',
          detail: 'Electrical fittings maintenance and plumbing works.',
        },
        {
          label: 'Professional finishes',
          detail: 'Quality plaster works and modern wallpaper fixing.',
        },
      ],
    },
    industrial: {
      title: 'Industrial & facility maintenance',
      kicker: 'Warehouses · Plants · Facilities',
      intro:
        'We provide heavy-duty technical support and disciplined maintenance to keep facilities running. From warehouses to plants, your infrastructure stays safe, compliant and operational with minimal downtime.',
      offer: [
        {
          label: 'Core systems',
          detail: 'Electromechanical equipment and large-scale air-conditioning maintenance.',
        },
        {
          label: 'Infrastructure repair',
          detail: 'Plumbing pipe repairs and sanitary installations.',
        },
        {
          label: 'Technical upkeep',
          detail: 'Electrical fixture maintenance and industrial-grade plaster.',
        },
        {
          label: 'Surface durability',
          detail: 'Heavy-duty floor and wall tiling for high-impact areas.',
        },
        {
          label: 'Structural integrity',
          detail: 'Light partition installation and routine inspections.',
        },
      ],
    },
  },

  process: {
    eyebrow: 'How we work',
    title: 'How a project runs, from survey to handover',
    lead: 'Every job, large or small, follows the same disciplined steps, so you always know what happens next.',
    steps: [
      {
        title: 'Site survey',
        body: 'We visit, assess the space and systems, and listen to what you need.',
      },
      {
        title: 'Proposal',
        body: 'A clear scope, timeline and itemised quotation, with no surprises later.',
      },
      {
        title: 'Execution',
        body: 'Our coordinated trade teams deliver the work safely and to specification.',
      },
      {
        title: 'Handover & care',
        body: 'We walk you through the result and stay on call for ongoing maintenance.',
      },
    ],
  },

  cta: {
    eyebrow: 'Start a project',
    title: 'Have a project or a *maintenance* need?',
    body: 'Tell us what you need. We’ll arrange a site visit and send a clear, itemised quotation.',
    primary: 'Get a free quote',
    call: 'Call',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your project.',
    lead: 'Share a few details and our team will get back to you shortly.',
    formTitle: 'Project enquiry',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone (optional)',
    service: 'Service',
    general: 'General enquiry',
    message: 'How can we help?',
    messagePlaceholder: 'Tell us about the property, the work needed and your timeline.',
    send: 'Send enquiry',
    sending: 'Sending…',
    successTitle: 'Thank you, your message is on its way.',
    successBody: 'We’ll be in touch shortly. For anything urgent, call',
    sendAnother: 'Send another message',
    emailOpened: 'Your email app should now be open with your message ready to send.',
    error: 'We couldn’t send your message. Please call or email us directly.',
    callUs: 'Call us',
    emailLabel: 'Email',
    visit: 'Visit',
    hours: 'Working hours',
    mapTitle: 'VJN Technical Services location on Google Maps',
  },

  footer: {
    company: 'Company',
    services: 'Services',
    tagline: 'Built right. Kept running.',
    top: 'Back to top',
  },

  careers: {
    eyebrow: 'Join the team',
    title: 'Build your career with *VJN*.',
    lead: 'We work across ten licensed trades in homes, offices and facilities in Dubai. If you are good at your trade and take pride in finishing a job properly, we would like to hear from you.',
    tradesTitle: 'Trades we work in',
    tradesLead: 'We welcome applications from experienced people in any of our licensed activities.',
    stepsTitle: 'How to apply',
    steps: [
      {
        title: 'Fill in the form',
        body: 'Tell us your trade, your experience and how to reach you.',
      },
      {
        title: 'Attach your CV',
        body: 'Your email app opens with the application ready. Attach your CV and any certificates before sending.',
      },
      {
        title: 'We get in touch',
        body: 'If your experience matches a current need, our team will contact you to arrange a meeting.',
      },
    ],
    formTitle: 'Apply now',
    formLead: 'All fields except the message are required.',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    trade: 'Trade or role',
    general: 'Other / general application',
    experience: 'Years of experience',
    experienceOptions: ['Less than 2 years', '2 – 5 years', '5 – 10 years', 'More than 10 years'],
    message: 'About you (optional)',
    messagePlaceholder: 'Your experience, the projects you have worked on, and when you can start.',
    send: 'Send application',
    sending: 'Sending…',
    cvNote: 'Please attach your CV to the email that opens.',
    emailOpened: 'Your email app should now be open. Remember to attach your CV before you send it.',
    successTitle: 'Thank you, your application has been sent.',
    successBody: 'We will contact you if your experience matches a current need.',
    sendAnother: 'Send another application',
    error: 'We couldn’t send your application. Please email us directly.',
  },

  pages: {
    services: {
      title: 'Services',
      metaTitle: 'MEP, Maintenance & Fit-out Services in Dubai',
      description:
        'Air-conditioning, electromechanical, plumbing, electrical, tiling, carpentry, engraving and ornamentation, wallpaper, false ceiling and plaster works in Dubai.',
      heroTitle: 'Ten licensed trades, under one roof.',
      heroLead:
        'Technical systems and finishing works for installation, upgrades and ongoing maintenance, coordinated by one team.',
    },
    sectors: {
      title: 'Sectors',
      metaTitle: 'Residential, Commercial & Industrial Services in Dubai',
      description:
        'Technical services for villas and apartments, commercial and retail spaces, and industrial facilities in Dubai.',
      heroTitle: 'Homes, businesses and facilities.',
      heroLead:
        'The same trades, applied differently. We tailor scope, materials and scheduling to how each space is used.',
    },
    about: {
      title: 'About us',
      metaTitle: 'About Us: Technical Services Company in Dubai',
      description:
        'VJN Technical Services LLC is a Dubai technical services company delivering reliable installation, maintenance and finishing works.',
      heroTitle: 'Reliable building & maintenance, done properly.',
      heroLead:
        'From our base in Dubai we support homeowners, businesses and facility managers across the emirate.',
    },
    contact: {
      title: 'Contact',
      metaTitle: 'Contact Us & Request a Quote in Dubai',
      description:
        'Contact VJN Technical Services in Dubai. Call +971 4 380 6877 to request a site visit and quotation.',
      heroTitle: 'Let’s get to work.',
      heroLead:
        'Tell us about your property and the work you need. We’ll arrange a visit and send a clear quotation.',
    },
    careers: {
      title: 'Careers',
      metaTitle: 'Careers: Technical & Finishing Jobs in Dubai',
      description:
        'Work with VJN Technical Services in Dubai. We welcome applications from skilled technicians and finishing tradespeople.',
      heroTitle: 'Work with us.',
      heroLead:
        'We are always glad to hear from skilled technicians and tradespeople who take pride in their work.',
    },
    notFound: {
      title: 'Page not found',
      metaTitle: 'Page not found',
      description: 'The page you were looking for could not be found.',
      eyebrow: 'Error 404',
      heroTitle: 'This page doesn’t exist.',
      heroLead: 'The link may be broken or the page may have moved.',
      crumb: 'Not found',
      home: 'Back to home',
      browse: 'Browse services',
    },
  },
};

export type Dictionary = typeof en;
