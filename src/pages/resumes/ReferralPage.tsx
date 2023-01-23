import { ReferralLetterInput } from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { ReferralLetterBreadcrumbs } from "../../components/common/Breadcrumbs";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { InputDetailsComponent } from "../../components/results/InputDetailsComponent";
import {
  ResultsComponent,
  ResultsError,
} from "../../components/results/ResultsComponent";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { useInputDetailsState } from "../../state/input-details.state";
import { useReferralLetterState } from "../../state/referral-letter.state";
import { useResultState } from "../../state/result-state";

export const ReferralPage = () => {
  const detailsHint = `Add more details, such as:
  - main strengths of the applicant
  - a story or achievement of the applicant
  - or be as succint as listing attributes 'communication: good, leadership: to improve'

Or press the 'Inspiration' button to provide a starting point based on the details you provided above.`;

  const resultLoading = useResultState((state) => state.loading);
  const state = useReferralLetterState((state) => state);
  const details = useInputDetailsState((state) => state.details);

  const onGenerateClick = async (): Promise<string[]> => {
    const input: ReferralLetterInput = {
      question: state.question,
      you: state.you,
      recipient: state.recipient,
      applicant: state.applicant,
      details,
    };
    return await new OpenAIService().generateReferralLetter(input);
  };

  const onHintClick = async (): Promise<string> => {
    return await new OpenAIService().generateReferralLetterHint(
      state.applicant.role
    );
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ReferralLetterBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>Referral Letter</h3>
            <p>Get help writing a referral letter for a colleague or friend.</p>
          </div>
          <div className="review-content">
            <div className="p-2">
              <div className="is-monospace">
                <h6>
                  <b>You</b>
                </h6>
              </div>
              <div>
                <label>Name</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Your name"
                  type={"text"}
                  value={state.you.name}
                  onChange={(e) => state.setYourName(e.currentTarget.value)}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Your address"
                  type={"text"}
                  value={state.you.address}
                  onChange={(e) => state.setYourAddress(e.currentTarget.value)}
                />
              </div>
              <div>
                <label>Contact</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Your contact details"
                  type={"text"}
                  value={state.you.contact}
                  onChange={(e) => state.setYourContact(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="p-2">
              <div className="is-monospace">
                <h6>
                  <b>Recipient</b>
                </h6>
              </div>
              <div>
                <label>Name</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Recipient name"
                  type={"text"}
                  value={state.recipient.name}
                  onChange={(e) =>
                    state.setRecipientName(e.currentTarget.value)
                  }
                />
              </div>
              <div>
                <label>Title</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Recipient title"
                  type={"text"}
                  value={state.recipient.title}
                  onChange={(e) =>
                    state.setRecipientTitle(e.currentTarget.value)
                  }
                />
              </div>
              <div>
                <label>Company</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Recipient company"
                  type={"text"}
                  value={state.recipient.company}
                  onChange={(e) =>
                    state.setRecipientCompany(e.currentTarget.value)
                  }
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Company address"
                  type={"text"}
                  value={state.recipient.address}
                  onChange={(e) =>
                    state.setRecipientAddress(e.currentTarget.value)
                  }
                />
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="p-2">
              <div className="is-monospace">
                <h6>
                  <b>Applicant</b>
                </h6>
              </div>
              <div>
                <label>Name</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Applicant name"
                  type={"text"}
                  value={state.applicant.name}
                  onChange={(e) =>
                    state.setApplicantName(e.currentTarget.value)
                  }
                />
              </div>
              <div>
                <label>Role</label>
                <input
                  required
                  disabled={resultLoading}
                  placeholder="Applicant role"
                  type={"text"}
                  value={state.applicant.role}
                  onChange={(e) =>
                    state.setApplicantRole(e.currentTarget.value)
                  }
                />
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="pl-2 pr-2 pt-2 pb-1">
              <AutoTextArea
                disabled={resultLoading}
                value={state.question}
                index={0}
                placeholder="Write your question here ..."
                onChange={(e, i) => state.setQuestion(e)}
              />
            </div>
            <div className="horizontal-line"></div>
            <InputDetailsComponent
              hint={detailsHint}
              onHintClick={onHintClick}
            />
          </div>
          <div className="mt-4">
            <ResultsComponent onGenerateClick={onGenerateClick} />
          </div>
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
