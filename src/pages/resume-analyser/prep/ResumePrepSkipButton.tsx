import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../..";
import { useResumePrepareState } from "../../../state/resume-analyser.state";

export const ResumePrepSkipButton = () => {
  const navigate = useNavigate();
  const state = useResumePrepareState((state) => state);

  const onClick = () => navigate(API_ROUTES.RESUME_CV);

  return (
    <button className="button is-text" onClick={onClick}>
      Skip
    </button>
  );
};
