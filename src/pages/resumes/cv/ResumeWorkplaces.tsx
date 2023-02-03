import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { useResultState } from "../../../state/result-state";
import {
  ResumeWorkHistory,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";
import { ordinalOfNumber } from "../../../utils/utils";

export const ResumeWorkplaces = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeWorkHistoryState((state) => state);
  const selectedIndex = useResumeWorkHistoryState(
    (state) => state.selectedIndex
  );
  const currentHistory = useResumeWorkHistoryState(
    (state) => state.items[selectedIndex]
  );

  const detailsHint = `Please enter more details, such as:
  - main achievements in the job
  - your principal responsibilities
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const MenuListName = (props: {
    history: ResumeWorkHistory;
    index: number;
  }) => {
    if (!props.history.company) {
      return <>{ordinalOfNumber(props.index + 1)} Job</>;
    } else {
      return <>{props.history.company}</>;
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
                          value={currentHistory.company}
                          onChange={(e) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
                              company: e.currentTarget.value,
                            })
                          }
                        />
                      </td>
                      <td rowSpan={2}>
                        <button
                          disabled={resultLoading || selectedIndex === 0}
                          title="Remove job"
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
                        <label>Role</label>
                      </td>
                      <td>
                        <input
                          className="input is-small"
                          disabled={resultLoading}
                          placeholder="Please enter the role or title"
                          type={"text"}
                          value={currentHistory.role}
                          onChange={(e) =>
                            state.setHistory(selectedIndex, {
                              ...currentHistory,
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
