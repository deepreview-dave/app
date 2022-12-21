import { useAppState } from "../state/state";
import { PerformanceScore } from "../domain/smarts";

export const PerformanceScoreEditor = () => {
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
