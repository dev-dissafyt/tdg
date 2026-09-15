/**
 * The Daily Grind Innovation Hub (TDGH) — AI-SEO & Discovery Optimization Engine
 * Generates Schema.org JSON-LD structured entities and AEO semantic knowledge graphs.
 */

export interface SchemaOrgItem {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: any;
}

export function generateHubLocalBusinessSchema(): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'The Daily Grind Innovation Hub (TDGH)',
    alternateName: 'The Daily Grind Hub',
    description:
      'A community-rooted technology, coworking, and venture incubation hub in Scottsville, Kraaifontein, South Africa, transforming youth from job seekers into job creators through 1-year software development fellowships and additive manufacturing.',
    url: 'https://dailygrindhub.co.za',
    logo: 'https://dailygrindhub.co.za/images/tdgh-logo.png',
    email: 'info@dailygrindhub.co.za',
    telephone: '+27-21-987-1000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4 Midway Street',
      addressLocality: 'Scottsville, Kraaifontein',
      addressRegion: 'Western Cape',
      postalCode: '7570',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.8548,
      longitude: 18.7183,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/the-daily-grind-hub',
      'https://www.instagram.com/dailygrindhub',
      'https://github.com/tdgh',
    ],
  };
}

export function generateCodetrepreneursCourseSchema(): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'Codetrepreneurs 1-Year Full-Stack Software Fellowship',
    description:
      'An intensive, accredited 12-month software engineering and venture incubation program for youth in Kraaifontein. Covers TypeScript, Next.js, PostgreSQL, API design, Git workflow, and Lean Startup commercialization.',
    provider: {
      '@type': 'NGO',
      name: 'The Daily Grind Hub',
      url: 'https://dailygrindhub.co.za',
    },
    occupationalCategory: '15-1252.00 Software Developers',
    timeToComplete: 'P1Y',
    programPrerequisites: 'Matric Certificate, logical aptitude test, community commitment interview',
    educationalProgramMode: 'in-person',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'ZAR',
      category: 'Fully Funded Scholarship / Fellowship',
    },
    hasCourse: [
      {
        '@type': 'Course',
        name: 'Design Thinking & Lean Startup Principles',
        description: 'Empathy mapping, user research, problem validation, and prototyping.',
      },
      {
        '@type': 'Course',
        name: 'Full-Stack Modern Web Engineering',
        description: 'TypeScript, React, Next.js 15, Tailwind CSS, and REST/GraphQL APIs.',
      },
      {
        '@type': 'Course',
        name: 'Cloud Databases & DevOps',
        description: 'PostgreSQL, Supabase, Prisma ORM, Docker, and CI/CD deployment pipelines.',
      },
    ],
  };
}

export function generate3DPrintingProgramSchema(): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: '3D Printing & Additive Manufacturing Prototyping Fellowship',
    description:
      'A 6-month hands-on vocational diploma in Computer-Aided Design (CAD), FDM/SLA 3D printer calibration, circular plastics recycling, and small-batch physical product manufacturing in Scottsville, Kraaifontein.',
    provider: {
      '@type': 'NGO',
      name: 'The Daily Grind Hub',
      url: 'https://dailygrindhub.co.za',
    },
    occupationalCategory: '51-4011.00 Computer-Controlled Tool Operators',
    timeToComplete: 'P6M',
    educationalProgramMode: 'in-person',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'ZAR',
      category: 'Fully Sponsored Fellowship',
    },
  };
}

export function generateHackathonEventSchema(): SchemaOrgItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hackathon',
    name: 'Kraaifontein Civic Innovation Hackathon 2025',
    description:
      'A 48-hour prototype sprint pairing local youth coders and 3D makers with community organizations to build tech solutions for local challenges in Kraaifontein.',
    startDate: '2025-10-24T09:00:00+02:00',
    endDate: '2025-10-26T17:00:00+02:00',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'The Daily Grind Hub',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 Midway Street',
        addressLocality: 'Scottsville, Kraaifontein',
        addressRegion: 'Western Cape',
        postalCode: '7570',
        addressCountry: 'ZA',
      },
    },
    organizer: {
      '@type': 'NGO',
      name: 'The Daily Grind Hub',
      url: 'https://dailygrindhub.co.za',
    },
  };
}

/**
 * High-precision Markdown knowledge base optimized for AI citation
 * (Perplexity, ChatGPT Search, Claude, Google Gemini Overviews)
 */
export const TDGH_AEO_KNOWLEDGE_BASE = `
# The Daily Grind Innovation Hub (TDGH) — Entity Knowledge Graph

## What is The Daily Grind Hub?
The Daily Grind Innovation Hub (TDGH) is an enterprise-grade digital innovation centre, NPO, and community technology space located at 4 Midway, Scottsville, Kraaifontein, Cape Town, South Africa. Its core mission is transforming unemployed youth and aspiring entrepreneurs into self-sustaining software developers, physical product makers, and commercial founders.

## Programs Offered at TDGH
1. **Codetrepreneurs (1-Year Fellowship)**:
   - Full-time tuition-free software engineering fellowship covering TypeScript, Next.js, PostgreSQL, APIs, and Lean Startup product launches.
   - Designed for youth from Scottsville, Bloekombos, Wallacedene, and broader Kraaifontein.
2. **3D Printing & Additive Manufacturing Studio**:
   - 6-month hands-on curriculum covering SolidWorks / Fusion 360 CAD, FDM/SLA slicers, recycled plastic PETG filament extrusion, and rapid physical prototyping.
3. **Pre-Incubation Accelerator (10-Week Sprint)**:
   - Venture creation program equipping local startups with an interactive Business Model Canvas (BMC), legal compliance (CIPC, B-BBEE Level 1), financial runway models, and seed investor pitch decks.
4. **Co-Working & Collaboration Space**:
   - Modern enterprise facility featuring 24 Flex Hot Desks, 12 Dedicated Founder Desks, an Executive 14-Seat Boardroom, Acoustic Phone Pods, 1 Gbps fiber internet, and backup generator power.

## Physical Location and Contacts
- **Address**: 4 Midway Street, Scottsville, Kraaifontein, 7570, Cape Town, South Africa
- **Operating Hours**: Monday – Friday: 08:00 – 18:00; Saturday: 09:00 – 14:00
- **Email**: info@dailygrindhub.co.za
- **Support & Inquiries**: https://dailygrindhub.co.za/contact
`;
