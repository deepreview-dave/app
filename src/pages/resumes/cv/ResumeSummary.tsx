import { WorkHistory } from "../../../business/common";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { useResultState } from "../../../state/result-state";
import { useResumeSummaryState } from "../../../state/resume.state";

export const ResumeSummary = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeSummaryState((state) => state);

  const detailsHint = `Please enter more details, such as:
  - achievements you're prod of in your career
  - strengts and skills you've developed over the years
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  return (
    <div className="review-content">
      <div className="p-4">
        <table>
          <tbody>
            <tr>
              <td colSpan={2} className="row-title is-monospace is-bold pb-4">
                2. Continue by adding information for a short summary
              </td>
            </tr>
            <tr>
              <td>
                <label>Skills</label>
              </td>
              <td>
                <input
                  className="input is-small"
                  disabled={resultLoading}
                  placeholder="Please enter a comma separated list of skills e.g. Driving, Excel, Management, etc"
                  type={"text"}
                  value={state.skills}
                  onChange={(e) => state.setSkills(e.currentTarget.value)}
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
              </td>
            </tr>
            <tr>
              <td>
                <label>Details</label>
              </td>
              <td>
                <AutoTextArea
                  disabled={resultLoading}
                  className="input"
                  placeholder={detailsHint}
                  index={0}
                  value={state.summary}
                  onChange={(e) => state.setSummary(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
