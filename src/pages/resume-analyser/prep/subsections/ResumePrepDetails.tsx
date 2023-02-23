import { OpenAIServiceUtils } from "../../../../business/open-ai.service";
import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";
import { useResumeDetailsState } from "../../../../state/resume.state";
import { ContinueButton } from "../subcomponents/ContinueButton";

export const ResumePrepDetails = () => {
  const state = useResumeDetailsState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);

  const onNextClick = () => {
    state.setResult([OpenAIServiceUtils.getBakedDetailsResult(state)]);
    setStep(ResumePrepareStep.Skills);
  };

  return (
    <div>
      <div className="content">
        We've found the following starting <b>Details</b> in your Resume. Please
        check to see if they're correct.
      </div>
      <div className="card">
        <div className="card-content">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Name</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter your name"
                    type={"text"}
                    value={state.name}
                    onChange={(e) => state.setName(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Address</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter your address"
                    type={"text"}
                    value={state.address}
                    onChange={(e) => state.setAddress(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Phone</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter your phone number"
                    type={"text"}
                    value={state.phone}
                    onChange={(e) => state.setPhone(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Email</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter your email address"
                    type={"email"}
                    value={state.email}
                    onChange={(e) => state.setEmail(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Linkedin</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter your linkedin profile (if available)"
                    type={"text"}
                    value={state.linkedin}
                    onChange={(e) => state.setLinkedin(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Website</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    placeholder="Please enter your profile website (if available)"
                    type={"text"}
                    value={state.website}
                    onChange={(e) => state.setWebsite(e.currentTarget.value)}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ContinueButton onClick={onNextClick} />
      </div>
    </div>
  );
};
