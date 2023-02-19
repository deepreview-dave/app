import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../state/resume-analyser.state";

export const ResumePrepSkipButton = () => {
  const setStep = useResumePrepareState((state) => state.setStep);
  const onClick = () => setStep(ResumePrepareStep.Finish);

  return (
    <button className="button is-text" onClick={onClick}>
      Skip
    </button>
  );
};
