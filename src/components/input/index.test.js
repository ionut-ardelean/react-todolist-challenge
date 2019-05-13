// write a test that tests the input component here...
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Input from './index';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('Input component', () => {

    it('It should render the input without errors', () => {
        const component = shallow(<Input />);
        const wrapper = component.find('input');
        expect(wrapper.length).toBe(1);
    })


    it('Should emit callback on change event', () => {
        const mockFunc = jest.fn();
        const component = shallow(<Input value={'test-value'} onChange={mockFunc} />);
        component.simulate('change', { target: { value: 'changed-title' } });
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });

});