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

const EMPTY_RENT_RETURN = {
    'rentReturnDate': getDateString(new Date()),
    'surchargeFee': '',
    'clientFeedback': ''
}

const RentReturnForm = () => {

    const {reservationId} = useParams();
    const [editedRentReturnForm, setEditedRentReturnForm] = useState({...EMPTY_RENT_RETURN});
    const [rentReturnDate, setRentReturnDate] = useState(new Date());

    const handleRentReturnDateChangeForm = name => date => {
        const finalDate = getDateString(date)
        setRentReturnDate(date)
        setEditedRentReturnForm({...editedRentReturnForm, [name]: finalDate});
    };

    const handleChangeRentReturnForm = name => event => {
        setEditedRentReturnForm({...editedRentReturnForm, [name]: event.target.value});
    }

    const handleClearRentReturnForm = () => {
        setEditedRentReturnForm({...EMPTY_RENT_RETURN})
    };

    const handleSubmitRentReturnForm = () => {
        console.log("Sending: " + JSON.stringify(editedRentReturnForm))
        console.log("Sending: " + reservationId)

        instance.post(`http://localhost:8080/reservations/${reservationId}/return/`, editedRentReturnForm)
            .then((data) => {
                console.log("(Response) submit success: " + JSON.stringify(data));
            })
            .catch((error) => {
                console.log("(Response) submit failed: " + JSON.stringify(error));
            })
    }


    return (
        <div>
            <CardComponent title={"Rent Return form"}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <DatePicker selected={rentReturnDate}
                                    onChange={handleRentReturnDateChangeForm("rentReturnDate")}>
                        </DatePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedRentReturnForm.surchargeFee}
                                   onChange={handleChangeRentReturnForm("surchargeFee")}
                                   className={classes.FormStretchField}
                                   label={"SurchargeFee"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedRentReturnForm.clientFeedback}
                                   onChange={handleChangeRentReturnForm("clientFeedback")}
                                   className={classes.FormStretchField}
                                   label={"Client's feedback"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={2}/>
                        <Grid item xs={4}>
                            <Button className={classes.ButtonForm}
                                    size={"small"} variant={"contained"}
                                    onClick={handleClearRentReturnForm}>
                                Clear
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.ButtonForm}
                                    size={"small"} variant={"contained"}
                                    onClick={handleSubmitRentReturnForm}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default RentReturnForm;