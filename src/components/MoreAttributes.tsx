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
  const selectedType = useModalState((state) => state.selectedType);
  const isOpened = useModalState((state) => state.isOpened);
  const addAttribute = useAppState((state) => state.addAttribute);
  const closeAttributeModal = useModalState(
    (state) => state.closeAttributeModal
  );

  const [text, setText] = useState("");

  if (!selectedType) {
    return null;
  }

  const onClose = () => {
    setText("");
    closeAttributeModal();
  };

  const onSave = () => {
    const attribute: WorkAttribute = {
      uuid: generateUUID(),
      name: text,
      type: selectedType,
    };
    addAttribute(attribute);
    onClose();
  };

  const isButtonDisabled = () => !text;

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
            <div className="control">
              <input
                type="text"
                className="input"
                required
                value={text}
                placeholder={getAttributeDescription(selectedType).placeholder}
                maxLength={200}
                onChange={(e) => setText(e.currentTarget.value)}
              ></input>
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

  return (
    <div>
      <label className="label">Add more attributes (optional):</label>
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
      <AttributeModal />
      <div className="tags">
        {attributes.map((attr) => (
          <span
            key={attr.uuid}
            className={"tag " + getAttributeDescription(attr.type).colorClass}
          >
            {attr.type}: {attr.name}
            <button
              disabled={!inputEnabled}
              className="delete is-small"
              onClick={() => removeAttribute(attr)}
            ></button>
          </span>
        ))}
      </div>
    </div>
  );
};
