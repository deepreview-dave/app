import { WorkHistory } from "../../../../business/common";
import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";
import { useResumeSummaryState } from "../../../../state/resume.state";
import { ContinueButton } from "../subcomponents/ContinueButton";
import { PrevButton } from "../subcomponents/PrevButton";

export const ResumePrepSkills = () => {
  const state = useResumeSummaryState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);

  const onNextClick = () => setStep(ResumePrepareStep.Summary);
  const onPrevClick = () => setStep(ResumePrepareStep.Details);

  return (
    <div>
      <div className="content">
        We've found the following <b>Skills</b> in your Resume. Please check to
        see if they're correct.
      </div>
      <div className="card">
        <div className="card-content">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Skills</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter a comma separated list of skills e.g. Driving, Excel, Management, etc"
                    type={"text"}
                    value={state.skills}
                    onChange={(e) => state.setSkills(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">History</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="select">
                  <select
                    value={state.history}
                    onChange={(e) =>
                      state.setHistory(e.currentTarget.value as WorkHistory)
                    }
                  >
                    <option value={WorkHistory.One}>1 Year</option>
                    <option value={WorkHistory.Two}>2 Years</option>
                    <option value={WorkHistory.Three}>3 Years</option>
                    <option value={WorkHistory.Four}>4 Years</option>
                    <option value={WorkHistory.Five}>5 Years</option>
                    <option value={WorkHistory.Six}>6 Years</option>
                    <option value={WorkHistory.Seven}>7 Years</option>
                    <option value={WorkHistory.Eight}>8 Years</option>
                    <option value={WorkHistory.Nine}>9 Years</option>
                    <option value={WorkHistory.TenPlus}>10+ Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ContinueButton onClick={onNextClick} />
      </div>
      <PrevButton onClick={onPrevClick} />
    </div>
  );
};
