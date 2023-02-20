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
  const onPrev = () => setStep(ResumePrepareStep.Details);

  const onFinish = () => navitate(API_ROUTES.RESUME_CV);

  return (
    <div>
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          Click Finish to complete the process. Don't worry, you'll still be
          able to edit, preview and download your Resume.
        </div>
        <div className="column is-narrow">
          <button className="button is-success" onClick={onFinish}>
            Finish
          </button>
        </div>
      </div>
      <ResumeResult />
    </div>
  );
};
