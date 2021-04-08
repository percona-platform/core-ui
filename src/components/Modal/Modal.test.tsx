import React from 'react';
import { shallow } from 'enzyme';
import { dataQa } from 'shared';
import { Modal } from './Modal';

describe('Modal window::', () => {
  it('should render modal successfully', () => {
    const onClose = jest.fn();
    const root = shallow(<Modal onClose={onClose} isVisible title="test" />);

    expect(root.find(dataQa('modal-background')).length).toEqual(1);
    expect(root.find(dataQa('modal-body')).length).toEqual(1);
    expect(root.find(dataQa('modal-close-button')).length).toEqual(1);
    expect(root.find(dataQa('modal-content')).length).toEqual(1);
  });

  it('should call onClose callback on close button click', () => {
    const onClose = jest.fn();
    const root = shallow(<Modal onClose={onClose} isVisible title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    root.find(dataQa('modal-close-button')).simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('should NOT call onClose callback on escape when closeOnEscape is NOT set', () => {
    const onClose = jest.fn();
    const root = shallow(<Modal onClose={onClose} isVisible closeOnEscape={false} title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    root.simulate('keydown', { key: 'Escape' });
    expect(onClose.mock.calls.length).toBe(0);
  });

  it('should call onClose callback on background click when closeOnClickaway is set by default', () => {
    const onClose = jest.fn();
    const root = shallow(<Modal onClose={onClose} isVisible title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    root.find(dataQa('modal-background')).simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('should NOT call onClose callback on background click when closeOnClickaway is NOT set', () => {
    const onClose = jest.fn();
    const root = shallow(<Modal onClose={onClose} isVisible closeOnClickaway={false} title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    root.find(dataQa('modal-background')).simulate('click');
    expect(onClose.mock.calls.length).toBe(0);
  });
});
