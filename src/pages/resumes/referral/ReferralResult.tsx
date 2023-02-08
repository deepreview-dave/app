import { useReferralLetterState } from "../../../state/referral-letter.state";

export const ReferralResult = () => {
  const results = useReferralLetterState((state) => state.result);

  const ReferralInfo = () => {
    const info = results
      .filter((e) => !e.editable)
      .map((e) => e.expanded)
      .join("")
      .trim();

    if (!info) {
      return (
        <div>
          <b className="has-background-warning has-text-warning-dark">[N/A]</b>
        </div>
      );
    }

    return (
      <div>
        <b className="preserve-whitepace">{info}</b>
      </div>
    );
  };

  const ReferralData = () => {
    const data = results
      .filter((e) => e.editable)
      .map((e) => e.expanded.trim());

    if (data.length === 0) {
      return (
        <p className="mt-4">
          <span className="has-background-warning has-text-warning-dark">
            [Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.]
          </span>
        </p>
      );
    }

    return (
      <div className="mt-6">
        {data.map((e, i) => (
          <p className="preserve-whitepace" key={i}>
            {e}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="has-background-white-ter">
      <div id="pdf-to-download" className="result-display">
        <div className="has-background-info p-2"></div>
        <div className="p-4 has-background-white content">
          <ReferralInfo />
          <ReferralData />
        </div>
      </div>
    </div>
  );
};
