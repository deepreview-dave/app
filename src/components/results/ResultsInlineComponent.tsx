import * as bulmaToast from "bulma-toast";
import { Fragment, useEffect, useState } from "react";
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
    Analytics.generated();
    try {
      setLoading(true);
      props.onLoad(true);
      await props.onClick();
      setLoading(false);
      props.onLoad(false);
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
    Analytics.expanded();
    setReloading(index);
    try {
      const result = await new OpenAIService().expandText(value);
      updateResults(result, index);
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
    const results = items.filter((e, i) => i !== index);
    props.onUpdate?.(results);
    setItems(results);
  };

  const removeElementIfEmpty = (index: number) => {
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
          <Fragment key={i}>
            <div key={i} className="result-content">
              <div className="columns is-mobile m-0 p-0 has-background-white-bis border-5px">
                <div className="column"></div>
                <div className="column is-narrow m-0 p-0">
                  {res.editable && (
                    <button
                      title="Remove this section"
                      onClick={() => removeElement(i)}
                      className="button is-small is-ghost"
                    >
                      <span className="icon is-small  has-text-danger">
                        <i className="fas fa-times"></i>
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="horizontal-line"></div>
              <div className="p-2">
                <AutoTextArea
                  disabled={props.loading || reloadedSection === i}
                  index={i}
                  value={res.expanded}
                  className="autotext-area"
                  placeholder="Please enter more details..."
                  onChange={(e, i) => updateResults(e, i)}
                  onBlur={() => removeElementIfEmpty(i)}
                />
              </div>
              {res.editable && <div className="horizontal-line"></div>}
              {res.editable && (
                <div className="columns is-mobile m-0 p-0">
                  <div className="column m-0 p-0">
                    <button
                      title="Let DeepReview auto-expand this section"
                      disabled={
                        !res.editable ||
                        props.loading ||
                        reloadedSection !== undefined
                      }
                      onClick={() => onExpandClick(res.expanded, i)}
                      className={
                        "button is-small is-ghost has-text-success " +
                        (reloadedSection === i ? "is-loading" : "")
                      }
                    >
                      Expand
                    </button>
                  </div>
                  <div className="column m-0 p-0">
                    <button
                      title="Unde all changes"
                      disabled={
                        !res.editable ||
                        props.loading ||
                        reloadedSection !== undefined
                      }
                      onClick={() => resetElement(i)}
                      className="button is-small is-ghost is-pulled-right"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="plus-button-holder mb-2">
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
          </Fragment>
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
