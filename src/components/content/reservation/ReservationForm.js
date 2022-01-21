import CardComponent from "../../CardComponent";
import classes from "../cars/CarForm.module.css";
import {Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import instance from "../../../axios/axios";

const getDateString = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: "numeric"}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: "2-digit"}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: "2-digit"}).format(dateObject);
    return `${ye}-${mo}-${da}`
}


const EMPTY_NEW_RESERVATION = {
    'id': null,
    'reservationDate': getDateString(new Date()),
    'rentDateFrom': getDateString(new Date()),
    'rentDateTo': getDateString(new Date()),
    'price': null,
    'car': null,
    'employeeReturn': null,
    'employeePickup': null,
    'client': null,
}


const ReservationForm = () => {

    const {carId} = useParams();
    const [editedReservation, setEditedReservation] = useState({...EMPTY_NEW_RESERVATION});
    const [rentDateFrom, setRentDateFrom] = useState(new Date());
    const [rentDateTo, setRentDateTo] = useState(new Date());

    const handleChangeReservationForm = name => event => {
        setEditedReservation({...editedReservation, [name]: event.target.value});
    }

    const handleRentDateFromChangeForm = name => date => {
        const finalDate = getDateString(date)
        setRentDateFrom(date)
        setEditedReservation({...editedReservation, [name]: finalDate});
    };

    const handleRentDateToChangeForm = name => date => {
        const finalDate = getDateString(date)
        setRentDateTo(date)
        setEditedReservation({...editedReservation, [name]: finalDate});
    };

    const handleClearCarForm = () => {
        setEditedReservation({...EMPTY_NEW_RESERVATION})
    };

    const handleSubmitReservation = () => {
        console.log("Sending: " + JSON.stringify(editedReservation))

        instance.post(`http://localhost:8080/reservations/add/${carId}`, editedReservation)
            .then((data) => {
                console.log("(Response) submit success: " + JSON.stringify(data));
            })
            .catch((error) => {
                console.log("(Response) submit failed: " + JSON.stringify(error));
            })
    }

    return (
        <div>
            <CardComponent title={"Reservation Form"}>
                <Grid container className={classes.FormContainer}>

                    <Grid item xs={12}>
                        <DatePicker selected={rentDateFrom}
                                    onChange={handleRentDateFromChangeForm("rentDateFrom")}>
                        </DatePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker selected={rentDateTo}
                                    onChange={handleRentDateToChangeForm("rentDateTo")}>
                        </DatePicker>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}/>
                        <Grid item xs={4}>
                            <Button className={classes.FormStretchField}
                                    size={"small"} variant={"contained"}
                                    onClick={handleClearCarForm}>
                                Clear
                            </Button>
                        </Grid>
                            <Grid item xs={4}>
                                <Button className={classes.FormStretchField}
                                        size={"small"} variant={"contained"}
                                        onClick={handleSubmitReservation}>
                                    Add
                                </Button>
                            </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default ReservationForm;