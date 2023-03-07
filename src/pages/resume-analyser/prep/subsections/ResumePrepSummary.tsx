import { AIResult } from "../../../../business/common";
import { OpenAIService } from "../../../../business/open-ai.service";
import { AutoTextArea } from "../../../../components/common/AutoTextArea";
import { FormField } from "../../../../components/common/FormField";
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
import { ContinueButton } from "../subcomponents/ContinueButton";
import { PrevButton } from "../subcomponents/PrevButton";

export const ResumePrepSummary = () => {
  const resumeToAnalyse = useResumeAnalyserState(
    (state) => state.resumeToAnalyse
  );
  const name = useResumeDetailsState((state) => state.name);
  const state = useResumeSummaryState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);
  const setError = useResultState((state) => state.setError);
  const resetError = useResultState((state) => state.resetError);

  const getOriginalSummary = () => resumeToAnalyse?.summary?.summary ?? "";

  const getNewSummary = () => {
    const value = state.result
      .filter((e) => e.editable)
      .map((e) => e.expanded)
      .join("\n");
    return value;
  };

  const getChanged = () => getNewSummary() !== state.summary;

  const getIsValid = () => !!getOriginalSummary();

  const onNextClick = () => setStep(ResumePrepareStep.Work);
  const onPrevClick = () => setStep(ResumePrepareStep.Language);

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

  const onUseExistingClick = () => {
    onResetClick();
    setStep(ResumePrepareStep.Work);
  };

  const onUseNewClick = () => setStep(ResumePrepareStep.Work);

  const onNewSummaryEdit = (e: string) => {
    const first = state.result.map((res) => ({
      ...res,
      expanded: e,
    }));
    state.setResult(first);
  };

  const onResetClick = () => {
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
      onClick={onUseExistingClick}
      title="Accept the existing summary"
      className={"button " + (getChanged() ? "" : "is-success")}
    >
      Continue with existing Summary
    </button>
  );

  const UseNewButton = () => (
    <button
      title="Accept the new summary"
      disabled={state.loading}
      className="button is-success"
      onClick={onUseNewClick}
    >
      Continue with new Summary
    </button>
  );

  if (!getIsValid()) {
    return (
      <div>
        <div className="message is-warning">
          <div className="message-body">
            We were not able to identify a valid <b>Summary Statement</b>.
          </div>
        </div>
        <ContinueButton onClick={onNextClick} />
        <PrevButton onClick={onPrevClick} />
      </div>
    );
  }

  return (
    <div>
      <div className="content">
        We've identified the following <b>Summary Statement</b> from your
        Resume:
      </div>
      <div className="message">
        <div className="message-body">{getOriginalSummary()}</div>
      </div>
      {!getChanged() && (
        <>
          <div className="content">
            You can either let DeepReview attempt to improve it or continue
            using the existing one.
          </div>
          <div className="columns">
            <div className="column">
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
            <div className="column is-narrow">
              <UseExistingButton />
            </div>
          </div>
        </>
      )}
      {getChanged() && (
        <>
          <div className="content">
            DeepReview has generated this improved personal{" "}
            <b>Summary Statement</b>.
          </div>
          <div className="result-content p-4">
            <FormField field="New Summary">
              <AutoTextArea
                disabled={state.loading}
                className="input autoscaling-textarea is-success"
                placeholder={""}
                index={0}
                value={getNewSummary()}
                onChange={onNewSummaryEdit}
              />
            </FormField>
          </div>
          <div className="content mt-4">
            Now you can choose to still use the existing summary of the new
            summary.
          </div>
          <div className="columns mt-4">
            <div className="column">
              <button
                disabled={state.loading}
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
      <div>
        <ResultsError />
      </div>
      <PrevButton onClick={onPrevClick} />
    </div>
  );
};
