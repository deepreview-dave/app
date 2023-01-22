import "../../index.css";
import { CoverLetterBreadcrumbs } from "../../components/common/Breadcrumbs";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { useCoverLetterState } from "../../state/cover-letter.state";
import { useResultState } from "../../state/result-state";
import { CoverLetterInput, WorkHistory } from "../../business/common";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { OpenAIService } from "../../business/open-ai.service";
import { InputDetailsComponent } from "../../components/results/InputDetailsComponent";
import { useInputDetailsState } from "../../state/input-details.state";
import {
  ResultsComponent,
  ResultsError,
} from "../../components/results/ResultsComponent";

export const CoverLetterPage = () => {
  const detailsHint = `Add more details, such as:
  - top 3 strengths
  - achievements you're prod of in your previous roles
  - or be as succint as listing attributes 'communication: good, leadership: to improve'

Or press the 'Inspiration' button to provide a starting point based on the details you provided above.`;

  const resultLoading = useResultState((state) => state.loading);
  const state = useCoverLetterState((state) => state);
  const details = useInputDetailsState((state) => state.details);

  const onGenerateClick = async (): Promise<string[]> => {
    const input: CoverLetterInput = {
      question: state.question,
      company: state.company,
      name: state.name,
      role: state.role,
      history: state.history,
      details,
    };
    return await new OpenAIService().generateCoverLetter(input);
  };

  const onHintClick = async (): Promise<string> => {
    return await new OpenAIService().generateCoverLetterHint(state.role);
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <CoverLetterBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>Cover Letter</h3>
            <p>Prepare the perfect cover letter.</p>
          </div>
          <div className="review-content">
            <div className="p-2">
              <div>
                <label>Name</label>
                <input
                  disabled={resultLoading}
                  placeholder="Myself"
                  type={"text"}
                  value={state.name}
                  onChange={(e) => state.setName(e.currentTarget.value)}
                />
              </div>
              <div>
                <label>Role</label>
                <input
                  disabled={resultLoading}
                  placeholder="Role"
                  type={"text"}
                  value={state.role}
                  onChange={(e) => state.setRole(e.currentTarget.value)}
                />
              </div>
              <div>
                <label>Company</label>
                <input
                  disabled={resultLoading}
                  placeholder="Company"
                  type={"text"}
                  value={state.company}
                  onChange={(e) => state.setCompany(e.currentTarget.value)}
                />
              </div>
              <div>
                <label>History</label>
                <select
                  disabled={resultLoading}
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
