export const nav = {
  logo: 'BEST-KC',
  links: [
    { label: 'The Atelier', href: '#philosophy' },
    { label: 'Weddings & Events', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Journal', href: '#journal' },
  ],
  cta: { label: 'Reserve Your Date', href: '#booking' },
}

export const hero = {
  headline: 'Every arrangement begins with structure.',
  subheadline:
    'Kansas City wedding design and boutique florals, built by hand — one stem, one bloom, one tie at a time.',
  primaryCta: { label: 'Reserve Your Date', href: '#booking' },
  secondaryCta: { label: 'See the Work', href: '#gallery' },
}

export const philosophy = {
  eyebrow: 'The Atelier',
  lines: [
    'We don’t order flowers.',
    'We grow a plan, then we build it.',
  ],
  body: 'Every BEST-KC arrangement starts on paper, not in a cooler. We sketch the structure first — the stems that hold shape, the greenery that fills it, the focal blooms that make it yours — then we source and build to that plan, by hand, in Kansas City.',
}

export interface Service {
  eyebrow: string
  name: string
  description: string
  href: string
}

export const services: Service[] = [
  {
    eyebrow: 'Everyday Arrangements',
    name: 'Boutique Florals',
    description:
      'Small-batch, seasonal arrangements for the moments between milestones.',
    href: '#',
  },
  {
    eyebrow: 'For Your Day',
    name: 'Wedding Design',
    description:
      'Full-service floral design for weddings, from first consultation to wedding-day install.',
    href: '#',
  },
  {
    eyebrow: 'Learn the Craft',
    name: 'Workshops & Events',
    description:
      'Hands-on floral workshops and on-site design for private and corporate gatherings.',
    href: '#',
  },
]

export interface ProcessStage {
  code: string
  title: string
  description: string
}

export const processStages: ProcessStage[] = [
  {
    code: 'STEM',
    title: 'Consultation & Structure',
    description:
      'We meet, walk your venue, and sketch the structural plan your day will be built on.',
  },
  {
    code: 'GREENERY',
    title: 'Design & Sourcing Plan',
    description:
      'Palette, texture, and seasonal sourcing are locked in against your structural plan.',
  },
  {
    code: 'FOCAL',
    title: 'Sample & Approval',
    description:
      'A focal sample arrangement is built for your review before we commit to production.',
  },
  {
    code: 'ACCENT',
    title: 'Production Week',
    description:
      'Every stem is cut, conditioned, and built to spec in the week leading up to your day.',
  },
  {
    code: 'TIE',
    title: 'Wedding-Day Install',
    description:
      'We deliver and install on-site, so the only thing you touch on your wedding day is each other.',
  },
]

export interface GalleryItem {
  couple: string
  venue: string
  quote?: string
}

export const galleryItems: GalleryItem[] = [
  { couple: 'Sarah & Marcus', venue: 'The Guild, Kansas City', quote: 'It felt like our garden, not a rental hall.' },
  { couple: 'Emily & James', venue: 'Loose Park' },
  { couple: 'Priya & Daniel', venue: 'Union Station', quote: 'Every table looked considered, not decorated.' },
  { couple: 'Ana & Michael', venue: 'The Brass Door Barn' },
  { couple: 'Grace & Tomas', venue: 'Kansas City Museum', quote: 'They built exactly what we sketched together.' },
  { couple: 'Lauren & Chase', venue: 'Argentine Beanery' },
]

export interface BloomOption {
  id: string
  label: string
  swatch: string
}

export const bloomColors: BloomOption[] = [
  { id: 'ivory', label: 'Ivory', swatch: '#efe3c8' },
  { id: 'blush', label: 'Blush', swatch: '#d9b6a3' },
  { id: 'terracotta', label: 'Terracotta', swatch: '#b3603f' },
]

export const greeneryOptions: BloomOption[] = [
  { id: 'eucalyptus', label: 'Eucalyptus', swatch: '#7c8d6b' },
  { id: 'olive', label: 'Olive Branch', swatch: '#8a9257' },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'What’s your pricing range for weddings?',
    answer:
      'Most full-service wedding clients invest $4,500–$12,000+ in florals, depending on guest count and scope. We’ll build a plan around your budget at consultation.',
  },
  {
    question: 'What’s your service area?',
    answer:
      'We work throughout the Kansas City metro, including Johnson County, and travel for select destination dates.',
  },
  {
    question: 'How far in advance should we book?',
    answer:
      'We take a limited number of wedding dates each season. Most couples book 9–14 months out; peak-season Saturdays go first.',
  },
  {
    question: 'Is there a minimum for weddings?',
    answer:
      'Yes — our full-service wedding minimum is $4,500. Boutique and elopement-scale florals are available outside that minimum.',
  },
]

export const budgetRanges = [
  'Under $4,500',
  '$4,500 – $7,500',
  '$7,500 – $12,000',
  '$12,000+',
]

export const footer = {
  contact: {
    heading: 'Contact',
    email: 'hello@best-kc.com',
    phone: '(816) 555-0142',
  },
  serviceArea: {
    heading: 'Service Area',
    body: 'Kansas City metro · Johnson County · select destination dates',
  },
  social: {
    heading: 'Follow',
    links: ['Instagram', 'Pinterest'],
  },
}
