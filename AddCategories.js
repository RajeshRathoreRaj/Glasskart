import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField, Avatar } from "@material-ui/core";
import swal from "sweetalert";
import { postDataAndImage } from "../FetchNodeServices";
import { isEmpty, errorMessage } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subdiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    height: "auto",
    marginTop: 10,
    background: "#ecf0f1",
    padding: 15,
    borderRadius: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: "none",
  },
}));

export default function AddCategories(props) {
  const [categoryName, setcategoryName] = useState("");
  const [icon, setIcon] = useState({ filename: "", bytes: "" });

  const classes = useStyles();

  const handlePicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(categoryName)) {
      err = true;
      errorMessage("category Name should not be empty");
    }
    if (isEmpty(icon.filename)) {
      err = true;
      errorMessage("Please Add category Picture...");
    }
    if (!err) {
      var formData = new FormData();
      formData.append("categoryname", categoryName);
      formData.append("icon", icon.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "categories/insertcategories",
        formData,
        config
      );
      if (result) {
        swal({
          title: "Good job!",
          text: "Successfully Submited",
          icon: "success",
          button: "OK",
        });
      } else {
        swal({
          title: "!OOPS",
          text: "Something Wrong",
          icon: "error",
          button: "OK",
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid
          container
          xs={12}
          spacing={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
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
                  <img alt="" src="/glasskart.png" width="40" />
                </span>{" "}
                <span>Add categories</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Category Name"
              onChange={(event) => setcategoryName(event.target.value)}
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
                variant="contained"
                color="primary"
                style={{ background: "#22a6b3" }}
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
              src={icon.filename}
              variant="rounded"
              className={classes.large}
            />
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#22a6b3" }}
              fullWidth
              onClick={() => handleSubmit()}
            >
              Submit category
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
