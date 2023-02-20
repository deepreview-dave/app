import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";

export const ResumePrepSteps = () => {
  const step = useResumePrepareState((state) => state.step);
  const setStep = useResumePrepareState((state) => state.setStep);

  const isActiveClass = (current: ResumePrepareStep) =>
    step === current ? "steps-segment is-active" : "steps-segment";

  return (
    <ul className="steps has-content-centered">
      <li className={isActiveClass(ResumePrepareStep.Details)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">
            <a onClick={() => setStep(ResumePrepareStep.Details)}>Details</a>
          </p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Skills)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">
            <a onClick={() => setStep(ResumePrepareStep.Skills)}>Skills</a>
          </p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Summary)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">
            <a onClick={() => setStep(ResumePrepareStep.Summary)}>Summary</a>
          </p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Work)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">
            <a onClick={() => setStep(ResumePrepareStep.Work)}>Work</a>
          </p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Education)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">
            <a onClick={() => setStep(ResumePrepareStep.Education)}>
              Education
            </a>
          </p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Finish)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">
            <a onClick={() => setStep(ResumePrepareStep.Finish)}>Result</a>
          </p>
        </div>
      </li>
    </ul>
  );
};
