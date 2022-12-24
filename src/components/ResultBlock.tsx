import * as bulmaToast from "bulma-toast";

import { AppStatus, useAppState } from "../state/app.state";
import { ReactComponent as CopyToClipboardSvg } from "./copy-to-clipboard.svg";
import theStyle from "./ResultBlock.module.sass";

export const ResultBlock = () => {
  const answer = useAppState((state) => state.answer);
  const hasSomeAnswer = useAppState((state) => state.hasSomeAnswer);
  const isLoading = useAppState((state) => state.status === AppStatus.LOADING);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(answer);
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
    <div className="message mt-6 is-success">
      <div className="message-header">
        <p>Result</p>
        {hasSomeAnswer && (
          <CopyToClipboardSvg
            className={theStyle.copyToClipboard}
            onClick={copyToClipboard}
          />
        )}
      </div>
      <div className="message-body">
        {isLoading && (
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
        )}
        {!isLoading && <span>{answer}</span>}
      </div>
    </div>
  );
};
