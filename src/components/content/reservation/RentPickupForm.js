import classes from "../cars/CarForm.module.css";
import {Button, Grid, TextField} from "@material-ui/core";
import DatePicker from "react-datepicker";
import CardComponent from "../../CardComponent";
import {useState} from "react";
import instance from "../../../axios/axios";
import {useParams} from "react-router-dom";

const getDateString = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: "numeric"}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: "2-digit"}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: "2-digit"}).format(dateObject);
    return `${ye}-${mo}-${da}`
}

const EMPTY_RENT_PICKUP = {
    'rentPickupDate': getDateString(new Date()),
    'clientFeedback': '',

}

const RentPickupForm = () => {

    const {reservationId} = useParams();
    const [editedRentPickupForm, setEditedRentPickupForm] = useState({...EMPTY_RENT_PICKUP});
    const [rentPickupDate, setRentPickupDate] = useState(new Date());

    const handleRentPickupDateChangeForm = name => date => {
        const finalDate = getDateString(date)
        setRentPickupDate(date)
        setEditedRentPickupForm({...editedRentPickupForm, [name]: finalDate});
    };

    const handleChangePickupForm = name => event => {
        setEditedRentPickupForm({...editedRentPickupForm, [name]: event.target.value});
    }

    const handleClearPickupForm = () => {
        setEditedRentPickupForm({...EMPTY_RENT_PICKUP})
    };

    const handleSubmitPickupForm = () => {
        console.log("Sending: " + JSON.stringify(editedRentPickupForm))
        console.log("Sending: " + reservationId)

        instance.post(`http://localhost:8080/reservations/${reservationId}/pickup`, editedRentPickupForm)
            .then((data) => {
                console.log("(Response) submit success: " + JSON.stringify(data));
            })
            .catch((error) => {
                console.log("(Response) submit failed: " + JSON.stringify(error));
            })
    }


    return (
        <div>
            <CardComponent title={"Rent pickup form"}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <DatePicker className={classes.FormStretchField}
                                    selected={rentPickupDate}
                                    onChange={handleRentPickupDateChangeForm("rentPickupDate")}>
                        </DatePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedRentPickupForm.clientFeedback}
                                   onChange={handleChangePickupForm("clientFeedback")}
                                   className={classes.FormStretchField}
                                   label={"Client's feedback"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}/>
                        <Grid item xs={4}>
                            <Button className={classes.ButtonForm}
                                    size={"small"} variant={"contained"}
                                    onClick={handleClearPickupForm}>
                                Clear
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.ButtonForm}
                                    size={"small"} variant={"contained"}
                                    onClick={handleSubmitPickupForm}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default RentPickupForm;