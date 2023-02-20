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
import { ordinalOfNumber } from "../../../../utils/string";
import { ContinueButton } from "../subcomponents/ContinueButton";
import { PrevButton } from "../subcomponents/PrevButton";

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

  const getOriginalDetails = () =>
    resumeToAnalyse?.workplaces[currentIndex]?.details ?? "";

  const getNewDetails = () => {
    const value = h.results
      .filter((e) => e.editable)
      .map((e) => e.expanded)
      .join("\n");
    return value;
  };

  const getHasChanged = () => getNewDetails() !== h.details;

  const getIsValid = () => state.items.length > 0;

  const getIsValidDescription = () => !!h.details;

  const onPrevClick = () => {
    if (currentIndex === 0) {
      setStep(ResumePrepareStep.Summary);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onNextClick = () => {
    if (state.items.length === 0) {
      setStep(ResumePrepareStep.Education);
    } else if (currentIndex === state.items.length - 1) {
      setStep(ResumePrepareStep.Education);
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

  const onResetClick = () => {
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
      className={"button " + (getHasChanged() ? "" : "is-success")}
    >
      Continue with existing Description
    </button>
  );

  const UseNewButton = () => (
    <button
      title="Accept the new description"
      disabled={h.loading}
      className="button is-success"
      onClick={onUseNewClick}
    >
      Continue with new Description
    </button>
  );

  const Header = () => {
    if (state.items.length === 1) {
      return (
        <div className="content">
          We've identified one Job from your Resume: <b>{h.role}</b> at{" "}
          <b>{h.company}</b>.
        </div>
      );
    }

    return (
      <div className="content">
        <p>
          We've identified <b>{state.items.length} Jobs</b> from your Resume.
        </p>
        <p>
          The {ordinalOfNumber(currentIndex + 1)} one is <b>{h.role}</b> at{" "}
          <b>{h.company}</b>.
        </p>
      </div>
    );
  };

  const MainContent = () => (
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
  );

  const InvalidDescription = () => {
    return (
      <div className="mt-4">
        <ContinueButton onClick={onNextClick} />
      </div>
    );
  };

  if (!getIsValid()) {
    return (
      <div>
        <div className="message is-warning">
          <div className="message-body">
            We were not able to identify any <b>Work Experience</b> from your
            Resume.
          </div>
        </div>
        <ContinueButton onClick={onNextClick} />
        <PrevButton onClick={onPrevClick} />
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
          For this job we've also identified the following <b>Description:</b>
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
            You can either let DeepReview attempt to improve it or continue
            using the existing one.
          </div>
          <div className="columns">
            <div className="column">
              <button
                title="Let DeepReview improve on the existing description"
                disabled={h.loading}
                onClick={onImproveClick}
                className={"button is-info " + (h.loading ? "is-loading" : "")}
              >
                Improve
              </button>
            </div>
            <div className="column is-narrow">
              <UseExistingButton />
            </div>
          </div>
        </>
      )}
      {getHasChanged() && getIsValidDescription() && (
        <>
          <div className="content">
            DeepReview has generated this improved job Description.
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
            Now you can choose to still use the existing description of the new
            description.
          </div>
          <div className="columns mt-4">
            <div className="column">
              <button
                disabled={h.loading}
                className="button"
                onClick={onResetClick}
              >
                Reset
              </button>
            </div>
            <div className="column is-narrow">
              <div className="buttons">
                <UseExistingButton />
                <UseNewButton />
              </div>
            </div>
          </div>
        </>
      )}
      <ResultsError />
      <PrevButton onClick={onPrevClick} />
    </div>
  );
};
