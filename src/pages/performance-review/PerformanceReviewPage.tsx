import "../../index.css";
import "./perfreview.css";
import { NavbarMin } from "../../components/common/NavbarMin";
import { ResultsBreadcrumbs } from "../../components/performance-review/ReviewBreadcrumbs";
import { Footer } from "../../components/common/Footer";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import {
  usePerformanceReviewDetailsState,
  usePerformanceReviewState,
} from "../../state/perf-review.state";
import {
  PerformanceScore,
  Pronouns,
  ReviewTone,
  TimePeriod,
} from "../../business/common";
import { giveHints } from "../../business/services";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { useEffect } from "react";

export const DetailsInput = () => {
  const html = `Add more details, such as:
  - a short summary of your performance
  - or a section on things you did well and things to improve
  - or be as succint as listing attributes 'communication: good, leadership: to improve'

Or press the 'Inspiration' button to provide a starting point based on the details you provided above.
  `;

  const role = usePerformanceReviewState((state) => state.role);
  const perf = usePerformanceReviewState((state) => state.perf);
  const tone = usePerformanceReviewState((state) => state.tone);

  const loading = usePerformanceReviewDetailsState((state) => state.loading);
  const setLoading = usePerformanceReviewDetailsState(
    (state) => state.setLoading
  );

  const details = usePerformanceReviewDetailsState((state) => state.details);
  const setDetails = usePerformanceReviewDetailsState(
    (state) => state.setDetails
  );

  const onHintClick = async () => {
    setLoading();
    const hint = await giveHints(role, perf, tone);
    setDetails(hint);
  };

  useEffect(() => {
    setDetails("");
  }, []);

  return (
    <>
      <div className="p-2 horizontal-line">
        <AutoTextArea
          disabled={loading}
          value={details}
          placeholder={html}
          index={999}
          onChange={(e, i) => setDetails(e)}
        />
      </div>
      <div className="p-2">
        <button
          className={"button is-text " + (loading ? "is-loading" : "")}
          onClick={onHintClick}
        >
          Inspiration
        </button>
      </div>
    </>
  );
};

export const PerformanceReviewPage = () => {
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

  return (
    <div className="main-body">
      <NavbarMin />
      <ResultsBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container narrow-container review-content">
          <div id="input" className="p-2">
            <div id="input-name">
              <label>Name</label>
              <input
                placeholder="Myself"
                type={"text"}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              ></input>
            </div>
            <div id="input-role">
              <label>Role</label>
              <input
                placeholder="(Optional)"
                type={"text"}
                value={role}
                onChange={(e) => setRole(e.currentTarget.value)}
              />
            </div>
            <div id="input-team">
              <label>Team</label>
              <input
                placeholder="(Optional)"
                type={"text"}
                value={team}
                onChange={(e) => setTeam(e.currentTarget.value)}
              />
            </div>
            <div id="input-performance">
              <label>Perf</label>
              <select
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
                <option value={TimePeriod.LAST_6_MONTHS}>Previous year</option>
              </select>
            </div>
            <div id="input-tone">
              <label>Tone</label>
              <select
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
          <div className="p-2 horizontal-line">
            <AutoTextArea
              value={question}
              disabled={false}
              index={0}
              placeholder="Write your question here ..."
              onChange={(e, i) => setQuestion(e)}
            />
          </div>
          <DetailsInput />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
