import { FormEvent } from 'react';

import { useAppState } from '../state/state';

export const NameEditor = () => {

  const inputEnabled = useAppState(state => state.inputEnabled);
  const reviewedName = useAppState(state => state.reviewedName);
  const updateName = useAppState(state => state.updateName);
  const onNameInputChange = (e: FormEvent<HTMLInputElement>) => updateName(e.currentTarget.value);

  return (
    <div className="field">
      <label className="label">Person name:</label>
      <div className="control">
        <input type="text" className="input" required disabled={!inputEnabled} value={reviewedName} placeholder="Write a person's name here" onChange={onNameInputChange}></input>
      </div>
    </div>
  );
}
