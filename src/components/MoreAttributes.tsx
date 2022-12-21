import { FormEvent, useState } from 'react';
import { generateUUID } from '../business/utils';
import { AllAttributeDefinitions, getAttributeDescription } from '../state/defaults';
import { TAttribute, useAppState } from '../state/state';

const AttributeModal = () => {

  const selectedType = useAppState(state => state.attributeModal.selectedType);
  const isOpened = useAppState(state => state.attributeModal.isOpened);
  const addAttribute = useAppState(state => state.addAttribute);
  const closeAttributeModal = useAppState(state => state.closeAttributeModal);

  const [text, setText] = useState('');

  const onTextChange = (e: FormEvent<HTMLInputElement>) => setText(e.currentTarget.value);

  const onClose = () => {
    setText('');
    closeAttributeModal();
  }

  const onSave = () => {
    const attribute: TAttribute = {
      uuid: generateUUID(),
      name: text,
      type: selectedType!,
    };
    addAttribute(attribute);
    onClose();
  }

  const isButtonDisabled = () => !text;

  if (!selectedType) {
    return null;
  }

  return (
    <div className={isOpened ? 'modal is-active' : 'modal'}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Add attribute</p>
          <button className='delete' aria-label='close' onClick={onClose}></button>
        </header>
        <section className='modal-card-body'>
          <div className='subtitle'>{getAttributeDescription(selectedType).description}</div>
          <div className='field'>
            <div className='control'>
              <input
                type='text'
                className='input'
                required
                value={text}
                placeholder=''
                onChange={onTextChange}
              ></input>
            </div>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button className='button is-success' disabled={isButtonDisabled()} onClick={onSave}>Save changes</button>
          <button className='button' onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  )
};

export const MoreAttributes = () => {

  const openAttributeModal = useAppState(state => state.openAttributeModal);
  const attributes = useAppState(state => state.inputs.attributes);
  const removeAttribute = useAppState(state => state.removeAttribute);

  return (
    <div>
      <label className='label'>Add more attributes (optional):</label>
      <div className='buttons'>
        {
          AllAttributeDefinitions.map((value) => (
            <button key={value.type} className='button' onClick={() => openAttributeModal(value.type)}>
              {value.type}
            </button>
          ))
        }
      </div>
      <AttributeModal />
      <div className='tags'>
        {
          attributes.map((attr) => (
            <span key={attr.uuid} className={'tag ' + getAttributeDescription(attr.type).colorClass}>
              {attr.type}: {attr.name}
              <button className='delete is-small' onClick={() => removeAttribute(attr)}></button>
            </span>
          ))
        }
      </div>
    </div>
  )
}