import {
  AllAttributeDefinitions,
  getAttributeDescription,
} from "../state/defaults";
import { useAppState } from "../state/app.state";
import { WorkAttribute } from "../business/common";
import { AttributeModalStatus, useModalState } from "../state/modal.state";

const AttributeModal = () => {
  const ATTRIBUTE_NAME_MAX_LIMIT = 50;
  const DETAILS_MAX_LENGTH = 500;

  const existinAttribute = useModalState((state) => state.existingAttribute);
  const selectedType = useModalState((state) => state.selectedType);
  const status = useModalState((state) => state.status);
  const isOpened = useModalState(
    (state) => state.status !== AttributeModalStatus.CLOSED
  );
  const addAttribute = useAppState((state) => state.addAttribute);
  const updateAttribute = useAppState((state) => state.updateAttribute);
  const setName = useModalState((state) => state.updateName);
  const setDetails = useModalState((state) => state.updateDetails);
  const closeAttributeModal = useModalState(
    (state) => state.closeAttributeModal
  );

  if (!selectedType) {
    return null;
  }

  const onClose = () => {
    closeAttributeModal();
  };

  const onSave = () => {
    if (status === AttributeModalStatus.OPEN_FOR_ADDING) {
      addAttribute(existinAttribute);
    } else {
      updateAttribute(existinAttribute);
    }
    onClose();
  };

  const isButtonDisabled = () => !existinAttribute.name;

  const currentAttributeRemainingLength = (): number =>
    ATTRIBUTE_NAME_MAX_LIMIT - existinAttribute.name.length;
  const currentDetailsRemainingLength = (): number =>
    DETAILS_MAX_LENGTH - existinAttribute.details.length;

  const getCTAText = () =>
    status === AttributeModalStatus.OPEN_FOR_ADDING ? "Add" : "Update";

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
                value={existinAttribute.name}
                placeholder={getAttributeDescription(selectedType).placeholder}
                maxLength={ATTRIBUTE_NAME_MAX_LIMIT}
                onChange={(e) => setName(e.currentTarget.value)}
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
                value={existinAttribute.details}
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
            {getCTAText()}
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

  const openAttributeModalForNew = useModalState(
    (state) => state.openAttributeModalForNew
  );
  const openAttributeModalForEditing = useModalState(
    (state) => state.openAttributeModalForEditing
  );
  const attributes = useAppState((state) => state.inputs.attributes);
  const removeAttribute = useAppState((state) => state.removeAttribute);

  const showsEncouragementCopy = useAppState(
    (state) => state.inputs.attributes.length === 0
  );

  const getAttributeDetails = (attr: WorkAttribute) => {
    if (attr.details) {
      return <>{attr.details}</>;
    }
    return (
      <span className="has-text-grey-light">
        Click 'Edit' to add specifics and other options.
      </span>
    );
  };

  return (
    <div className="mt-4">
      <label className="label">Attributes (optional):</label>
      <div className="buttons">
        {AllAttributeDefinitions.map((value) => (
          <button
            disabled={!inputEnabled}
            key={value.type}
            className="button"
            onClick={() => openAttributeModalForNew(value.type)}
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
      <div className="columns has-text-centered is-multiline">
        {attributes.map((attr) => (
          <div className="column is-4">
            <div className="card">
              <header
                className={
                  "card-header " + getAttributeDescription(attr.type).colorClass
                }
              >
                <p className="card-header-title">{attr.type}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <h4>{attr.name}</h4>
                  <p>{getAttributeDetails(attr)}</p>
                </div>
              </div>
              <footer className="card-footer">
                <a
                  className="card-footer-item"
                  onClick={() => openAttributeModalForEditing(attr)}
                >
                  Edit
                </a>
                <a
                  className="card-footer-item has-text-danger"
                  onClick={() => removeAttribute(attr)}
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
      <AttributeModal />
    </div>
  );
};
