import { FormEvent } from "react";

import { useAppState } from "../state/state";

export const DepartmentEditor = () => {

  const inputEnabled = useAppState((state) => state.inputEnabled);
  const department = useAppState((state) => state.inputs.department);
  const updateDepartment = useAppState((state) => state.updateDepartment);
  const onNameInputChange = (e: FormEvent<HTMLInputElement>) => updateDepartment(e.currentTarget.value);

  return (
    <div className="field">
      <label className="label">Person's department (optional):</label>
      <div className="control">
        <input
          type="text"
          className="input"
          required
          disabled={!inputEnabled}
          value={department}
          placeholder="Write a person's department here (optional)"
          onChange={onNameInputChange}
        ></input>
      </div>
    </div>
  );
};
