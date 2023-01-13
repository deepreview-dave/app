import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../..";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { TypeBreadcrumbs } from "../../components/performance-review/ReviewBreadcrumbs";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";

export const SelectTypePage = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(API_ROUTES.PERF_REVIEW_RESULT);
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <TypeBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>What is the format of the review?</h3>
            <p>
              Select the type of performance review from the templates below.
            </p>
          </div>
          <div className="content">
            <p className="light-border">
              <b>
                <a onClick={() => onButtonClick()}>Attribute based</a>
              </b>
              <br />
              <small>
                Craft a performance review starting from pre made attributes.
              </small>
            </p>
            <p className="has-text-grey-light light-border">
              <b>
                <span>Freeform summary (Coming soon)</span>
              </b>
              <br />
              <small>Start your review from a single short summary.</small>
            </p>
            <p className="has-text-grey-light light-border">
              <b>
                <span>Start / Stop / Continue (Coming soon)</span>
              </b>
              <br />
              <small>
                Provide information on things a colleague can start doing,
                continue doing and should stop doing.
              </small>
            </p>
            <p className="has-text-grey-light light-border">
              <b>
                <span>Strengths / Areas of improvements (Coming soon)</span>
              </b>
              <br />
              <small>Describe strengs as well as areas of improvement.</small>
            </p>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
