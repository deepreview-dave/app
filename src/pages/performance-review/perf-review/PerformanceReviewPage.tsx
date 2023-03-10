import "../../../index.css";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { Footer } from "../../../components/common/Footer";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResultsError } from "../../../components/results/ResultsError";
import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { useControlPanelState } from "../../../state/control-panel.state";
import { ResultControlPanel } from "../../../components/control/ResultControlPanel";
import { PerformanceReviewDetails } from "./PerformanceReviewDetails";
import { PerformanceReviewResult } from "./PerformanceReviewResult";

export const PerformanceReviewPage = () => {
  const state = useControlPanelState((state) => state);

  useEffect(() => {
    Analytics.loaded();
    Analytics.tool(AnalyticsToolName.PERF_REVIEW);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Performance Review</h3>
            <p>
              Fill in all the details below and click 'Generate' to create a new
              Performance Review.
            </p>
          </div>
          <ResultControlPanel
            fileName="perf-review.pdf"
            tutorial="https://medium.com/@contact_29453/how-to-create-a-performance-review-with-deepreview-57be37ebef68"
          />
          {state.isEdit && <PerformanceReviewDetails />}
          {(state.isPreview || state.isDownloading) && (
            <PerformanceReviewResult />
          )}
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
