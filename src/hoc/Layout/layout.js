//dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
//components
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
//css
import classes from './Layout.css';


//this container will connect to the redux store in order to pass authentication info to Toolbar and Sidedrawer, which will render login/logout links depending on auth status.
class Layout extends Component {
    state = {
        showSideDrawer: true
    }


    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated }
                    />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main> 
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null //if state.auth.token is not null, the user is authenticated.
    }
}

export default connect(mapStateToProps)(Layout);