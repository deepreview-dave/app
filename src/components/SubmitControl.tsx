import { useAppState } from "../state/app.state";

export const SubmitControl = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const reviewedPerformanceScore = useAppState((state) => state.inputs.score);
  const reviewedName = useAppState((state) => state.inputs.name);
  const role = useAppState((state) => state.inputs.role);
  const department = useAppState((state) => state.inputs.department);
  const attributes = useAppState((state) => state.inputs.attributes);

  const isButtonDisabled = reviewedName.trim() === "";

  const onSubmit = async () =>
    await generateAnswer(
      reviewedName,
      reviewedPerformanceScore,
      attributes,
      role,
      department
    );
  const generateAnswer = useAppState((state) => state.generateAnswer);

  return (
    <div className="control pt-4">
      <button
        className="button is-link is-fullwidth"
        disabled={isButtonDisabled || !inputEnabled}
        onClick={onSubmit}
      >
        Generate
      </button>
    </div>
  );
};
