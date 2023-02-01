import {
  ResumeEducationHistory,
  ResumeWorkHistory,
} from "../state/resume.state";
import {
  PerformanceScore,
  ReviewTone,
  Pronouns,
  TimePeriod,
  PerformanceReviewInput,
  CoverLetterInput,
  ReferralLetterInput,
  ResumeInput,
} from "./common";

export class PerformanceReviewPromptBuilder {
  build(details: PerformanceReviewInput): string {
    const prompt: string[] = [];

    prompt.push(details.question);
    if (details.details) {
      prompt.push(details.details);
    }
    prompt.push(`Please also add the following personal details`);
    if (details.name) {
      prompt.push(`Person Name: ${details.name}`);
      switch (details.pron) {
        case Pronouns.NEUTRAL: {
          prompt.push(`Use the pronoun 'they'`);
          break;
        }
        case Pronouns.HE: {
          prompt.push(`Use the pronoun 'he'`);
          break;
        }
        case Pronouns.HER: {
          prompt.push(`Use the pronoun 'she'`);
          break;
        }
      }
    } else {
      prompt.push(`Person: Myself`);
      prompt.push(`Refer to me in the first person`);
    }
    if (details.role) {
      prompt.push(`Role: ${details.role}`);
    }
    if (details.team) {
      prompt.push(`Team: ${details.team}`);
    }
    switch (details.perf) {
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        prompt.push(`Performance: above expectations`);
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        prompt.push(`Performance: meets expectations`);
        break;
      }
      case PerformanceScore.BELOW_EXPECTATIONS: {
        prompt.push(`Performance: below expectations`);
        break;
      }
    }
    switch (details.time) {
      case TimePeriod.LAST_MONTH: {
        prompt.push(`Time period: previous month`);
        break;
      }
      case TimePeriod.LAST_3_MONTHS: {
        prompt.push(`Time period: previous quarter`);
        break;
      }
      case TimePeriod.LAST_6_MONTHS: {
        prompt.push(`Time period: previous half year`);
        break;
      }
      case TimePeriod.LAST_12_MONTHS: {
        prompt.push(`Time period: previous year`);
        break;
      }
    }
    switch (details.tone) {
      case ReviewTone.NEUTRAL: {
        prompt.push(`Use a neutral tone`);
        break;
      }
      case ReviewTone.FRIENDLY: {
        prompt.push(`Use a friendly tone`);
        break;
      }
      case ReviewTone.CRITICAL: {
        prompt.push(`Use a critical tone`);
        break;
      }
    }

    return prompt.join("\n");
  }
}

export class CoverLetterPromptBuilder {
  build(details: CoverLetterInput): string {
    const prompt: string[] = [];

    prompt.push(details.question);
    prompt.push(details.details);
    prompt.push(`Please also add the following personal details`);
    if (details.name) {
      prompt.push(`Person Name: ${details.name}`);
      prompt.push(`Refer to myself in the first person`);
    } else {
      prompt.push(`Person: Myself`);
      prompt.push(`Refer to me in the first person`);
    }
    if (details.role) {
      prompt.push(`Role applying to: ${details.role}`);
    }
    if (details.company) {
      prompt.push(`Company applying to: ${details.company}`);
    }
    prompt.push(`Work experience: ${details.history} years`);

    return prompt.join("\n");
  }
}

export class ReferralLetterPromptBuilder {
  build(details: ReferralLetterInput): string {
    const prompt: string[] = [];

    prompt.push(details.question);
    prompt.push(details.details);
    prompt.push(
      `Please also add the following information needed for the referral letter`
    );
    prompt.push(`My name: ${details.you.name}`);
    prompt.push(`Recipient name: ${details.recipient.name}`);
    prompt.push(`Recipient title: ${details.recipient.title}`);
    prompt.push(`Recipient company: ${details.recipient.company}`);
    prompt.push(`Applicant name: ${details.applicant.name}`);
    prompt.push(`Applicant role: ${details.applicant.role}`);
    switch (details.applicant.pron) {
      case Pronouns.NEUTRAL: {
        prompt.push("Applicant pronoun: them/they");
        break;
      }
      case Pronouns.HE: {
        prompt.push("Applicant pronoun: he/him");
        break;
      }
      case Pronouns.HER: {
        prompt.push("Applicant pronoun: she/her");
        break;
      }
    }

    return prompt.join("\n");
  }
}

export class PerformanceReviewHintBuilder {
  build(
    role: string | undefined,
    performance: PerformanceScore,
    tone: ReviewTone
  ): string {
    let good = 0;
    let bad = 0;

    switch (performance) {
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        good += 2;
        bad += 1;
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        good += 1;
        bad += 1;
        break;
      }
      case PerformanceScore.BELOW_EXPECTATIONS: {
        good += 1;
        bad += 2;
        break;
      }
    }

    switch (tone) {
      case ReviewTone.FRIENDLY: {
        good += 1;
        break;
      }
      case ReviewTone.NEUTRAL: {
        good += 1;
        bad += 1;
        break;
      }
      case ReviewTone.CRITICAL: {
        bad += 1;
        break;
      }
    }

    const rolePart = "an employee";
    if (role) {
      role += `a ${role}`;
    }

    let perfPart = "";
    switch (performance) {
      case PerformanceScore.ABOVE_EXPECTATIONS: {
        perfPart = "has performed above expectations";
        break;
      }
      case PerformanceScore.MEETS_EXPECTATIONS: {
        perfPart = "meets expectations";
        break;
      }
      case PerformanceScore.BELOW_EXPECTATIONS: {
        perfPart = "has performed below expectations";
        break;
      }
    }

    return `Please list ${good} strengths and ${bad} areas of improvement for a ${rolePart} who ${perfPart}.`;
  }
}

export class CoverLetterHintBuilder {
  build(role: string): string {
    if (!role) {
      return `Please list 3 strengths a person has, in the context of a cover letter.`;
    }
    return `Please list 3 strengths a person has, in the context of a cover letter, for the role of ${role}`;
  }
}

export class ReferralLetterHintBuilder {
  build(role: string): string {
    if (!role) {
      return `Please list 3 strengths a person has, in the context of a referral letter.`;
    }
    return `Please list 3 strengths a person has, in the context of a referral letter, for the role of ${role}`;
  }
}

export class ExpandPromptBuilder {
  build(input: string): string {
    return `Expand just a little bit on the following: ${input}`;
  }
}

export class ResumeSummaryPromptBuilder {
  build(input: ResumeInput): string {
    const prompt: string[] = [];
    prompt.push(input.summary.question);
    prompt.push(input.summary.summary);
    prompt.push(
      `${input.details.name} also has excellent skills in ${input.summary.skills}.`
    );
    prompt.push(
      `${input.details.name} has been working for ${input.summary.history} years.`
    );
    prompt.push(`Refer to me in the first person`);
    return prompt.join("\n");
  }
}

export class ResumeWorkHistoryPromptBuilder {
  build(question: string, history: ResumeWorkHistory): string {
    const prompt: string[] = [];
    prompt.push(question);
    prompt.push(`Role: ${history.role}`);
    prompt.push(`Company: ${history.company}`);
    prompt.push(`More details: ${history.details}`);
    prompt.push(`Tense: Past.`);
    prompt.push(`Refer to me in the first person and use the past tense.`);
    return prompt.join("\n");
  }
}

export class ResumeEducationHistoryPromptBuilder {
  build(question: string, history: ResumeEducationHistory): string {
    const prompt: string[] = [];
    prompt.push(question);
    prompt.push(`School: ${history.school}`);
    prompt.push(`Degree: ${history.degree}`);
    prompt.push(`More details: ${history.details}`);
    prompt.push(`Tense: Past.`);
    prompt.push(`Refer to me in the first person.`);
    return prompt.join("\n");
  }
}
