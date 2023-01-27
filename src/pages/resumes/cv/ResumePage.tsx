import { ResumeBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResumeStep, useResumeState } from "../../../state/resume.state";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";

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
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
