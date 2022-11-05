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
export default function AddColor(props) {

  const [listCategory, setListCategory] = useState([]);
  const [categoryid, setCategoryId] = useState("");
  const [categoryname, setCategoryName] = useState("");
  const [icon, setIcon] = useState({ filename: "", bytes: "" });
 



const handlePicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const fetchCategory = async () => {
    var list = await getData("category/fetchcategory");
    setListCategory(list.data);
  };


  useEffect(function () {
    fetchCategory();
  }, []);



  const handleSubmit = async () => {
  //  getLatLng("Numeric Infosystem Pvt Ltd")
  var err = false;
    if (isEmpty(categoryname)) {
      err = true;

      errorMessage("CategoryName should not be blank");
    }
  
  
    if (isEmpty(icon.filename)) {
      err = true;

      errorMessage("Select Category Icon..");
    }

    if (!err) { 
      var formData = new FormData();
      formData.append("categoryname", categoryname);
      formData.append("icon", icon.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "category/insertcategory",
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
            <span>Add Category</span>
          </div>
        </div>
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-name">Select Category</InputLabel>
              <Select
                labelId="category-name"
                id="categoryname"
                //value={age}
               onChange={(event) => setCategoryName(event.target.value)}
                label="Select Category"
              >
                <MenuItem value={"Eye Glasses"}>Eye Glasses</MenuItem>
                <MenuItem value={"Sun Glasses"}>Sun Glassse</MenuItem>
               
              </Select>
            </FormControl>
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
              src={icon.filename}
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
              Submit 
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}