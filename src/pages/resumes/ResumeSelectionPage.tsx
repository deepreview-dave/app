import "../../index.css";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../..";
import { Relationship } from "../../business/common";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { usePerformanceReviewState } from "../../state/perf-review.state";
import { ResumeToolBreadcrumbs } from "../../components/common/Breadcrumbs";

export const ResumeSelectionPage = () => {
  const navigate = useNavigate();
  // const updateRelationship = usePerformanceReviewState(
  //   (state) => state.setRelationship
  // );

  const onButtonClick = () => {
    // updateRelationship(relationship);
    // navigate(API_ROUTES.PERF_REVIEW_RESULT);
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeToolBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>Select Tool</h3>
            <p>
              Select the tool that's most appropriate to help you with your job
              hunting.
            </p>
          </div>
          <div className="content">
            <p className="light-border">
              <b>
                <a onClick={() => onButtonClick()}>Cover Letter</a>
              </b>
              <br />
              <small>Prepare the perfect cover letter</small>
            </p>
            <p className="light-border has-text-grey">
              <b>
                {/* <a> */}
                Resume (Coming Soon)
                {/* </a> */}
              </b>
              <br />
              <small>Get help writing different sections of you resume</small>
            </p>
            <p className="light-border has-text-gray">
              <b>
                {/* <a> */}
                Referral (Coming Soon)
                {/* </a> */}
              </b>
              <br />
              <small>Get help writing a referral for a colleague</small>
            </p>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
