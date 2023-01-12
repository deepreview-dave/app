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

export const ReviewBreadcrumbs = () => {
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
