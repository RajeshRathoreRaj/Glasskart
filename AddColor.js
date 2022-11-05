import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import { postDataAndImage } from "../FetchNodeServices";
import { isEmpty,errorMessage } from "../Checks";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding:20
    },
    subdiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      height: 'auto',
      marginTop:10,
      background:'inherit',
      padding:15,
      borderRadius:5,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      display: 'none',
    },
  }));

  export default function AddColor(props) {
    const [colorName,setColorName] = useState("")
    const [status,setStatus] = useState("")
    const [adPicture,setAdPicture] = useState({filename:"",bytes:""})

    const classes = useStyles();

    const handlePicture = (event)=>{
        setAdPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]
        })
      }

      const handleSubmit = async () =>{
      var err = false;
      if(isEmpty(colorName)){
        err = true;
        errorMessage("Color Name should not be empty");
        
      }
      if(isEmpty(status)){
        err = true;
        errorMessage("Status should not be empty"); 
      }
      if(isEmpty(adPicture.filename)){
        err = true;
        errorMessage("Please Add Color Picture..."); 
      }
      if(!err){
        var formData = new FormData();
        formData.append("colorname",colorName)
        formData.append("adpicture",adPicture.bytes)
        formData.append("status",status)
        var config = { headers: { "content-type": "multipart/form-data" } };
          var result = await postDataAndImage("color/insertcolor", formData, config);
          if(result)
          {
            Swal.fire({
              title: 'GlassKart.com',
              text: 'Your Record has been submitted successfully...',
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
            text: 'Error in submitting the record...',
            imageUrl: '/glasskart.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
      }
      }  
    
      
      return(
        <div className={classes.root}>
        <div className={classes.subdiv}>
       <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
         <Grid item xs={12}><div
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
                <span>Add Color</span>
              </div>
            </div>
            </Grid>
         
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Color Name"
          onChange={(event)=>setColorName(event.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="status-id">Select Status</InputLabel>
        <Select
          labelId="status-id"
          id="statusid"
          onChange={(event)=>setStatus(event.target.value)}
          label="Select Status"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Deactivate">Deactivate</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" style={{background:"#22a6b3"}} component="span">
          Upload
        </Button>
      </label>
        </Grid>

        <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <Avatar alt="Remy Sharp" src={adPicture.filename} variant="rounded" className={classes.large} />
        </Grid>

         <Grid item md={12}>
      <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Submit Color</Button>
      </Grid>
       </Grid>
        </div>
      </div>
      );
 
  }