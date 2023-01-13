import { useAppState } from "../../state/app.state";

export const ReviewTitleControl = () => {
  const clearInputs = useAppState((state) => state.clearInputs);

  return (
    <div className="content">
      <h3>What are the details?</h3>
      <p>
        Fill in the details below and click <b>Generate</b> to see the result.
        Click <a onClick={clearInputs}>here</a> to clear everything.
      </p>
    </div>
  );
};
