import { Link } from "react-router-dom";
import { API_ROUTES } from "../..";
import { LogoSmall } from "./Logo";

export const NavbarMin = () => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <LogoSmall />
          </Link>

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
            <Link className="navbar-item" to={"/"}>
              Home
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Tools</a>

              <div className="navbar-dropdown">
                <Link
                  className="navbar-item"
                  to={API_ROUTES.PERF_REVIEW_PERSONA}
                >
                  Performance Reviews
                </Link>
                <span className="navbar-item has-text-grey-light">
                  Compensation & Promotions (Coming Soon)
                </span>
                <span className="navbar-item has-text-grey-light">
                  Resumes & Cover Letters (Coming Soon)
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr className="m-0 p-0" />
    </>
  );
};
