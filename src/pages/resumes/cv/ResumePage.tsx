import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ResumeBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { ResultsError } from "../../../components/results/ResultsError";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResumeStep, useResumeState } from "../../../state/resume.state";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeResult } from "./ResumeResult";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";

export const ResumePage = () => {
  const state = useResumeState((state) => state);

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.RESUME);
  }, []);

  const InfoOrResultButton = () => {
    switch (state.step) {
      case ResumeStep.Input: {
        return (
          <button
            className="button is-success"
            onClick={() => state.seeResult()}
          >
            See Result
          </button>
        );
      }
      case ResumeStep.Result: {
        return (
          <button className="button" onClick={() => state.seeInput()}>
            Edit Input
          </button>
        );
      }
    }
  };

  const Content = () => {
    switch (state.step) {
      case ResumeStep.Input: {
        return (
          <>
            <ResumeDetails />
            <ResumeSummary />
            <ResumeWorkplaces />
            <ResumeEducation />
            <ResultsError />
          </>
        );
      }
      case ResumeStep.Result: {
        return <ResumeResult />;
      }
    }
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <div className="columns is-mobile is-vcentered">
              <div className="column">
                <h3>Resume</h3>
                <p>
                  Fill in each of the sections below individually. At each step,
                  click the corresponsing 'Generate' button to let DeepReview
                  create a section of your resume.
                </p>
              </div>
              <div className="column is-narrow">
                <InfoOrResultButton />
              </div>
            </div>
          </div>
          <Content />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
