import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../..";
import { Relationship } from "../../business/common";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { PersonaBreadcrumbs } from "../../components/performance-review/ReviewBreadcrumbs";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { useAppState } from "../../state/app.state";

export const SelectPersonaPage = () => {
  const navigate = useNavigate();
  const clearInputs = useAppState((state) => state.clearInputs);
  const updateRelationship = useAppState((state) => state.updateRelationship);

  const onButtonClick = (relationship: Relationship) => {
    clearInputs();
    updateRelationship(relationship);
    navigate(API_ROUTES.PERF_REVIEW_TYPE);
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
            <p>
              <b>
                <a onClick={() => onButtonClick(Relationship.MYSELF)}>Myself</a>
              </b>
            </p>
            <p>
              <b>
                <a onClick={() => onButtonClick(Relationship.COLLEAGUE)}>
                  A colleague
                </a>
              </b>
            </p>
            <p>
              <b>
                <a onClick={() => onButtonClick(Relationship.MANAGER)}>
                  My manager
                </a>
              </b>
            </p>
            <p>
              <b>
                <a onClick={() => onButtonClick(Relationship.REPORT)}>
                  A direct report
                </a>
              </b>
            </p>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
