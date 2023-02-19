import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../../..";
import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";
import { ResumeResult } from "../../../resumes/cv/ResumeResult";

export const ResumePrepFinal = () => {
  const navitate = useNavigate();
  const setStep = useResumePrepareState((state) => state.setStep);
  const onPrev = () => setStep(ResumePrepareStep.Education);

  const onFinish = () => navitate(API_ROUTES.RESUME_CV);

  return (
    <div>
      <ResumeResult />
      <hr />
      <div className="columns is-mobile">
        <div className="column">
          <button className="button is-secondary" onClick={onPrev}>
            Prev
          </button>
        </div>
        <div className="column is-narrow">
          <button className="button is-primary" onClick={onFinish}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};
