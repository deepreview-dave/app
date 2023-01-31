import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ResumeInput } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { ResumeBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import {
  ResultsComponent,
  ResultsError,
} from "../../../components/results/ResultsComponent";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import {
  ResumeStep,
  useResumeDetailsState,
  useResumeEducationHistoryState,
  useResumeState,
  useResumeSummaryState,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";

export const Results = () => {
  const step = useResumeState((state) => state.step);
  const details = useResumeDetailsState((state) => state);
  const summary = useResumeSummaryState((state) => state);
  const workplaces = useResumeWorkHistoryState((state) => state);
  const education = useResumeEducationHistoryState((state) => state);

  const buttonTitle = () => {
    switch (step) {
      case ResumeStep.Details:
        return "Generate Details";
      case ResumeStep.Summary:
        return "Generate Summary";
      case ResumeStep.Workplaces:
        return "Generate Work History";
      case ResumeStep.Education:
        return "Generate Educational History";
    }
  };

  const onGenerateClick = async () => {
    const service = new OpenAIService();
    const input: ResumeInput = { details, summary, workplaces, education };
    let detailsResult = details.result;
    let summaryResult = summary.result;
    let workplaceResult = workplaces.result;
    let educationResult = education.result;

    switch (step) {
      case ResumeStep.Details: {
        detailsResult = await service.generateResumeDetails(input);
        break;
      }
      case ResumeStep.Summary: {
        summaryResult = await service.generateResumeSummary(input);
        break;
      }
      case ResumeStep.Workplaces: {
        workplaceResult = await service.generateResumeWorkHistory(input);
        break;
      }
      case ResumeStep.Education: {
        educationResult = await service.generateResumeEducationHistory(input);
        break;
      }
    }

    details.setResult(detailsResult);
    summary.setResult(summaryResult);
    workplaces.setResult(workplaceResult);
    education.setResult(educationResult);

    const result = [
      ...detailsResult,
      ...summaryResult,
      ...workplaceResult,
      ...educationResult,
    ];
    return result;
  };

  return (
    <ResultsComponent
      generateButtonTitle={buttonTitle()}
      onGenerateClick={onGenerateClick}
    />
  );
};

export const ResumePage = () => {
  const state = useResumeState((state) => state);

  const Content = () => {
    switch (state.step) {
      case ResumeStep.Details:
        return <ResumeDetails />;
      case ResumeStep.Summary:
        return <ResumeSummary />;
      case ResumeStep.Workplaces:
        return <ResumeWorkplaces />;
      case ResumeStep.Education:
        return <ResumeEducation />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.RESUME);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <ul className="steps has-content-centered">
            <li
              className={
                "steps-segment " +
                (state.step === ResumeStep.Details ? "is-active" : "")
              }
            >
              <span className="steps-marker">1</span>
              <div className="steps-content">
                <p className="is-size-4">
                  <a onClick={() => state.setStep(ResumeStep.Details)}>
                    Details
                  </a>
                </p>
              </div>
            </li>
            <li
              className={
                "steps-segment " +
                (state.step === ResumeStep.Summary ? "is-active" : "")
              }
            >
              <span className="steps-marker">2</span>
              <div className="steps-content">
                <p className="is-size-4">
                  <a onClick={() => state.setStep(ResumeStep.Summary)}>
                    Summary
                  </a>
                </p>
              </div>
            </li>
            <li
              className={
                "steps-segment " +
                (state.step === ResumeStep.Workplaces ? "is-active" : "")
              }
            >
              <span className="steps-marker">3</span>
              <div className="steps-content">
                <p className="is-size-4">
                  <a onClick={() => state.setStep(ResumeStep.Workplaces)}>
                    Experience
                  </a>
                </p>
              </div>
            </li>
            <li
              className={
                "steps-segment " +
                (state.step === ResumeStep.Education ? "is-active" : "")
              }
            >
              <span className="steps-marker">4</span>
              <div className="steps-content">
                <p className="is-size-4">
                  <a onClick={() => state.setStep(ResumeStep.Education)}>
                    Education
                  </a>
                </p>
              </div>
            </li>
          </ul>
          <Content />
          <div className="mt-4">
            <Results />
          </div>
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
