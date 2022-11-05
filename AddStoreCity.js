import React, { useState, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import {APIKEY, getData, postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";
import Geocode from "react-geocode";

import { isDigits, isMobile, isEmail, isEmpty, errorMessage } from "../Checks";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subdiv: {
    width: 600,
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
export default function AddStoreCity(props) {
  const [listStates, setListState] = useState([]);
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

  const handlePicture = (event) => {
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const fetchAllStates = async () => {
    var list = await getData("stores/fetchallstates");
    setListState(list.data);
  };
  const getLatLng = () => {
    var address=storeName+","+addressOne+","+city+","+state
    alert(address)
    Geocode.setApiKey(APIKEY);
    Geocode.setLanguage("en");

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        alert(lat+","+lng)
       setLatitude(lat)
       setLongitude(lng)
        
       
      },
      (error) => {
        console.error(error);
        alert(error)
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

  const handleSubmit = async () => {
    getLatLng("Numeric Infosystem Pvt Ltd")
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
      var formData = new FormData();
      formData.append("state", state);
      formData.append("city", city);
      formData.append("storename", storeName);
      formData.append("addressone", addressOne);
      formData.append("addresstwo", addressTwo);
      formData.append("landmark", landmark);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("contactno", contactNo);
      formData.append("emailaddress", emailAddress);
      formData.append("picture", picture.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "stores/insertstore",
        formData,
        config
      );
      if (result) {
        Swal.fire({
          imageUrl: "/glasskart.png",
          imageWidth: 200,
          title: "GlassKart.com",
          text: "Record Submitted Sucessfully...",
        });
      } else {
        Swal.fire({
          imageUrl: "/glasskart.png",
          imageWidth: 200,
          title: "GlassKart.com",
          text: "Fail to submit record...",
        });
      }
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 5,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 1,
              padding: 5,
            }}
          >
            <span>
              <img src="/glasskart.png" width="40" />
            </span>{" "}
            <span>Add Stores</span>
          </div>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-id">Select State</InputLabel>
              <Select
                labelId="state-id"
                id="stateid"
                //value={age}
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
              onChange={(event) => setCity(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Store Name"
              onChange={(event) => setStoreName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address One"
              onChange={(event) => setAddressOne(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address Two"
              onChange={(event) => setAddressTwo(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Landmark"
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
               style={{background:'#4cd137',color:'#FFF',fontSize:16,padding:12
              }}
              onClick={() =>getLatLng() }
            >Get Location</Button>
          </Grid>

          
          
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Number"
              onChange={(event) => setContactNo(event.target.value)}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
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
            }}
          >
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
                Upload
              </Button>
            </label>
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
              Submit Store
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
