/** Program copy and media — served from R2 via /api/images/assets/site/. */

import { siteImage } from '../lib/assets'

export interface ProgramBullet {
  title: string
  description: string
}

export interface Program {
  id: string
  title: string
  image: string
  width: number
  height: number
  intro: string[]
  experienceHeading?: string
  experience?: ProgramBullet[]
  idealsHeading?: string
  ideals?: ProgramBullet[]
  closing: string[]
}

export const PROGRAMS: Program[] = [
  {
    id: 'gut-reset',
    title: 'The Gut Reset Program',
    image: siteImage('program-gut-reset.png'),
    width: 800,
    height: 904,
    intro: [
      'Our Holistic Gut Reset Program is a comprehensive three-month program designed to address the root cause of your gut-related issues and empower you to achieve lasting results.',
      'This program goes beyond just treating symptoms. We delve deeper to understand the intricate connection between your gut and overall health. By focusing on rebalancing your gut microbiome and optimizing your digestive fire (Agni), we unlock your body’s natural ability to heal and thrive.',
    ],
    experienceHeading: 'Here’s what you can expect from our Holistic Gut Reset Program:',
    experience: [
      {
        title: 'Personalized Gut Health Assessment',
        description:
          'We begin by understanding your unique gut health story through a comprehensive consultation.',
      },
      {
        title: 'Customized Gut-Healing Plan',
        description:
          'Tailored dietary recommendations, herbal remedies, and lifestyle modifications designed to address your specific needs.',
      },
      {
        title: 'Detoxification and Gut Microbiome Restoration',
        description:
          'Gentle yet effective cleansing strategies and targeted interventions to promote a balanced gut flora.',
      },
      {
        title: 'Improved Digestive Function',
        description:
          'Enhanced nutrient absorption, reduced bloating, and overall digestive comfort.',
      },
      {
        title: 'Weight Management',
        description:
          'Achieve a healthy weight naturally through a balanced approach to gut health and digestive function.',
      },
      {
        title: 'Radiant Skin and Hair',
        description:
          'Experience a natural glow from within as your body functions at its optimal level.',
      },
      {
        title: 'Boosted Immunity and Vitality',
        description:
          'Strengthen your body’s natural defenses for enhanced resistance to illness.',
      },
      {
        title: 'Long-Term Sustainability',
        description:
          'Gain the knowledge and tools to maintain a healthy gut and overall well-being long after the program ends.',
      },
    ],
    closing: [
      'This program is more than just a gut reset; it’s a holistic approach to unlocking your body’s full potential. Join us on this journey to rediscover vibrant health, radiant well-being, and a renewed sense of vitality!',
    ],
  },
  {
    id: 'weight-management',
    title: 'Sustainable Weight Management Program',
    image: siteImage('program-weight.png'),
    width: 500,
    height: 326,
    intro: [
      'Are you tired of yo-yo dieting and struggling to maintain a healthy weight? Our Sustainable Weight Management Program offers a holistic approach, addressing the root causes of weight gain and empowering you to achieve lasting success.',
      'This program goes beyond simply counting calories. We tap into the wisdom of Ayurveda, an ancient Indian system of medicine, to understand the connection between your body’s energy systems and weight management. By harmonizing these energy systems, we unlock your body’s natural ability to maintain a healthy weight and vibrant well-being.',
    ],
    experienceHeading: 'Here’s what you can expect from our Sustainable Weight Management Program:',
    experience: [
      {
        title: 'Personalized Ayurvedic Assessment',
        description:
          'We begin with a comprehensive consultation to understand your unique body type, imbalances, and weight management goals.',
      },
      {
        title: 'Customized Ayurvedic Plan',
        description:
          'Tailored dietary recommendations based on your Ayurvedic constitution, gentle natural cleanses to remove toxins, and lifestyle modifications for sustainable weight management.',
      },
      {
        title: 'Balanced Weight Loss',
        description:
          'Achieve a healthy weight at a gradual, sustainable pace, promoting long-term success.',
      },
      {
        title: 'Enhanced Vitality',
        description: 'Experience increased energy levels, improved sleep, and a renewed sense of well-being.',
      },
      {
        title: 'Stress Management Techniques',
        description: 'Learn to manage stress effectively, a key factor in weight management.',
      },
      {
        title: 'Mindful Eating Practices',
        description:
          'Cultivate a healthy relationship with food, promoting mindful choices and intuitive eating.',
      },
      {
        title: 'Holistic Lifestyle Support',
        description:
          'Discover the power of yoga, meditation, and other practices to support your weight management journey and overall well-being.',
      },
      {
        title: 'Sustainable Habits for Life',
        description:
          'Gain the knowledge and tools to maintain a healthy lifestyle and weight management practices for the long term.',
      },
    ],
    closing: [
      'This program is an investment in your long-term health and well-being. It’s not just about reaching a goal weight, but about creating a balanced and sustainable lifestyle that promotes lasting vitality and a renewed sense of self. Let us guide you on your journey towards a healthier, happier you!',
    ],
  },
  {
    id: 'mental-wellness',
    title: 'The Mental Wellness Program',
    image: siteImage('program-mental-wellness.png'),
    width: 600,
    height: 728,
    intro: [
      'Feeling stressed, overwhelmed, or disconnected? Reclaim your inner peace and cultivate lasting mental well-being with our transformative 12-week program, designed specifically for you.',
    ],
    experienceHeading: 'What You’ll Experience:',
    experience: [
      {
        title: 'Initial Yogic Assessment',
        description:
          'Gain valuable insights into your mental health through a personalized Yogic assessment, identifying areas for growth and tailoring the program to your unique needs.',
      },
      {
        title: 'Weekly Yoga & Ayurveda Practices',
        description:
          'Learn practical Yogic tools to enhance emotional balance, and promote relaxation.',
      },
      {
        title: 'Ayurvedic Wisdom for Well-being',
        description:
          'Discover the magic of Ayurvedic herbs – understand your mind-body connection, and restore your sleep cycle.',
      },
      {
        title: 'Weekly Assessments & Tools',
        description:
          'Track your progress and receive personalized tools each week to improve your social and emotional well-being, learning healthy coping mechanisms and building self-compassion.',
      },
      {
        title: 'Develop Emotional Intelligence',
        description:
          'Learn to understand your emotions and those of others, fostering stronger connections and empathy.',
      },
    ],
    idealsHeading: 'This program is ideal for anyone seeking to:',
    ideals: [
      {
        title: 'Reduce Stress and Anxiety',
        description: 'Manage everyday challenges with natural and effective tools.',
      },
      {
        title: 'Improve Sleep Quality',
        description:
          'Wake up feeling rejuvenated with Ayurvedic sleep practices and relaxation techniques.',
      },
      {
        title: 'Enhance Emotional Well-being',
        description: 'Build resilience and develop healthy coping mechanisms.',
      },
      {
        title: 'Increase Self-Awareness',
        description: 'Gain a deeper understanding of your emotions and motivations.',
      },
      {
        title: 'Build Stronger Relationships',
        description: 'Foster empathy and connect more authentically with others.',
      },
      {
        title: 'Live a More Fulfilling Life',
        description:
          'Discover the joy of inner peace and cultivate lasting mental well-being.',
      },
    ],
    closing: [
      'Join us and mark the beginning of a transformative journey towards a calmer, more connected, and fulfilling you! It is a promise.',
    ],
  },
  {
    id: 'herbal-remedies',
    title: 'Herbal Remedies for Health Concerns',
    image: siteImage('program-herbal.png'),
    width: 800,
    height: 841,
    intro: [
      'The Herbal Remedies for Health Concerns program offers a natural way to address health issues by restoring Dosha balance using selected herbal treatments. Integrating these remedies into a holistic routine that includes a personalized diet and lifestyle plan, the program targets and alleviates specific health concerns. It supports overall well-being, promoting vitality and resilience for a balanced life.',
    ],
    closing: [],
  },
]
