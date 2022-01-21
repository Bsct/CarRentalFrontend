import classes from "./AppContent.module.css";
import {Route, Switch} from "react-router-dom";
import CarList from "./cars/CarList";
import AppContentHome from "./AppContentHome";
import CarForm from "./cars/CarForm";
import ReservationForm from "./reservation/ReservationForm";
import ReservationList from "./reservation/ReservationList";


const AppContent = () => {
    return (
        <div className={classes.AppContent}>
            <Switch>
                <Route path={'/reservation/add/:carId'}>
                    <ReservationForm/>
                </Route>
                <Route path={'/reservations'}>
                    <ReservationList/>
                </Route>
                <Route path={'/car/add'}>
                    <CarForm/>
                </Route>
                <Route path={'/cars'}>
                    <CarList/>
                </Route>
                <Route path={''}>
                    <AppContentHome/>
                </Route>
            </Switch>
        </div>
    )
}

export default AppContent;