import {useEffect, useState} from "react";
import CardComponent from "../../CardComponent";
import classes from "./CarList.module.css";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import instance from "../../../axios/axios";

const CarList = () => {
    const [rows, setRows] = useState([]);

    const pullCarsFromDatabaseServer = () => {
        instance.get("http://localhost:8080/cars")
            .then((data) => {
                console.log("Received success message")
                console.log("Pulled records: " + JSON.stringify(data.data))
                setRows(data.data);
            })
            .catch((error) => {
                console.log("Received error message")
            });
    }

    useEffect(() => {
        pullCarsFromDatabaseServer();
    }, [])

    return (
        <div>
            <CardComponent title={"Car List"}>
                <div className={classes.CarTableContainer}>
                    <TableContainer component={Paper}>
                        <Table className={classes.Table} sx={{minWidth: 650}} aria-level={"simple table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"right"}>Id</TableCell>
                                    <TableCell align={"right"}>Manufacturer</TableCell>
                                    <TableCell align={"right"}>Model</TableCell>
                                    <TableCell align={"right"}>Prod. Year</TableCell>
                                    <TableCell align={"right"}>Engine Size</TableCell>
                                    <TableCell align={"right"}>Color</TableCell>
                                    <TableCell align={"right"}>Price/day</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell align={"right"} component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align={"right"}>{row.manufacturer}</TableCell>
                                        <TableCell align={"right"}>{row.model}</TableCell>
                                        <TableCell align={"right"}>{row.year}</TableCell>
                                        <TableCell align={"right"}>{row.engineSize}ccm</TableCell>
                                        <TableCell align={"right"}>{row.color}</TableCell>
                                        <TableCell align={"right"}>{row.price}$ per day</TableCell>
                                        <TableCell align={"right"}>
                                            <Link to={`reservation/add/${row.id}`}>
                                                <Button variant={"contained"}>Rent</Button>
                                            </Link>
                                        </TableCell>
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

export default CarList;