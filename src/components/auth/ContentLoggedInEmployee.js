import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import ReservationList from "../content/reservation/ReservationList";
import Logout from "./Logout";
import AppContentHome from "../content/AppContentHome";
import React from "react";
import AppHeaderLoggedInEmployee from "../content/AppHeaderLoggedInEmployee";
import RentPickupForm from "../content/reservation/RentPickupForm";
import RentReturnForm from "../content/reservation/RentReturnForm";
import ReservationListEmployee from "../content/reservation/ReservationListEmployee";

const ContentLoggedInEmployee = () => {
    return (
        <>
            <AppHeaderLoggedInEmployee/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/reservations/:reservationId/pickup'}>
                        <RentPickupForm/>
                    </Route>
                    <Route path={'/reservations/:reservationId/return'}>
                        <RentReturnForm/>
                    </Route>
                    <Route path={'/reservations'}>
                        <ReservationListEmployee/>
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