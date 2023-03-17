import { Analytics } from "../../../business/analytics";
import { useResumeAnalyserState } from "../../../state/resume-analyser.state";

export const ResumeUploader = () => {
  const state = useResumeAnalyserState((state) => state);

  const onFileChange = (e: any) => {
    Analytics.uploadResume();
    state.setFile(e.target.files[0] as File);
  };

  return (
    <div className="file has-name is-fullwidth">
      <label className="file-label">
        <input
          className="file-input"
          type="file"
          name="resume"
          onChange={onFileChange}
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">Choose a file…</span>
        </span>
        <span className="file-name">
          {state.file?.name ?? "Select file to upload"}
        </span>
      </label>
    </div>
  );
};
