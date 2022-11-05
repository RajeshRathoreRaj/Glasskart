import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import AddMaterial from './AddMaterial'
import AddIcon from '@material-ui/icons/Add';

import {
  getData,
  ServerURL,
  APIKEY,
  postDataAndImage,
  postData,
} from "../FetchNodeServices";
import {
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  Avatar,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Geocode from "react-geocode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isEmpty,
  errorMessage,
  isDigits,
  isAlphabets,
  isEmail,
  isMobile,
} from "../Checks";
import { fontSize } from "@material-ui/system";
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
    padding: 20,
  },
  subdiv: {
    width: 1200,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 40,
    borderRadius: 5,
  },
  droot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dsubdiv: {
    width: 950,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 40,
    borderRadius: 5,
  },
  input: {
    display: "none",
  },
}));
export default function DisplayMaterial(props) {
  var classes = useStyles();
  var [materialList, setMaterialList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [listStatus, setMaterialStatus] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [status, setStatus] = useState("");
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

  const fillStatus = () => {
    return listStatus.map((item) => {
      return <MenuItem value={item.status}>{item.status}</MenuItem>;
    });
  };

  const handleCancelPicture = async () => {
    setPicture({ filename: oldPicture, bytes: "" });
    setBtnStatus(false);
  };
  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("materialid", materialId);
    formData.append("picture", picture.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "material/editmaterial",
      formData,
      config
    );
    alert(result);
    if (result) {
      Swal.fire({
        imageUrl: "/photo.png",
        imageWidth: 200,
        title: "Congratulations",
        text: "Picture Updated Sucessfully...",
      });
    } else {
      Swal.fire({
        imageUrl: "/photo.png",
        imageWidth: 200,
        title: "Oops...",
        text: "Failed to Edit Picture...",
      });
    }
    setOpen(false);
    setBtnStatus(false);
  };
  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(materialName)) {
      err = true;

      errorMessage("Shape Name Should Not Be Empty...");
    }
    if (isEmpty(status)) {
      err = true;

      errorMessage("Please Select the Status");
    }

    if (isEmpty(picture.filename)) {
      err = true;

      errorMessage("Select Store Image");
    }
    if (!err) {
      var body = {
        materialid: materialId,
        materialname: materialName,
        status: status,
        picture: picture.bytes,
      };

      var result = await postData("material/updatematerialdata", body);
      if (result) {
        Swal.fire({
          imageUrl: "/photo.png",
          imageWidth: 200,
          title: "Congratulations",
          text: "Record Updated Sucessfully...",
        });
      } else {
        Swal.fire({
          imageUrl: "/photo.png",
          imageWidth: 200,
          title: "Oops...",
          text: "Failed to Update Record...",
        });
      }
      setOpen(false);
    }
  };
  const handleDeleteStore = async (data) => {
    var body = { materialid: data.materialid };
    Swal.fire({
      imageUrl: "/photo.png",
      imageWidth: 200,
      title: "Congratulations",
      text: "Are You Sure to Delete Selected Record....",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (results) => {
      if (results.isConfirmed) {
        var results = await postData("material/deletematerial", body);
        if (results)
          Swal.fire("Deleted!", "Your Record has been deleted.", "success");
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (results.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  const handleClickOpen = (data) => {
    setMaterialId(data.materialid);
    setMaterialName(data.materialname);
    setStatus(data.status);
    setPicture({
      filename: `${ServerURL}/images/${data.addpicture}`,
      bytes: "",
    });
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
                </span>
                <span>Edit </span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Material"
                      value={materialName}
                      onChange={(event) => setMaterialName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="status-id">Select Status</InputLabel>
                      <Select
                        labelId="status-id"
                        id="statusid"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        label="Select Status"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Deactivate">Deactivate</MenuItem>
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
                            style={{ background: "#01a3a4" }}
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
                      style={{ background: "#01a3a4" }}
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit()}
                    >
                      Edit Material
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
    var list = await getData("material/fetchallmaterial");
    setMaterialList(list.data);
  };
  useEffect(function () {
    fetchAllStores();
  }, []);
  function SimpleAction() {
    return (
      <MaterialTable
      title={  <><span>
        <img alt="" src="/glasskart.png" width="40" />
      </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY MATERIAL  </b> &nbsp;  <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={()=>props.setComponent(<AddMaterial/>)}
      >
       Add Material
      </Button> </>}
        columns={[
          { title: "Id", field: "materialid" },
          {
            title: "Material",
            render: (rowData) => (
              <div>
                <b>{rowData.materialname}</b>
              </div>
            ),
          },
          { title: "Status", render: (rowData) => <div>{rowData.status}</div> },
          {
            title: "Picture",
            render: (rowData) => (
              <img
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.addpicture}`}
              />
            ),
          },
        ]}
        data={materialList}
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
