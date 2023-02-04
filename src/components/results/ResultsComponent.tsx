import { useResultState } from "../../state/result-state";

export const ResultsError = () => {
  const error = useResultState((state) => state.errorMessage);

  if (!error) {
    return null;
  }

  return (
    <article className="message is-danger">
      <div className="message-header">
        <p>Error</p>
      </div>
      <div className="message-body">{error}</div>
    </article>
  );
};
