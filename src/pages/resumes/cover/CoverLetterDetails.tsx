import {
  CoverLetterInput,
  AIResult,
  WorkHistory,
} from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { InputDetailsComponent } from "../../../components/results/InputDetailsComponent";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import { useCoverLetterState } from "../../../state/cover-letter.state";
import { useInputDetailsState } from "../../../state/input-details.state";

export const CoverLetterDetails = () => {
  const detailsHint = `Please enter more details, such as:
  - top 3 strengths
  - achievements you're prod of in your previous roles
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const state = useCoverLetterState((state) => state);
  const details = useInputDetailsState((state) => state.details);

  const onGenerateClick = async () => {
    const input: CoverLetterInput = {
      question: state.question,
      company: state.company,
      name: state.name,
      role: state.role,
      history: state.history,
      details,
    };
    const res = await new OpenAIService().generateCoverLetter(input);
    state.setResult(res);
  };

  const onHintClick = async (): Promise<string> =>
    await new OpenAIService().generateCoverLetterHint(state.role);
  const onUpdate = (result: AIResult[]) => state.setResult(result);
  const onLoad = (loading: boolean) => state.setLoading(loading);

  return (
    <div className="columns">
      <div className="column">
        <div className="review-content">
          <div className="p-4">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="has-text-info">
                      <b>Prompt</b>
                    </label>
                  </td>
                  <td>
                    <AutoTextArea
                      disabled={state.loading}
                      value={state.question}
                      index={0}
                      className="input is-bold"
                      placeholder="Please enter your prompt here"
                      onChange={(e, i) => state.setQuestion(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="horizontal-line mt-4 mb-4"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Name</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      placeholder="Plase enter your name here"
                      type={"text"}
                      value={state.name}
                      disabled={state.loading}
                      onChange={(e) => state.setName(e.currentTarget.value)}
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
                      disabled={state.loading}
                      placeholder="Please enter the role you're applying to"
                      type={"text"}
                      value={state.role}
                      onChange={(e) => state.setRole(e.currentTarget.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Company</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      disabled={state.loading}
                      placeholder="Please enter the company you're applying to"
                      type={"text"}
                      value={state.company}
                      onChange={(e) => state.setCompany(e.currentTarget.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>History</label>
                  </td>
                  <td>
                    <div className="select is-small">
                      <select
                        className="is-monospace"
                        disabled={state.loading}
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
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Details</label>
                  </td>
                  <td>
                    <InputDetailsComponent
                      hint={detailsHint}
                      onHintClick={onHintClick}
                      resultLoading={state.loading}
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
                      <GenerateResultsButton
                        onClick={onGenerateClick}
                        onLoad={onLoad}
                      />
                      <CopyResultsButton
                        startingState={state.result}
                        loading={state.loading}
                      />
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
          startingState={state.result}
          onUpdate={onUpdate}
          loading={state.loading}
        />
      </div>
    </div>
  );
};
