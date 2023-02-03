import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ResumeInput, ToolName } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { ResumeBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import {
  ResultsComponent,
  ResultsError,
} from "../../../components/results/ResultsComponent";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { useResultState } from "../../../state/result-state";
import {
  ResumeStep,
  useResumeDetailsState,
  useResumeEducationHistoryState,
  useResumeState,
  useResumeSummaryState,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";
import { useToolState } from "../../../state/tool-state";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeResult } from "./ResumeResult";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";

export const Results = () => {
  const currentResult = useResultState((state) => state.results);
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
      case ResumeStep.Result:
        return "See the Result";
    }
  };

  const onGenerateClick = async () => {
    const service = new OpenAIService();
    const input: ResumeInput = { details, summary, workplaces, education };
    let detailsResult = currentResult.filter(
      (i) => i.tool === ToolName.Resume_Details
    );
    let summaryResult = currentResult.filter(
      (i) => i.tool === ToolName.Resume_Summary
    );
    let workplaceResult = currentResult.filter(
      (i) => i.tool === ToolName.Resume_Work
    );
    let educationResult = currentResult.filter(
      (i) => i.tool === ToolName.Resume_Education
    );

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
  const setTool = useToolState((state) => state.setTool);
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
      case ResumeStep.Result:
        return <ResumeResult />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    setTool(ToolName.Resume_Details);
    Analytics.tool(AnalyticsToolName.RESUME);
  }, []);

  const setCurrentStep = (step: ResumeStep) => {
    state.setStep(step);
    switch (step) {
      case ResumeStep.Details: {
        setTool(ToolName.Resume_Details);
        break;
      }
      case ResumeStep.Summary: {
        setTool(ToolName.Resume_Summary);
        break;
      }
      case ResumeStep.Workplaces: {
        setTool(ToolName.Resume_Work);
        break;
      }
      case ResumeStep.Education: {
        setTool(ToolName.Resume_Education);
        break;
      }
      case ResumeStep.Result: {
        setTool(ToolName.None);
        break;
      }
    }
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>Resume</h3>
            <p>
              Fill in each of the sections below individually. At each step,
              click the corresponsing 'Generate' button to let DeepReview create
              a section of your resume.
            </p>
          </div>
          <ul className="steps has-content-centered pt-2">
            <li
              className={
                "steps-segment " +
                (state.step === ResumeStep.Details ? "is-active" : "")
              }
            >
              <span className="steps-marker">1</span>
              <div className="steps-content">
                <p className="is-size-4">
                  <a onClick={() => setCurrentStep(ResumeStep.Details)}>
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
                  <a onClick={() => setCurrentStep(ResumeStep.Summary)}>
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
                  <a onClick={() => setCurrentStep(ResumeStep.Workplaces)}>
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
                  <a onClick={() => setCurrentStep(ResumeStep.Education)}>
                    Education
                  </a>
                </p>
              </div>
            </li>
            <li
              className={
                "steps-segment " +
                (state.step === ResumeStep.Result ? "is-active" : "")
              }
            >
              <span className="steps-marker">5</span>
              <div className="steps-content">
                <p className="is-size-4">
                  <a onClick={() => setCurrentStep(ResumeStep.Result)}>
                    Result
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
