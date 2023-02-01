import { useResultState } from "../../../state/result-state";
import { useResumeEducationHistoryState } from "../../../state/resume.state";

export const ResumeEducation = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeEducationHistoryState((state) => state);

  return (
    <>
      <div className="review-content">
        <div className="p-4">
          <table>
            <tr>
              <td colSpan={3} className="row-title is-monospace is-bold pb-4">
                4. Finally, add education history
              </td>
            </tr>
            {state.items.map((h, i) => (
              <>
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
                      value={h.school}
                      onChange={(e) =>
                        state.setHistory(i, {
                          ...h,
                          school: e.currentTarget.value,
                        })
                      }
                    />
                  </td>
                  <td rowSpan={6}>
                    <button
                      disabled={resultLoading}
                      title="Remove school"
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
                    <label>Degree</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      disabled={resultLoading}
                      placeholder="Please enter the degree"
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
                      placeholder="Please enter more details about your degree"
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
          title="Add more education history"
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
