import {
  AIResult,
  PraiseInput,
  PraiseTone,
  Pronouns,
} from "../../business/common";
import { OpenAIService } from "../../business/open-ai.service";
import { AutoTextArea } from "../../components/common/AutoTextArea";
import { FormField } from "../../components/common/FormField";
import {
  CopyResultsButton,
  GenerateResultsButton,
  ResultsInlineComponent,
} from "../../components/results/ResultsInlineComponent";
import { usePraiseState } from "../../state/praise.state";

export const PraiseDetails = () => {
  const detailsHint = `Please enter additional details:
  - what was the impact of the work or situation?
  - how did it make you feel?
  - who, when, what? be specific`;

  const state = usePraiseState((state) => state);

  const onGenerateClick = async () => {
    const input: PraiseInput = {
      question: state.question,
      name: state.name,
      pron: state.pron,
      what: state.what,
      details: state.details,
      tone: state.tone,
    };

    const res = await new OpenAIService().generatePraise(input);
    state.setResult(res);
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
          <FormField field="Name">
            <input
              className="input"
              placeholder="Plase enter your name here"
              type={"text"}
              value={state.name}
              disabled={state.loading}
              onChange={(e) => state.setName(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Pronoun">
            <div className="select">
              <select
                disabled={state.loading}
                value={state.pron}
                onChange={(e) =>
                  state.setPron(e.currentTarget.value as Pronouns)
                }
              >
                <option value={Pronouns.NEUTRAL}>They</option>
                <option value={Pronouns.HE}>He/Him</option>
                <option value={Pronouns.HER}>She/Her</option>
              </select>
            </div>
          </FormField>
          <FormField field="Tone">
            <div className="select">
              <select
                disabled={state.loading}
                value={state.tone}
                onChange={(e) =>
                  state.setTone(e.currentTarget.value as PraiseTone)
                }
              >
                <option value={PraiseTone.INFORMAL}>Informal</option>
                <option value={PraiseTone.FORMAL}>Formal</option>
              </select>
            </div>
          </FormField>
          <FormField field="Situation">
            <input
              className="input"
              placeholder="Plase enter a summary of the work or situation"
              type={"text"}
              value={state.what}
              disabled={state.loading}
              onChange={(e) => state.setWhat(e.currentTarget.value)}
            />
          </FormField>
          <FormField field="Details">
            <AutoTextArea
              disabled={state.loading}
              value={state.details}
              index={0}
              className="input autoscaling-textarea"
              placeholder={detailsHint}
              onChange={(e, i) => state.setDetails(e)}
            />
          </FormField>

          <div className="horizontal-line mt-4 mb-4"></div>

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
