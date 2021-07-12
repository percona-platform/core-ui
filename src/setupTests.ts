// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import 'jest-enzyme';
import { configure } from 'enzyme';
import { configure as configureTestingLibrary } from '@testing-library/react';
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const adapter = Adapter as any;

// eslint-disable-next-line new-cap
configure({ adapter: new adapter.default() });
configureTestingLibrary({ testIdAttribute: 'data-qa' });
