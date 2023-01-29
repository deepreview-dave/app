import { AutoTextArea } from "../../../components/common/AutoTextArea";
import { useResultState } from "../../../state/result-state";
import { useResumeEducationHistoryState } from "../../../state/resume.state";

export const ResumeEducation = () => {
  const resultLoading = useResultState((state) => state.loading);
  const state = useResumeEducationHistoryState((state) => state);

  return (
    <>
      <div className="review-content">
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
        <div className="p-2">
          {state.items.map((h, i) => (
            <div className="columns is-mobile" key={i}>
              <div className="column">
                <div>
                  <input
                    className="mr-2"
                    disabled={resultLoading}
                    placeholder="School"
                    type={"text"}
                    value={h.school}
                    onChange={(e) =>
                      state.setHistory(i, {
                        ...h,
                        school: e.currentTarget.value,
                      })
                    }
                  ></input>
                  <input
                    className="mr-2"
                    disabled={resultLoading}
                    placeholder="Degree"
                    type={"text"}
                    value={h.degree}
                    onChange={(e) =>
                      state.setHistory(i, {
                        ...h,
                        degree: e.currentTarget.value,
                      })
                    }
                  ></input>
                  <input
                    className="mr-2"
                    disabled={resultLoading}
                    placeholder="Start"
                    type={"text"}
                    value={h.start}
                    onChange={(e) =>
                      state.setHistory(i, {
                        ...h,
                        start: e.currentTarget.value,
                      })
                    }
                  ></input>
                  <input
                    className="mr-2"
                    disabled={resultLoading}
                    placeholder="End"
                    type={"text"}
                    value={h.end}
                    onChange={(e) =>
                      state.setHistory(i, { ...h, end: e.currentTarget.value })
                    }
                  ></input>
                </div>
                <div>
                  <AutoTextArea
                    disabled={resultLoading}
                    value={h.details}
                    placeholder="Add education details ..."
                    index={i}
                    onChange={(e) => state.setHistory(i, { ...h, details: e })}
                  />
                </div>
              </div>
              <div className="column is-narrow">
                <button
                  disabled={resultLoading}
                  title="Remove section"
                  className="button is-small is-white"
                  onClick={() => state.removeHistory(i)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="plus-button-holder">
        <button
          disabled={resultLoading}
          title="Add new section"
          className="button is-small is-rounded plus-button"
          onClick={() => state.addHistory()}
        >
          <span className="icon is-small has-text-success">
            <i className="fas fa-plus"></i>
          </span>
        </button>
      </div>
    </>
  );
};
