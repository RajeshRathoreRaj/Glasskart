import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import AddFrameTypes from './AddFrameTypes'
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
  
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeServices";
import Swal from "sweetalert2";
import Geocode from "react-geocode";

import { isEmpty, errorMessage } from "../Checks";

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
    width: 1200,
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
export default function DisplayAllFrames(props) {
  const classes = useStyles();
  const [frameid,setFrameid]=useState();
  const [frameList,setFrameList] = useState([]);
  const [frameName,setFrameName] = useState("")
  const [open, setOpen] = React.useState(false);
  const [status,setStatus] = useState("")
  const [adPicture, setAdPicture] = useState({ filename: "", bytes: "" });
  const [oldPicture, setOldPicture] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(function(){
    fetchAllFrames()
  },[])


const fetchAllFrames = async()=>{
    var list = await getData('frametypes/fetchallframes')

    setFrameList(list.data)

  }


  const handleCancelPicture=async ()=>{
    setAdPicture({filename:oldPicture,bytes:""})
    setBtnStatus(false)
    }


    const handleSavePicture=async ()=>{
        var formData = new FormData();
        formData.append("frameid",frameid)
        formData.append("adpicture",adPicture.bytes)
        formData.append("frameName",frameName)
        var config = { headers: { "content-type": "multipart/form-data" } };
          var result = await postDataAndImage("frametypes/editadpicture", formData, config);
          if(result)
          {
            Swal.fire({
              title: 'GlassKart.com',
              text: 'Your Picture has been updated successfully...',
              imageUrl: '/glasskart.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
          }
          else
        {
          Swal.fire({
            title: 'GlassKart.com',
            text: 'Error in updating the picture...',
            imageUrl: '/glasskart.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        setOpen(false);
        setBtnStatus(false);
        fetchAllFrames();
      }
      
      const handleAdPicture = (event)=>{
        setOldPicture(adPicture.filename)
        setAdPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]
        })
        setBtnStatus(true);
      }
      
      const handleSubmit = async () =>{

      var err = false;
      if(isEmpty(frameName)){
        err = true;
        errorMessage("Frame Name should not be empty");
        
      }
      if(isEmpty(status)){
        err = true;
        errorMessage("Status should not be empty"); 
      }
      if(isEmpty(adPicture.filename)){
        err = true;
        errorMessage("Please Add Frame Picture..."); 
      }
     
        if(!err){
          var body = {"framename":frameName,"status":status,"frameid":frameid}
            var result = await postData("frametypes/updateframe",body);
            if(result)
          {
            Swal.fire({
              title: 'GlassKart.com',
              text: 'Your Record has been updated successfully...',
              imageUrl: '/glasskart.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
          }
          else
        {
          Swal.fire({
            title: 'GlassKart.com',
            text: 'Error in updating the record...',
            imageUrl: '/glasskart.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        setOpen(false);
      }
      fetchAllFrames();
      }  
      
      
      const handleDeleteFrame = async (data) => {
        var body = { frameid: data.frameid };
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
             result = await postData("frametypes/deleteframe", body);
            if (result){
              Swal.fire("Deleted!", "Your record has been deleted.", "success");
              fetchAllFrames();}
            else
              Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
      
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "Your Record is safe :)", "error");
          }
        });
        fetchAllFrames();
      }
      
          const handleClickOpen = (data) => {
          
            setFrameName(data.framename)
            setFrameid(data.frameid)
            setStatus(data.status)
            setAdPicture({ filename: `${ServerURL}/images/${data.adpicture}`, bytes: "" })
            setOpen(true);
          };
          
          const handleClose = () => {
            setOpen(false);
            setBtnStatus(false)
          };
      
          const storeDialog=()=>{
            return (
              <div>
               
                <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title"><div
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
                      <span>Edit Frame</span>
                    </div>
                  </div></DialogTitle>
                  <DialogContent>
                  <div className={classes.droot}>
              <div className={classes.dsubdiv}>
             <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      
              <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-id">Select Status</InputLabel>
              <Select
                labelId="status-id"
                id="statusid"
                value={status}
                onChange={(event)=>setStatus(event.target.value)}
                label="Select Status"
              >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Deactivate">Deactivate</MenuItem>
              </Select>
            </FormControl>
              </Grid>
               
              <Grid item xs={6}>
                <TextField variant="outlined" value={frameName} fullWidth label="Frame Name"
                onChange={(event)=>setFrameName(event.target.value)}
                />
              </Grid>
                
              <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
              {!btnStatus?<>
              <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event)=>handleAdPicture(event)}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" style={{background:"#22a6b3"}} component="span">
                Edit Picture
              </Button>
            </label></>:<></>}
            {btnStatus?<>
            <Button onClick={()=>handleSavePicture()}>Save</Button>
            <Button onClick={()=>handleCancelPicture()}>Cancel</Button></>:<></>}
              </Grid>
      
              <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
              <Avatar alt="" src={adPicture.filename} variant="rounded" className={classes.large} />
              </Grid>
      
               <Grid item md={12}>
            <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Edit Frame</Button>
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
        
          }
function SimpleAction() {
  
return (
  <MaterialTable
  title={  <><span>
    <img alt="" src="/glasskart.png" width="40" />
  </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY FRAME  </b> &nbsp;  <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={<AddIcon/>}
      onClick={()=>props.setComponent(<AddFrameTypes/>)}
    >
     Add Frames
    </Button></>}
    columns={[
      { title: 'Id', field: 'frameid' },
      { title: 'Frame Name',
      render: rowData =><div><b>{rowData.framename}</b></div>},
      { title: 'Status', 
       render: rowData =><div>{rowData.status}</div>},
       {
        title: "Picture",
        render: (rowData) => (
          <img
            alt={rowData.adpicture}
            style={{ width: 50, height: 50, borderRadius: 10 }}
            src={`${ServerURL}/images/${rowData.adpicture}`}
          />
        ),
      },
    ]}
    data={frameList}        
    actions={[
      {
        icon: 'edit',
        tooltip: 'Edit Frame',
        onClick: (event, rowData) => handleClickOpen(rowData)
      },
      {
        icon: 'delete',
        tooltip: 'Delete Frame',
        onClick: (event, rowData) => handleDeleteFrame(rowData)
      }
    ]}
  />
)
}

return(

<div className={classes.root}>
<div className={classes.subdiv}>
    {SimpleAction()}
    </div>
    {storeDialog()}
    </div>
)

}