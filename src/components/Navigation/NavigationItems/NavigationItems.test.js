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

  //! beforeEach allows things to happen before each test is run
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  });

  it('should render two <NavigationItem /> elements if not authenticated.', () => {
    //! this is not a JSX Element in the find function.  It's the normal export in the NavigationItem file.
    //! toHaveLength will expect to find 2 instances of NavigationItem
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated.', () => {
    //! using the setProps helper method
    wrapper.setProps({
      isAuthenticated: true
    })
    //! this is not a JSX Element in the find function.  It's the normal export in the NavigationItem file.
    //! toHaveLength will expect to find 3 instances of NavigationItem
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render three <NavigationItem /> elements if authenticated.', () => {
    wrapper.setProps({
      isAuthenticated: true
    })
    //! look and see if there is this exact version of NavigationItem.  toEqual(true) expects to find this if we are authenticated
    expect(wrapper.contains(<NavigationItem link="/logout">LOGOUT</NavigationItem>)).toEqual(true);
  });
})