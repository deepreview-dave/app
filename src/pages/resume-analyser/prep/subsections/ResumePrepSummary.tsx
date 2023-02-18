import { useState } from "react";
import { AIResult } from "../../../../business/common";
import { OpenAIService } from "../../../../business/open-ai.service";
import { AutoTextArea } from "../../../../components/common/AutoTextArea";
import { ResultsError } from "../../../../components/results/ResultsError";
import { ResultsInlineComponent } from "../../../../components/results/ResultsInlineComponent";
import { useResultState } from "../../../../state/result-state";
import {
  useResumePrepareState,
  ResumePrepareStep,
} from "../../../../state/resume-analyser.state";
import { useResumeSummaryState } from "../../../../state/resume.state";
import { ResumePrepSkipButton } from "../ResumePrepSkipButton";

export const ResumePrepSummary = () => {
  const state = useResumeSummaryState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const [loading, setLoading] = useState(false);
  const [tempResult, setTempResult] = useState<AIResult[]>([]);

  const onNext = () => setStep(ResumePrepareStep.Finish);
  const onPrev = () => setStep(ResumePrepareStep.Skills);

  const onUpdate = (result: AIResult[]) => setTempResult(result);

  const onSummariseClick = async () => {
    resetError();
    setLoading(true);
    try {
      const question =
        "Can you summarise the below text, using at most 3 bullet points, in the context of a resume summary, using the first person: ";
      const result = await new OpenAIService().generateBulletPointSummary(
        question,
        state.summary
      );
      setTempResult(result);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const onUseVersionClick = () => {
    const result = tempResult.map((e) => e.expanded).join("\n");
    if (!result) {
      return;
    }
    state.setSummary(result);
  };

  return (
    <div>
      <div className="content">
        We've identified the following <b>Summary Statement</b> from your
        Resume.
      </div>
      <div className="columns">
        <div className="column">
          <div className="review-content">
            <div className="p-4">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Existing summary</label>
                    </td>
                    <td>
                      <AutoTextArea
                        disabled={false}
                        className="input"
                        placeholder={""}
                        index={0}
                        value={state.summary}
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
                      <div className="buttons">
                        <button
                          disabled={loading}
                          className={
                            "button is-info " + (loading ? "is-loading" : "")
                          }
                          onClick={onSummariseClick}
                        >
                          Summarise
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="column">
          <ResultsInlineComponent
            startingState={tempResult}
            onUpdate={onUpdate}
            loading={loading}
          />
          {tempResult.length > 0 && (
            <div>
              <button
                disabled={loading}
                className="button is-primary"
                onClick={onUseVersionClick}
              >
                Use this version
              </button>
            </div>
          )}
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
