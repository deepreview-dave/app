import "../../index.css";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { ResumeToolBreadcrumbs } from "../../components/common/Breadcrumbs";
import { API_ROUTES } from "../..";

export const ResumeSelectionPage = () => {
  const navigate = useNavigate();

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
                <a onClick={() => navigate(API_ROUTES.RESUME_COVER_LETTER)}>
                  Cover Letter
                </a>
              </b>
              <br />
              <small>Prepare the perfect cover letter</small>
            </p>
            <p className="light-border">
              <b>
                <a onClick={() => navigate(API_ROUTES.RESUME_REFERRAL)}>
                  Referral Letter
                </a>
              </b>
              <br />
              <small>
                Get help writing a referral letter for a colleague or friend
              </small>
            </p>
            <p className="light-border">
              <b>
                <a onClick={() => navigate(API_ROUTES.RESUME_CV)}>Resume</a>
              </b>
              <br />
              <small>Get help writing different sections of you resume</small>
            </p>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
