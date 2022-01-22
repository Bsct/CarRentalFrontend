import classes from './App.module.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index'
import ContentLoggedInUser from "./components/auth/ContentLoggedInUser";
import ContentLoggedOut from "./components/auth/ContentLoggedOut";
import ContentLoggedInEmployee from "./components/auth/ContentLoggedInEmployee";
import ContentLoggedInAdmin from "./components/auth/ContentLoggedInAdmin";

class App extends Component {
    componentDidMount() {
        this.props.checkAuthState();
    }

    render() {
        return (
            <div className={classes.App}>
                {(() => {
                    if (this.props.isAuthenticated && this.props.authenticatedUserRoles.includes("ROLE_ADMIN")) {
                        return <ContentLoggedInAdmin/>
                    } else if (this.props.isAuthenticated && this.props.authenticatedUserRoles.includes("ROLE_EMPLOYEE")) {
                        return <ContentLoggedInEmployee/>
                    } else if (this.props.isAuthenticated && this.props.authenticatedUserRoles.includes("ROLE_USER")) {
                        return <ContentLoggedInUser/>
                    } else {
                        return <ContentLoggedOut/>
                    }
                })()}
            </div>
        );
    }
}

const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.token !== null,
            authenticatedUserRoles: state.auth.roles
        };
    }
;

const mapDispatchToProps = dispatch => {
        return {
            checkAuthState: () => dispatch(actions.checkAuthState())
        }
    }
;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
