import React ,{useState,useEffect} from "react"
import { TextField,Grid,InputLabel,FormControl,Select,MenuItem,Button,Avatar} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'
import Geocode from "react-geocode";

import { isEmpty,errorMessage, isDigits, isMobile, isEmail} from "../Checks";

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    subdiv:{
          width:600,
          height:'auto',
          background:'#f1f2f6',
          marginTop:10,
          padding:10,
          borderRadius:5,
  },
input: {
  display: 'none',
},
large: {
  width: theme.spacing(7),
  height: theme.spacing(7),
},

}))
export default function AddShapes(props)
{
 
  const [shapeName,setShapeName]=useState("");
  const [status,setStatus]=useState("");
  const [adPicture,setAdPicture]=useState({filename:"",bytes:""});

  

  const handlePicture=(event)=>{
setAdPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }

  useEffect (function()
  {
    
    
  },[])
  
const handleSubmit=async()=>{


var err=false;
if(isEmpty(shapeName)){
  err=true;
  errorMessage("Shape Name Should Not be blank..")
}
if(isEmpty(status)){
  err=true;
  errorMessage("Status Should not be blank..")
}

if(isEmpty(adPicture.filename)){
  err=true;
  
  errorMessage("Select Shape image..")
}
if(!err){
    var formData=new FormData();
   

      formData.append("shapename",shapeName)
      formData.append("status",status)
      formData.append("adpicture",adPicture.bytes);
      
      var config = { headers: { "content-type": "multipart/form-data" } };
  
   var result = await postDataAndImage('shapes/insertshapes', formData, config);
  if(result)
  {
    Swal.fire({
      imageUrl:'/eyeglass.png',
      title: 'Record Submitted Successfully...',
      width: 600,
      padding: '3em',
      
    
  })}
  else
  {
    Swal.fire({
      imageUrl:'/eyeglass.png',
      title: 'Failed to Submit Record...',
      width: 600,
      padding: '3em',
     
  })}
  
    
  }}

    const classes = useStyles();

 return(
<div className={classes.root}>
<div className={classes.subdiv}>
<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
<div style={{fontSize:20,letterSpacing:1,fontWeight:'bold',padding:5}}>
<span><img src="/eyeglass.png" width="50"/></span><span>Add shapes</span>
</div>

</div>
<Grid container spacing={2}>

<Grid item xs={12}>
<TextField variant="outlined" label="Shapes Name" fullWidth
  onChange={(event)=>setShapeName(event.target.value)}
/>
</Grid>
  <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-id">Select Status</InputLabel>
              <Select
                labelId="status-id"
                id="status"
                //value={age}
                onChange={(event)=>setStatus(event.target.value)}
                label="Select Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Deactivate">Deactivate</MenuItem>
               
              </Select>
            </FormControl>
          </Grid>


<Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center" }}>
<input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
<label htmlFor="contained-button-file"> 
        <Button style={{background:"#22a6b3"}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>

</Grid>
<Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center" }}>
<Avatar alt="Remy Sharp" variant="rounded" src={adPicture.filename} style={{width:50, height:50}} />
</Grid>
<Grid item sm={12}>
<Button fullWidth style={{background:"#22a6b3"}} variant="contained" color="primary"
onClick={()=>handleSubmit()}
>Submit Shapes</Button>

</Grid>

</Grid>

</div>

</div>


 )


}