import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { useResultState } from "../../../state/result-state";
import {
  ResumeEducationHistory,
  useResumeEducationHistoryState,
} from "../../../state/resume.state";
import { ordinalOfNumber } from "../../../utils/utils";

export const ResumeEducation = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeEducationHistoryState((state) => state);
  const selectedIndex = useResumeEducationHistoryState(
    (state) => state.selectedIndex
  );
  const currentHistory = useResumeEducationHistoryState(
    (state) => state.items[selectedIndex]
  );

  const detailsHint = `Please enter more details, such as:
  - what your degree or certificate was about
  - your grade
  - etc`;

  const MenuListName = (props: {
    history: ResumeEducationHistory;
    index: number;
  }) => {
    if (!props.history.school) {
      return <>{ordinalOfNumber(props.index + 1)} School</>;
    } else {
      return <>{props.history.school}</>;
    }
  };

  return (
    <>
      <div className="review-content p-4">
        <div className="columns">
          <div className="column is-3">
            <aside className="menu is-monospace is-size-7">
              <p className="menu-label">Job History</p>
              <ul className="menu-list">
                {state.items.map((e, i) => (
                  <li key={i}>
                    <a
                      className={i === selectedIndex ? "is-active" : ""}
                      onClick={() => state.selectHistory(i)}
                    >
                      <MenuListName history={e} index={i} />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
          <div className="column is-9">
            <div className="">
              <div className="">
                <table>
                  <tbody>
                    <tr>
                      <td
                        colSpan={3}
                        className="row-title is-monospace is-bold pb-4"
                      >
                        4. Finally, add education history
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>School</label>
                      </td>
                      <td>
                        <input
                          className="input is-small"
                          disabled={resultLoading}
                          placeholder="Please enter the name of the school"
                          type={"text"}
                          value={currentHistory.school}
                          onChange={(e) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
                              school: e.currentTarget.value,
                            })
                          }
                        />
                      </td>
                      <td rowSpan={2}>
                        <button
                          disabled={resultLoading || selectedIndex === 0}
                          title="Remove school"
                          className="button is-small is-white ml-4"
                          onClick={() => state.removeHistory(selectedIndex)}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-times"></i>
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Degree</label>
                      </td>
                      <td>
                        <input
                          className="input is-small"
                          disabled={resultLoading}
                          placeholder="Please enter the degree"
                          type={"text"}
                          value={currentHistory.degree}
                          onChange={(e) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
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
                          disabled={resultLoading}
                          placeholder="Please enter the start date (e.g. 2019)"
                          type={"text"}
                          value={currentHistory.start}
                          onChange={(e) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
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
                          value={currentHistory.end}
                          onChange={(e) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
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
                          value={currentHistory.details}
                          index={selectedIndex}
                          placeholder={detailsHint}
                          onChange={(details) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
                              details,
                            })
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="plus-button-holder">
        <button
          disabled={resultLoading}
          title="Add more jobs"
          className="button is-small is-rounded plus-button"
          onClick={() => state.addHistory()}
        >
          <span className="icon is-small has-text-success">
            <i className="fas fa-plus"></i>
          </span>
        </button>
      </div>
    </>
  );
};
