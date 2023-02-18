import { ResumePrepBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../state/resume-analyser.state";
import { ResumePrepDetails } from "./subsections/ResumePrepDetails";
import { ResumePrepSkills } from "./subsections/ResumePrepSkills";
import { ResumePrepSummary } from "./subsections/ResumePrepSummary";

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
      default:
        return null;
    }
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumePrepBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Prepare Resume</h3>
            <p>DeepReview has successfully analysed your Resume.</p>
          </div>
          <hr />
          <MainContent />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
