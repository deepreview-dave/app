import { useState } from "react";
import { generateUUID } from "../business/utils";
import {
  AllAttributeDefinitions,
  getAttributeDescription,
} from "../state/defaults";
import { useAppState } from "../state/app.state";
import { WorkAttribute } from "../business/common";
import { useModalState } from "../state/modal.state";

const AttributeModal = () => {
  const ATTRIBUTE_NAME_MAX_LIMIT = 50;
  const DETAILS_MAX_LENGTH = 500;

  const selectedType = useModalState((state) => state.selectedType);
  const isOpened = useModalState((state) => state.isOpened);
  const addAttribute = useAppState((state) => state.addAttribute);
  const closeAttributeModal = useModalState(
    (state) => state.closeAttributeModal
  );

  const [text, setText] = useState("");
  const [details, setDetails] = useState("");

  if (!selectedType) {
    return null;
  }

  const onClose = () => {
    setText("");
    setDetails("");
    closeAttributeModal();
  };

  const onSave = () => {
    const attribute: WorkAttribute = {
      uuid: generateUUID(),
      name: text,
      type: selectedType,
      details,
    };
    addAttribute(attribute);
    onClose();
  };

  const isButtonDisabled = () => !text;

  const currentAttributeRemainingLength = (): number =>
    ATTRIBUTE_NAME_MAX_LIMIT - text.length;
  const currentDetailsRemainingLength = (): number =>
    DETAILS_MAX_LENGTH - details.length;

  return (
    <div className={isOpened ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {getAttributeDescription(selectedType).title}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="subtitle">
            {getAttributeDescription(selectedType).description}
          </div>
          <div className="field">
            <label className="label">{selectedType}</label>
            <div className="control">
              <input
                type="text"
                className="input"
                required
                value={text}
                placeholder={getAttributeDescription(selectedType).placeholder}
                maxLength={ATTRIBUTE_NAME_MAX_LIMIT}
                onChange={(e) => setText(e.currentTarget.value)}
              ></input>
              <div className="mt-1 has-text-grey-light is-size-7">
                Remaining characters: {currentAttributeRemainingLength()}
              </div>
            </div>
          </div>
          <div className="field mt-2">
            <label className="label">More details (optional):</label>
            <div className="control">
              <textarea
                className="textarea"
                value={details}
                placeholder="Add specifics and other details (optional)"
                maxLength={DETAILS_MAX_LENGTH}
                onChange={(e) => setDetails(e.currentTarget.value)}
              ></textarea>
              <div className="mt-1 has-text-grey-light is-size-7">
                Remaining characters: {currentDetailsRemainingLength()}
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            disabled={isButtonDisabled()}
            onClick={onSave}
          >
            Add
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export const MoreAttributes = () => {
  const inputEnabled = useAppState((state) => state.inputEnabled);

  const openAttributeModal = useModalState((state) => state.openAttributeModal);
  const attributes = useAppState((state) => state.inputs.attributes);
  const removeAttribute = useAppState((state) => state.removeAttribute);

  const showsEncouragementCopy = useAppState(
    (state) => state.inputs.attributes.length === 0
  );

  return (
    <div className="mt-4">
      <label className="label">Attributes (optional):</label>
      <div className="buttons">
        {AllAttributeDefinitions.map((value) => (
          <button
            disabled={!inputEnabled}
            key={value.type}
            className="button"
            onClick={() => openAttributeModal(value.type)}
          >
            {value.type}
          </button>
        ))}
      </div>
      {showsEncouragementCopy && (
        <article className="message">
          <div className="message-body">
            Use the buttons above to add more details like skills, strengths,
            projects or areas of improvement.
          </div>
        </article>
      )}
      <div className="tags">
        {attributes.map((attr) => (
          <span
            key={attr.uuid}
            className={"tag " + getAttributeDescription(attr.type).colorClass}
          >
            {attr.type}: {attr.name} | {attr.details}
            <button
              disabled={!inputEnabled}
              className="delete is-small"
              onClick={() => removeAttribute(attr)}
            ></button>
          </span>
        ))}
      </div>
      <AttributeModal />
    </div>
  );
};
