import { useAppState } from "../state/app.state";

export const ReviewHeader = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);

  const clearInputs = useAppState((state) => state.clearInputs);

  return (
    <div className="columns is-vcentered is-mobile">
      <div className="column">
        <strong>Performance review:</strong>
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
