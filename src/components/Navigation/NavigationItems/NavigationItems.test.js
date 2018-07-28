//! React needs to be loaded in order to mount components
import React from 'react';
//! Import Enzyme.  Shallow is a tool to allow components to render "shallow" versions of themselves.  It doesn't render content of child componetns.
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//! Import the component(s) you plan on testing
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

//! Connect Enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated.', () => {
    const wrapper = shallow(<NavigationItems />);
    //! this is not a JSX Element in the find function.  It's the normal export in the NavigationItem file.
    //! toHaveLength will expect to find 2 instances of NavigationItem
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
})