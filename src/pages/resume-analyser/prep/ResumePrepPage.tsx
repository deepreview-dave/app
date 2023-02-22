import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../state/resume-analyser.state";
import { ResumePrepSteps } from "./subcomponents/ResumePrepSteps";
import { ResumePrepDetails } from "./subsections/ResumePrepDetails";
import { ResumePrepEducation } from "./subsections/ResumePrepEducation";
import { ResumePrepFinal } from "./subsections/ResumePrepFinal";
import { ResumePrepSkills } from "./subsections/ResumePrepSkills";
import { ResumePrepSummary } from "./subsections/ResumePrepSummary";
import { ResumePrepWork } from "./subsections/ResumePrepWork";

export const ResumePrepPage = () => {
  const step = useResumePrepareState((state) => state.step);

  const MainContent = () => {
    switch (step) {
      case ResumePrepareStep.Details:
        return <ResumePrepDetails />;
      case ResumePrepareStep.Skills:
        return <ResumePrepSkills />;
      case ResumePrepareStep.Summary:
        return <ResumePrepSummary />;
      case ResumePrepareStep.Work:
        return <ResumePrepWork />;
      case ResumePrepareStep.Education:
        return <ResumePrepEducation />;
      case ResumePrepareStep.Finish:
        return <ResumePrepFinal />;
      default:
        return null;
    }
  };

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.RESUME_PREP);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <ResumePrepSteps />
          <hr />
          <MainContent />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
