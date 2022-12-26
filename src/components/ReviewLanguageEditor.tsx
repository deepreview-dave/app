import React from "react";

import { ReviewLanguage } from "../business/common";
import { useAppState } from "../state/app.state";

export const ReviewLanguageEditor = () => {
  const reviewLanguage = useAppState((state) => state.inputs.reviewLanguage);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updateReviewLanguage = useAppState(
    (state) => state.updateReviewLanguage
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as ReviewLanguage;
    updateReviewLanguage(value);
  };

  return (
    <div className="field mt-4">
      <label className="label">Review language:</label>
      <div className="select">
        <select
          required
          value={reviewLanguage}
          disabled={!inputEnabled}
          onChange={onChange}
        >
          <option value={ReviewLanguage.ENGLISH}>English</option>
          <option value={ReviewLanguage.SPANISH}>Spanish</option>
          <option value={ReviewLanguage.FRENCH}>French</option>
          <option value={ReviewLanguage.GERMAN}>German</option>
          <option value={ReviewLanguage.ITALIAN}>Italian</option>
          <option value={ReviewLanguage.ROMANIAN}>Romanian</option>
        </select>
      </div>
    </div>
  );
};
