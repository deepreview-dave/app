import { OpenAIServiceUtils } from "../../../../business/open-ai.service";
import { FormField } from "../../../../components/common/FormField";
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
      <div className="result-content p-4">
        <FormField field="Name">
          <input
            className="input"
            placeholder="Please enter your name"
            type={"text"}
            value={state.name}
            onChange={(e) => state.setName(e.currentTarget.value)}
          />
        </FormField>
        <FormField field="Address">
          <input
            className="input"
            placeholder="Please enter your address"
            type={"text"}
            value={state.address}
            onChange={(e) => state.setAddress(e.currentTarget.value)}
          />
        </FormField>
        <FormField field="Phone">
          <input
            className="input"
            placeholder="Please enter your phone number"
            type={"text"}
            value={state.phone}
            onChange={(e) => state.setPhone(e.currentTarget.value)}
          />
        </FormField>
        <FormField field="Email">
          <input
            className="input"
            placeholder="Please enter your email address"
            type={"email"}
            value={state.email}
            onChange={(e) => state.setEmail(e.currentTarget.value)}
          />
        </FormField>
        <FormField field="Linkedin">
          <input
            className="input"
            placeholder="Please enter your linkedin profile (if available)"
            type={"text"}
            value={state.linkedin}
            onChange={(e) => state.setLinkedin(e.currentTarget.value)}
          />
        </FormField>
        <FormField field="Website">
          <input
            className="input"
            placeholder="Please enter your profile website (if available)"
            type={"text"}
            value={state.website}
            onChange={(e) => state.setWebsite(e.currentTarget.value)}
          />
        </FormField>
      </div>
      <div className="mt-4">
        <ContinueButton onClick={onNextClick} />
      </div>
    </div>
  );
};
