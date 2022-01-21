import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import AppHeaderLoggedIn from "../content/AppHeaderLoggedIn";
import AppContentHome from "../content/AppContentHome";
import CarList from "../content/cars/CarList";
import React from "react";
import Logout from "./Logout";
import ReservationForm from "../content/reservation/ReservationForm";
import ReservationList from "../content/reservation/ReservationList";
import CarForm from "../content/cars/CarForm";

const ContentLoggedIn = () => {
    return (
        <>
            <AppHeaderLoggedIn/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/reservation/add/:carId'}>
                        <ReservationForm/>
                    </Route>
                    <Route path={'/car/add'}>
                        <CarForm/>
                    </Route>
                    <Route path={'/reservations'}>
                        <ReservationList/>
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

export default ContentLoggedIn;