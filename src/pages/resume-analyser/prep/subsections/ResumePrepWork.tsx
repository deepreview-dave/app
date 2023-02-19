import { useState } from "react";
import { AIResult } from "../../../../business/common";
import {
  OpenAIService,
  OpenAIServiceUtils,
} from "../../../../business/open-ai.service";
import { AutoTextArea } from "../../../../components/common/AutoTextArea";
import { ResultsError } from "../../../../components/results/ResultsError";
import { useResultState } from "../../../../state/result-state";
import {
  ResumePrepareStep,
  useResumeAnalyserState,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";
import { useResumeWorkHistoryState } from "../../../../state/resume.state";
import { ResumePrepSkipButton } from "../ResumePrepSkipButton";

export const ResumePrepWork = () => {
  const resumeToAnalyse = useResumeAnalyserState(
    (state) => state.resumeToAnalyse
  );
  const setStep = useResumePrepareState((state) => state.setStep);
  const state = useResumeWorkHistoryState((state) => state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const h = useResumeWorkHistoryState((state) => state.items[currentIndex]);
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const onPrev = () => {
    if (currentIndex === 0) {
      setStep(ResumePrepareStep.Summary);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onNext = () => {
    if (currentIndex === state.items.length - 1) {
      setStep(ResumePrepareStep.Finish);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onImproveClick = async () => {
    resetError();
    state.setLoading(true, currentIndex);
    try {
      const question =
        "Can you summarise the below text, using at most 3 bullet points, in the context of a resume summary, using the first person: ";
      const textToSummarise =
        resumeToAnalyse?.workplaces[currentIndex]?.details ?? "";
      const detailsResult =
        await new OpenAIService().generateBulletPointSummary(
          question,
          textToSummarise
        );
      const details = detailsResult.map((e) => e.expanded).join("\n");
      state.setHistory(currentIndex, { ...h, details, loading: true });

      const expandedResult = await new OpenAIService().expandText(details);
      const baked = OpenAIServiceUtils.getBakedWorkResults(h);
      const expanded: AIResult = {
        original: expandedResult,
        expanded: expandedResult,
        editable: true,
        joined: false,
      };
      const result = [baked, expanded];
      state.setResults(result, currentIndex);
    } catch (e: any) {
      setError(e.message);
    }
    state.setLoading(false, currentIndex);
  };

  const onResetClick = async () => {
    const item = resumeToAnalyse!.workplaces[currentIndex];
    const original = resumeToAnalyse?.workplaces[currentIndex]?.details ?? "";
    state.setHistory(currentIndex, { ...h, details: original });
    state.setResults(
      [
        OpenAIServiceUtils.getBakedWorkResults(item),
        {
          original,
          expanded: original,
          editable: true,
          joined: false,
        },
      ],
      currentIndex
    );
  };

  const getResult = () => {
    const expanded = h.results
      .filter((e) => e.editable)
      .map((e) => e.expanded)
      .join("\n");
    if (!expanded) {
      return resumeToAnalyse?.workplaces[currentIndex]?.details ?? "";
    }
    return expanded;
  };

  return (
    <div>
      <div className="content">
        We've identified the following <b>Jobs</b> from your Resume.
      </div>
      <div className="columns">
        <div className="column">
          <div className="review-content">
            <div className="p-4">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Company</label>
                    </td>
                    <td>
                      <input
                        className="input is-small"
                        disabled={h.loading}
                        placeholder="Please enter the name of the company"
                        type={"text"}
                        value={h.company}
                        onChange={(e) =>
                          state.setHistory(currentIndex, {
                            ...h,
                            company: e.currentTarget.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Role</label>
                    </td>
                    <td>
                      <input
                        className="input is-small"
                        disabled={h.loading}
                        placeholder="Please enter the role or title"
                        type={"text"}
                        value={h.role}
                        onChange={(e) =>
                          state.setHistory(currentIndex, {
                            ...h,
                            role: e.currentTarget.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Start</label>
                    </td>
                    <td>
                      <input
                        className="input is-small"
                        disabled={h.loading}
                        placeholder="Please enter the start date (e.g. 2019)"
                        type={"text"}
                        value={h.start}
                        onChange={(e) =>
                          state.setHistory(currentIndex, {
                            ...h,
                            start: e.currentTarget.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>End</label>
                    </td>
                    <td>
                      <input
                        className="input is-small"
                        disabled={h.loading}
                        placeholder="Please enter the end date (e.g. 2022)"
                        type={"text"}
                        value={h.end}
                        onChange={(e) =>
                          state.setHistory(currentIndex, {
                            ...h,
                            end: e.currentTarget.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="review-content">
            <div className="p-4">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Details</label>
                    </td>
                    <td>
                      <AutoTextArea
                        className="input"
                        disabled={h.loading}
                        value={getResult()}
                        index={currentIndex}
                        placeholder={""}
                        onChange={(details) =>
                          state.setHistory(currentIndex, {
                            ...h,
                            details,
                          })
                        }
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
                          onClick={onImproveClick}
                          disabled={h.loading}
                          className={
                            "button is-primary " +
                            (h.loading ? "is-loading" : "")
                          }
                        >
                          Improve
                        </button>
                        <button
                          onClick={onResetClick}
                          disabled={h.loading}
                          className="button is-info"
                        >
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
