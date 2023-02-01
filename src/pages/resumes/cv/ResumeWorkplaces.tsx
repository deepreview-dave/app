import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { useResultState } from "../../../state/result-state";
import { useResumeWorkHistoryState } from "../../../state/resume.state";

export const ResumeWorkplaces = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeWorkHistoryState((state) => state);

  return (
    <>
      <div className="review-content">
        <div className="p-4">
          <table>
            <tr>
              <td colSpan={3} className="row-title is-monospace is-bold pb-4">
                3. Now add as many previous jobs as you want
              </td>
            </tr>
            {state.items.map((h, i) => (
              <>
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
                  <td rowSpan={6}>
                    <button
                      disabled={resultLoading}
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
                    <input
                      className="input is-small"
                      disabled={resultLoading}
                      value={h.details}
                      placeholder="Please enter more details about your achievements in this job"
                      type={"text"}
                      onChange={(e) =>
                        state.setHistory(i, {
                          ...h,
                          details: e.currentTarget.value,
                        })
                      }
                    />
                  </td>
                </tr>
                {i !== state.items.length - 1 && (
                  <tr>
                    <td colSpan={3} className="pt-3 pb-4">
                      <div className="horizontal-line"></div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </table>
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
