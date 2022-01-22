import AppHeaderLoggedInUser from "../content/AppHeaderLoggedInUser";
import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import ReservationForm from "../content/reservation/ReservationForm";
import React from "react";
import CarList from "../content/cars/CarList";
import Logout from "./Logout";
import AppContentHome from "../content/AppContentHome";

const ContentLoggedInUser = () => {
    return (
        <>
            <AppHeaderLoggedInUser/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/reservation/add/:carId'}>
                        <ReservationForm/>
                    </Route>
                    <Route path={'/cars'}>
                        <CarList/>
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

export default ContentLoggedInUser;