import { useRef, useEffect } from "react";
import useAutosizeTextArea from "../../effects/useAutoresizeTextArea";

export const AutoTextArea = (props: {
  disabled: boolean;
  value: string;
  index: number;
  placeholder: string;
  onChange: (value: string, index: number) => void;
  onBlur?: () => void;
  className?: string;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, props.value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value as string;
    props.onChange(val, props.index);
  };

  useEffect(() => {
    props.onChange(props.value, props.index);
  }, []);

  return (
    <textarea
      id="review-text"
      placeholder={props.placeholder}
      className={props.className + " " + ""}
      disabled={props.disabled}
      onChange={(e) => handleChange(e)}
      onBlur={props.onBlur}
      ref={textAreaRef}
      rows={1}
      value={props.value}
    ></textarea>
  );
};
