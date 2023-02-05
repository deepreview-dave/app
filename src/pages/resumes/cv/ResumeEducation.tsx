import { AIResult } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import {
  ResumeEducationHistory,
  useResumeEducationHistoryState,
} from "../../../state/resume.state";

export const ResumeEducation = () => {
  const state = useResumeEducationHistoryState((state) => state);

  const detailsHint = `Please enter more details, such as:
  - what your degree or certificate was about
  - your grade
  - etc`;

  const onGenerateClick = async (
    item: ResumeEducationHistory,
    index: number
  ) => {
    const question = state.question;
    const res = await new OpenAIService().generateEducationHistoryItem(
      question,
      item
    );
    state.setResults(res, index);
  };

  const onUpdate = (result: AIResult[], index: number) =>
    state.setResults(result, index);
  const onLoad = (loading: boolean, index: number) =>
    state.setLoading(loading, index);

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
                        colSpan={2}
                        className="row-title is-monospace is-bold pb-4"
                      >
                        <div className="columns is-vcentered is-mobile">
                          <div className="column">
                            Add education history information
                          </div>
                          <div className="column is-narrow">
                            <button
                              disabled={h.loading || i === 0}
                              title="Remove school"
                              className="button is-small"
                              onClick={() => state.removeHistory(i)}
                            >
                              <span className="icon is-small">
                                <i className="fas fa-times"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
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
                            state.setHistory(i, {
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
                            state.setHistory(i, {
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
                          disabled={h.loading}
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
                          disabled={h.loading}
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
                      <td colSpan={2}>
                        <div className="horizontal-line mt-4 mb-4"></div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className="buttons">
                          <GenerateResultsButton
                            onClick={() => onGenerateClick(h, i)}
                            onLoad={(loading) => onLoad(loading, i)}
                          />
                          <CopyResultsButton
                            startingState={h.results}
                            loading={h.loading}
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
              startingState={h.results}
              onUpdate={(res) => onUpdate(res, i)}
              loading={h.loading}
            />
          </div>
        </div>
      ))}
      <div className="buttons mt-4">
        <button
          className="button is-info"
          title="Add more schools"
          onClick={() => state.addHistory()}
        >
          Add more schools
        </button>
      </div>
    </>
  );
};
