export const ContinueButton = (props: { onClick: () => void }) => {
  return (
    <div className="columns is-mobile">
      <div className="column"></div>
      <div className="column is-narrow">
        <button className="button is-success" onClick={props.onClick}>
          Continue
        </button>
      </div>
    </div>
  );
};
