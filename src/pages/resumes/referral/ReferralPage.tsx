import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ReferralLetterBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { ResultControlPanel } from "../../../components/control/ResultControlPanel";
import { ResultsError } from "../../../components/results/ResultsError";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { useControlPanelState } from "../../../state/control-panel.state";
import { ReferralDetails } from "./ReferralDetails";
import { ReferralResult } from "./ReferralResult";

export const ReferralPage = () => {
  const state = useControlPanelState((state) => state);

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.REFERRAL_LETTER);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <ReferralLetterBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Referral Letter</h3>
            <p>
              Fill in all the details below and click 'Generate' to create a new
              Referral Letter.
            </p>
            <p>
              <small>
                You'll need to fill in your own details, then the recipient's
                (who is usually a manager or HR representative) and finally the
                details of the person you are writing the Referral Letter for.
              </small>
            </p>
          </div>
          <ResultControlPanel
            fileName="referral.pdf"
            tutorial="https://medium.com/@contact_29453/how-to-create-a-meaningful-referral-letter-with-deepreview-e0b0c17f0e16"
          />
          {state.isEdit && <ReferralDetails />}
          {(state.isPreview || state.isDownloading) && <ReferralResult />}
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
