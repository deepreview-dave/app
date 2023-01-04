import { useEffect } from "react";
import { Relationship } from "../business/common";
import { useAppState } from "../state/app.state";

export const NameEditor = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const reviewedName = useAppState((state) => state.inputs.name);
  const updateName = useAppState((state) => state.updateName);
  const relationship = useAppState((state) => state.inputs.relationship);

  const isNameInputDisabled = () => relationship === Relationship.Self;

  return (
    <div className="field">
      <label className="label">Name:</label>
      <div className="control">
        <input
          type="text"
          className="input"
          required
          disabled={!inputEnabled || isNameInputDisabled()}
          value={reviewedName}
          placeholder="Write a person's name here"
          onChange={(e) => updateName(e.currentTarget.value)}
        ></input>
      </div>
    </div>
  );
};
