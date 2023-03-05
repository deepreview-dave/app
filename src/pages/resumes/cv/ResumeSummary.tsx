import { AIResult, WorkHistory } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { FormField } from "../../../components/common/FormField";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import {
  useResumeDetailsState,
  useResumeSummaryState,
} from "../../../state/resume.state";

export const ResumeSummary = () => {
  const resultLoading = useResumeSummaryState((state) => state.loading);
  const state = useResumeSummaryState((state) => state);
  const name = useResumeDetailsState((state) => state.name);

  const detailsHint = `Please enter more details, such as:
  - achievements you're prod of in your career
  - strengts and skills you've developed over the years
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const onGenerateClick = async () => {
    const res = await new OpenAIService().generateResumeSummary(state, name);
    state.setResult(res);
  };

  const onUpdate = (result: AIResult[]) => state.setResult(result);
  const onLoad = (loading: boolean) => state.setLoading(loading);

  return (
    <div className="columns">
      <div className="column">
        <div className="result-content p-4">
          <div className="mb-4">
            <i>Continue by adding information for a short summary</i>
          </div>
          <FormField field="Skills">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter a comma separated list of skills e.g. Driving, Excel, Management, etc"
              type={"text"}
              value={state.skills}
              onChange={(e) => state.setSkills(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="History">
            <div className="select">
              <select
                disabled={resultLoading}
                value={state.history}
                onChange={(e) =>
                  state.setHistory(e.currentTarget.value as WorkHistory)
                }
              >
                <option value={WorkHistory.One}>1 Year</option>
                <option value={WorkHistory.Two}>2 Years</option>
                <option value={WorkHistory.Three}>3 Years</option>
                <option value={WorkHistory.Four}>4 Years</option>
                <option value={WorkHistory.Five}>5 Years</option>
                <option value={WorkHistory.Six}>6 Years</option>
                <option value={WorkHistory.Seven}>7 Years</option>
                <option value={WorkHistory.Eight}>8 Years</option>
                <option value={WorkHistory.Nine}>9 Years</option>
                <option value={WorkHistory.TenPlus}>10+ Years</option>
              </select>
            </div>
          </FormField>
          <FormField field="Details">
            <AutoTextArea
              disabled={resultLoading}
              className="input autoscaling-textarea"
              placeholder={detailsHint}
              index={0}
              value={state.summary}
              onChange={(e) => state.setSummary(e)}
            />
          </FormField>
          <div className="horizontal-line mt-4 mb-4"></div>
          <div className="buttons">
            <GenerateResultsButton onClick={onGenerateClick} onLoad={onLoad} />
            <CopyResultsButton
              startingState={state.result}
              loading={state.loading}
            />
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
