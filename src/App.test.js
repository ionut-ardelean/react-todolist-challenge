import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { App } from './App';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('App component', () => {

  it('It should render without errors', () => {
    const component = shallow(<App />);
    const wrapper = component.find('.container');
    expect(wrapper.length).toBe(1);
  })

  it('It should contain add input', () => {
    const component = shallow(<App />);
    const wrapper = component.find('.add-item-to-list > Input');
    expect(wrapper.length).toBe(1);
  })

  it('Should emit callback on click add event', () => {
    const mockFunc = jest.fn();
    const component = shallow(<App addNewItem={mockFunc} />);
    const button = component.find('Button');
    button.simulate('click');
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(1);
  });
});