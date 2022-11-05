import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputLabel, MenuItem, Select, FormControl, Button, TextField, Avatar } from '@material-ui/core';
import { postData, postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAlphabets, isEmpty } from "../Checks";


toast.configure()

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    subdiv: {
        width: 600,
        height: 'auto',
        background: '#DCE1EB',
        marginTop: 10,
        padding: 5,
        borderRadius: 10
    },
    input: {
        display: 'none',
    },

}));

export default function AddMainPage(props) {

    const [adStatus, setAdStatus] = useState("");
    const [position, setPosition] = useState("");
    const [picture, setPicture] = useState({ filename: "", bytes: "" });


    const handlePicture = (event) => {
        setPicture({
            filename: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0]
        })
    }


    const handleToast = (message) => {
        return (
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            }))
    }

    const handleSubmit = async () => {
        var err = false;

        if (isEmpty(adStatus)) {
            err = true;
            { handleToast("🔥 Pls Select Ad Status") }
        }
        if (isEmpty(position)) {
            err = true;
            { handleToast("🔥 Position should not be blank") }
        }
        if (isAlphabets(position)) {
            err = true;
            { handleToast('Position should contain Numeric values only') }
        }
        if (isEmpty(picture.bytes)) {
            err = true;
            { handleToast("🔥 Pls Upload Image") }
        }

        if (err == false) {

            var formData = new FormData();
            formData.append("adstatus", adStatus);
            formData.append("position",position)
            formData.append("picture", picture.bytes);
            var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("mainpage/insertmainpage", formData, config);
            if (result) {
                Swal.fire({
                    imageUrl: "/glaskart.png",
                    imageWidth: 300,
                    title: "Mainpage Addede Sucessfully...",
                    text: "GlassKart.com",
                });

            }
            else {
                Swal.fire({
                    imageUrl: "/glaskart.png",
                    imageWidth: 300,
                    title: "GlassKart.com",
                    text: "Record NOT Submitted ",
                });

            }
        }
    };


    const classes = useStyles();
    return (


        <div className={classes.root}>
            <div className={classes.subdiv}>
                <div className={classes.root}>
                    <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 2, padding: 5, color: '#50526E' }}>
                        <span><img src="/eyeglass.png" width="30" /></span> <span>Main Page Data</span>
                    </div>
                </div>
                <Grid container spacing={1}>

                    <Grid item xs={12} style={{ padding: 10 }}>
                        <TextField fullWidth variant="outlined" label="Position"
                            onChange={(event) => setPosition(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 10 }}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="state-id">Select Ad Status</InputLabel>
                            <Select labelId="state-id" id="state-id" label="1234567810123" style={{ borderColor: '#50526E' }}
                                onChange={(event) => setAdStatus(event.target.value)}>

                                <MenuItem value="Activate">Activate</MenuItem>
                                <MenuItem value="Deactivate">Deactivate</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file"
                            onChange={(event) => handlePicture(event)} />
                        <label htmlFor="contained-button-file">
                            <Button style={{ background: '#50526E', color: '#ffffff', textTransform: 'capitalize' }} variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src={picture.filename} variant="rounded" style={{ width: 100, height: 100, backgroundColor: '#50526E', border: '5px solid #50526E' }} />
                    </Grid>

                    <Grid xs={12} style={{ padding: 10 }}>
                        <Button variant="contained" fullWidth style={{ backgroundColor: '#50526E', color: '#ffffff', textTransform: 'capitalize' }}
                            onClick={() => handleSubmit()}
                        >Add Data</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}