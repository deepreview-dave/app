import * as bulmaToast from "bulma-toast";
import { Analytics } from "../../business/analytics";
import { AIResult } from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { useResultState } from "../../state/result-state";
import { useToolState } from "../../state/tool-state";
import { AutoTextArea } from "../common/AutoTextArea";

export const ResultsComponent = (props: {
  onGenerateClick: () => Promise<AIResult[]>;
  generateButtonTitle?: string;
  onResultsGenerated?: (results: AIResult[]) => void;
}) => {
  const tool = useToolState((state) => state.tool);

  const loading = useResultState((state) => state.loading);
  const reloadedSection = useResultState((state) => state.reloadedSection);
  const setLoading = useResultState((state) => state.setLoading);

  const results = useResultState((state) => state.results);
  const setResults = useResultState((state) => state.setResults);

  const updateResult = useResultState((state) => state.updateResult);
  const addElement = useResultState((state) => state.addElement);
  const removeElement = useResultState((state) => state.removeElement);
  const resetElement = useResultState((state) => state.resetElement);
  const setReloading = useResultState((state) => state.setReloading);
  const setError = useResultState((state) => state.setError);

  const onGenerateClick = async () => {
    setLoading();
    try {
      const result = await props.onGenerateClick();
      setResults(result);
      Analytics.generated();
      props.onResultsGenerated?.(result);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onExpandClick = async (value: string, index: number) => {
    setReloading(index);
    try {
      const result = await new OpenAIService().expandText(value);
      updateResult(result, index);
      Analytics.expanded();
      props.onResultsGenerated?.(results);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onCopyClick = async () => {
    Analytics.copied();
    const answer = results.map((e) => e.expanded).join("\n\n");
    await navigator.clipboard.writeText(answer);
    bulmaToast.toast({
      message: "Copied to clipboard",
      type: "is-info",
      position: "bottom-center",
      closeOnClick: true,
      duration: 1000,
      animate: { in: "fadeIn", out: "fadeOut" },
    });
  };

  return (
    <>
      <div className="buttons">
        <button
          title="Generate a result based on all your inputs"
          disabled={loading}
          className={"button is-primary " + (loading ? "is-loading" : "")}
          onClick={onGenerateClick}
        >
          {props.generateButtonTitle}
        </button>
        <button
          title="Copy all generated results to clipboard."
          disabled={loading}
          className="button"
          onClick={onCopyClick}
        >
          Copy result to clipboard
        </button>
      </div>
      <div className="">
        {results.map((res, i) => (
          <div className="results-container" key={i}>
            <div
              className={
                i === 0
                  ? res.joined
                    ? "top-content no-bottom"
                    : "top-content"
                  : i === results.length - 1
                  ? "bottom-content"
                  : res.joined
                  ? "normal-content no-bottom"
                  : "normal-content"
              }
            >
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={
                    !res.editable || loading || reloadedSection !== undefined
                  }
                  title="Let DeepReview automatically expand this section."
                  className={
                    "button is-white is-small has-text-info is-text " +
                    (reloadedSection === i ? "is-loading" : "") +
                    (!res.editable ? "is-not-visible" : "")
                  }
                  onClick={() => onExpandClick(res.expanded, i)}
                >
                  Expand
                  {/* <span className="icon is-small">
                    <i className="fas fa-sync"></i>
                  </span> */}
                </button>
              </div>
              <div
                className={
                  "big-div pt-5 pl-3 pr-3 " + (!res.joined ? "pb-5" : "")
                }
              >
                <AutoTextArea
                  disabled={loading || reloadedSection === i}
                  index={i}
                  value={res.expanded}
                  className="autotext-area"
                  placeholder="Please enter more details..."
                  onChange={(e, i) => updateResult(e, i)}
                  onBlur={() => removeElement(i)}
                />
              </div>
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={
                    !res.editable || loading || reloadedSection !== undefined
                  }
                  title="Undo"
                  className={
                    "button is-small is-white " +
                    (!res.editable ? "is-not-visible" : "")
                  }
                  onClick={() => resetElement(i)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-history"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="plus-button-holder">
              <button
                disabled={loading || reloadedSection !== undefined}
                title="Add new section"
                className={
                  "button is-small is-rounded plus-button " +
                  (!res.editable ? "is-not-visible" : "")
                }
                onClick={() => addElement(i, tool)}
              >
                <span className="icon is-small has-text-success">
                  <i className="fas fa-plus"></i>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ResultsComponent.defaultProps = {
  generateButtonTitle: "Generate",
};

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
