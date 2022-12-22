import { useAppState } from "../state/app.state";

export const DepartmentEditor = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const department = useAppState((state) => state.inputs.department);
  const updateDepartment = useAppState((state) => state.updateDepartment);

  return (
    <div className="field">
      <label className="label">Person's department (optional):</label>
      <div className="control">
        <input
          type="text"
          className="input"
          required
          disabled={!inputEnabled}
          value={department || ""}
          placeholder="Write a person's department here (optional)"
          onChange={(e) => updateDepartment(e.currentTarget.value)}
        ></input>
      </div>
    </div>
  );
};
