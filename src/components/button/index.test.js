import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Button from './index';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('Button component', () => {

  it('It should render without errors', () => {
    const component = shallow(<Button />);
    const wrapper = component.find('.button');
    expect(wrapper.length).toBe(1);
  })

  it('It should render the button with no errors', () => {
    const component = shallow(<Button type={'add'} />);
    const wrapper = component.find('.button.add');
    expect(wrapper.length).toBe(1);
  })

  it('Should emit callback on click event', () => {
    const mockFunc = jest.fn();
    const component = shallow(<Button onClick={mockFunc} />);
    const button = component.find('.button');
    button.simulate('click');
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(1);
  });
});