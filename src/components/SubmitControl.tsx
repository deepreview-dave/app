import { useAppState } from "../state/app.state";

export const SubmitControl = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const reviewedName = useAppState((state) => state.inputs.name);
  const reviewedPerformanceScore = useAppState((state) => state.inputs.score);
  const attributes = useAppState((state) => state.inputs.attributes);
  const role = useAppState((state) => state.inputs.role);
  const department = useAppState((state) => state.inputs.department);
  const timePeriod = useAppState((state) => state.inputs.timePeriod);
  const pronoun = useAppState((state) => state.inputs.pronoun);

  const isButtonDisabled = reviewedName.trim() === "";

  const onSubmit = async () =>
    await generateAnswer(
      reviewedName,
      reviewedPerformanceScore,
      pronoun,
      attributes,
      role,
      department,
      timePeriod
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
