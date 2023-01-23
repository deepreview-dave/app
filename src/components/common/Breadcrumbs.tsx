import { API_ROUTES } from "../..";

export const PersonaBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li>
          <a href={API_ROUTES.PERF_REVIEW_PERSONA}>Performance Review</a>
        </li>
        <li className="is-active">
          <a>Persona</a>
        </li>
      </ul>
    </nav>
  );
};

export const ResultsBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li>
          <a href={API_ROUTES.PERF_REVIEW_PERSONA}>Performance Review</a>
        </li>
        <li>
          <a href={API_ROUTES.PERF_REVIEW_PERSONA}>Persona</a>
        </li>
        <li className="is-active">
          <a>Result</a>
        </li>
      </ul>
    </nav>
  );
};

export const ResumeToolBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li>
          <a href={API_ROUTES.RESUME_TOOL}>Resumes & Cover Letters</a>
        </li>
        <li className="is-active">
          <a>Tools</a>
        </li>
      </ul>
    </nav>
  );
};

export const CoverLetterBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li>
          <a href={API_ROUTES.RESUME_TOOL}>Resumes & Cover Letters</a>
        </li>
        <li>
          <a href={API_ROUTES.RESUME_TOOL}>Tools</a>
        </li>
        <li className="is-active">
          <a>Cover Letter</a>
        </li>
      </ul>
    </nav>
  );
};

export const ReferralLetterBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li>
          <a href={API_ROUTES.RESUME_TOOL}>Resumes & Cover Letters</a>
        </li>
        <li>
          <a href={API_ROUTES.RESUME_TOOL}>Tools</a>
        </li>
        <li className="is-active">
          <a>Referral Letter</a>
        </li>
      </ul>
    </nav>
  );
};
