import {useEffect, useState} from "react";
import CardComponent from "../../CardComponent";
import classes from "../cars/CarList.module.css";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import instance from "../../../axios/axios";

const ReservationList = () => {
    const[reservation, setReservation] = useState([]);

    const pullReservationsFromDatabase = () => {
        instance.get("/reservations")
            .then((data) => {
                console.log("(Response) success");
                console.log("Pulled records: " + JSON.stringify(data.data));
                setReservation(data.data);
            })
            .catch((error) =>{
                console.log("(Response) error: " + JSON.stringify(error))
            })
    }

    useEffect(() => {
        pullReservationsFromDatabase();
    }, []);


    return (
        <div>
            <CardComponent title={"Reservation List"}>
                <div className={classes.CarTableContainer}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-level={"simple table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"right"}>Id</TableCell>
                                    <TableCell align={"right"}>Reservation made on</TableCell>
                                    <TableCell align={"right"}>Renting from</TableCell>
                                    <TableCell align={"right"}>Renting due</TableCell>
                                    <TableCell align={"right"}>Reserved car</TableCell>
                                    <TableCell align={"right"}>Reserved by</TableCell>
                                    <TableCell align={"right"}>Car given by</TableCell>
                                    <TableCell align={"right"}>Car returned to</TableCell>
                                    <TableCell align={"right"}>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reservation.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell align={"right"} component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align={"right"}>{row.reservationDate}</TableCell>
                                        <TableCell align={"right"}>{row.rentDateFrom}</TableCell>
                                        <TableCell align={"right"}>{row.rentDateTo}</TableCell>
                                        <TableCell align={"right"}>{row.car.manufacturer} {row.car.model} </TableCell>
                                        <TableCell align={"right"}>{row.client}</TableCell>
                                        <TableCell align={"right"}>{row.employeePickup}</TableCell>
                                        <TableCell align={"right"}>{row.employeeReturn}</TableCell>
                                        <TableCell align={"right"}>{row.price} $</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
            </CardComponent>
        </div>
    )
}

export default ReservationList;
