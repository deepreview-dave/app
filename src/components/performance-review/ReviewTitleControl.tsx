import { useAppState } from "../../state/app.state";

export const ReviewTitleControl = () => {
  const relationship = useAppState((state) => state.inputs.relationship);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const clearInputs = useAppState((state) => state.clearInputs);

  return (
    <div className="content">
      <div className="columns is-vcentered">
        <div className="column">
          <h3>Performance review {relationship}</h3>
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
      {/* <hr /> */}
    </div>
  );
};
