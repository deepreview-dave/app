import { useEffect } from "react";
import { useInputDetailsState } from "../../state/input-details.state";
import { useResultState } from "../../state/result-state";
import { AutoTextArea } from "../common/AutoTextArea";

export const InputDetailsComponent = (props: {
  hint: string;
  onHintClick: () => Promise<string>;
}) => {
  const loading = useInputDetailsState((state) => state.loading);
  const resultLoading = useResultState((state) => state.loading);
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
      <div className="pl-2 pr-2 pt-2 pb-1">
        <AutoTextArea
          disabled={loading || resultLoading}
          value={details}
          placeholder={props.hint}
          index={999}
          onChange={(e, i) => setDetails(e)}
        />
      </div>
      <div className="horizontal-line"></div>
      <div className="p-2">
        <button
          title="Let DeepReview provide some bullet points as inspiration"
          disabled={loading || resultLoading}
          className={"button is-text " + (loading ? "is-loading" : "")}
          onClick={onHintClick}
        >
          Inspiration
        </button>
      </div>
    </>
  );
};
