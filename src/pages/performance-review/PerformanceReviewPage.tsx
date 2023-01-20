import "../../index.css";
import "./perfreview.css";
import { NavbarMin } from "../../components/common/NavbarMin";
import { ResultsBreadcrumbs } from "../../components/performance-review/ReviewBreadcrumbs";
import { Footer } from "../../components/common/Footer";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import {
  formResult,
  usePerformanceReviewDetailsState,
  usePerformanceReviewResultState,
  usePerformanceReviewState,
} from "../../state/perf-review.state";
import {
  PerformanceReviewInput,
  PerformanceScore,
  Pronouns,
  ReviewTone,
  TimePeriod,
} from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { useEffect } from "react";

export const DetailsInput = () => {
  const html = `Add more details, such as:
  - a short summary of your performance
  - or a section on things you did well and things to improve
  - or be as succint as listing attributes 'communication: good, leadership: to improve'

Or press the 'Inspiration' button to provide a starting point based on the details you provided above.`;

  const role = usePerformanceReviewState((state) => state.role);
  const perf = usePerformanceReviewState((state) => state.perf);
  const tone = usePerformanceReviewState((state) => state.tone);

  const loading = usePerformanceReviewDetailsState((state) => state.loading);
  const resultLoading = usePerformanceReviewResultState(
    (state) => state.loading
  );
  const setLoading = usePerformanceReviewDetailsState(
    (state) => state.setLoading
  );

  const details = usePerformanceReviewDetailsState((state) => state.details);
  const setDetails = usePerformanceReviewDetailsState(
    (state) => state.setDetails
  );
  const setError = usePerformanceReviewResultState((state) => state.setError);

  const onHintClick = async () => {
    setLoading();
    try {
      const hint = await new OpenAIService().generatePerformanceReviewHint(
        role,
        perf,
        tone
      );
      setDetails(hint);
    } catch (e: any) {
      setError(e.message);
      setDetails("");
    }
  };

  useEffect(() => {
    setDetails("");
  }, []);

  return (
    <>
      <div className="pl-2 pr-2 pt-2 pb-1">
        <AutoTextArea
          disabled={loading || resultLoading}
          value={details}
          placeholder={html}
          index={999}
          onChange={(e, i) => setDetails(e)}
        />
      </div>
      <div className="horizontal-line"></div>
      <div className="p-2">
        <button
          disabled={loading || resultLoading}
          className={"button is-text " + (loading ? "is-loading" : "")}
          onClick={onHintClick}
        >
          Inspiration
        </button>
      </div>
    </>
  );
};

export const ReviewResults = () => {
  const loading = usePerformanceReviewResultState((state) => state.loading);
  const reloadedSection = usePerformanceReviewResultState(
    (state) => state.reloadedSection
  );
  const setLoading = usePerformanceReviewResultState(
    (state) => state.setLoading
  );
  const state = usePerformanceReviewState((state) => state);
  const details = usePerformanceReviewDetailsState((state) => state.details);

  const results = usePerformanceReviewResultState((state) => state.results);
  const setResults = usePerformanceReviewResultState(
    (state) => state.setResults
  );

  const updateResult = usePerformanceReviewResultState(
    (state) => state.updateResult
  );
  const addElement = usePerformanceReviewResultState(
    (state) => state.addElement
  );
  const removeElement = usePerformanceReviewResultState(
    (state) => state.removeElement
  );
  const resetElement = usePerformanceReviewResultState(
    (state) => state.resetElement
  );
  const setReloading = usePerformanceReviewResultState(
    (state) => state.setReloading
  );
  const setError = usePerformanceReviewResultState((state) => state.setError);

  const onGenerateClick = async () => {
    setLoading();
    const input: PerformanceReviewInput = {
      relationship: state.relationship,
      question: state.question,
      name: state.name,
      role: state.role,
      team: state.team,
      time: state.time,
      tone: state.tone,
      pron: state.pron,
      perf: state.perf,
      details,
    };
    try {
      const result = await new OpenAIService().generatePerformanceReview(input);
      setResults(formResult(result));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onExpandClick = async (value: string, index: number) => {
    setReloading(index);
    try {
      const result = await new OpenAIService().expandText(value);
      updateResult(result, index);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="buttons">
        <button
          disabled={loading}
          className={"button is-primary " + (loading ? "is-loading" : "")}
          onClick={onGenerateClick}
        >
          Generate
        </button>
        <button disabled={loading} className="button">
          Copy
        </button>
      </div>
      <div className="">
        {results.map((res, i) => (
          <div className="results-container" key={i}>
            <div
              className={
                i === 0
                  ? "top-content"
                  : i === results.length - 1
                  ? "bottom-content"
                  : "normal-content"
              }
            >
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={loading || reloadedSection !== undefined}
                  title="Expand on this section"
                  className="button is-white is-small"
                  onClick={() => onExpandClick(res.expanded, i)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-sync"></i>
                  </span>
                </button>
              </div>
              <div className="big-div pt-5 pl-3 pr-3 pb-5">
                <AutoTextArea
                  disabled={loading || reloadedSection === i}
                  index={i}
                  value={res.expanded}
                  placeholder="Add more details..."
                  onChange={(e, i) => updateResult(e, i)}
                  onBlur={() => removeElement(i)}
                />
              </div>
              <div className="pt-5 pl-3 pr-3 pb-5">
                <button
                  disabled={loading || reloadedSection !== undefined}
                  title="Remove section"
                  className="button is-small is-white"
                  onClick={() => resetElement(i)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-history"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="plus-button-holder">
              <button
                disabled={loading || reloadedSection !== undefined}
                title="Add new section"
                className="button is-small is-rounded plus-button"
                onClick={() => addElement(i)}
              >
                <span className="icon is-small has-text-success">
                  <i className="fas fa-plus"></i>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const ReviewError = () => {
  const error = usePerformanceReviewResultState((state) => state.errorMessage);

  if (!error) {
    return null;
  }

  return (
    <article className="message is-danger">
      <div className="message-header">
        <p>Error</p>
      </div>
      <div className="message-body">{error}</div>
    </article>
  );
};

export const PerformanceReviewPage = () => {
  const resultLoading = usePerformanceReviewResultState(
    (state) => state.loading
  );

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
            <DetailsInput />
          </div>
          <div className="mt-4">
            <ReviewResults />
          </div>
          <ReviewError />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
