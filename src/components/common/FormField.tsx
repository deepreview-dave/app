export const FormField = (props: {
  field: string;
  className: string;
  children: JSX.Element;
}) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className={"label " + props.className}>{props.field}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">{props.children}</p>
        </div>
      </div>
    </div>
  );
};

FormField.defaultProps = {
  className: "",
};
