import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
import { TextField,Grid,Button,FormControl,InputLabel,OutlinedInput,
IconButton, } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";
import { postData } from "../FetchNodeServices";
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import Divider from '@material-ui/core/Divider';
import Header from "./Header";
import Footer from "./Footer";
const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    subdiv:{
          width:'300',
          height:'auto',
          background:'#f1f2f6',
          marginTop:10,
        
          borderRadius:5,
  }

}))

const handleChange = (props) => (event) => {
    //setValues({ ...values, [props]: event.target.value });
  };
const handleClickShowPassword = () => {
  //  setValues({
    //  ...values,
    //  showPassword: !values.showPassword,
  //  });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
export default function SignUp(props)
{  
    const [values,setValues] = useState({

        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      const [otp,setOtp]=useState('')
   const [emailid,setEmailId]=useState('')
   const [mobileno,setMobileno]=useState(props.location.state.mobileno)
   const [firstName,setFirstName]=useState('')
   const [lastName,setLastName]=useState('')
   const [cpassword,setCpassword]=useState('')
   const [password,setPassword]=useState('')
    const classes = useStyles();

    const handleSubmit=async()=>{
      if(password==cpassword)
      {
        if(otp==props.location.state.otp)
        {
        var body={emailid:emailid,mobileno:mobileno,username:firstName+" "+lastName,password:password}
         var result= await postData('userdetails/insertuser',body)
         alert(result.result)
        }
        else
        {
      
          alert("!!!!! Incorrect Otp !!!!!")  
        }
      }
      else
      {
        alert("!!!!! Password Not Match With Confirm Password !!!!!")
      
      }
      
      }
      


return(
  <div>
    <Header history={props.history} />
    
  
<div className={classes.root}>
<div className={classes.subdiv}>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
    <div><img src="/login4.jpg" width='800' height='580' style={{borderRadius:20}}/></div>
    <div style={{border:'1px solid #000',borderRadius:5,width:350,height:'auto',padding:20,margin:10}}>

<div style={{display:'flex'}}>
    
    <div style={{width:500,fontSize:30}}><b>Sign Up</b>
    <div style={{fontSize:14,color:"#95a5a6"}}><b>Please enter your details.</b></div>
    </div>
    
    <div style={{}}><PersonAddRoundedIcon style={{fontSize:50}}/></div>
    </div>
<Divider style={{marginTop:20}}/>
<div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
<Grid container spacing={2}>
        <Grid item sm={6}>
        
        <TextField onChange={(event)=>setFirstName(event.target.value)}  variant="outlined" label="Your First Name" fullWidth>
        </TextField>
        
        </Grid>
        <Grid item sm={6}>
        
        <TextField  onChange={(event)=>setLastName(event.target.value)} variant="outlined" label="Your Last Name" fullWidth>
        </TextField>
        
        </Grid>
        <Grid item xs={12}>
        
        <TextField onChange={(event)=>setEmailId(event.target.value)} variant="outlined" label="Your Email-Id" fullWidth>
        </TextField>
        
        </Grid>
        <Grid item xs={6} >
        <TextField
              variant="outlined"
              onChange={(event)=>setPassword(event.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              
            />
          
        </Grid>
        <Grid item xs={6} >
        <TextField
              variant="outlined"
              onChange={(event)=>setCpassword(event.target.value)}
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              
            />
        
        </Grid>
        
</Grid>

</div>
<div style={{fontSize:11,marginTop:12}}>Use 8 or more characters with a mix of letters & numbers</div>
<div style={{fontSize:20,marginTop:9}}><b>Verify</b>

</div>
<div style={{display:'flex',flexDirection:'row'}}>

<div style={{fontSize:11}}>We have sent 4 digit OTP on</div>
<div style={{fontSize:11,fontColor:'black'}}><b>+91 {props.location.state.mobileno}</b></div>
<div 
onClick={()=>props.history.push({pathname:'/login'})}
style={{fontSize:11,color:'red',textAlign:'right',marginLeft:80,cursor:'pointer'}}>Change</div>

</div>
<div style={{marginTop:10}}>
<TextField onChange={(event)=>setOtp(event.target.value)} variant="outlined" label="Enter Your OTP" fullWidth>
        </TextField>
        </div>
        <div 
        onClick={()=>props.history.push({pathname:'/login'})}
         style={{fontSize:11,color:'red',textAlign:'right',marginLeft:80,cursor:'pointer'}}>Resend PTP</div>
        <div style={{marginTop:20}}>

        <Button onClick={()=>handleSubmit()}
fullWidth style={{background:"#50526e",color:'#fff'}} variant="contained" color="primary" endIcon={<SendIcon />}>Send</Button>

</div>
&nbsp;
     <div style={{textAlign:'center', fontSize:13}}>
     By continuing you agree to our <font color='red'>Terms of service</font>
     <br/>
     and
     <font color='red'>Privacy & Legal Policy.</font>
     </div>   
</div>

    
</div> 
</div>
</div>
<Footer history={props.history} />
    </div>
)}
