import { useAppState } from "../state/state";

export const RoleEditor = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const role = useAppState((state) => state.inputs.role);
  const updateRole = useAppState((state) => state.updateRole);

  return (
    <div className="field">
      <label className="label">Person's role (optional):</label>
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
