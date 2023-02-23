import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../business/analytics";
import { ComingSoon } from "../../components/coming-soon/ComingSoon";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";

export const ResignationLetterPage = () => {
  useEffect(() => {
    Analytics.loaded();
    Analytics.tool(AnalyticsToolName.REFERRAL_LETTER);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <ComingSoon />
        </div>
      </div>
      <Footer />
    </div>
  );
};
