import { AIResult } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { FormField } from "../../../components/common/FormField";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import { useResumeDetailsState } from "../../../state/resume.state";

export const ResumeDetails = () => {
  const resultLoading = useResumeDetailsState((state) => state.loading);
  const state = useResumeDetailsState((state) => state);

  const onGenerateClick = async () => {
    const input = state;
    const res = await new OpenAIService().generateResumeDetails(input);
    state.setResult(res);
  };

  const onUpdate = (result: AIResult[]) => state.setResult(result);
  const onLoad = (loading: boolean) => state.setLoading(loading);

  return (
    <div className="columns">
      <div className="column">
        <div className="result-content p-4">
          <div className="mb-4">
            <i>Start by entering your details</i>
          </div>
          <FormField field="Name">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter your name"
              type={"text"}
              value={state.name}
              onChange={(e) => state.setName(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Address">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter your address"
              type={"text"}
              value={state.address}
              onChange={(e) => state.setAddress(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Phone">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter your phone number"
              type={"text"}
              value={state.phone}
              onChange={(e) => state.setPhone(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Email">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter your email address"
              type={"text"}
              value={state.email}
              onChange={(e) => state.setEmail(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Linkedin">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter your linkedin profile (if available)"
              type={"text"}
              value={state.linkedin}
              onChange={(e) => state.setLinkedin(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Website">
            <input
              className="input"
              disabled={resultLoading}
              placeholder="Please enter your profile website (if available)"
              type={"text"}
              value={state.website}
              onChange={(e) => state.setWebsite(e.currentTarget.value)}
            />
          </FormField>
          <div className="horizontal-line mt-2 mb-4"></div>
          <div className="buttons">
            <GenerateResultsButton onClick={onGenerateClick} onLoad={onLoad} />
            <CopyResultsButton
              startingState={state.result}
              loading={state.loading}
            />
          </div>
        </div>
      </div>
      <div className="column">
        <ResultsInlineComponent
          startingState={state.result}
          onUpdate={onUpdate}
          loading={state.loading}
        />
      </div>
    </div>
  );
};
