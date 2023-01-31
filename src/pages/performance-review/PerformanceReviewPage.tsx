import "../../index.css";
import { NavbarMin } from "../../components/common/NavbarMin";
import { Footer } from "../../components/common/Footer";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { usePerformanceReviewState } from "../../state/perf-review.state";
import {
  PerformanceReviewInput,
  PerformanceScore,
  Pronouns,
  ReviewTone,
  TimePeriod,
} from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { useResultState } from "../../state/result-state";
import {
  ResultsComponent,
  ResultsError,
} from "../../components/results/ResultsComponent";
import { ResultsBreadcrumbs } from "../../components/common/Breadcrumbs";
import { useInputDetailsState } from "../../state/input-details.state";
import { InputDetailsComponent } from "../../components/results/InputDetailsComponent";
import { useEffect } from "react";
import { Analytics, AnalyticsToolName } from "../../business/analytics";

export const PerformanceReviewPage = () => {
  const detailsHint = `Add more details, such as:
  - a short summary of your performance
  - or a section on things you did well and things to improve
  - or be as succint as listing attributes 'communication: good, leadership: to improve'

Or press the 'Inspiration' button to provide a starting point based on the details you provided above.`;

  const resultLoading = useResultState((state) => state.loading);

  const relationship = usePerformanceReviewState((state) => state.relationship);
  const details = useInputDetailsState((state) => state.details);

  const name = usePerformanceReviewState((state) => state.name);
  const setName = usePerformanceReviewState((state) => state.setName);

  const role = usePerformanceReviewState((state) => state.role);
  const setRole = usePerformanceReviewState((state) => state.setRole);

  const team = usePerformanceReviewState((state) => state.team);
  const setTeam = usePerformanceReviewState((state) => state.setTeam);

  const perf = usePerformanceReviewState((state) => state.perf);
  const setPerf = usePerformanceReviewState((state) => state.setPerf);

  const time = usePerformanceReviewState((state) => state.time);
  const setTime = usePerformanceReviewState((state) => state.setTime);

  const tone = usePerformanceReviewState((state) => state.tone);
  const setTone = usePerformanceReviewState((state) => state.setTone);

  const pron = usePerformanceReviewState((state) => state.pron);
  const setPron = usePerformanceReviewState((state) => state.setPron);

  const question = usePerformanceReviewState((state) => state.question);
  const setQuestion = usePerformanceReviewState((state) => state.setQuestion);

  const onGenerateClick = async (): Promise<string[]> => {
    const input: PerformanceReviewInput = {
      relationship,
      question,
      name,
      role,
      team,
      time,
      tone,
      pron,
      perf,
      details,
    };
    return await new OpenAIService().generatePerformanceReview(input);
  };

  const onHintClick = async (): Promise<string> => {
    return await new OpenAIService().generatePerformanceReviewHint(
      role,
      perf,
      tone
    );
  };

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.PERF_REVIEW);
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <ResultsBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container">
          <div className="content">
            <h3>Performance Review</h3>
            <p>
              Fill in all the details below and press 'Generate' to create a new
              performance review.
            </p>
          </div>
          <div className="review-content">
            <div id="input" className="p-2">
              <div id="input-name">
                <label>Name</label>
                <input
                  disabled={resultLoading}
                  placeholder="Myself"
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                ></input>
              </div>
              <div id="input-role">
                <label>Role</label>
                <input
                  disabled={resultLoading}
                  placeholder="(Optional)"
                  type={"text"}
                  value={role}
                  onChange={(e) => setRole(e.currentTarget.value)}
                />
              </div>
              <div id="input-team">
                <label>Team</label>
                <input
                  disabled={resultLoading}
                  placeholder="(Optional)"
                  type={"text"}
                  value={team}
                  onChange={(e) => setTeam(e.currentTarget.value)}
                />
              </div>
              <div id="input-performance">
                <label>Perf</label>
                <select
                  disabled={resultLoading}
                  value={perf}
                  onChange={(e) =>
                    setPerf(e.currentTarget.value as PerformanceScore)
                  }
                >
                  <option value={PerformanceScore.BELOW_EXPECTATIONS}>
                    Below expectation
                  </option>
                  <option value={PerformanceScore.MEETS_EXPECTATIONS}>
                    Meets expectation
                  </option>
                  <option value={PerformanceScore.ABOVE_EXPECTATIONS}>
                    Above expectation
                  </option>
                </select>
              </div>
              <div id="input-time">
                <label>Time</label>
                <select
                  disabled={resultLoading}
                  value={time}
                  onChange={(e) => setTime(e.currentTarget.value as TimePeriod)}
                >
                  <option value={TimePeriod.LAST_MONTH}>Previous month</option>
                  <option value={TimePeriod.LAST_3_MONTHS}>
                    Previous 3 months
                  </option>
                  <option value={TimePeriod.LAST_6_MONTHS}>
                    Previous 6 months
                  </option>
                  <option value={TimePeriod.LAST_6_MONTHS}>
                    Previous year
                  </option>
                </select>
              </div>
              <div id="input-tone">
                <label>Tone</label>
                <select
                  disabled={resultLoading}
                  value={tone}
                  onChange={(e) => setTone(e.currentTarget.value as ReviewTone)}
                >
                  <option value={ReviewTone.NEUTRAL}>Neutral</option>
                  <option value={ReviewTone.FRIENDLY}>Friendly</option>
                  <option value={ReviewTone.CRITICAL}>Critical</option>
                </select>
              </div>
              <div id="input-pronoun">
                <label>Pronoun</label>
                <select
                  disabled={resultLoading}
                  value={pron}
                  onChange={(e) => setPron(e.currentTarget.value as Pronouns)}
                >
                  <option value={Pronouns.NEUTRAL}>They</option>
                  <option value={Pronouns.HE}>He/Him</option>
                  <option value={Pronouns.HER}>She/Her</option>
                </select>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="pl-2 pr-2 pt-2 pb-1">
              <AutoTextArea
                disabled={resultLoading}
                value={question}
                index={0}
                placeholder="Write your question here ..."
                onChange={(e, i) => setQuestion(e)}
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
