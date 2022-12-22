import { useAppState } from "../state/app.state";
import { PerformanceScore } from "../business/common";

export const PerformanceScoreEditor = () => {
  const score = useAppState((state) => state.inputs.score);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updatePerformanceScore = useAppState(
    (state) => state.updatePerformanceScore
  );

  return (
    <div className="field">
      <label className="label">Peformance score:</label>
      <div className="select">
        <select
          required
          value={score}
          defaultValue={PerformanceScore.MEETS_EXPECTATIONS}
          disabled={!inputEnabled}
          onChange={(e) =>
            updatePerformanceScore(e.target.value as PerformanceScore)
          }
        >
          <option value={PerformanceScore.BELOW_EXPECTATIONS}>
            Below expectations
          </option>
          <option value={PerformanceScore.MEETS_EXPECTATIONS}>
            Meets expectations
          </option>
          <option value={PerformanceScore.ABOVE_EXPECTATIONS}>
            Above expectations
          </option>
        </select>
      </div>
    </div>
  );
};
