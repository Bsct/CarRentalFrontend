import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import ReservationForm from "../content/reservation/ReservationForm";
import CarForm from "../content/cars/CarForm";
import ReservationList from "../content/reservation/ReservationList";
import CarList from "../content/cars/CarList";
import Logout from "./Logout";
import AppContentHome from "../content/AppContentHome";
import React from "react";
import AppHeaderLoggedInAdmin from "../content/AppHeaderLoggedInAdmin";
import CarListAdmin from "../content/cars/CarListAdmin";

const ContentLoggedInAdmin = () => {
    return (
        <>
            <AppHeaderLoggedInAdmin/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/reservation/add/:carId'}>
                        <ReservationForm/>
                    </Route>
                    <Route path={'/reservations'}>
                        <ReservationList/>
                    </Route>
                    <Route path={'/cars/add'}>
                        <CarForm/>
                    </Route>
                    <Route path={'/cars'}>
                        <CarListAdmin/>
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

export default ContentLoggedInAdmin;