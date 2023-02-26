import {
  PerformanceReviewInput,
  AIResult,
  Relationship,
  PerformanceScore,
  TimePeriod,
  ReviewTone,
  Pronouns,
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
import { usePerformanceReviewState } from "../../../state/perf-review.state";

export const PerformanceReviewDetails = () => {
  const detailsHint = `Please enter more details, such as:
  - a short summary of past performance
  - or a section on things that went well and things to improve
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const resultLoading = usePerformanceReviewState((state) => state.loading);
  const setLoading = usePerformanceReviewState((state) => state.setLoading);

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

  const result = usePerformanceReviewState((state) => state.result);
  const setResult = usePerformanceReviewState((state) => state.setResult);

  const onGenerateClick = async () => {
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
    const res = await new OpenAIService().generatePerformanceReview(input);
    setResult(res);
  };

  const onUpdate = (result: AIResult[]) => setResult(result);
  const onLoad = (load: boolean) => setLoading(load);

  const onHintClick = async (): Promise<string> => {
    return await new OpenAIService().generatePerformanceReviewHint(
      role,
      perf,
      tone
    );
  };

  const getNamePlaceholder = () => {
    switch (relationship) {
      case Relationship.MYSELF:
        return "Please enter your name or leave blank";
      case Relationship.COLLEAGUE:
        return "Please enter your colleague's name";
      case Relationship.MANAGER:
        return "Please enter your manger's name";
      case Relationship.REPORT:
        return "Please enter your report's name";
    }
  };

  const getRolePlaceholder = () => {
    switch (relationship) {
      case Relationship.MYSELF:
        return "Please enter your role or title";
      case Relationship.COLLEAGUE:
        return "Please enter your colleague's role or title";
      case Relationship.MANAGER:
        return "Please enter your manger's role or title";
      case Relationship.REPORT:
        return "Please enter your report's role or title";
    }
  };

  const getTeamPlaceholder = () => {
    switch (relationship) {
      case Relationship.MYSELF:
        return "Please enter your team or department";
      case Relationship.COLLEAGUE:
        return "Please enter your colleague's team or department";
      case Relationship.MANAGER:
        return "Please enter your manger's team or department";
      case Relationship.REPORT:
        return "Please enter your report's team or department";
    }
  };

  return (
    <div className="columns">
      <div className="column">
        <div className="result-content p-4">
          <FormField field="Prompt" className="has-text-info">
            <AutoTextArea
              disabled={resultLoading}
              value={question}
              index={0}
              className="input autoscaling-textarea"
              placeholder="Please enter your prompt here"
              onChange={(e, i) => setQuestion(e)}
            />
          </FormField>
          <div className="horizontal-line mt-4 mb-4"></div>
          <FormField field="Name">
            <input
              className="input"
              disabled={resultLoading}
              placeholder={getNamePlaceholder()}
              type={"text"}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            ></input>
          </FormField>
          <FormField field="Role">
            <input
              className="input"
              disabled={resultLoading}
              placeholder={getRolePlaceholder()}
              type={"text"}
              value={role}
              onChange={(e) => setRole(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Team">
            <input
              className="input"
              disabled={resultLoading}
              placeholder={getTeamPlaceholder()}
              type={"text"}
              value={team}
              onChange={(e) => setTeam(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Result">
            <div className="select">
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
          </FormField>
          <FormField field="Period">
            <div className="select">
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
                <option value={TimePeriod.LAST_6_MONTHS}>Previous year</option>
              </select>
            </div>
          </FormField>
          <FormField field="Tone">
            <div className="select">
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
          </FormField>
          <FormField field="Pronoun">
            <div className="select">
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
          </FormField>
          <FormField field="Details">
            <InputDetailsComponent
              hint={detailsHint}
              onHintClick={onHintClick}
              resultLoading={resultLoading}
            />
          </FormField>
          <div className="horizontal-line mt-4 mb-4"></div>
          <div className="buttons">
            <GenerateResultsButton onClick={onGenerateClick} onLoad={onLoad} />
            <CopyResultsButton startingState={result} loading={resultLoading} />
          </div>
        </div>
      </div>
      <div className="column">
        <ResultsInlineComponent
          startingState={result}
          onUpdate={onUpdate}
          loading={resultLoading}
        />
      </div>
    </div>
  );
};
