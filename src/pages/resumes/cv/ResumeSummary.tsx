import { WorkHistory } from "../../../business/common";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { useResultState } from "../../../state/result-state";
import { useResumeSummaryState } from "../../../state/resume.state";

export const ResumeSummary = () => {
  const placeholder = `Add a brief summary of your work history and your achievements.`;

  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeSummaryState((state) => state);

  return (
    <div className="review-content">
      <div className="p-2">
        <div>
          <label>Skills</label>
          <input
            disabled={resultLoading}
            placeholder="Driving, Excel, etc"
            type={"text"}
            value={state.skills}
            onChange={(e) => state.setSkills(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>History</label>
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
      </div>
      <div className="horizontal-line"></div>
      <div className="pl-2 pr-2 pt-2 pb-1">
        <AutoTextArea
          disabled={resultLoading}
          value={state.question}
          index={0}
          placeholder="Write your question here ..."
          onChange={(e, i) => state.setQuestion(e)}
        />
      </div>
      <div className="horizontal-line"></div>
      <div className="pl-2 pr-2 pt-2 pb-1">
        <AutoTextArea
          disabled={resultLoading}
          value={state.summary}
          index={1}
          placeholder={placeholder}
          onChange={(e, i) => state.setSummary(e)}
        />
      </div>
    </div>
  );
};
