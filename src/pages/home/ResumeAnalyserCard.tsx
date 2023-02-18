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

  return (
    <div className="card">
      <div className="columns is-vcentered">
        <div className="column p-0">
          <div className="card-image">
            <figure className="image is-3by2">
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
            <div>
              <div className="mt-4">
                <button
                  disabled={!state.file}
                  className="button is-success"
                  onClick={onAnalyseClick}
                >
                  Analyse & Improve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
