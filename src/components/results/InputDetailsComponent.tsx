import { useEffect } from "react";
import { useInputDetailsState } from "../../state/input-details.state";
import { useResultState } from "../../state/result-state";
import { AutoTextArea } from "../common/AutoTextArea";

export const InputDetailsComponent = (props: {
  hint: string;
  resultLoading: boolean;
  onHintClick: () => Promise<string>;
}) => {
  const loading = useInputDetailsState((state) => state.loading);
  const setLoading = useInputDetailsState((state) => state.setLoading);

  const details = useInputDetailsState((state) => state.details);
  const setDetails = useInputDetailsState((state) => state.setDetails);
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const onHintClick = async () => {
    setLoading();
    try {
      const hint = await props.onHintClick();
      setDetails(hint);
    } catch (e: any) {
      setError(e.message);
      setDetails(details);
    }
  };

  useEffect(() => {
    setDetails("default");
    setTimeout(() => {
      setDetails("");
    }, 10);
  }, []);

  useEffect(() => {
    resetError();
  }, [details]);

  return (
    <>
      <div className="">
        <AutoTextArea
          className="input"
          disabled={loading || props.resultLoading}
          value={details}
          placeholder={props.hint}
          index={999}
          onChange={(e, i) => setDetails(e)}
        />
      </div>
      <div className="columns is-mobile is-vcentered pt-1">
        <div
          className="column pr-0 is-monospace is-size-7"
          style={{ textAlign: "right" }}
        >
          Click here to get a starting point:
        </div>
        <div className="column is-narrow">
          <button
            title="Let DeepReview provide some bullet points as inspiration"
            disabled={loading || props.resultLoading}
            className={"button is-text " + (loading ? "is-loading" : "")}
            onClick={onHintClick}
          >
            Auto Generate Details
          </button>
        </div>
      </div>
    </>
  );
};
