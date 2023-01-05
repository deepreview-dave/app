import { Relationship } from "../business/common";
import { useAppState } from "../state/app.state";

export const RelationshipEditor = () => {
  const relationship = useAppState((state) => state.inputs.relationship);
  const inputEnabled = useAppState((state) => state.inputEnabled);
  const updateRelationship = useAppState((state) => state.updateRelationship);
  const updateName = useAppState((state) => state.updateName);

  const onClick = (value: Relationship) => {
    updateRelationship(value);

    if (value === Relationship.MYSELF) {
      updateName("");
    }
  };

  const isSelected = (rel: Relationship) => rel === relationship;
  const buttonsClass = (rel: Relationship) =>
    isSelected(rel) ? "button is-success is-selected" : "button";

  return (
    <div className="field mt-4 has-text-centered">
      <label className="label">This is a review for:</label>
      <div className="buttons has-addons is-centered">
        <button
          disabled={!inputEnabled}
          className={buttonsClass(Relationship.MYSELF)}
          onClick={() => onClick(Relationship.MYSELF)}
        >
          Myself
        </button>
        <button
          disabled={!inputEnabled}
          className={buttonsClass(Relationship.COLLEAGUE)}
          onClick={() => onClick(Relationship.COLLEAGUE)}
        >
          A colleague
        </button>
        <button
          disabled={!inputEnabled}
          className={buttonsClass(Relationship.MANAGER)}
          onClick={() => onClick(Relationship.MANAGER)}
        >
          My manager
        </button>
        <button
          disabled={!inputEnabled}
          className={buttonsClass(Relationship.REPORT)}
          onClick={() => onClick(Relationship.REPORT)}
        >
          A direct report
        </button>
      </div>
      <hr />
    </div>
  );
};
