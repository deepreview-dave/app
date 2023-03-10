import { API_ROUTES } from "../..";
import { LogoSmall } from "./Logo";

export const NavbarMin = () => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href={API_ROUTES.HOME}>
            <LogoSmall />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href={API_ROUTES.HOME}>
              Home
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Tools</a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  href={API_ROUTES.AUTO_REVIEW_RESUME_ANALYSE}
                >
                  Resume Enhancer
                </a>
                <a className="navbar-item" href={API_ROUTES.RESUME_CV}>
                  Resume Creator
                </a>
                <a
                  className="navbar-item"
                  href={API_ROUTES.PERF_REVIEW_PERSONA}
                >
                  Performance Reviews
                </a>
                <a
                  className="navbar-item"
                  href={API_ROUTES.RESUME_COVER_LETTER}
                >
                  Cover Letters
                </a>
                <a className="navbar-item" href={API_ROUTES.RESUME_REFERRAL}>
                  Referral Letters
                </a>
                <a className="navbar-item" href={API_ROUTES.PRAISE}>
                  Give Praise
                </a>
                <a className="navbar-item" href={API_ROUTES.RESIGNATION_LETTER}>
                  Resignation Letter
                </a>
                <a className="navbar-item" href={API_ROUTES.COMPENSATION}>
                  Compensation & Promotions
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr className="m-0 p-0" />
    </>
  );
};
