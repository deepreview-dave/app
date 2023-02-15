import { delay } from "../utils/delay";
import { ResumeAnalyserOutput, WorkHistory } from "./common";

export class ResumeAnalyserService {
  async analyseResume(): Promise<ResumeAnalyserOutput> {
    await delay(2500);
    return mockResult;
  }
}

const mockResult: ResumeAnalyserOutput = {
  details: {
    name: "John Doe",
    address: "New York",
    email: "john.doe@email.com",
    phone: "",
    linkedin: "",
    website: "https://john.doe@email.com",
  },
  summary: {
    skills: "TypeScript",
    summary:
      "I am an experienced tech lead with 10+ years of experience in the industry. I have a proven track record of mentoring junior engineers and helping them develop their skills. My technical expertise includes NodeJS, Typescript, and other related technologies. I am confident in my ability to lead and mentor teams, and I am looking for a new opportunity to continue to grow my skills.",
  },
  workplaces: [
    {
      role: "Developer",
      company: "Epic Games",
      start: "2020",
      end: "Current",
      details: "",
    },
  ],
  education: [
    {
      school: "Aachen University",
      degree: "CS",
      start: "2006",
      end: "2010",
      details: "",
    },
  ],
};
