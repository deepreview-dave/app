import "../index.css";
import { Footer } from "../components/common/Footer";
import { NameEditor } from "../components/NameEditor";
import { PerformanceScoreEditor } from "../components/PerformanceScoreEditor";
import { ResultBlock } from "../components/ResultBlock";
import { RoleEditor } from "../components/RoleEditor";
import { DepartmentEditor } from "../components/DepartmentEditor";
import { SubmitControl } from "../components/SubmitControl";
import { MoreAttributes } from "../components/MoreAttributes";
import { TimePeriodEditor } from "../components/TimePeriodEditor";
import { ReviewToneEditor } from "../components/ReviewToneEditor";
import { ReviewLanguageEditor } from "../components/ReviewLanguageEditor";
import { PronounEditor } from "../components/PronounEditor";
import { RelationshipEditor } from "../components/RelationshipEditor";
import { SubscribeFrom } from "../components/subscribe/SubscribeForm";
import { NavbarMin } from "../components/common/NavbarMin";
import { ReviewBreadcrumbs } from "../components/performance-review/ReviewBreadcrumbs";

const PerformanceReviewPage = () => {
  return (
    <div className="main-body">
      <NavbarMin />
      <ReviewBreadcrumbs />
      <div className="layout m-4">
        <div className="container narrow-container">
          <div className="card simple-card">
            <div className="card-content">
              <div className="content">
                <RelationshipEditor />
                <NameEditor />
                <PerformanceScoreEditor />
                <PronounEditor />
                <RoleEditor />
                <DepartmentEditor />
                <TimePeriodEditor />
                <ReviewToneEditor />
                <ReviewLanguageEditor />
                <MoreAttributes />
                <hr />
                <SubmitControl />
              </div>
            </div>
          </div>
          <ResultBlock />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};

export default PerformanceReviewPage;
