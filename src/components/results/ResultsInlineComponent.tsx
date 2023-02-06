import * as bulmaToast from "bulma-toast";
import { useEffect, useState } from "react";
import { Analytics } from "../../business/analytics";
import { AIResult } from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { useResultState } from "../../state/result-state";
import { AutoTextArea } from "../common/AutoTextArea";

export const GenerateResultsButton = (props: {
  onClick: () => Promise<void>;
  onLoad: (loading: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const setError = useResultState((state) => state.setError);

  const onButtonClick = async () => {
    try {
      setLoading(true);
      props.onLoad(true);
      await props.onClick();
      setLoading(false);
      props.onLoad(false);
      Analytics.generated();
    } catch (e: any) {
      setError(e.message);
      props.onLoad(false);
      setLoading(false);
    }
  };

  return (
    <button
      title="Generate a result based on all your inputs"
      disabled={loading}
      className={"button is-primary " + (loading ? "is-loading" : "")}
      onClick={onButtonClick}
    >
      Generate
    </button>
  );
};

export const CopyResultsButton = (props: {
  startingState: AIResult[];
  loading: boolean;
}) => {
  const [items, setItems] = useState<AIResult[]>(props.startingState);

  useEffect(() => {
    setItems(props.startingState);
  }, [props.startingState]);

  const onCopyClick = async () => {
    Analytics.copied();
    const answer = items.map((e) => e.expanded).join("\n\n");
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
    <button
      title="Copy all generated results to clipboard."
      disabled={props.loading}
      className="button"
      onClick={onCopyClick}
    >
      Copy result to clipboard
    </button>
  );
};

export const ResultsInlineComponent = (props: {
  loading: boolean;
  startingState: AIResult[];
  onUpdate?: (results: AIResult[]) => void;
}) => {
  const [items, setItems] = useState<AIResult[]>(props.startingState);
  const [error, setError] = useState<string | undefined>(undefined);
  const [reloadedSection, setReloading] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    setItems(props.startingState);
  }, [props.startingState]);

  const onExpandClick = async (value: string, index: number) => {
    setReloading(index);
    try {
      const result = await new OpenAIService().expandText(value);
      updateResults(result, index);
      Analytics.expanded();
      setReloading(undefined);
    } catch (e: any) {
      setError(e.message);
      setReloading(undefined);
    }
  };

  const updateResults = (expanded: string, index: number) => {
    const results = items.map((r, i) => (i === index ? { ...r, expanded } : r));
    props.onUpdate?.(results);
    setItems(results);
  };

  const addElement = (index: number) => {
    const results = items.flatMap((e, i) =>
      i === index
        ? [
            e,
            {
              original: "",
              expanded: "",
              editable: true,
              joined: false,
            },
          ]
        : [e]
    );
    props.onUpdate?.(results);
    setItems(results);
  };

  const removeElement = (index: number) => {
    const results = items.filter((e, i) =>
      i === index ? !(e.expanded === "") : true
    );
    props.onUpdate?.(results);
    setItems(results);
  };

  const resetElement = (index: number) => {
    const results = items.map((e, i) =>
      i === index
        ? {
            original: e.original,
            expanded: e.original,
            editable: true,
            joined: false,
          }
        : e
    );
    props.onUpdate?.(results);
    setItems(results);
  };

  return (
    <>
      <div className="">
        {items.map((res, i) => (
          <div className="results-container" key={i}>
            <div
              className={
                items.length === 1
                  ? "all-content"
                  : i === 0
                  ? res.joined
                    ? "top-content no-bottom"
                    : "top-content"
                  : i === items.length - 1
                  ? "bottom-content"
                  : res.joined
                  ? "normal-content no-bottom"
                  : "normal-content"
              }
            >
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={
                    !res.editable ||
                    props.loading ||
                    reloadedSection !== undefined
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
                  disabled={props.loading || reloadedSection === i}
                  index={i}
                  value={res.expanded}
                  className="autotext-area"
                  placeholder="Please enter more details..."
                  onChange={(e, i) => updateResults(e, i)}
                  onBlur={() => removeElement(i)}
                />
              </div>
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={
                    !res.editable ||
                    props.loading ||
                    reloadedSection !== undefined
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
                disabled={props.loading || reloadedSection !== undefined}
                title="Add new section"
                className={
                  "button is-small is-rounded plus-button " +
                  (!res.editable ? "is-not-visible" : "")
                }
                onClick={() => addElement(i)}
              >
                <span className="icon is-small has-text-success">
                  <i className="fas fa-plus"></i>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && !props.loading && (
        <div className="review-content p-4 has-background-warning-light has-text-warning-dark is-monospace">
          <small>
            Fill in the details and press the 'Generate' button to see the
            results.
          </small>
        </div>
      )}
      {items.length === 0 && props.loading && (
        <div className="review-content p-4 is-monospace">
          <small>Loading</small>
          <progress className="mt-2 progress is-small is-info" max="100">
            15%
          </progress>
        </div>
      )}
    </>
  );
};

ResultsInlineComponent.defaultProps = {
  startingState: [],
};
