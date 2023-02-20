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
import { useResumeEducationHistoryState } from "../../../../state/resume.state";
import { ContinueButton } from "../subcomponents/ContinueButton";

export const ResumePrepEducation = () => {
  const resumeToAnalyse = useResumeAnalyserState(
    (state) => state.resumeToAnalyse
  );
  const setStep = useResumePrepareState((state) => state.setStep);
  const state = useResumeEducationHistoryState((state) => state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const h = useResumeEducationHistoryState(
    (state) => state.items[currentIndex]
  );
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const getOriginalDetails = () =>
    resumeToAnalyse?.education[currentIndex]?.details ?? "";

  const getIsValid = () => state.items.length > 0;

  const getIsValidDescription = () => !!h.details;

  const getNewDetails = () => {
    const value = h.results
      .filter((e) => e.editable)
      .map((e) => e.expanded)
      .join("\n");
    return value;
  };

  const getHasChanged = () => getNewDetails() !== h.details;

  const onPrevClick = () => {
    if (currentIndex === 0) {
      setStep(ResumePrepareStep.Work);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onNextClick = () => {
    if (state.items.length === 0) {
      setStep(ResumePrepareStep.Finish);
    }
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
      const textToSummarise = getOriginalDetails();
      const detailsResult =
        await new OpenAIService().generateBulletPointSummary(
          question,
          textToSummarise
        );
      const details = detailsResult.map((e) => e.expanded).join("\n");
      const results = await new OpenAIService().generateEducationHistoryItem(
        state.question,
        h
      );
      state.setHistory(currentIndex, { ...h, details, results });
    } catch (e: any) {
      setError(e.message);
    }
    state.setLoading(false, currentIndex);
  };

  const onResetClick = () => {
    const existingDetails = getOriginalDetails();
    state.setHistory(currentIndex, { ...h, details: existingDetails });
    const baked = OpenAIServiceUtils.getBakedEducationResult(h);
    const result: AIResult = {
      original: existingDetails,
      expanded: existingDetails,
      editable: true,
      joined: false,
    };
    state.setResults([baked, result], currentIndex);
  };

  const onUseExistingClick = () => {
    onResetClick();
    onNextClick();
  };

  const onUseNewClick = () => onNextClick();

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

  const UseExistingButton = () => (
    <button
      onClick={onUseExistingClick}
      disabled={h.loading}
      title="Accept the existing description"
      className="button is-success"
    >
      Use existing description
    </button>
  );

  const UseNewButton = () => (
    <button
      title="Accept the new description"
      disabled={h.loading}
      className="button is-success"
      onClick={onUseNewClick}
    >
      Use new description
    </button>
  );

  const Header = () => (
    <div className="content">
      We've identified the following <b>Schools</b> from your Resume:{" "}
      <b>{h.degree}</b> at <b>{h.school}</b>
    </div>
  );

  const MainContent = () => (
    <div className="review-content">
      <div className="p-4">
        <table>
          <tbody>
            <tr>
              <td>
                <label>School</label>
              </td>
              <td>
                <input
                  className="input is-small"
                  disabled={h.loading}
                  placeholder="Please enter the name of the school"
                  type={"text"}
                  value={h.school}
                  onChange={(e) =>
                    state.setHistory(currentIndex, {
                      ...h,
                      school: e.currentTarget.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Degree</label>
              </td>
              <td>
                <input
                  className="input is-small"
                  disabled={h.loading}
                  placeholder="Please enter your degree"
                  type={"text"}
                  value={h.degree}
                  onChange={(e) =>
                    state.setHistory(currentIndex, {
                      ...h,
                      degree: e.currentTarget.value,
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
  );

  const InvalidDescription = () => {
    return (
      <div className="buttons mt-4">
        <button className="button is-success" onClick={onNextClick}>
          Continue
        </button>
      </div>
    );
  };

  if (!getIsValid()) {
    return (
      <div>
        <div className="message is-warning">
          <div className="message-body">
            We were not able to identify a any <b>Schools</b> from your Resume.
          </div>
        </div>
        <ContinueButton onClick={onNextClick} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <MainContent />
      {!getIsValidDescription() && <InvalidDescription />}
      {getIsValidDescription() && (
        <div className="content mt-4">
          For this school we've identified the following <b>Description:</b>
        </div>
      )}
      {getIsValidDescription() && (
        <div className="message">
          <div className="message-body">{getOriginalDetails()}</div>
        </div>
      )}
      {!getHasChanged() && getIsValidDescription() && (
        <>
          <div className="content">
            You have two options for this description: use the existing one or
            let DeepReview attempt to improve it.
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
      {getHasChanged() && getIsValidDescription() && (
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
                        value={getNewDetails()}
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
            <button
              disabled={h.loading}
              className="button"
              onClick={onResetClick}
            >
              Reset
            </button>
          </div>
        </>
      )}
      <ResultsError />
    </div>
  );
};
