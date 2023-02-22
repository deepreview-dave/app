import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../..";
import { useResumeAnalyserState } from "../../state/resume-analyser.state";
import { ResumeUploader } from "../resume-analyser/analyse/ResumeUploader";

export const ResumeAnalyserCard = () => {
  const navigate = useNavigate();
  const state = useResumeAnalyserState((state) => state);

  useEffect(() => {
    state.clearFile();
  }, []);

  const onAnalyseClick = () => navigate(API_ROUTES.AUTO_REVIEW_RESUME_ANALYSE);
  const onStartFromScratchClick = () => navigate(API_ROUTES.RESUME_CV);

  return (
    <div className="card">
      <div className="columns is-vcentered">
        <div className="column">
          <div className="card-image">
            <figure className="image is-1by1">
              <img
                className="cover-fit"
                src="/images/success-1.jpg"
                alt="Resumes Analyser"
              />
            </figure>
          </div>
        </div>
        <div className="column">
          <div className="card-content">
            <div className="content">
              <h4>Resume Analyser</h4>
              <p>
                Already have a resume? Upload the PDF and DeepReview will
                analyse it and suggest improvements.
              </p>
              <ResumeUploader />
            </div>
            <div className="mt-4">
              <button
                disabled={!state.file}
                className="button is-primary"
                onClick={onAnalyseClick}
              >
                Analyse & Improve
              </button>
            </div>
            <hr />
            <div>
              <p>
                If you don't have a Resume, you can create one from scratch.
              </p>
            </div>
            <div className="mt-4">
              <button
                className="button is-primary is-outlined"
                onClick={onStartFromScratchClick}
              >
                Start from scratch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
