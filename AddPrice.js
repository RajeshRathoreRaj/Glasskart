import React, {useState} from "react"
import {TextField,Grid,InputLabel,FormControl, Select,Button,Avatar} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { postData} from "../FetchNodeServices";
import Swal from 'sweetalert2'
import {isEmpty,isDigits,errorMessage } from "../Checks";


const useStyles = makeStyles((theme) => ({
    root:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    },
    
    subdiv:{
     width:600,
     height:'auto',
     background:"#ecf0f1",
     marginTop:5,
     padding:15,
     borderRadius:5,
    },

    input: {
        display: 'none',
      },
}))


export default function AddPrice(props){

    
    const [minPrice,setMinPrice]=useState("")
    const [maxPrice,setMaxPrice]=useState("")
    

   
  const handleSubmit=async()=>{

    var err=false
    if(isEmpty(minPrice))
    {err=true
    errorMessage('Minimum Price should not be blank')}
    
    if(!isDigits(minPrice))
    {err=true
    errorMessage('Minimum Price must be digit value')}

    if(isEmpty(maxPrice))
    {err=true
    errorMessage('Maximum Price should not be blank')}
    

    if(!isDigits(maxPrice))
    {err=true
     errorMessage('Maximum Price must be digit value')}

     if(!err)
      {
        var body={"minprice":minPrice,"maxprice":maxPrice}
        var result = await postData("price/insertprice",body)
        if(result)
        {
          Swal.fire({
          imageUrl: '/glasskart.png',
          imageWidth:200,
          title: 'GlassKart.com',
          text: 'Record submit sucessfully....',
          })
        }
        else
        {
          Swal.fire({
          imageUrl: '/glasskart.png',
          imageWidth:200,
          title: 'GlassKart.com',
          text: 'Fail to submit record....', 
          })
        }    
      } 
    }
 

const classes = useStyles();
  return(
  <div className={classes.root}>
   <div className={classes.subdiv}>
     <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:5}}>
       <div style={{fontSize:20,fontWeight:"bold",letterSpacing:1,padding:5}}>
         <span><img src='/glasskart.png' width='40'/></span>
         <span> Add Price </span>
       </div>
      </div>
     <Grid container spacing={1}>


        <Grid item xs={6}>
         <TextField fullWidth variant="outlined" label="Minimum Price" 
         onChange={(event)=>setMinPrice(event.target.value)}></TextField>
        </Grid>

        <Grid item xs={6}>
         <TextField fullWidth variant="outlined" label="Maximum Price" 
         onChange={(event)=>setMaxPrice(event.target.value)}></TextField>
        </Grid>

        <Grid item sm={12} >
         <Button
          style={{background:'#22a6b3'}} 
          fullWidth variant="contained" 
          color="primary"
          onClick={()=>handleSubmit()}
          >
            Submit 
          </Button>
        </Grid>
  
     </Grid>
      </div>
      </div>
      )
      }