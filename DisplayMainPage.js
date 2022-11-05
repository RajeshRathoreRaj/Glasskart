import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputLabel, MenuItem, Select, FormControl, Button, TextField, Avatar } from '@material-ui/core';
import { getData, postData, ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAlphabets, isEmpty } from "../Checks";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QueueIcon from '@material-ui/icons/Queue';

import AddMainPage from './AddMainPage';
import { postDataAndImage } from '../FetchNodeServices';

toast.configure()

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    subdiv: {
        width: 1200,
        height: 'auto',
        background: '#DCE1EB',
        marginTop: 10,
        padding: 10,
        borderRadius: 10
    },

    input: {
        display: 'none',
    },

}));



export default function DisplayStatus(props) {
    const classes = useStyles();

    const [listMainPage, SetListMainPage ]= useState([]);
    const [open, setOpen] = React.useState(false);
    const [picture, setPicture] = useState({ filename: "", bytes: "" });
    const [pictureid, setPictureid] = useState("");
    const [adStatus, setAdStatus] = useState("");
    const [position, setPosition] = useState("");
    const [btnStatus, setBtnStatus] = useState(false);
    const [oldPicture, setOldPicture] = useState("");





    const handlePicture = (event) => {
        setOldPicture(picture.filename);
        setPicture({
            filename: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0]
        })
        setBtnStatus(true);
    }


    const handleCancelPicture = async () => {
        setPicture({ filename: oldPicture, bytes: "" });
        setBtnStatus(false);
    };

    const handleSavePicture = async () => {
        var formData = new FormData();
        formData.append("pictureid", pictureid);
        formData.append("picture", picture.bytes);
        var config = { headers: { "content-type": "multipart/form-data" } };
        var result = await postDataAndImage(
            "mainpage/editmainppagepicture",
            formData,
            config
        );
        if (result) {
            Swal.fire({
                imageUrl: "/glaskart.png",
                imageWidth: 200,
                title: "GlassKart.com",
                text: "Picture Updated Sucessfully...",
            });
        } else {
            Swal.fire({
                imageUrl: "/glaskart.png",
                imageWidth: 200,
                title: "GlassKart.com",
                text: "Fail to edit picture...",
            });
        }
        setOpen(false);
        setBtnStatus(false);
        fecthMainpage()

    };

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
    const handleDelete = async () => {
        var body = { pictureid: pictureid };
        Swal.fire({
            imageUrl: "/glaskart.png",
            imageWidth: 200,
            title: "GlassKart.com",
            text: "Are u Sure to Delete Selected Record...",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {

                var result = await postData("maianpage/deletemaianpage", body);
                if (result) {
                    Swal.fire("Deleted!", "Your record has been deleted.", "success");
                }
                else {
                    Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
                }
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your Record is safe 😊", "error");
            }


        });
        { handleClose() }
        fecthMainpage()
    }





    const handleUpdate = async () => {
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
            { handleToast('Position Should contain Numeric values only') }
        }
        if (isEmpty(picture.bytes)) {
            err = true;
            { handleToast("🔥 Pls Upload status Image") }
        }

        if (err == false) {

            var formData = new FormData();
            formData.append("pictureid", pictureid);
            formData.append("position", position);
            formData.append("adstatus", adStatus)
            formData.append("picture", picture.bytes);
            var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("mainpage/updatemaianpage", formData, config);
            if (result) {
                Swal.fire({
                    imageUrl: "/glaskart.png",
                    imageWidth: 300,
                    title: "Record Updated Sucessfully...",
                    text: "GlassKart.com",
                });

            }
            else {
                Swal.fire({
                    imageUrl: "/glaskart.png",
                    imageWidth: 300,
                    title: "GlassKart.com",
                    text: "Record NOT Updated ",
                });

            }
            { handleClose() }
            fecthMainpage()
        }

    };

    const handleClickOpen = (data) => {
        setPosition(data.position)
        setAdStatus(data.displaystatus)
        setPictureid(data.pictureid)
        setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: data.picture })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const storeDialog = () => {
        return (
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <div style={{ width: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 1, }}>
                            <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, padding: 1, }}>
                                <span><img src="/glaskart.png" width="40" /></span>{" "}<span>Edit Main Page</span>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.root}>
                            <div className={classes.subdiv}>
                                <Grid container spacing={1}>
                                <Grid item xs={12} style={{ padding: 10 }}>
                        <TextField fullWidth variant="outlined" label="Position"
                            onChange={(event) => setPosition(event.target.value)} value={position}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 10 }}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="state-id">Select Ad Status</InputLabel>
                            <Select labelId="state-id" id="state-id" label="1234567810123" style={{ borderColor: '#50526E' }} value={adStatus}
                                onChange={(event) => setAdStatus(event.target.value)}> 

                                <MenuItem value="Activate">Activate</MenuItem>
                                <MenuItem value="Deactivate">Deactivate</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                                        {!btnStatus ? (
                                            <> <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file"
                                                onChange={(event) => handlePicture(event)} />
                                                <label htmlFor="contained-button-file">
                                                    <Button style={{ background: '#50526E', color: '#ffffff', textTransform: 'capitalize' }} variant="contained" component="span">
                                                        Change Image
                                                    </Button>
                                                </label>
                                            </>
                                        ) : (
                                            <></>
                                        )}

                                        {btnStatus ? (
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <Button color="primary" onClick={() => handleSavePicture()} >
                                                    Save
                                                </Button>
                                                <Button color="primary" onClick={() => handleCancelPicture()}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                    </Grid>

                                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Avatar src={picture.filename} variant="rounded" style={{ width: 100, height: 100, backgroundColor: '#50526E', border: '5px solid #50526E' }} />
                                    </Grid>


                                    <Grid xs={5} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                        <Button variant="contained" fullWidth color="primary" style={{ textTransform: 'capitalize' }}
                                            onClick={() => handleUpdate()}
                                        >Update</Button>
                                    </Grid>

                                    <Grid xs={5} style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button variant="contained" fullWidth color="secondary" style={{ textTransform: 'capitalize' }}
                                            onClick={() => handleDelete()}
                                        >Delete</Button>
                                    </Grid>


                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ textTransform: 'capitalize', fontSize: 17 }} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }


    const fecthMainpage = async () => {
        var list = await getData('mainpage/fetchallmainpage')
        SetListMainPage(list.data)
    }

    useEffect(function () {
        fecthMainpage()
    }, [])

    function SimpleAction() {
        return (

            <MaterialTable
                title={<span style={{ fontSize: 25, fontWeight: "bold", letterSpacing: 2, color: '#50526E' }}>
                    <img src="/glaskart.png" width="40" />&nbsp;<b>Main Page</b>
                    <span > <Button variant="contained" color="primary" size="small"
                        onClick={() => props.setComponent(<AddMainPage />)}
                        startIcon={<QueueIcon />}>Add Main Page</Button></span> </span>}     
                        columns={[
                            { title: 'Id', field: 'pictureid' },
                            { title: 'Position', field: 'position' },
                            { title: 'Ad Status', field: 'displaystatus' },
                            { title: 'Picture', render: (rowData) => (<img style={{ width: 80, height: 80, borderRadius: 5 }} src={`${ServerURL}/images/${rowData.picture}`} />) },]}
                        data={listMainPage}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Material',
                                onClick: (event, rowData) => handleClickOpen(rowData)
                            }
                        ]}
                    />

                        )
    }


                        return (
                        <div className={classes.root}>
                            <div className={classes.subdiv}>

                                {SimpleAction()}
                            </div>
                            {storeDialog()}

                        </div>
                        );

}

