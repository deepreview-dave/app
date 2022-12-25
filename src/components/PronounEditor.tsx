import { Pronouns } from "../business/common";
import { useAppState } from "../state/app.state";

export const PronounEditor = () => {
  const pronoun = useAppState((state) => state.inputs.pronoun);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updatePronoun = useAppState((state) => state.updatePronoun);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as Pronouns;
    updatePronoun(value);
  };

  return (
    <div className="field mt-4">
      <label className="label">Pronoun:</label>
      <div className="select">
        <select
          required
          value={pronoun}
          disabled={!inputEnabled}
          onChange={onChange}
        >
          <option value={Pronouns.NEUTRAL}>They</option>
          <option value={Pronouns.HE}>he</option>
          <option value={Pronouns.HER}>Her</option>
        </select>
      </div>
    </div>
  );
};
