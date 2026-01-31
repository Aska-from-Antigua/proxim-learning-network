import type { Tutor } from '../types';
import { Grade, Subject, Modality } from '../enums';

export const TUTORS: Tutor[] = [
  {
    id: 1,
    slug: 'jerry-aska',
    name: 'Jerry Aska',
    tagline:
      'Concept-first tutoring for Forms 1-3 in Maths, IT, and Integrated Science.',
    bio: "I focus on building strong fundamentals before moving into exam practice, helping students truly understand what they are learning rather than memorizing steps. My sessions are structured, patient, and paced to the student's level, with plenty of time for questions. This approach works especially well for Forms 1-3 students who may feel behind or lack confidence.",
    email: 'jerry.aska@pln.com',
    whatsapp: '+1-268-555-0001',
    defaults: {
      rateXcd: 40,
      grades: [Grade.Form1, Grade.Form2, Grade.Form3],
      modalities: [Modality.Online],
      locationLabel: 'Google Classroom',
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
    tagline: 'Exam-focused POA & POB tutoring for Forms 4-5.',
    bio: 'I specialize in structured, exam-focused preparation for POA and POB, with an emphasis on clear explanations and consistent practice. My sessions are goal-oriented and designed to prepare students for CSEC-style questions. I work best with senior students who want disciplined guidance and accountability.',
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
    tagline:
      'English A & B tutoring that builds confidence, writing, and exam technique.',
    bio: 'I help students strengthen reading comprehension, writing, and exam technique in both English A and English B. My teaching style is supportive and confidence-building, especially for students who struggle to express themselves clearly. Lessons focus on understanding mark schemes and improving written responses over time.',
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
    tagline: 'Maths and Biology tutoring with a strong problem-solving focus.',
    bio: 'I provide Maths and Biology tutoring with a strong focus on problem-solving and applied understanding. Rather than rote learning, I help students break down questions and develop reliable methods they can use in exams. This approach suits students across Forms 1-5 who want to improve consistency and confidence.',
    email: 'kyle.sukhdeo@pln.com',
    whatsapp: '+1-268-555-0004',
    defaults: {
      rateXcd: 40,
      grades: [Grade.Form1, Grade.Form2, Grade.Form3, Grade.Form4, Grade.Form5],
      modalities: [Modality.InPerson, Modality.Online],
      locationLabel: 'Near Transport Board',
    },
    offerings: [
      { subject: Subject.Math },
      {
        subject: Subject.Biology,
        overrides: {
          rateXcd: 50,
          modalities: [Modality.InPerson],
        },
      },
    ],
  },

  {
    id: 5,
    slug: 'kevin-joseph',
    name: 'Kevin Joseph',
    tagline: 'Form 5 science tutoring for CSEC exam prep (Bio, Chem, Physics).',
    bio: 'I offer senior-level science tutoring for students preparing for Form 5 and CSEC examinations. Sessions are intensive and exam-driven, focusing on key topics, common pitfalls, and effective answering techniques. This is best suited for students who already have the basics and want to maximize exam performance.',
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
    tagline:
      'Supportive tutoring in Social Studies (Forms 3-5) and Integrated Science (Forms 1-3).',
    bio: 'I provide patient, age-appropriate tutoring in Social Studies and Integrated Science. My approach emphasizes clear explanations, practical examples, and steady progression through topics. I work well with younger students and those who benefit from a calm, supportive learning environment.',
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
    tagline: 'Affordable tutoring in POB and IT for Forms 1-5.',
    bio: 'I offer affordable tutoring in Principles of Business and Information Technology, making academic support more accessible to families. Sessions focus on understanding core concepts and applying them confidently in exams. This is a good fit for students who need steady reinforcement at a reasonable cost.',
    email: 'ovante.burnette@pln.com',
    whatsapp: '+1-268-555-0007',
    defaults: {
      rateXcd: 30,
      grades: [Grade.Form1, Grade.Form2, Grade.Form3, Grade.Form4, Grade.Form5],
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
    tagline:
      'Premium one-on-one tutoring across all subjects and grade levels.',
    bio: "I provide premium one-on-one tutoring across all subjects and grade levels, tailored entirely to the student's needs. Sessions are highly personalized, whether the goal is exam preparation, concept mastery, or accelerated learning. This service is ideal for families seeking intensive, individualized academic support.",
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
      locationLabel: 'Zoom',
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
