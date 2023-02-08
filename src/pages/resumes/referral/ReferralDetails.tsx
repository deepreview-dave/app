import {
  AIResult,
  Pronouns,
  ReferralLetterInput,
} from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
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
        <div className="review-content">
          <div className="p-4">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="has-text-info">
                      <b>Prompt</b>
                    </label>
                  </td>
                  <td>
                    <AutoTextArea
                      disabled={state.loading}
                      value={state.question}
                      index={0}
                      className="input is-bold"
                      placeholder="Please enter your prompt here"
                      onChange={(e, i) => state.setQuestion(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="horizontal-line mt-4 mb-4"></div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="row-title is-monospace is-bold pb-4"
                  >
                    First input your own details
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Name</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Please enter your name"
                      type={"text"}
                      value={state.you.name}
                      onChange={(e) => state.setYourName(e.currentTarget.value)}
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
                      required
                      disabled={state.loading}
                      placeholder="Please enter your address"
                      type={"text"}
                      value={state.you.address}
                      onChange={(e) =>
                        state.setYourAddress(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Contact</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Please enter contact details such as phone or email"
                      type={"text"}
                      value={state.you.contact}
                      onChange={(e) =>
                        state.setYourContact(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="row-title is-monospace is-bold pb-4 pt-2"
                  >
                    Then input the recipient's details
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Name</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Please enter the recipient's name"
                      type={"text"}
                      value={state.recipient.name}
                      onChange={(e) =>
                        state.setRecipientName(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Please enter the recipient's role or title"
                      type={"text"}
                      value={state.recipient.title}
                      onChange={(e) =>
                        state.setRecipientTitle(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Company</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Pleaase enter the recipient's company"
                      type={"text"}
                      value={state.recipient.company}
                      onChange={(e) =>
                        state.setRecipientCompany(e.currentTarget.value)
                      }
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
                      required
                      disabled={state.loading}
                      placeholder="Please enter the recipient's company's address"
                      type={"text"}
                      value={state.recipient.address}
                      onChange={(e) =>
                        state.setRecipientAddress(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="row-title is-monospace is-bold pb-4 pt-2"
                  >
                    Finally, fill in the applicant's details
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Name</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Please enter the applicant's name"
                      type={"text"}
                      value={state.applicant.name}
                      onChange={(e) =>
                        state.setApplicantName(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role</label>
                  </td>
                  <td>
                    <input
                      className="input is-small"
                      required
                      disabled={state.loading}
                      placeholder="Please enter the position or role the person is applying for"
                      type={"text"}
                      value={state.applicant.role}
                      onChange={(e) =>
                        state.setApplicantRole(e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Pronoun</label>
                  </td>
                  <td>
                    <div className="select is-small">
                      <select
                        className="is-monospace"
                        disabled={state.loading}
                        value={state.applicant.pron}
                        onChange={(e) =>
                          state.setApplicantPronoun(
                            e.currentTarget.value as Pronouns
                          )
                        }
                      >
                        <option value={Pronouns.NEUTRAL}>They</option>
                        <option value={Pronouns.HE}>He/Him</option>
                        <option value={Pronouns.HER}>She/Her</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Details</label>
                  </td>
                  <td>
                    <InputDetailsComponent
                      hint={detailsHint}
                      onHintClick={onHintClick}
                      resultLoading={state.loading}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="horizontal-line mt-4 mb-4"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="buttons">
                      <GenerateResultsButton
                        onClick={onGenerateClick}
                        onLoad={onLoad}
                      />
                      <CopyResultsButton
                        startingState={state.result}
                        loading={state.loading}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
