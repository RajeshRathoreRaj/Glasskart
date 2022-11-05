import React ,{useState,useEffect} from 'react'
import {TextField,Grid,InputLabel,MenuItem,Select,FormControl,Button,Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { APIKEY,getData, postDataAndImage} from "../FetchNodeServices";
import Swal from 'sweetalert2';
import Geocode from "react-geocode";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isEmpty,errorMessage,isDigits,isAlphabets,isEmail,isMobile} from '../Checks';
import { fontSize } from '@material-ui/system';
const useStyles = makeStyles((theme) => ({
 root:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     padding:20
 },
 input: {
  display: 'none',
},
 subdiv:{
     width:600,
     height:'auto',
     background:'#f1f2f6',
     marginTop:5,
     padding:40,
     borderRadius:5
 }
}))
export default function AddMaterial(props){
  const [listStatus,setMaterialStatus]=useState([])
  const [materialName,setMaterialName]=useState("")
  const [status,setStatus]=useState("")
  const [picture,setPicture]=useState({filename:'',bytes:''})

  const handlePicture = (event) => {
    console.log(event.target.files[0])
    setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0],})
  }
  
 
  
  const handleSubmit=async()=>{
      var err=false
      if(isEmpty(materialName))
      {err=true
      
       errorMessage("Shape Name Should Not Be Empty...")
       }
       if(isEmpty(status))
      {err=true
      
       errorMessage("Please Select the Status")
       }
      
        if(isEmpty(picture.filename))
      {err=true
    
       errorMessage("Select Store Image")
       }
      if(!err)
      {
    
      var formData=new FormData();
      formData.append("materialname",materialName);
      formData.append("status",status);
      formData.append("picture",picture.bytes);
      var config = {headers: { "content-type": "multipart/form-data"} };
      var result= await postDataAndImage('material/insertmaterial',formData,config);
      alert(result)
      if (result)
      {
        Swal.fire({
            imageUrl: '/glasskart.png',
            imageWidth: 200,
            title: 'Congratulations',
            text: 'Record Submitted Sucessfully...',
          })
      }
      else{
        Swal.fire({
            imageUrl: '/glasskart.png',
            imageWidth:200,
            title: 'Oops...',
            text: 'Failed to Submit Record...',
          })
      }
    }
  }
  const classes = useStyles();
    return(
        <div className={classes.root}>
         <div className={classes.subdiv}>
             <div style={{width:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',padding:5}}>
                 <div style={{fontSize:20,fontWeight:'bold',letterSpacing:1,padding:5}}>
                     <span><img src='/glasskart.png' width='40'/></span>
                     <span> Add Material </span>
                     </div>
                 </div>
             <Grid container spacing={1}>
    

    <Grid item xs={6}>
     <TextField fullWidth variant='outlined' label='Material' 
     onChange={(event)=>setMaterialName(event.target.value)}/>
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
    <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event) => handlePicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button style={{background:'#01a3a4'}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </Grid>
    <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       <Avatar alt="Remy Sharp" variant="rounded" src={picture.filename} style={{width:50,height:50}}/>
    </Grid>
    <Grid item sm={12}>
      <Button style={{background:'#01a3a4'}} fullWidth variant="contained" color='primary' onClick={()=>handleSubmit()}>Add Material</Button>
    </Grid>
  </Grid>
 </div>
</div>
    )
}