import {
  ResumePrepareStep,
  useResumePrepareState,
} from "../../../../state/resume-analyser.state";
import { useResumeDetailsState } from "../../../../state/resume.state";
import { ResumePrepSkipButton } from "../ResumePrepSkipButton";

export const ResumePrepDetails = () => {
  const state = useResumeDetailsState((state) => state);
  const setStep = useResumePrepareState((state) => state.setStep);

  const onNext = () => setStep(ResumePrepareStep.Skills);

  return (
    <div>
      <div className="content">
        We've found the following starting <b>Details</b> in your Resume. Check
        if they're correct or if anything is missing.
      </div>
      <div className="review-content">
        <div className="p-4">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <input
                    className="input is-small"
                    placeholder="Please enter your name"
                    type={"text"}
                    value={state.name}
                    onChange={(e) => state.setName(e.currentTarget.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Address</label>
                </td>
                <td>
                  <input
                    className="input is-small"
                    placeholder="Please enter your address"
                    type={"text"}
                    value={state.address}
                    onChange={(e) => state.setAddress(e.currentTarget.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Phone</label>
                </td>
                <td>
                  <input
                    className="input is-small"
                    placeholder="Please enter your phone number"
                    type={"text"}
                    value={state.phone}
                    onChange={(e) => state.setPhone(e.currentTarget.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Email</label>
                </td>
                <td>
                  <input
                    className="input is-small"
                    placeholder="Please enter your email address"
                    type={"text"}
                    value={state.email}
                    onChange={(e) => state.setEmail(e.currentTarget.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Linkedin</label>
                </td>
                <td>
                  <input
                    className="input is-small"
                    placeholder="Please enter your linkedin profile (if available)"
                    type={"text"}
                    value={state.linkedin}
                    onChange={(e) => state.setLinkedin(e.currentTarget.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Website</label>
                </td>
                <td>
                  <input
                    className="input is-small"
                    placeholder="Please enter your profile website (if available)"
                    type={"text"}
                    value={state.website}
                    onChange={(e) => state.setWebsite(e.currentTarget.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="buttons mt-4">
        <button className="button is-success" onClick={onNext}>
          Use these Details
        </button>
      </div>
      <hr />
      <div className="buttons is-pulled-right">
        <ResumePrepSkipButton />
      </div>
    </div>
  );
};
