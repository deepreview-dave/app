import "../../index.css";
import { CoverLetterBreadcrumbs } from "../../components/common/Breadcrumbs";
import { Footer } from "../../components/common/Footer";
import { NavbarMin } from "../../components/common/NavbarMin";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { useCoverLetterState } from "../../state/cover-letter.state";
import { useResultState } from "../../state/result-state";
import { AIResult, CoverLetterInput, WorkHistory } from "../../business/common";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { OpenAIService } from "../../business/open-ai.service";
import { InputDetailsComponent } from "../../components/results/InputDetailsComponent";
import { useInputDetailsState } from "../../state/input-details.state";
import { ResultsError } from "../../components/results/ResultsComponent";
import { useEffect, useState } from "react";
import { Analytics, AnalyticsToolName } from "../../business/analytics";
import {
  CopyResultsButton,
  GenerateResultsButton,
  ResultsInlineComponent,
} from "../../components/results/ResultsInlineComponent";

export const CoverLetterPage = () => {
  const detailsHint = `Please enter more details, such as:
  - top 3 strengths
  - achievements you're prod of in your previous roles
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const resultLoading = useResultState((state) => state.loading);
  const state = useCoverLetterState((state) => state);
  const details = useInputDetailsState((state) => state.details);
  const [results, setResults] = useState<AIResult[]>([]);

  const onGenerateClick = async () => {
    const input: CoverLetterInput = {
      question: state.question,
      company: state.company,
      name: state.name,
      role: state.role,
      history: state.history,
      details,
    };
    const res = await new OpenAIService().generateCoverLetter(input);
    setResults(res);
  };

  const onHintClick = async (): Promise<string> => {
    return await new OpenAIService().generateCoverLetterHint(state.role);
  };

  const onUpdate = (result: AIResult[]) => {
    setResults(result);
  };

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.COVER_LETTER);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <CoverLetterBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Cover Letter</h3>
            <p>
              Fill in all the details below and click 'Generate' to create a new
              Cover Letter.
            </p>
          </div>
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
                            disabled={resultLoading}
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
                        <td>
                          <label>Name</label>
                        </td>
                        <td>
                          <input
                            className="input is-small"
                            placeholder="Plase enter your name here"
                            type={"text"}
                            value={state.name}
                            disabled={resultLoading}
                            onChange={(e) =>
                              state.setName(e.currentTarget.value)
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
                            disabled={resultLoading}
                            placeholder="Please enter the role you're applying to"
                            type={"text"}
                            value={state.role}
                            onChange={(e) =>
                              state.setRole(e.currentTarget.value)
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
                            disabled={resultLoading}
                            placeholder="Please enter the company you're applying to"
                            type={"text"}
                            value={state.company}
                            onChange={(e) =>
                              state.setCompany(e.currentTarget.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>History</label>
                        </td>
                        <td>
                          <div className="select is-small">
                            <select
                              className="is-monospace"
                              disabled={resultLoading}
                              value={state.history}
                              onChange={(e) =>
                                state.setHistory(
                                  e.currentTarget.value as WorkHistory
                                )
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
                              <option value={WorkHistory.TenPlus}>
                                10+ Years
                              </option>
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
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="buttons mt-4">
                <GenerateResultsButton onClick={onGenerateClick} />
                <CopyResultsButton startingState={results} />
              </div>
            </div>
            <div className="column">
              <ResultsInlineComponent
                startingState={results}
                onUpdate={onUpdate}
              />
            </div>
          </div>
          <ResultsError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
