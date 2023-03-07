import { AIResult } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { FormField } from "../../../components/common/FormField";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import {
  useResumeDetailsState,
  useResumeLanguageState,
} from "../../../state/resume.state";

export const ResumeLanguages = () => {
  const resultLoading = useResumeDetailsState((state) => state.loading);
  const state = useResumeLanguageState((state) => state);

  const onGenerateClick = async () => {
    const input = state;
    const res = await new OpenAIService().generateResumeLanguages(
      input.languages
    );
    state.setResult(res);
  };

  const onUpdate = (result: AIResult[]) => state.setResult(result);
  const onLoad = (loading: boolean) => state.setLoading(loading);

  return (
    <div className="columns">
      <div className="column">
        <div className="result-content p-4">
          <div className="mb-4">
            <i>Add the languages you're proficient in</i>
          </div>
          <FormField field="Languages">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="E.g. English, French, German, etc"
              type={"text"}
              value={state.languages}
              onChange={(e) => state.setLanguages(e.currentTarget.value)}
            />
          </FormField>
          <div className="horizontal-line mt-2 mb-4"></div>
          <div className="columns is-mobile">
            <div className="column"></div>
            <div className="column is-narrow">
              <div className="buttons">
                <CopyResultsButton
                  startingState={state.result}
                  loading={state.loading}
                />
                <GenerateResultsButton
                  onClick={onGenerateClick}
                  onLoad={onLoad}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <ResultsInlineComponent
          startingState={state.result}
          onUpdate={onUpdate}
          loading={state.loading}
        />
      </div>
    </div>
  );
};
