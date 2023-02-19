import { AIResult } from "../../../../business/common";
import { OpenAIService } from "../../../../business/open-ai.service";
import { AutoTextArea } from "../../../../components/common/AutoTextArea";
import { ResultsError } from "../../../../components/results/ResultsError";
import { useResultState } from "../../../../state/result-state";
import {
  useResumePrepareState,
  ResumePrepareStep,
  useResumeAnalyserState,
} from "../../../../state/resume-analyser.state";
import {
  useResumeDetailsState,
  useResumeSummaryState,
} from "../../../../state/resume.state";
import { ResumePrepSkipButton } from "../ResumePrepSkipButton";

export const ResumePrepSummary = () => {
  const resumeToAnalyse = useResumeAnalyserState(
    (state) => state.resumeToAnalyse
  );
  const name = useResumeDetailsState((state) => state.name);
  const state = useResumeSummaryState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const onNext = () => setStep(ResumePrepareStep.Work);
  const onPrev = () => setStep(ResumePrepareStep.Skills);

  const getOriginalSummary = () => resumeToAnalyse?.summary?.summary ?? "";

  const getNewSummaryValue = () => {
    const value = state.result
      .filter((e) => e.editable)
      .map((e) => e.expanded)
      .join("\n");
    return value;
  };

  const hasChanged = () => getNewSummaryValue() !== state.summary;

  const onImproveClick = async () => {
    resetError();
    state.setLoading(true);
    try {
      const question =
        "Can you summarise the below text, using at most 3 bullet points, in the context of a resume summary, using the first person: ";
      const textToSummarise = getOriginalSummary();
      const summaryResult =
        await new OpenAIService().generateBulletPointSummary(
          question,
          textToSummarise
        );
      const summary = summaryResult.map((e) => e.expanded).join("\n");
      const result: AIResult[] =
        await new OpenAIService().generateResumeSummary(state, name);

      state.setSummary(summary);
      state.setResult(result);
    } catch (e: any) {
      setError(e.message);
    }
    state.setLoading(false);
  };

  const onUseExistingSummary = () => {
    onReset();
    setStep(ResumePrepareStep.Work);
  };

  const onUseNewSummary = () => {
    const newSummary = state.summary;
    state.setSummary(newSummary);
    setStep(ResumePrepareStep.Work);
  };

  const onNewSummaryValueEdit = (e: string) => {
    const first = state.result.map((res) => ({
      ...res,
      expanded: e,
    }));
    state.setResult(first);
  };

  const onReset = () => {
    const existingSummary = getOriginalSummary();
    state.setSummary(existingSummary);
    const result: AIResult = {
      original: existingSummary,
      expanded: existingSummary,
      editable: true,
      joined: false,
    };
    state.setResult([result]);
  };

  const UseExistingButton = () => (
    <button
      disabled={state.loading}
      onClick={onUseExistingSummary}
      title="Accept the existing summary"
      className="button is-success"
    >
      Use existing summary
    </button>
  );

  const UseNewButton = () => (
    <button
      title="Accept the new summary"
      disabled={state.loading}
      className="button is-success"
      onClick={onUseNewSummary}
    >
      Use new summary
    </button>
  );

  return (
    <div>
      <div className="content">
        We've identified the following <b>Summary Statement</b> from your
        Resume:
      </div>
      <div className="message">
        <div className="message-body">{getOriginalSummary()}</div>
      </div>
      {!hasChanged() && (
        <>
          <div className="content">
            You also have two options: use the existing summary as is or let
            DeepReview attempt to improve on it.
          </div>
          <div className="buttons">
            <UseExistingButton />
            <button
              disabled={state.loading}
              onClick={onImproveClick}
              title="Let DeepReview improve on the existing summary"
              className={
                "button is-info " + (state.loading ? "is-loading" : "")
              }
            >
              Improve
            </button>
          </div>
        </>
      )}
      {hasChanged() && (
        <>
          <div className="content">
            DeepReview has generated this improved personal{" "}
            <b>Summary Statement</b>.
          </div>
          <div className="review-content">
            <div className="p-4">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>New Summary</label>
                    </td>
                    <td>
                      <AutoTextArea
                        disabled={state.loading}
                        className="input"
                        placeholder={""}
                        index={0}
                        value={getNewSummaryValue()}
                        onChange={onNewSummaryValueEdit}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="content mt-4">
            Now you can choose to still use the existing summary of the new
            summary.
          </div>
          <div className="buttons mt-4">
            <UseExistingButton />
            <UseNewButton />
            <button
              disabled={state.loading}
              className="button"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </>
      )}
      <div>
        <ResultsError />
      </div>
      <hr />
      <div className="columns mt-4 is-mobile">
        <div className="column">
          <div className="buttons">
            <button className="button is-secondary" onClick={onPrev}>
              Prev
            </button>
          </div>
        </div>
        <div className="column is-narrow">
          <ResumePrepSkipButton />
        </div>
      </div>
    </div>
  );
};
