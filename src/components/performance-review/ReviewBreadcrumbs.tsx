import { useAppState } from "../../state/app.state";

export const ReviewBreadcrumbs = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const clearInputs = useAppState((state) => state.clearInputs);

  return (
    <div className="columns ml-2 mr-2 mt-1 is-vcentered">
      <div className="column">
        <nav
          className="breadcrumb has-succeeds-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <a href="/">DeppReview</a>
            </li>
            <li>
              <a href="/">Tools</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                Performace Reviews
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="column is-narrow">
        <button
          disabled={!inputEnabled}
          className="button is-info"
          onClick={clearInputs}
        >
          New
        </button>
      </div>
    </div>
  );
};
