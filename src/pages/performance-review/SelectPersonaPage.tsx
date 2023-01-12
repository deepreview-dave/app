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
    navigate(API_ROUTES.PERF_REVIEW_RESULT);
  };

  const CardSelf = () => {
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h4>Myself</h4>
            <p>Create a performace review for yourself.</p>
            <p>
              <button
                className="button is-primary"
                onClick={() => onButtonClick(Relationship.MYSELF)}
              >
                Select
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const CardColleague = () => {
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h4>A colleague</h4>
            <p>Create a performace review for a colleague.</p>
            <p>
              <button
                className="button is-primary"
                onClick={() => onButtonClick(Relationship.COLLEAGUE)}
              >
                Select
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const CardManager = () => {
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h4>My manager</h4>
            <p>Create a performace review for your manager.</p>
            <p>
              <button
                className="button is-primary"
                onClick={() => onButtonClick(Relationship.MANAGER)}
              >
                Select
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const CardReport = () => {
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h4>A direct report</h4>
            <p>Create a performace review for a direct report.</p>
            <p>
              <button
                className="button is-primary"
                onClick={() => onButtonClick(Relationship.REPORT)}
              >
                Select
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <PersonaBreadcrumbs />
      <div className="layout m-4">
        <div className="container narrow-container">
          <div className="content">
            <div className="columns">
              <div className="column">
                <h3>Select person</h3>
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="columns is-multiline has-text-centered">
            <div className="column is-6">
              <CardSelf />
            </div>
            <div className="column is-6">
              <CardColleague />
            </div>
            <div className="column is-6">
              <CardManager />
            </div>
            <div className="column is-6">
              <CardReport />
            </div>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
