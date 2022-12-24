import React from "react";
import { TimePeriod } from "../business/common";
import { useAppState } from "../state/app.state";

export const TimePeriodEditor = () => {
  const timePeriod = useAppState((state) => state.inputs.timePeriod);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updateTimePeriod = useAppState((state) => state.updateTimePeriod);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as TimePeriod;
    const period = !value ? undefined : value;
    updateTimePeriod(period);
  };

  return (
    <div className="field mt-4">
      <label className="label">Time period (optional):</label>
      <div className="select">
        <select
          required
          value={timePeriod}
          disabled={!inputEnabled}
          onChange={onChange}
        >
          <option value={""}>-------------</option>
          <option value={TimePeriod.LAST_MONTH}>Last month</option>
          <option value={TimePeriod.LAST_3_MONTHS}>Last quarter</option>
          <option value={TimePeriod.LAST_6_MONTHS}>Last 6 months</option>
          <option value={TimePeriod.LAST_12_MONTHS}>Last year</option>
        </select>
      </div>
    </div>
  );
};
