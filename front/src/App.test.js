import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('Testes gerais', () => {
    it('renderiza sem quebrar', () => {
        mount(<App />);
    });
});
