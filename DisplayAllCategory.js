import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";

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
export default function DisplayAllCategory() {
  var classes = useStyles();
  var [categoryList, setCategoryList] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [listcategory, setListCategory] = useState([]);
  const [categoryid, setCategoryId] = useState("");


  const [categoryname, setCategoryName] = useState("");
  const [icon, setIcon] = useState({ filename: "", bytes: "" });
  const [oldPicture, setOldPicture] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  const handlePicture = (event) => {
    setOldPicture(icon.filename);
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

 /* const fetchAllColors = async () => {
    var list = await getData("color/fetchcolor");
    setListColor(list.data);
  };
 
  useEffect(function () {
    fetchAllColors();
  }, []);
*/
  /*const fillState = () => {
    return listStates.map((item) => {
      return <MenuItem value={item.statename}>{item.statename}</MenuItem>;
    })
  };*/
  const handleCancelPicture = async () => {
    setIcon({ filename: oldPicture, bytes: "" });
    setBtnStatus(false);
  };


  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryid);
    formData.append("categoryname", categoryname);
    formData.append("icon", icon.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "category/editcategoryicon",
      formData,
      config
    );
    if (result) {
      Swal.fire({
        imageUrl: "/glasskart.png",
        imageWidth: 200,
        title: "GlassKart.com",
        text: "Icon Updated Sucessfully...",
      });
    } else {
      Swal.fire({
        imageUrl: "/glasskart.png",
        imageWidth: 200,
        title: "GlassKart.com",
        text: "Fail to edit category icon...",
      });
    }
    setOpen(false);
    setBtnStatus(false);
   // fetchAllColors();
  };

  const handleSubmit = async () => {
   // getLatLng("Numeric Infosystem Pvt Ltd");
    var err = false;
  
    if (isEmpty(categoryname)) {
      err = true;

      errorMessage("Category Name should not be blank");
    }
  

    if (isEmpty(icon.filename)) {
      err = true;

      errorMessage("Select Category Icon..");
    }

    if (!err) {
      var body = {
        categoryid: categoryid,
      
        categoryname: categoryname,
        
      };

      var result = await postData("category/updatecategorydata", body);
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
   // fetchAllColors();
  };
  const handleDeleteColor = async (data) => {
    var body = { categoryid: data.categoryid };
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
        var result = await postData("category/deletecategory", body);
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

   // fetchAllColors();
  };

  const handleClickOpen = (data) => {
    setCategoryId(data.categoryid);
    setCategoryName(data.categoryname);
    setIcon({ filename: `${ServerURL}/images/${data.icon}`, bytes: "" });
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
                <span>Edit CategoryName</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="category-name">Select Category</InputLabel>
                      <Select
                labelId="category-name"
                id="categoryname"           
                label="Select Category"
                value={categoryname}
                onChange={(event) => setCategoryName(event.target.value)}
              >
                <MenuItem value={'Eye Glasses'}>Eye Glasses</MenuItem>
                <MenuItem value={'Sun Glasses'}>Sun Glasses</MenuItem>
               
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
                            Edit CategoryName
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
                      Edit Category
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

  const fetchAllCategory = async () => {
    var list = await getData("category/fetchcategory");
    setListCategory(list.data);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);
  function SimpleAction() {
    return (
      <MaterialTable
        title="Our Category"
        columns={[
          { title: "Id", field: "categoryid" },

          {
            title: "Category Name",
            render: (rowData) => (
              <div>
                <b>{rowData.categoryname}</b>
              
              </div>
            ),
          },

       
          {
            title: "Ad Icon",
            render: (rowData) => (
              <img
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.icon}`}
              />
            ),
          },
        ]}
        data={listcategory}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Category",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDeleteColor(rowData),
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
