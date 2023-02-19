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
import { useResumeSummaryState } from "../../../../state/resume.state";
import { ResumePrepSkipButton } from "../ResumePrepSkipButton";

export const ResumePrepSummary = () => {
  const resumeToAnalyse = useResumeAnalyserState(
    (state) => state.resumeToAnalyse
  );
  const state = useResumeSummaryState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const onNext = () => setStep(ResumePrepareStep.Work);
  const onPrev = () => setStep(ResumePrepareStep.Skills);

  const onImproveClick = async () => {
    resetError();
    state.setLoading(true);
    try {
      const question =
        "Can you summarise the below text, using at most 3 bullet points, in the context of a resume summary, using the first person: ";
      const textToSummarise = resumeToAnalyse?.summary?.summary ?? "";
      const summaryResult =
        await new OpenAIService().generateBulletPointSummary(
          question,
          textToSummarise
        );
      const summary = summaryResult.map((e) => e.expanded).join("\n");
      state.setSummary(summary);

      const expandedResult = await new OpenAIService().expandText(summary);
      const expanded: AIResult[] = [
        {
          original: expandedResult,
          expanded: expandedResult,
          editable: true,
          joined: true,
        },
      ];
      state.setResult(expanded);
    } catch (e: any) {
      setError(e.message);
    }
    state.setLoading(false);
  };

  const onResetClick = async () => {
    const original = resumeToAnalyse?.summary.summary ?? "";
    state.setSummary(original);
    state.setResult([
      {
        original,
        expanded: original,
        editable: true,
        joined: false,
      },
    ]);
  };

  const getResult = () => {
    const expanded = state.result.map((e) => e.expanded).join("\n");
    if (!expanded) {
      return resumeToAnalyse?.summary.summary ?? "";
    }
    return expanded;
  };

  return (
    <div>
      <div className="content">
        We've identified the following <b>Summary Statement</b> from your
        Resume:
      </div>
      <div className="review-content">
        <div className="p-4">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Summary</label>
                </td>
                <td>
                  <AutoTextArea
                    disabled={state.loading}
                    className="input"
                    placeholder={""}
                    index={0}
                    value={getResult()}
                    onChange={(e) => state.setSummary(e)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="horizontal-line mt-4 mb-4"></div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="mt-2">
                    <div className="buttons">
                      <button
                        disabled={state.loading}
                        className={
                          "button is-primary " +
                          (state.loading ? "is-loading" : "")
                        }
                        onClick={onImproveClick}
                      >
                        Improve
                      </button>
                      {state.result.length > 0 && (
                        <button
                          disabled={state.loading}
                          className="button is-info"
                          onClick={onResetClick}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <ResultsError />
      </div>
      <div className="columns mt-4 is-mobile">
        <div className="column">
          <div className="buttons">
            <button className="button is-secondary" onClick={onPrev}>
              Prev
            </button>
            <button className="button is-primary" onClick={onNext}>
              Next
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
