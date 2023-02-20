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
      <div className="mt-4">
        <ContinueButton onClick={onNextClick} />
      </div>
    </div>
  );
};
