import "../../../index.css";
import { CoverLetterBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResultsError } from "../../../components/results/ResultsError";
import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { CoverLetterDetails } from "./CoverLetterDetails";
import { useControlPanelState } from "../../../state/control-panel.state";
import { ResultControlPanel } from "../../../components/control/ResultControlPanel";
import { CoverLetterResult } from "./CoverLetterResult";

export const CoverLetterPage = () => {
  const state = useControlPanelState((state) => state);

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.COVER_LETTER);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <CoverLetterBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Cover Letter</h3>
            <p>
              Fill in all the details below and click 'Generate' to create a new
              Cover Letter.
            </p>
          </div>
          <ResultControlPanel
            fileName="cover-letter.pdf"
            tutorial="https://medium.com/@contact_29453/how-to-create-a-meaningful-cover-letter-with-deepreview-791645be2455"
          />
          {state.isEdit && <CoverLetterDetails />}
          {(state.isPreview || state.isDownloading) && <CoverLetterResult />}
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
