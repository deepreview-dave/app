import { EAppStatus, useAppState } from "../state/state";

export const ResultBlock = () => {
  const answer = useAppState((state) => state.answer);
  const isLoading = useAppState((state) => state.status === EAppStatus.LOADING);

  return (
    <div className="message mt-6">
      <div className="message-header">
        <p>Your review</p>
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
