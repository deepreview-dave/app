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

  const onImproveClick = async () => {
    resetError();
    state.setLoading(true, currentIndex);
    try {
      const question =
        "Can you summarise the below text, using at most 3 bullet points, in the context of a resume summary, using the first person: ";
      const textToSummarise = getOriginalDetails();
      const detailsResult =
        await new OpenAIService().generateBulletPointSummary(
          question,
          textToSummarise
        );

      const details = detailsResult.map((e) => e.expanded).join("\n");
      const results = await new OpenAIService().generateResumeWorkHistoryItem(
        state.question,
        h
      );
      state.setHistory(currentIndex, { ...h, details, results });
    } catch (e: any) {
      setError(e.message);
    }
    state.setLoading(false, currentIndex);
  };

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

  const onReset = () => {
    const existingDetails = getOriginalDetails();
    state.setHistory(currentIndex, { ...h, details: existingDetails });
    const baked = OpenAIServiceUtils.getBakedWorkResults(h);
    const result: AIResult = {
      original: existingDetails,
      expanded: existingDetails,
      editable: true,
      joined: false,
    };
    state.setResults([baked, result], currentIndex);
  };

  const onUseExistingSummary = () => {
    onReset();
    onNext();
  };

  const getOriginalDetails = () =>
    resumeToAnalyse?.workplaces[currentIndex]?.details ?? "";

  const UseExistingButton = () => (
    <button
      onClick={onUseExistingSummary}
      disabled={h.loading}
      title="Accept the existing description"
      className="button is-success"
    >
      Use existing description
    </button>
  );

  const onUseNewDetails = () => onNext();

  const UseNewButton = () => (
    <button
      title="Accept the new description"
      disabled={h.loading}
      className="button is-success"
      onClick={onUseNewDetails}
    >
      Use new description
    </button>
  );

  const getNewDetailsValue = () => {
    const value = h.results
      .filter((e) => e.editable)
      .map((e) => e.expanded)
      .join("\n");
    return value;
  };

  const hasChanged = () => getNewDetailsValue() !== h.details;

  const onNewDetailsValueEdit = (e: string) => {
    const first = h.results.map((res, i) => {
      if (i === 1) {
        return {
          ...res,
          original: e,
          expanded: e,
        };
      } else {
        return res;
      }
    });
    state.setResults(first, currentIndex);
  };

  return (
    <div>
      <div className="content">
        We've identified the following <b>Job</b> from your Resume:{" "}
        <b>{h.role}</b> at <b>{h.company}</b>
      </div>
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
      <div className="content mt-4">
        For this job we've also identified the following <b>Description:</b>
      </div>
      <div className="message">
        <div className="message-body">{getOriginalDetails()}</div>
      </div>
      {!hasChanged() && (
        <>
          <div className="content">
            You have two options for this job description: use the existing one
            or let DeepReview attempt to improve it.
          </div>
          <div className="buttons">
            <UseExistingButton />
            <button
              title="Let DeepReview improve on the existing description"
              disabled={h.loading}
              onClick={onImproveClick}
              className={"button is-info " + (h.loading ? "is-loading" : "")}
            >
              Improve
            </button>
          </div>
        </>
      )}
      {hasChanged() && (
        <>
          <div className="content">
            DeepReview has generated this improved job description.
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
                        disabled={h.loading}
                        className="input"
                        placeholder={""}
                        index={0}
                        value={getNewDetailsValue()}
                        onChange={onNewDetailsValueEdit}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="content mt-4">
            Now you can choose to still use the existing details of the new
            details.
          </div>
          <div className="buttons mt-4">
            <UseExistingButton />
            <UseNewButton />
            <button disabled={h.loading} className="button" onClick={onReset}>
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
