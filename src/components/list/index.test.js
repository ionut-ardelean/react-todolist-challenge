// write a test that tests the list component here...

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { List } from './index';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

const storeList = [
    {_id: 1, title: 'test-title1'},
    {_id: 2, title: 'test-title2'},
    {_id: 3, title: 'test-title3'},
    {_id: 4, title: 'test-title4'},
 ]

 const storeListWithHiddenItem = [
    {_id: 1, title: 'test-title1' },
    {_id: 2, title: 'test-title2' },
    {_id: 3, title: 'test-title3', hidden: false },
    {_id: 4, title: 'test-title4', hidden: true },
 ]

describe('List component', () => {

  it('It should render list with 4 item without errors', () => {
    const component = shallow(<List list={storeList} />);
    const wrapper = component.find('tbody').children();
    expect(wrapper.length).toBe(4);
  })

  it('It should render list with 3 item, when one is hidden because of delete, without errors', () => {
    const component = shallow(<List list={storeListWithHiddenItem} />);
    const wrapper = component.find('tbody').children();
    expect(wrapper.length).toBe(3);
  })

});