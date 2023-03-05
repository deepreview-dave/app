import { AIResult } from "../../../business/common";
import { OpenAIService } from "../../../business/open-ai.service";
import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { FormField } from "../../../components/common/FormField";
import {
  GenerateResultsButton,
  CopyResultsButton,
  ResultsInlineComponent,
} from "../../../components/results/ResultsInlineComponent";
import {
  ResumeWorkHistory,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";

export const ResumeWorkplaces = () => {
  const state = useResumeWorkHistoryState((state) => state);

  const detailsHint = `Please enter more details, such as:
  - main achievements in the position
  - your principal responsibilities
  - or be as succint as listing attributes 'communication: good, leadership: to improve'`;

  const onGenerateClick = async (item: ResumeWorkHistory, index: number) => {
    const question = state.question;
    const res = await new OpenAIService().generateResumeWorkHistoryItem(
      question,
      item
    );
    state.setResults(res, index);
  };

  const onUpdate = (result: AIResult[], index: number) =>
    state.setResults(result, index);
  const onLoad = (loading: boolean, index: number) =>
    state.setLoading(loading, index);

  return (
    <>
      {state.items.map((h, i) => (
        <div className="columns" key={i}>
          <div className="column">
            <div className="result-content p-4">
              <div className="columns is-vcentered is-mobile">
                <div className="column">
                  <b>Add details about this position</b>
                </div>
                <div className="column is-narrow">
                  <button
                    disabled={h.loading || i === 0}
                    title="Remove position"
                    className="button is-small"
                    onClick={() => state.removeHistory(i)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-times"></i>
                    </span>
                  </button>
                </div>
              </div>
              <FormField field="Company">
                <input
                  className="input"
                  disabled={h.loading}
                  placeholder="Please enter the name of the company"
                  type={"text"}
                  value={h.company}
                  onChange={(e) =>
                    state.setHistory(i, {
                      ...h,
                      company: e.currentTarget.value,
                    })
                  }
                />
              </FormField>
              <FormField field="Role">
                <input
                  className="input"
                  disabled={h.loading}
                  placeholder="Please enter the role or title"
                  type={"text"}
                  value={h.role}
                  onChange={(e) =>
                    state.setHistory(i, {
                      ...h,
                      role: e.currentTarget.value,
                    })
                  }
                />
              </FormField>
              <FormField field="Start">
                <input
                  className="input"
                  disabled={h.loading}
                  placeholder="Please enter the start date (e.g. 2019)"
                  type={"text"}
                  value={h.start}
                  onChange={(e) =>
                    state.setHistory(i, {
                      ...h,
                      start: e.currentTarget.value,
                    })
                  }
                />
              </FormField>
              <FormField field="End">
                <input
                  className="input"
                  disabled={h.loading}
                  placeholder="Please enter the end date (e.g. 2022)"
                  type={"text"}
                  value={h.end}
                  onChange={(e) =>
                    state.setHistory(i, {
                      ...h,
                      end: e.currentTarget.value,
                    })
                  }
                />
              </FormField>
              <FormField field="Details">
                <AutoTextArea
                  className="input autoscaling-textarea"
                  disabled={h.loading}
                  value={h.details}
                  index={i}
                  placeholder={detailsHint}
                  onChange={(details) =>
                    state.setHistory(i, {
                      ...h,
                      details,
                    })
                  }
                />
              </FormField>
              <div className="horizontal-line mt-4 mb-4"></div>
              <div className="buttons">
                <GenerateResultsButton
                  onClick={() => onGenerateClick(h, i)}
                  onLoad={(loading) => onLoad(loading, i)}
                />
                <CopyResultsButton
                  startingState={h.results}
                  loading={h.loading}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <ResultsInlineComponent
              startingState={h.results}
              onUpdate={(res) => onUpdate(res, i)}
              loading={h.loading}
            />
          </div>
        </div>
      ))}
      <div className="buttons mt-4">
        <button
          className="button is-info"
          title="Add more positions"
          onClick={() => state.addHistory()}
        >
          Add more positions
        </button>
      </div>
    </>
  );
};
