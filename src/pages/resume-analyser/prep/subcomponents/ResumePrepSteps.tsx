import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";

export const ResumePrepSteps = () => {
  const step = useResumePrepareState((state) => state.step);

  const isActiveClass = (current: ResumePrepareStep) =>
    step === current ? "steps-segment is-active" : "steps-segment";

  return (
    <ul className="steps has-content-centered">
      <li className={isActiveClass(ResumePrepareStep.Details)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Details</p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Skills)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Skills</p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Summary)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Summary</p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Work)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Work Experience</p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Education)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Education</p>
        </div>
      </li>
      <li className={isActiveClass(ResumePrepareStep.Finish)}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Finish</p>
        </div>
      </li>
    </ul>
  );
};
