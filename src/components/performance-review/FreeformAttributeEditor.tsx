import { useEffect } from "react";
import { useAppState } from "../../state/app.state";

export const FreeformAttributeEditor = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const attributes = useAppState((state) => state.inputs.attributes);
  const addAttribute = useAppState((state) => state.addAttribute);

  useEffect(() => {
    console.log("i am here");
  }, [attributes.length === 0]);

  return (
    <div>
      <textarea
        disabled={!inputEnabled}
        className="textarea is-primary"
      ></textarea>
    </div>
  );
};
