/** Homepage content — media via Worker /api/images/assets/site/ from R2. */

import { siteImage } from '../lib/assets'

export const HERO = {
  title: 'Holistic Ayurveda and Yoga Practitioner',
  subtitle:
    'Experience a seamless blend of modern science and holistic care, tailored to enhance your health and wellness',
  logo: siteImage('logo.png'),
  textureImage: siteImage('texture.png'),
}

export const ABOUT = {
  title: 'About Dr. Spurana',
  portrait: siteImage('spurana-portrait.jpg'),
  body: `Dr. Spurana is a renowned Ayurvedic practitioner with a master’s in yoga and a holistic approach to wellness. She has profoundly impacted thousands worldwide, including work at NIMHANS and international hospitals in South Korea and Germany.

Motivated by the mental health challenges during COVID-19, she also holds a Postgraduate Diploma in Mental Health. Committed to integrating mind, body, and spirit, Dr. Spurana emphasizes health preservation and societal well-being. She volunteers with NGOs, leads educational workshops, and brings a compassionate, insightful approach to her practice. A global adventurer, she enjoys hiking, exploring cultures, and engaging in adventure sports.`,
  quote:
    '“The doctor of the future will give no medicine, but will instruct his patients in care of the human frame, in diet, and in the cause and prevention of disease.” – Thomas Edison',
}

export const BANNER = {
  quoteLine: 'Find your balance, energy & happiness the natural way.',
  healthImage: siteImage('banner-health.jpg'),
}

export const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Choose Your Program',
    description: 'Select the wellness path that aligns with your health goals and needs.',
    tone: 'cream' as const,
  },
  {
    step: '2',
    title: 'Personalized Assessment',
    description:
      'Receive a thorough assessment to understand your unique constitution and health status.',
    tone: 'sage' as const,
  },
  {
    step: '3',
    title: 'Your Customized Plan',
    description: 'Follow a tailored program of diet, lifestyle, and holistic practices.',
    tone: 'blush' as const,
  },
  {
    step: '4',
    title: 'Ongoing Guidance',
    description:
      'Regular check-ins to track progress, adjust your plan, and answer your questions.',
    tone: 'cream' as const,
  },
]

export const QUOTES = [
  'Health is the foremost foundation for fulfilling Dharma (righteous duty), Artha (prosperity), Kama (desires), and Moksha (liberation). Diseases destroy that very foundation of well-being (life) and good fortune. – Charaka',
  'Where is the need for medicines if one is following a good diet? Of what avail is any medicine if one does not adhere to his diet? – Ayurveda',
  'When wealth is lost, nothing is lost. When health is lost, something is lost. When the character is lost, everything is lost. – Billy Graham',
]

export const TAGLINE_FOOTER = 'Find your balance, energy & happiness the natural way.'
