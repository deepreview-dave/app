import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { ResultsError } from "../../../components/results/ResultsError";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeResult } from "./ResumeResult";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";
import { ResultControlPanel } from "../../../components/control/ResultControlPanel";
import { useControlPanelState } from "../../../state/control-panel.state";
import { ResumeLanguages } from "./ResumeLanguages";

export const ResumePage = () => {
  const state = useControlPanelState((state) => state);

  useEffect(() => {
    Analytics.loaded();
    Analytics.tool(AnalyticsToolName.RESUME);
  }, []);

  const Content = () => {
    return (
      <>
        <ResumeDetails />
        <ResumeSummary />
        <ResumeLanguages />
        <ResumeWorkplaces />
        <ResumeEducation />
        <ResultsError />
      </>
    );
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Resume</h3>
            <p>
              Fill in each of the sections below individually. At each step,
              click the corresponsing 'Generate' button to let DeepReview create
              a section of your resume.
            </p>
          </div>
          <ResultControlPanel
            fileName="resume.pdf"
            tutorial="https://medium.com/@contact_29453/how-to-write-a-resume-with-deepreview-9f44e3b1f3f3"
          />
          {state.isEdit && <Content />}
          {(state.isPreview || state.isDownloading) && <ResumeResult />}
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
