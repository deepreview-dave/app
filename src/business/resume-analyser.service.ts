import { ResumeAnalyserOutput } from "./common";
import { AffindaCredential, AffindaAPI, Resume } from "@affinda/affinda";

export enum ResumeAnalyseErrorMessage {
  PDFAnalyseError = "Error trying to analyse the Resume. Please try again.",
}

export class ResumeAnalyserService {
  async analyseResume(file: File): Promise<ResumeAnalyserOutput> {
    const credential = new AffindaCredential(
      process.env.REACT_APP_AFFINDA_KEY!
    );
    const client = new AffindaAPI(credential);

    try {
      const parsed = await client.createResume({ file });
      // const parsed = mockResponse as unknown as Resume;
      console.log(parsed);
      const details = this.praseDetails(parsed);
      const summary = this.parseSummary(parsed);
      const workplaces = this.parseWorkExp(parsed);
      const education = this.parseEducation(parsed);
      return { details, summary, workplaces, education };
    } catch (e) {
      throw new Error(ResumeAnalyseErrorMessage.PDFAnalyseError);
    }
  }

  private praseDetails = (resume: Resume) => {
    const name = resume.data?.name?.raw ?? "";
    const address = resume.data?.location?.formatted ?? "";
    const email = resume.data?.emails?.[0] ?? "";
    const phone = resume.data?.phoneNumbers?.[0] ?? "";
    const website = resume.data?.websites?.[0] ?? "";
    const linkedin = resume.data?.linkedin ?? "";
    return { name, address, email, phone, linkedin, website };
  };

  private parseSummary = (resume: Resume) => {
    const summary = resume.data?.summary ?? "";
    const skill = resume.data?.skills ?? [];
    const skills = skill.map((e) => e.name).join(", ") ?? "";
    return { skills, summary };
  };

  private parseWorkExp = (resume: Resume) => {
    const experiences = resume.data?.workExperience ?? [];
    return experiences.map((exp) => ({
      role: exp.jobTitle ?? "",
      company: exp.organization ?? "",
      details: exp.jobDescription ?? "",
      start: exp.dates?.startDate?.toDateString() ?? "",
      end: exp.dates?.endDate?.toDateString() ?? "",
    }));
  };

  private parseEducation = (resume: Resume) => {
    const education = resume.data?.education ?? [];
    return education.map((edu) => ({
      school: edu.organization ?? "",
      degree: edu.accreditation?.education ?? "",
      start: edu.dates?.startDate?.toDateString() ?? "",
      end: edu.dates?.completionDate?.toDateString() ?? "",
      details: "", // not supported atm
    }));
  };
}

const mockResponse = {
  data: {
    name: {
      raw: "Gabriel Coman",
      first: "Gabriel",
      last: "Coman",
      middle: "",
      title: "",
    },
    phoneNumbers: ["+447442099240"],
    websites: ["https://deepreview.eu"],
    emails: ["liviu.coman10@gmail.com"],
    dateOfBirth: null,
    location: {
      formatted: "Tom Smith Cl, London SE10 9XJ, UK",
      postalCode: "SE10 9XJ",
      state: "England",
      country: "United Kingdom",
      countryCode: "GB",
      rawInput: "SE10 9XJ, London",
      streetNumber: null,
      street: "Tom Smith Close",
      apartmentNumber: null,
      city: null,
      latitude: 51.4822834,
      longitude: 0.002784,
    },
    objective: "",
    languages: ["English"],
    summary:
      "I am an experienced tech lead with 10+ years of experience in the industry. I have a proven track record of mentoring junior engineers and helping them develop their skills. My technical expertise includes NodeJS, Typescript, and other related technologies. I am confident in my ability to lead and mentor teams, and I am looking for a new opportunity to continue to grow my skills.",
    totalYearsExperience: 13,
    headShot: null,
    education: [
      {
        id: 12587804,
        organization: "University of California",
        accreditation: {
          education: "CS",
          inputStr: "CS",
          matchStr: "",
          educationLevel: null,
        },
        grade: null,
        location: null,
        dates: {
          completionDate: new Date("2010-01-01T00:00:00.000Z"),
          isCurrent: false,
          startDate: new Date("2006-01-01T00:00:00.000Z"),
        },
      },
    ],
    profession: "developer",
    linkedin: null,
    workExperience: [
      {
        id: 24430879,
        jobTitle: "Developer",
        organization: "ACME inc",
        location: null,
        jobDescription:
          "As a Developer at Acme Inc, I led our migration from monolith to microservices. I worked closely with the team to ensure that the transition was successful and that all of the necessary components were in place. I also provided guidance and support to the team throughout the process, ensuring that any issues were addressed quickly and efficiently. ",
        dates: {
          startDate: new Date("2010-01-01T00:00:00.000Z"),
          endDate: new Date("2023-02-17T00:00:00.000Z"),
          monthsInPosition: 158,
          isCurrent: true,
        },
        occupation: {
          jobTitle: "Developer",
          jobTitleNormalized: "Developer",
          managementLevel: "Low",
          classification: {
            title: "Programmers and software development professionals ",
            minorGroup: "Information Technology Professionals",
            subMajorGroup:
              "SCIENCE, RESEARCH, ENGINEERING AND TECHNOLOGY PROFESSIONALS",
            majorGroup: "PROFESSIONAL OCCUPATIONS",
            socCode: 2134,
          },
        },
      },
      {
        id: 9999999,
        jobTitle: "Mobile Developer",
        organization: "Thyseen Corp",
        location: null,
        jobDescription:
          "As a Mobile Dev at Thyseen Corp, I was in charge of their main mobile app",
        dates: {
          startDate: new Date("2008-01-01T00:00:00.000Z"),
          endDate: new Date("2010-01-01T00:00:00.000Z"),
          monthsInPosition: 158,
          isCurrent: true,
        },
        occupation: {
          jobTitle: "Developer",
          jobTitleNormalized: "Developer",
          managementLevel: "Low",
          classification: {
            title: "Programmers and software development professionals ",
            minorGroup: "Information Technology Professionals",
            subMajorGroup:
              "SCIENCE, RESEARCH, ENGINEERING AND TECHNOLOGY PROFESSIONALS",
            majorGroup: "PROFESSIONAL OCCUPATIONS",
            socCode: 2134,
          },
        },
      },
    ],
    skills: [
      {
        id: 135139467,
        emsiId: "KS441LF7187KS0CV4B6Y",
        name: "TypeScript",
        lastUsed: null,
        numberOfMonths: null,
        type: "hard_skill",
        sources: [
          {
            section: "Skills/Interests/Languages",
            position: null,
            workExperienceId: null,
          },
          {
            section: "Summary",
            position: null,
            workExperienceId: null,
          },
          {
            section: "Skills/Interests/Languages",
            position: null,
            workExperienceId: null,
          },
          {
            section: "Summary",
            position: null,
            workExperienceId: null,
          },
        ],
      },
    ],
    certifications: [],
    publications: [],
    referees: [],
    sections: [
      {
        sectionType: "PersonalDetails",
        bbox: [36.224, 58.364014, 610.22687, 178.88397],
        pageIndex: 0,
        text: "Gabriel Coman Address: SE10 9XJ, London | Phone: 07442099240 | Email: liviu.coman10@gmail.com Website: https://deepreview.eu",
      },
      {
        sectionType: "Summary",
        bbox: [36.224, 234.26001, 770.1119, 362.00406],
        pageIndex: 0,
        text: "Summary I am an experienced tech lead with 10+ years of experience in the industry. I have a proven track record of mentoring junior engineers and helping them develop their skills. My technical expertise includes NodeJS, Typescript, and other related technologies. I am confident in my ability to lead and mentor teams, and I am looking for a new opportunity to continue to grow my skills.",
      },
      {
        sectionType: "WorkExperience",
        bbox: [36.224, 417.14008, 778.94385, 584.4081],
        pageIndex: 0,
        text: "Experience Developer | Acme Inc | 2010 - Current As a Developer at Acme Inc, I led our migration from monolith to microservices. I worked closely with the team to ensure that the transition was successful and that all of the necessary components were in place. I also provided guidance and support to the team throughout the process, ensuring that any issues were addressed quickly and efficiently.",
      },
      {
        sectionType: "Skills/Interests/Languages",
        bbox: [36.98, 639.2601, 175.26399, 694.9081],
        pageIndex: 0,
        text: "Skills NodeJS, Typescript",
      },
      {
        sectionType: "Education",
        bbox: [37.152, 750.1401, 366.75168, 805.408],
        pageIndex: 0,
        text: "Education University of California | CS | 2006 - 2010",
      },
    ],
    isResumeProbability: 99,
    rawText:
      "Gabriel Coman Address: SE10 9XJ, London | Phone: 07442099240 | Email: liviu.coman10@gmail.com Website: https://deepreview.eu\nSummary I am an experienced tech lead with 10+ years of experience in the industry. I have a proven track record of mentoring junior engineers and helping them develop their skills. My technical expertise includes NodeJS, Typescript, and other related technologies. I am confident in my ability to lead and mentor teams, and I am looking for a new opportunity to continue to grow my skills.\nExperience Developer | Acme Inc | 2010 - Current As a Developer at Acme Inc, I led our migration from monolith to microservices. I worked closely with the team to ensure that the transition was successful and that all of the necessary components were in place. I also provided guidance and support to the team throughout the process, ensuring that any issues were addressed quickly and efficiently.\nSkills NodeJS, Typescript\nEducation University of California | CS | 2006 - 2010",
  },
  meta: {
    identifier: "eMkbwBpb",
    fileName: "resume-1.pdf",
    ready: true,
    readyDt: "2023-02-17T14:47:51.980Z",
    failed: false,
    expiryTime: null,
    language: "en",
    pdf: "http://api.affinda.com/v2/resumes",
    parentDocument: null,
    childDocuments: [],
    pages: [
      {
        id: 13148996,
        pageIndex: 0,
        image: null,
        height: 843.5,
        width: 833.6953125,
        rotation: 0,
      },
    ],
    isVerified: true,
    reviewUrl: null,
    ocrConfidence: null,
    validatedDt: "2023-02-17T14:47:51.980672Z",
    exportedDt: null,
    isExported: false,
    createdDt: "2023-02-17T14:47:50.518390Z",
    errorDetail: null,
    documentType: "resume",
    file: "http://api.affinda.com/v2/resumes",
  },
  error: {
    errorCode: null,
    errorDetail: null,
  },
};
