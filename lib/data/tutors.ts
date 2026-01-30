import { Tutor } from '../types';
import { Grade, Subject, Modality } from '../enums';

export const TUTORS: Tutor[] = [
  {
    id: 1,
    slug: 'jerry-aska',
    name: 'Jerry Aska',
    bio: 'Concept-first tutoring focused on strong foundations in Maths, IT, and Integrated Science.',
    email: 'jerry.aska@pln.com',
    whatsapp: '+1-268-555-0001',
    defaults: {
      rateXcd: 40,
      grades: [Grade.Form1, Grade.Form2, Grade.Form3],
      modalities: [Modality.Online],
      locationLabel: 'Online',
    },
    offerings: [
      { subject: Subject.Math },
      { subject: Subject.IT },
      { subject: Subject.IntScience },
    ],
  },

  {
    id: 2,
    slug: 'ophellia-ladoo',
    name: 'Ophellia Ladoo',
    bio: 'Focused exam preparation for business subjects with structured practice.',
    email: 'ophellia.ladoo@pln.com',
    whatsapp: '+1-268-555-0002',
    defaults: {
      rateXcd: 50,
      grades: [Grade.Form4, Grade.Form5],
      modalities: [Modality.InPerson, Modality.Online],
      locationLabel: 'Town',
    },
    offerings: [
      { subject: Subject.PrinciplesOfAccounts },
      { subject: Subject.PrinciplesOfBusiness },
    ],
  },

  {
    id: 3,
    slug: 'lucia-murray',
    name: 'Lucia Murray',
    bio: 'Language-focused tutoring with emphasis on comprehension, writing, and exam technique.',
    email: 'lucia.murray@pln.com',
    whatsapp: '+1-268-555-0003',
    defaults: {
      rateXcd: 40,
      grades: [Grade.Form1, Grade.Form2, Grade.Form3],
      modalities: [Modality.InPerson],
      locationLabel: 'Cedar Valley',
    },
    offerings: [
      {
        subject: Subject.EnglishA,
      },
      {
        subject: Subject.EnglishB,
      },
      {
        subject: Subject.EnglishA,
        overrides: {
          grades: [Grade.Form4, Grade.Form5],
          rateXcd: 60,
        },
      },
      {
        subject: Subject.EnglishB,
        overrides: {
          grades: [Grade.Form4, Grade.Form5],
          rateXcd: 60,
        },
      },
    ],
  },

  {
    id: 4,
    slug: 'kyle-sukhdeo',
    name: 'Kyle Sukhdeo',
    bio: 'Maths and science tutoring with a strong emphasis on problem-solving.',
    email: 'kyle.sukhdeo@pln.com',
    whatsapp: '+1-268-555-0004',
    defaults: {
      rateXcd: 40,
      grades: [
        Grade.Form1,
        Grade.Form2,
        Grade.Form3,
        Grade.Form4,
        Grade.Form5,
      ],
      modalities: [Modality.InPerson, Modality.Online],
      locationLabel: 'Near Transport Board',
    },
    offerings: [
      { subject: Subject.Math },
      {
        subject: Subject.Biology,
        overrides: {
          rateXcd: 50,
          modalities: [Modality.InPerson]
        },
      },
    ],
  },

  {
    id: 5,
    slug: 'kevin-joseph',
    name: 'Kevin Joseph',
    bio: 'Senior-level science tutoring for exam-focused students.',
    email: 'kevin.joseph@pln.com',
    whatsapp: '+1-268-555-0005',
    defaults: {
      rateXcd: 75,
      grades: [Grade.Form5],
      modalities: [Modality.InPerson],
      locationLabel: 'Upper All Saints Road',
    },
    offerings: [
      { subject: Subject.Biology },
      { subject: Subject.Chemistry },
      { subject: Subject.Physics },
    ],
  },

  {
    id: 6,
    slug: 'shaniyah-matthews',
    name: 'Shaniyah Matthews',
    bio: 'Humanities and science support with age-appropriate teaching strategies.',
    email: 'shaniyah.matthews@pln.com',
    whatsapp: '+1-268-555-0006',
    defaults: {
      rateXcd: 45,
      grades: [Grade.Form3, Grade.Form4, Grade.Form5],
      modalities: [Modality.InPerson, Modality.Online],
      locationLabel: 'Upper All Saints Road',
    },
    offerings: [
      { subject: Subject.SocialStudies },
      {
        subject: Subject.IntScience,
        overrides: {
          grades: [Grade.Form1, Grade.Form2, Grade.Form3],
          rateXcd: 40,
        },
      },
    ],
  },

  {
    id: 7,
    slug: 'ovante-burnette',
    name: 'Ovante Burnette',
    bio: 'Affordable tutoring across business and IT subjects.',
    email: 'ovante.burnette@pln.com',
    whatsapp: '+1-268-555-0007',
    defaults: {
      rateXcd: 30,
      grades: [
        Grade.Form1,
        Grade.Form2,
        Grade.Form3,
        Grade.Form4,
        Grade.Form5,
      ],
      modalities: [Modality.InPerson, Modality.Online],
      locationLabel: 'Jonas Road',
    },
    offerings: [
      { subject: Subject.PrinciplesOfBusiness },
      { subject: Subject.IT },
    ],
  },

  {
    id: 8,
    slug: 'albev-wade',
    name: 'Albev Wade',
    bio: 'Premium one-on-one tutoring across all subjects and grade levels.',
    email: 'albev.wade@pln.com',
    whatsapp: '+1-268-555-0008',
    defaults: {
      rateXcd: 250,
      grades: [
        Grade.Form1,
        Grade.Form2,
        Grade.Form3,
        Grade.Form4,
        Grade.Form5,
        Grade.ALevels,
      ],
      modalities: [Modality.Online],
      locationLabel: 'Online',
    },
    offerings: [
      { subject: Subject.Math },
      { subject: Subject.IntScience },
      { subject: Subject.EnglishA },
      { subject: Subject.EnglishB },
      { subject: Subject.IT },
      { subject: Subject.Biology },
      { subject: Subject.Chemistry },
      { subject: Subject.Physics },
      { subject: Subject.SocialStudies },
      { subject: Subject.PrinciplesOfAccounts },
      { subject: Subject.PrinciplesOfBusiness },
    ],
  },
];