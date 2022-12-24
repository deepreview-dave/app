import { useAppState } from "../state/app.state";

export const RoleEditor = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const role = useAppState((state) => state.inputs.role);
  const updateRole = useAppState((state) => state.updateRole);

  return (
    <div className="field mt-4">
      <label className="label">Role (optional):</label>
      <div className="control">
        <input
          type="text"
          className="input"
          required
          disabled={!inputEnabled}
          value={role || ""}
          placeholder="Write a person's role here (optional)"
          onChange={(e) => updateRole(e.currentTarget.value)}
        ></input>
      </div>
    </div>
  );
};
