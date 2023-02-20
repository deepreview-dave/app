export const ContinueButton = (props: { onClick: () => void }) => {
  return (
    <div className="buttons is-pulled-right">
      <button className="button is-success" onClick={props.onClick}>
        Continue
      </button>
    </div>
  );
};
