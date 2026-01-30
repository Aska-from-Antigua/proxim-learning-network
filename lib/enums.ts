export const Grade = {
  Form1: 'F1',
  Form2: 'F2',
  Form3: 'F3',
  Form4: 'F4',
  Form5: 'F5',
  ALevels: 'AL',
} as const;

export type Grade = typeof Grade[keyof typeof Grade];

export const Subject = {
  Math: 'MATH',
  IntScience: 'INT_SCI',
  EnglishA: 'ENG_A',
  EnglishB: 'ENG_B',
  IT: 'IT',
  Biology: 'BIO',
  Chemistry: 'CHEM',
  Physics: 'PHYS',
  SocialStudies: 'SOC_STU',
  PrinciplesOfAccounts: 'POA',
  PrinciplesOfBusiness: 'POB',
} as const;

export type Subject = typeof Subject[keyof typeof Subject];

export const Modality = {
  Online: 'ONLINE',
  InPerson: 'IN_PERSON',
} as const;

export type Modality = typeof Modality[keyof typeof Modality];