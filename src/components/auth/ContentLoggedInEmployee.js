import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import ReservationList from "../content/reservation/ReservationList";
import Logout from "./Logout";
import AppContentHome from "../content/AppContentHome";
import React from "react";
import AppHeaderLoggedInEmployee from "../content/AppHeaderLoggedInEmployee";

const ContentLoggedInEmployee = () => {
    return (
        <>
            <AppHeaderLoggedInEmployee/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/reservations'}>
                        <ReservationList/>
                    </Route>
                    <Route path={'/logout'}>
                        <Logout/>
                    </Route>
                    <Route path={''}>
                        <AppContentHome/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default ContentLoggedInEmployee;