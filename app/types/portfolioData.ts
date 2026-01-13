export type homeData = {
  fullName: string;
  description: string;
  image?: string;
  title: string[];
};

export type about = {
  aboutMeData: aboutMeData;
  aboutMeCard: aboutMeCard;
};

type aboutMeData = {
  heading: string;
  description: string[];
  title: string;
  image: string;
};

type aboutMeCard = {
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export type skills = {
  skillInfo: skillInfo;
  skillCards: skillCards;
};

type skillInfo = {
  heading: string;
};

type skillCards = {
  skillCategories: {
    icon: string;
    title: string;
    skills: {
      name: string;
      proficiency: string;
    }[];
  }[];
};

export type projects = {
  projectDetails: projectDetails;
  projectCards: projectCards;
};

type projectDetails = {
  heading: string;
  description: string;
};

type projectCards = {
  filters: {
    id: string;
    label: string;
  }[];
  projects: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    gitub: string;
    demo?: string;
    date: string;
    category: string;
  }[];
};

export type experience = {
  experienceInfo: experienceInfo;
  experienceCard: experienceCard;
};

type experienceInfo = {
  heading: string;
};

type experienceCard = {
  experiences: {
    role: string;
    company: string;
    description: string;
    period: string;
    location: string;
    achievements: string[];
    technologies: string[];
  }[];
};

export type education = {
  educationDetails: educationDetails;
  educationCards: educationCards;
};

type educationDetails = {
  heading: string;
};

type educationCards = {
  certifications: {
    title: string;
    issuer: string;
    date: string;
    icon: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    gpa: string;
    description: string;
    coursework?: string[];
    period: string;
    icon?: string;
  }[];
};

export type interests = {
  interestDetails: interestDetails;
  interestCards: interestCards;
  goalCards: goalCards;
};

type interestDetails = {
  heading: string;
  titleGoals: string;
  titleInterest: string;
};

type interestCards = {
  interests: {
    title: string;
    icon: string;
    description: string;
  }[];
};

type goalCards = {
  goals: {
    title: string;
    icon: string;
    details: string[];
  }[];
};

export type contact = {
  contactData: contactData;
  contactInfo: contactInfo;
};

type contactData = {
  title: string;
  description: string;
};

type contactInfo = {
  contactInfo: {
    icon: string;
    link: string;
    title: string;
    value: string;
  }[];
  socialLinks: {
    icon: string;
    url: string;
    name: string;
    username: string;
  }[];
};
