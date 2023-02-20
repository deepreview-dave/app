export const PrevButton = (props: { onClick: () => void }) => {
  return (
    <div>
      <hr />
      <button className="button is-small" onClick={props.onClick}>
        Go back
      </button>
    </div>
  );
};
