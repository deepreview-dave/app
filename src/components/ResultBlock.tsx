import * as bulmaToast from "bulma-toast";

import { AppStatus, useAppState } from "../state/app.state";

export const ResultBlock = () => {
  const answer = useAppState((state) => state.answer);
  const hasSomeAnswer = useAppState((state) => state.hasSomeAnswer);
  const isLoading = useAppState((state) => state.status === AppStatus.LOADING);
  const copyAnswer = useAppState((state) => state.copyAnswer);
  const updateAnswer = useAppState((state) => state.updateAnswer);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(answer);
    copyAnswer();
    bulmaToast.toast({
      message: "Copied to clipboard",
      type: "is-info",
      position: "bottom-center",
      closeOnClick: true,
      duration: 1000,
      animate: { in: "fadeIn", out: "fadeOut" },
    });
  };

  return (
    <>
      <hr />
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <strong>Result:</strong>
        </div>
        <div className="column is-narrow">
          <button
            disabled={!hasSomeAnswer}
            className="button"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      </div>
      <div>
        <textarea
          className="textarea is-success"
          rows={20}
          disabled={isLoading}
          placeholder="Press 'Generate' to create a review"
          value={answer}
          onChange={(e) => updateAnswer(e.currentTarget.value)}
        ></textarea>
      </div>
    </>
  );
};
