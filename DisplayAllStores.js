import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import {
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Button,
} from "@material-ui/core";

import {
  APIKEY,
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeServices";
import Swal from "sweetalert2";
import Geocode from "react-geocode";

import { isDigits, isMobile, isEmail, isEmpty, errorMessage } from "../Checks";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddStoreCity from "./AddStoreCity";
import { grey, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subdiv: {
    width: 950,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },

  droot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dsubdiv: {
    width: 800,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },

  input: {
    display: "none",
  },
}));
export default function DisplayAllStore(props) {
  var classes = useStyles();
  var [storeList, setStoreList] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [listStates, setListState] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [storeName, setStoreName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [picture, setPicture] = useState({ filename: "", bytes: "" });
  const [oldPicture, setOldPicture] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const handlePicture = (event) => {
    setOldPicture(picture.filename);
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const fetchAllStates = async () => {
    var list = await getData("stores/fetchallstates");
    setListState(list.data);
  };
  const getLatLng = () => {
    var address = storeName + "," + addressOne + "," + city + "," + state;

    Geocode.setApiKey(APIKEY);
    Geocode.setLanguage("en");

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        setLatitude(lat);
        setLongitude(lng);
      },
      (error) => {
        console.error(error);
        alert(error);
      }
    );
  };

  useEffect(function () {
    fetchAllStates();
  }, []);

  const fillState = () => {
    return listStates.map((item) => {
      return <MenuItem value={item.statename}>{item.statename}</MenuItem>;
    });
  };
  const handleCancelPicture = async () => {
    setPicture({ filename: oldPicture, bytes: "" });
    setBtnStatus(false);
  };

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("storeid", storeId);
    formData.append("picture", picture.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "stores/editstorepicture",
      formData,
      config
    );
    if (result) {
      Swal.fire({
        imageUrl: "/glasskart.png",
        imageWidth: 200,
        title: "GlassKart.com",
        text: "Picture Updated Sucessfully...",
      });
    } else {
      Swal.fire({
        imageUrl: "/glasskart.png",
        imageWidth: 200,
        title: "GlassKart.com",
        text: "Fail to edit picture...",
      });
    }
    setOpen(false);
    setBtnStatus(false);
    fetchAllStores();
  };

  const handleSubmit = async () => {
    getLatLng("Numeric Infosystem Pvt Ltd");
    var err = false;
    if (isEmpty(state)) {
      err = true;

      errorMessage("State should not be blank");
    }
    if (isEmpty(city)) {
      err = true;

      errorMessage("City should not be blank");
    }
    if (isEmpty(storeName)) {
      err = true;

      errorMessage("Store Name should not be blank");
    }
    if (isEmpty(addressOne)) {
      err = true;

      errorMessage(" Address One should not be blank");
    }

    if (isEmpty(latitude)) {
      err = true;

      errorMessage("Latitude should not be blank");
    }
    if (!isDigits(latitude)) {
      err = true;

      errorMessage("Latitude must be decimal value");
    }
    if (isEmpty(longitude)) {
      err = true;

      errorMessage("Longitude should not be blank");
    }
    if (!isDigits(longitude)) {
      err = true;

      errorMessage("Longitude must be decimal value");
    }

    if (isEmpty(contactNo)) {
      err = true;

      errorMessage("Contact Number should not be blank");
    }
    if (!isMobile(contactNo)) {
      err = true;

      errorMessage("Invalid Mobile Number");
    }

    if (isEmpty(emailAddress)) {
      err = true;

      errorMessage("Email Address should not be blank");
    }
    if (!isEmail(emailAddress)) {
      err = true;

      errorMessage("Invalid Email Address");
    }

    if (isEmpty(picture.filename)) {
      err = true;

      errorMessage("Select Store Image..");
    }

    if (!err) {
      var body = {
        storeid: storeId,
        state: state,
        city: city,
        storename: storeName,
        addressone: addressOne,
        addresstwo: addressTwo,
        landmark: landmark,
        latitude: latitude,
        longitude: longitude,
        contactno: contactNo,
        emailaddress: emailAddress,
      };

      var result = await postData("stores/updatestoredata", body);
      if (result) {
        Swal.fire({
          imageUrl: "/glasskart.png",
          imageWidth: 200,
          title: "GlassKart.com",
          text: "Record Updated Sucessfully...",
        });
      } else {
        Swal.fire({
          imageUrl: "/glasskart.png",
          imageWidth: 200,
          title: "GlassKart.com",
          text: "Fail to updated record...",
        });
      }
      setOpen(false);
    }
    fetchAllStores();
  };
  const handleDeleteStore = async (data) => {
    var body = { storeid: data.storeid };
    Swal.fire({
      imageUrl: "/glasskart.png",
      imageWidth: 200,
      title: "GlassKart.com",
      text: "Are u Sure to Delete Selected Record...",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var result = await postData("stores/deletestore", body);
        if (result)
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
        else
          Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });

    fetchAllStores();
  };

  const handleClickOpen = (data) => {
    setStoreId(data.storeid);
    setState(data.storestate);
    setCity(data.storecity);
    setStoreName(data.storename);
    setAddressOne(data.addressone);
    setAddressTwo(data.addresstwo);
    setLandmark(data.landmark);
    setLatitude(data.lat);
    setLongitude(data.lng);
    setContactNo(data.contactnumber);
    setEmailAddress(data.emailaddress);
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const storeDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <div
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 1,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  padding: 1,
                }}
              >
                <span>
                  <img src="/glasskart.png" width="40" />
                </span>{" "}
                <span>Edit Store</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="state-id">Select State</InputLabel>
                      <Select
                        labelId="state-id"
                        id="stateid"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        label="Select State"
                      >
                        {fillState()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="City"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Store Name"
                      value={storeName}
                      onChange={(event) => setStoreName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Address One"
                      value={addressOne}
                      onChange={(event) => setAddressOne(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Address Two"
                      value={addressTwo}
                      onChange={(event) => setAddressTwo(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Landmark"
                      value={landmark}
                      onChange={(event) => setLandmark(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={latitude}
                      label="Latitude"
                      onChange={(event) => setLatitude(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      value={longitude}
                      variant="outlined"
                      label="Longitude"
                      onChange={(event) => setLongitude(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        background: "#4cd137",
                        color: "#FFF",
                        fontSize: 16,
                        padding: 12,
                      }}
                      onClick={() => getLatLng()}
                    >
                      Get Location
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Contact Number"
                      value={contactNo}
                      onChange={(event) => setContactNo(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email Address"
                      value={emailAddress}
                      onChange={(event) => setEmailAddress(event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {!btnStatus ? (
                      <>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(event) => handlePicture(event)}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            style={{ background: "#22a6b3" }}
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Edit Picture
                          </Button>
                        </label>
                      </>
                    ) : (
                      <></>
                    )}

                    {btnStatus ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Button onClick={() => handleSavePicture()}>
                          Save
                        </Button>
                        <Button onClick={() => handleCancelPicture()}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      variant="rounded"
                      src={picture.filename}
                      style={{ width: 50, height: 50 }}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <Button
                      style={{ background: "#22a6b3" }}
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit()}
                    >
                      Edit Store
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const fetchAllStores = async () => {
    var list = await getData("stores/fetchallstores");
    setStoreList(list.data);
  };
  useEffect(function () {
    fetchAllStores();
  }, []);
  function SimpleAction() {
    return (
      <MaterialTable

     
      title={  <><span>
        <img alt="" src="/glasskart.png" width="40" />
      </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY STORE  </b> &nbsp; <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={()=>props.setComponent(<AddStoreCity/>)}
      >
       Add StoreCity
      </Button></>}
        columns={[
          { title: "Id", field: "storeid" },

          {
            title: "Store Name",
            render: (rowData) => (
              <div>
                <b>{rowData.storename}</b>
                <br />
                {rowData.addressone},{rowData.addresstwo}
              </div>
            ),
          },
          {
            title: "City",
            render: (rowData) => (
              <div>
                {rowData.storestate},{rowData.storecity}
              </div>
            ),
          },
          {
            title: "Contact",
            render: (rowData) => (
              <div>
                {rowData.emailaddress}
                <br />
                {rowData.contactnumber}
              </div>
            ),
          },
          {
            title: "Location",
            render: (rowData) => (
              <div>
                <a
                  href={`http://maps.google.com/maps?q=${rowData.lat},${rowData.lng}`}
                >
                  Show
                </a>
              </div>
            ),
          },
          {
            title: "Picture",
            render: (rowData) => (
              <img
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.picture}`}
              />
            ),
          },
        ]}
        data={storeList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Store",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Store",
            onClick: (event, rowData) => handleDeleteStore(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>{SimpleAction()}</div>
      {storeDialog()}
    </div>
  );
}
