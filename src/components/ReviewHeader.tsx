import { useAppState } from "../state/state";

export const ReviewHeader = () => {
  const clearInputs = useAppState((state) => state.clearInputs);

  return (
    <div className="columns is-vcentered">
      <div className="column">
        <strong>Performance review:</strong>
      </div>
      <div className="column is-narrow">
        <button className="button is-info" onClick={clearInputs}>
          New
        </button>
      </div>
    </div>
  );
};
