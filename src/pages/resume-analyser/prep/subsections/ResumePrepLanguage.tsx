import { OpenAIServiceUtils } from "../../../../business/open-ai.service";
import { FormField } from "../../../../components/common/FormField";
import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";
import { useResumeLanguageState } from "../../../../state/resume.state";
import { ContinueButton } from "../subcomponents/ContinueButton";
import { PrevButton } from "../subcomponents/PrevButton";

export const ResumePrepLanguage = () => {
  const state = useResumeLanguageState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);

  const onNextClick = () => {
    state.setResult([
      OpenAIServiceUtils.getBakedLanguageResult(state.languages),
    ]);
    setStep(ResumePrepareStep.Summary);
  };
  const onPrevClick = () => setStep(ResumePrepareStep.Skills);

  return (
    <div>
      <div className="content">
        We've found the following <b>Languages</b> in your Resume. Please check
        to see if they're correct.
      </div>
      <div className="result-content p-4">
        <FormField field="Languages">
          <input
            className="input"
            placeholder="E.g. English, French, German, etc"
            type={"text"}
            value={state.languages}
            onChange={(e) => state.setLanguages(e.currentTarget.value)}
          />
        </FormField>
      </div>
      <div className="mt-4">
        <ContinueButton onClick={onNextClick} />
      </div>
      <PrevButton onClick={onPrevClick} />
    </div>
  );
};
