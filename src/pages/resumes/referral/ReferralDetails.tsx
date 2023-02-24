import {
  AIResult,
  Pronouns,
  ReferralLetterInput,
} from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { FormField } from "../../../components/common/FormField";
import { InputDetailsComponent } from "../../../components/results/InputDetailsComponent";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import { useInputDetailsState } from "../../../state/input-details.state";
import { useReferralLetterState } from "../../../state/referral-letter.state";

export const ReferralDetails = () => {
  const detailsHint = `Please enter more details, such as:
  - main strengths of the applicant
  - a story or achievement of the applicant
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const state = useReferralLetterState((state) => state);
  const details = useInputDetailsState((state) => state.details);

  const onGenerateClick = async () => {
    const input: ReferralLetterInput = {
      question: state.question,
      you: state.you,
      recipient: state.recipient,
      applicant: state.applicant,
      details,
    };
    const res = await new OpenAIService().generateReferralLetter(input);
    state.setResult(res);
  };

  const onHintClick = async (): Promise<string> => {
    return await new OpenAIService().generateReferralLetterHint(
      state.applicant.role
    );
  };

  const onUpdate = (result: AIResult[]) => state.setResult(result);
  const onLoad = (loading: boolean) => state.setLoading(loading);

  return (
    <div className="columns">
      <div className="column">
        <div className="result-content p-4">
          <FormField field="Prompt" className="has-text-info">
            <AutoTextArea
              disabled={state.loading}
              value={state.question}
              index={0}
              className="input autoscaling-textarea"
              placeholder="Please enter your prompt here"
              onChange={(e, i) => state.setQuestion(e)}
            />
          </FormField>
          <div className="horizontal-line mt-4 mb-4"></div>
          <div className="mb-4">
            <b>First input your own details</b>
          </div>
          <FormField field="Name">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter your name"
              type={"text"}
              value={state.you.name}
              onChange={(e) => state.setYourName(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Address">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter your address"
              type={"text"}
              value={state.you.address}
              onChange={(e) => state.setYourAddress(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Contact">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter contact details such as phone or email"
              type={"text"}
              value={state.you.contact}
              onChange={(e) => state.setYourContact(e.currentTarget.value)}
            />
          </FormField>
          <div className="mb-4">
            <b>Then input the recipient's details</b>
          </div>
          <FormField field="Name">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter the recipient's name"
              type={"text"}
              value={state.recipient.name}
              onChange={(e) => state.setRecipientName(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Role">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter the recipient's role or title"
              type={"text"}
              value={state.recipient.title}
              onChange={(e) => state.setRecipientTitle(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Company">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Pleaase enter the recipient's company"
              type={"text"}
              value={state.recipient.company}
              onChange={(e) => state.setRecipientCompany(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Address">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter the recipient's company's address"
              type={"text"}
              value={state.recipient.address}
              onChange={(e) => state.setRecipientAddress(e.currentTarget.value)}
            />
          </FormField>
          <div className="mb-4">
            <b>Finally, fill in the applicant's details</b>
          </div>
          <FormField field="Name">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter the applicant's name"
              type={"text"}
              value={state.applicant.name}
              onChange={(e) => state.setApplicantName(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Role">
            <input
              className="input"
              required
              disabled={state.loading}
              placeholder="Please enter the position or role the person is applying for"
              type={"text"}
              value={state.applicant.role}
              onChange={(e) => state.setApplicantRole(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Pronoun">
            <div className="select">
              <select
                disabled={state.loading}
                value={state.applicant.pron}
                onChange={(e) =>
                  state.setApplicantPronoun(e.currentTarget.value as Pronouns)
                }
              >
                <option value={Pronouns.NEUTRAL}>They</option>
                <option value={Pronouns.HE}>He/Him</option>
                <option value={Pronouns.HER}>She/Her</option>
              </select>
            </div>
          </FormField>
          <FormField field="Details">
            <InputDetailsComponent
              hint={detailsHint}
              onHintClick={onHintClick}
              resultLoading={state.loading}
            />
          </FormField>
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
