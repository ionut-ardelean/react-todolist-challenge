// write a test that tests the list item component here...
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { ListItem } from './index';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('List item component', () => {

  it('It should render list item without errors', () => {
    const component = shallow(<ListItem item={{_id: 1, title: 'test-title'}}/>);
    const wrapper = component.find('tr');
    expect(wrapper.length).toBe(1);
  })

  it('It sets the state correctly based on passed on props', () => {
    const component = shallow(<ListItem item={{_id: 1, title: 'test-title'}}/>);
    expect(component.state().title).toEqual("test-title");
  })

  it('It sets the state correctly on edit button click, and view is updated', () => {
    const component = shallow(<ListItem item={{_id: 1, title: 'test-title'}}/>);
    expect(component.state().isEditing).toEqual(false);
    const editButton = component.find('Button').at(0);    
    editButton.simulate('click');
    expect(component.state().isEditing).toEqual(true);
    const input = component.find('Input');
    expect(input.length).toBe(1);
    input.simulate('change', 'changed-title');
    expect(component.state().title).toEqual('changed-title');
  })

  it('It sets the state correctly reverted on concel', () => {
    const component = shallow(<ListItem item={{_id: 1, title: 'test-title'}}/>);
    expect(component.state().isEditing).toEqual(false);
    const editButton = component.find('Button').at(0);    
    editButton.simulate('click');
    expect(component.state().isEditing).toEqual(true);
    const input = component.find('Input');
    expect(input.length).toBe(1);
    input.simulate('change', 'changed-title');
    expect(component.state().title).toEqual('changed-title');
    const cancelButton = component.find('Button').at(1);    
    cancelButton.simulate('click');
    expect(component.state().isEditing).toEqual(false);
    expect(component.state().title).toEqual('test-title');

  })

  it('Should emit callback on click save event', () => {
    const mockFunc = jest.fn();
    const component = shallow(<ListItem item={{_id: 1, title: 'test-title'}} saveItem={mockFunc}/>);
    const editButton = component.find('Button').at(0);    
    editButton.simulate('click');
    const saveButton = component.find('Button').at(0);    
    saveButton.simulate('click');
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(1);
  });

  it('Should emit callback on click delete event', () => {
    const mockFunc = jest.fn();
    const component = shallow(<ListItem item={{_id: 1, title: 'test-title'}} deleteItem={mockFunc}/>);
    const deleteButton = component.find('Button').at(1);    
    deleteButton.simulate('click');
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(1);
  });
});