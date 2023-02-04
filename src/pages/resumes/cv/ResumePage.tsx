import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ResumeBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { ResultsError } from "../../../components/results/ResultsError";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";

export const ResumePage = () => {
  useEffect(() => {
    Analytics.tool(AnalyticsToolName.RESUME);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeBreadcrumbs />
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
          <ResumeDetails />
          <ResumeSummary />
          <ResumeWorkplaces />
          <ResumeEducation />
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
