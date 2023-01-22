import "../../index.css";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../..";
import { Relationship } from "../../business/common";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { usePerformanceReviewState } from "../../state/perf-review.state";
import { PersonaBreadcrumbs } from "../../components/common/Breadcrumbs";

export const SelectPersonaPage = () => {
  const navigate = useNavigate();
  const updateRelationship = usePerformanceReviewState(
    (state) => state.setRelationship
  );

  const onButtonClick = (relationship: Relationship) => {
    updateRelationship(relationship);
    navigate(API_ROUTES.PERF_REVIEW_RESULT);
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <PersonaBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>Who is this review for?</h3>
            <p>Start by selecting who this performace review is for.</p>
          </div>
          <div className="content">
            <p className="light-border">
              <b>
                <a onClick={() => onButtonClick(Relationship.MYSELF)}>Myself</a>
              </b>
              <br />
              <small>
                Build the performance review for your self-assessment
              </small>
            </p>
            <p className="light-border">
              <b>
                <a onClick={() => onButtonClick(Relationship.COLLEAGUE)}>
                  A colleague
                </a>
              </b>
              <br />
              <small>
                Build the performance review for a peer as part of 360 feedback
              </small>
            </p>
            <p className="light-border">
              <b>
                <a onClick={() => onButtonClick(Relationship.MANAGER)}>
                  My manager
                </a>
              </b>
              <br />
              <small>
                Build the performance review for your manager as part of upward
                assessment
              </small>
            </p>
            <p className="light-border">
              <b>
                <a onClick={() => onButtonClick(Relationship.REPORT)}>
                  A direct report
                </a>
              </b>
              <br />
              <small>
                Build the performance review for a person you are managing
              </small>
            </p>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
