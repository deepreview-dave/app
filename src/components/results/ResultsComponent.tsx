import { PerformanceReviewInput } from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { useInputDetailsState } from "../../state/input-details.state";
import { usePerformanceReviewState } from "../../state/perf-review.state";
import { useResultState, formResult } from "../../state/result-state";
import { AutoTextArea } from "../common/AutoTextArea";

export const ResultsComponent = () => {
  const loading = useResultState((state) => state.loading);
  const reloadedSection = useResultState((state) => state.reloadedSection);
  const setLoading = useResultState((state) => state.setLoading);
  const state = usePerformanceReviewState((state) => state);
  const details = useInputDetailsState((state) => state.details);

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
    const input: PerformanceReviewInput = {
      relationship: state.relationship,
      question: state.question,
      name: state.name,
      role: state.role,
      team: state.team,
      time: state.time,
      tone: state.tone,
      pron: state.pron,
      perf: state.perf,
      details,
    };
    try {
      const result = await new OpenAIService().generatePerformanceReview(input);
      setResults(formResult(result));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onExpandClick = async (value: string, index: number) => {
    setReloading(index);
    try {
      const result = await new OpenAIService().expandText(value);
      updateResult(result, index);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="buttons">
        <button
          disabled={loading}
          className={"button is-primary " + (loading ? "is-loading" : "")}
          onClick={onGenerateClick}
        >
          Generate
        </button>
        <button disabled={loading} className="button">
          Copy
        </button>
      </div>
      <div className="">
        {results.map((res, i) => (
          <div className="results-container" key={i}>
            <div
              className={
                i === 0
                  ? "top-content"
                  : i === results.length - 1
                  ? "bottom-content"
                  : "normal-content"
              }
            >
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={loading || reloadedSection !== undefined}
                  title="Expand on this section"
                  className="button is-white is-small"
                  onClick={() => onExpandClick(res.expanded, i)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-sync"></i>
                  </span>
                </button>
              </div>
              <div className="big-div pt-5 pl-3 pr-3 pb-5">
                <AutoTextArea
                  disabled={loading || reloadedSection === i}
                  index={i}
                  value={res.expanded}
                  placeholder="Add more details..."
                  onChange={(e, i) => updateResult(e, i)}
                  onBlur={() => removeElement(i)}
                />
              </div>
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={loading || reloadedSection !== undefined}
                  title="Remove section"
                  className="button is-small is-white"
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
                className="button is-small is-rounded plus-button"
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
    </>
  );
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
