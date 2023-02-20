import { API_ROUTES } from "../..";

export const PersonaBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
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
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
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
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
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
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
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
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
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

export const ResumeBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
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
          <a>Resume</a>
        </li>
      </ul>
    </nav>
  );
};

export const PraiseBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li className="is-active">
          <a>Praise</a>
        </li>
      </ul>
    </nav>
  );
};

export const ResumeAnalyserBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li className="is-active">
          <a>Resume Analyser</a>
        </li>
      </ul>
    </nav>
  );
};

export const ResumePrepBreadcrumbs = () => {
  return (
    <nav
      className="m-4 breadcrumb has-succeeds-separator display-desktop"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a href={API_ROUTES.HOME}>DeepReview</a>
        </li>
        <li>
          <a href={API_ROUTES.AUTO_REVIEW_RESUME_ANALYSE}>Resume Analyser</a>
        </li>
        <li className="is-active">
          <a>Resume Prepare</a>
        </li>
      </ul>
    </nav>
  );
};
