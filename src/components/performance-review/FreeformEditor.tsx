import { useEffect } from "react";
import { useAppState } from "../../state/app.state";

export const FreeformEditor = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const freeform = useAppState((state) => state.inputs.details.freeform);
  const updateFreeform = useAppState((state) => state.updateFreeform);

  return (
    <div className="field">
      <label className="label">Details:</label>
      <div className="control">
        <textarea
          value={freeform}
          disabled={!inputEnabled}
          className="textarea is-primary"
          placeholder="Add a short summary of a person's overall performance, projects they worked on, areas they shined in or areas they need to improve on."
          onChange={(e) => updateFreeform(e.currentTarget.value)}
        ></textarea>
      </div>
    </div>
  );
};
