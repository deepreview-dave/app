import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../business/analytics";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { ResultControlPanel } from "../../components/control/ResultControlPanel";
import { ResultsError } from "../../components/results/ResultsError";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { useControlPanelState } from "../../state/control-panel.state";
import { PraiseDetails } from "./PraiseDetails";
import { PraiseResult } from "./PraiseResult";

export const PraisePage = () => {
  const state = useControlPanelState((state) => state);

  useEffect(() => {
    Analytics.loaded();
    Analytics.tool(AnalyticsToolName.PRAISE);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Give Praise</h3>
            <p>
              Say thank you to a colleague that helped you out and let
              DeepReview guide you.
            </p>
          </div>
          <ResultControlPanel
            fileName="praise.pdf"
            tutorial="https://medium.com/@contact_29453/how-to-give-praise-with-deepreview-e6c6a86aebe9"
          />
          {state.isEdit && <PraiseDetails />}
          {(state.isPreview || state.isDownloading) && <PraiseResult />}
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
