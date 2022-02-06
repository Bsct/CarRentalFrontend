import {useState} from "react";
import axios from "axios";
import CardComponent from "../../CardComponent";
import {Button, Grid, TextField} from "@material-ui/core";
import classes from "./CarForm.module.css";
import instance from "../../../axios/axios";


const EMPTY_NEW_CAR = {
    'id': null,
    'manufacturer': null,
    'model': null,
    'year': null,
    'engineSize': null,
    'color': null,
    'price': null,
    'rented': false,
}

const CarForm = () => {
    const [editedCar, setEditedCar] = useState({...EMPTY_NEW_CAR});

    const handleChangeCarForm = name => event => {
        setEditedCar({...editedCar, [name]: event.target.value});
    }

    const handleClearCarForm = () => {
        setEditedCar({...EMPTY_NEW_CAR})
    };

    const handleSubmit = () => {
        console.log("Sending: " + JSON.stringify(editedCar))
        instance.post("http://localhost:8080/cars", editedCar)
            .then((data) => {
                console.log("(Response) submit success: " + JSON.stringify(data));
            })
            .catch((error) => {
                console.log("(Response) submit failed: " + JSON.stringify(error));
            })
    }

    return (
        <div>
            <CardComponent title={"Car Form"}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedCar.manufacturer}
                                   onChange={handleChangeCarForm("manufacturer")}
                                   className={classes.FormStretchField}
                                   label={"Manufacturer"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedCar.model}
                                   onChange={handleChangeCarForm("model")}
                                   className={classes.FormStretchField}
                                   label={"Model"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedCar.year}
                                   onChange={handleChangeCarForm("year")}
                                   className={classes.FormStretchField}
                                   label={"Production Year"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedCar.engineSize}
                                   onChange={handleChangeCarForm("engineSize")}
                                   className={classes.FormStretchField}
                                   label={"Engine Size"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedCar.color}
                                   onChange={handleChangeCarForm("color")}
                                   className={classes.FormStretchField}
                                   label={"Color"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{className: classes.textFieldLabel}}
                                   value={editedCar.price}
                                   onChange={handleChangeCarForm("price")}
                                   className={classes.FormStretchField}
                                   label={"Price"} size={"small"} variant={"filled"}/>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid container item xs={10}>
                        <Grid item xs={5}>
                            <Button className={classes.ButtonForm}
                                    size={"small"} variant={"contained"}
                                    onClick={handleClearCarForm}>
                                Clear
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button className={classes.ButtonForm}
                                    size={"small"} variant={"contained"}
                                    onClick={handleSubmit}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default CarForm;