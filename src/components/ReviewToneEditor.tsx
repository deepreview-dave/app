import React from "react";

import { ReviewTone } from "../business/common";
import { useAppState } from "../state/app.state";

export const ReviewToneEditor = () => {
  const reviewTone = useAppState((state) => state.inputs.reviewTone);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updateReviewTone = useAppState((state) => state.updateReviewTone);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as ReviewTone;
    const tone = value!;
    updateReviewTone(tone);
  };

  return (
    <div className="field mt-4">
      <label className="label">Review tone:</label>
      <div className="select">
        <select
          required
          value={reviewTone}
          disabled={!inputEnabled}
          onChange={onChange}
        >
          <option value={ReviewTone.NEUTRAL}>Neutral</option>
          <option value={ReviewTone.FRIENDLY}>Friendly</option>
          <option value={ReviewTone.CRITICAL}>Critical</option>
        </select>
      </div>
    </div>
  );
};
