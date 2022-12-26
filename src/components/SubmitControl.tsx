import { useAppState } from "../state/app.state";

export const SubmitControl = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const reviewedName = useAppState((state) => state.inputs.name);
  const reviewedPerformanceScore = useAppState((state) => state.inputs.score);
  const attributes = useAppState((state) => state.inputs.attributes);
  const role = useAppState((state) => state.inputs.role);
  const department = useAppState((state) => state.inputs.department);
  const timePeriod = useAppState((state) => state.inputs.timePeriod);
  const reviewTone = useAppState((state) => state.inputs.reviewTone);
  const reviewLanguage = useAppState((state) => state.inputs.reviewLanguage);

  const isButtonDisabled = reviewedName.trim() === "";

  const onSubmit = async () =>
    await generateAnswer(
      reviewedName,
      reviewedPerformanceScore,
      attributes,
      reviewTone,
      reviewLanguage,
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
