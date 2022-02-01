import classes from '../content/cars/CarForm.module.css';
import {Button, Grid, MenuItem, Select, TextField} from "@material-ui/core";
import {useState} from "react";
import CardComponent from "../CardComponent";
import instance from "../../axios/axios";
import {useHistory} from "react-router-dom";

const EMPTY_NEW_USER = {
    'username': '',
    'password': '',
    'name': '',
    'surname': '',
    'type': ''
}

const RegisterForm = () => {
    let history = useHistory();
    const [registeredUser, setRegisteredUser] = useState({...EMPTY_NEW_USER});

    const handleChangeForm = name => event => {
        setRegisteredUser({ ...registeredUser, [name]: event.target.value });
    };

    const handleClearForm = () => {
        setRegisteredUser({...EMPTY_NEW_USER});
    }

    const handleSubmit = () => {
        console.log("Sending:" + JSON.stringify(registeredUser))

        instance.post('/user/register', registeredUser)
            .then((data)=>{
                console.log("(Response) register submit success: "+ JSON.stringify(data));

                history.push("/auth");
            })
            .catch((err) => {
                console.log("(Response) register submit failed: "+ JSON.stringify(err));
            })
    }

    return (
        <div>
            <CardComponent title={'Register'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.username}
                                   onChange={handleChangeForm("username")}
                                   className={classes.FormStretchField}
                                   label={'Username'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.password}
                                   onChange={handleChangeForm("password")}
                                   className={classes.FormStretchField}
                                   type={"password"}
                                   label={'Password'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.name}
                                   onChange={handleChangeForm("name")}
                                   className={classes.FormStretchField}
                                   label={'Name'} size={'small'} variant="filled"/>
                    </Grid><Grid item xs={12}>
                    <TextField value={registeredUser.surname}
                               onChange={handleChangeForm("surname")}
                               className={classes.FormStretchField}
                               label={'Surname'} size={'small'} variant="filled"/>
                </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.type}
                                   onChange={handleChangeForm("type")}
                                   className={classes.FormStretchField}
                                   select
                                   label='Account type' size={'small'} variant="filled">
                            <MenuItem value={'admin'}>Administrator</MenuItem>
                            <MenuItem value={'user'}>Basic User</MenuItem>
                            <MenuItem value={'employee'}>Employee</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid container item xs={10}>
                        <Grid item xs={5}>
                            <Button className={classes.ButtonForm}
                                    size={'small'} variant="contained"
                                    onClick={handleClearForm}>
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button className={classes.ButtonForm}
                                    size={'small'} variant="contained"
                                    onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default RegisterForm;