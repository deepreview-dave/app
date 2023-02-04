import { AIResult } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import { useResultState } from "../../../state/result-state";
import {
  ResumeWorkHistory,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";

export const ResumeWorkplaces = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeWorkHistoryState((state) => state);

  const detailsHint = `Please enter more details, such as:
  - main achievements in the job
  - your principal responsibilities
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const onGenerateClick = async (item: ResumeWorkHistory, index: number) => {
    const question = state.question;
    const res = await new OpenAIService().generateResumeWorkHistoryItem(
      question,
      item
    );
    state.setResults(res, index);
  };

  const onUpdate = (result: AIResult[], index: number) => {
    state.setResults(result, index);
  };

  return (
    <>
      {state.items.map((h, i) => (
        <div className="columns" key={i}>
          <div className="column">
            <div className="review-content">
              <div className="p-4">
                <table>
                  <tbody>
                    <tr>
                      <td
                        colSpan={3}
                        className="row-title is-monospace is-bold pb-4"
                      >
                        3. Now add as many previous jobs as you want
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Company</label>
                      </td>
                      <td>
                        <input
                          className="input is-small"
                          disabled={resultLoading}
                          placeholder="Please enter the name of the company"
                          type={"text"}
                          value={h.company}
                          onChange={(e) =>
                            state.setHistory(i, {
                              ...h,
                              company: e.currentTarget.value,
                            })
                          }
                        />
                      </td>
                      <td rowSpan={5}>
                        <button
                          disabled={resultLoading || i === 0}
                          title="Remove job"
                          className="button is-small is-white ml-4"
                          onClick={() => state.removeHistory(i)}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-times"></i>
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Role</label>
                      </td>
                      <td>
                        <input
                          className="input is-small"
                          disabled={resultLoading}
                          placeholder="Please enter the role or title"
                          type={"text"}
                          value={h.role}
                          onChange={(e) =>
                            state.setHistory(i, {
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
                          disabled={resultLoading}
                          placeholder="Please enter the start date (e.g. 2019)"
                          type={"text"}
                          value={h.start}
                          onChange={(e) =>
                            state.setHistory(i, {
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
                          disabled={resultLoading}
                          placeholder="Please enter the end date (e.g. 2022)"
                          type={"text"}
                          value={h.end}
                          onChange={(e) =>
                            state.setHistory(i, {
                              ...h,
                              end: e.currentTarget.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Details</label>
                      </td>
                      <td>
                        <AutoTextArea
                          className="input"
                          disabled={resultLoading}
                          value={h.details}
                          index={i}
                          placeholder={detailsHint}
                          onChange={(details) =>
                            state.setHistory(i, {
                              ...h,
                              details,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="horizontal-line mt-4 mb-4"></div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="buttons">
                          <GenerateResultsButton
                            onClick={() => onGenerateClick(h, i)}
                          />
                          <CopyResultsButton startingState={h.results} />
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
              startingState={h.results}
              onUpdate={(res) => onUpdate(res, i)}
            />
          </div>
        </div>
      ))}
      <div className="buttons mt-4">
        <button
          disabled={resultLoading}
          className="button"
          title="Add more jobs"
          onClick={() => state.addHistory()}
        >
          Add more jobs
        </button>
      </div>
    </>
  );
};
