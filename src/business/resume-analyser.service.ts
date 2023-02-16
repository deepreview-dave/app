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
      details: "",
    }));
  };
}
