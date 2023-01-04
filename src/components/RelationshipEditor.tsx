import { Relationship } from "../business/common";
import { useAppState } from "../state/app.state";

export const RelationshipEditor = () => {
  const relationship = useAppState((state) => state.inputs.relationship);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updateRelationship = useAppState((state) => state.updateRelationship);
  const updateName = useAppState((state) => state.updateName);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as Relationship;
    updateRelationship(value);

    if (value === Relationship.Self) {
      updateName("");
    }
  };

  return (
    <div className="field mt-4">
      <label className="label">This is a review for:</label>
      <div className="select">
        <select
          required
          value={relationship}
          disabled={!inputEnabled}
          onChange={onChange}
        >
          <option value={Relationship.Self}>Myself</option>
          <option value={Relationship.Colleague}>A colleague</option>
          <option value={Relationship.Manager}>My manager</option>
        </select>
      </div>
    </div>
  );
};
