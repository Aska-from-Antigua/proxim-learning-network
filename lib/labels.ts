import { Subject, Grade, Modality } from './enums';

export const SubjectLabel: Record<Subject, string> = {
  [Subject.Math]: 'Math',
  [Subject.IntScience]: 'Integrated Science',
  [Subject.EnglishA]: 'English A',
  [Subject.EnglishB]: 'English B',
  [Subject.IT]: 'Information Technology',
  [Subject.Biology]: 'Biology',
  [Subject.Chemistry]: 'Chemistry',
  [Subject.Physics]: 'Physics',
  [Subject.SocialStudies]: 'Social Studies',
  [Subject.PrinciplesOfAccounts]: 'Principles of Accounts',
  [Subject.PrinciplesOfBusiness]: 'Principles of Business',
};

export const GradeLabel: Record<Grade, string> = {
  [Grade.Form1]: 'Form 1',
  [Grade.Form2]: 'Form 2',
  [Grade.Form3]: 'Form 3',
  [Grade.Form4]: 'Form 4',
  [Grade.Form5]: 'Form 5',
  [Grade.ALevels]: 'A Levels',
};

export const ModalityLabel: Record<Modality, string> = {
  [Modality.Online]: 'Online',
  [Modality.InPerson]: 'In-person',
};