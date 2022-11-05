import React, { useState} from "react";
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
import { postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";


import {  isEmpty, errorMessage } from "../Checks";
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
export default function AddFrameTypes(props) {
//   const [frameid,setFrameId]=useState();
  const [framename, setFrameName] = useState("");
  const [adpicture, setAdPicture] = useState({filename: "", bytes: "" });
  const [status, setStatus] = useState("");

  const handlePicture = (event) => {
    setAdPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

 

//   useEffect(function () {
//     fetchAllStates();
//   }, []);

//   const fillState = () => {
//     return listStates.map((item) => {
//       return <MenuItem value={item.statename}>{item.statename}</MenuItem>;
//     });
//   };

  const handleSubmit = async () => {
    
    var err = false;
    // if (isEmpty(frameid)) {
    //   err = true;

    //   errorMessage("frame id should not be blank");
    // }
    
    if (isEmpty(framename)) {
      err = true;

      errorMessage("Frame Name should not be blank");
    }
    
    
    if (isEmpty(adpicture.filename)) {
      err = true;

      errorMessage("Select Store Image..");
    }

    // if (!isEmpty(status)) {
    //     err = true;
  
    //     errorMessage("status should not be empty");
    //   }
      if(isEmpty(status)){
        err = true;
        errorMessage("select image.......")
      }

    if (!err) {
      var formData = new FormData();
    //   formData.append("frameid", frameid);
      formData.append("framename", framename);
      formData.append("status", status);
      formData.append("adpicture", adpicture.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      console.log("data........"+formData)
      var result = await postDataAndImage( 
        "frametypes/insertframes",
        formData,
        config
      );
      alert(result)
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
            <span>Add Frame Types</span>
          </div>
        </div>
        <Grid container spacing={1}>
        
        {/* <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Frame Id"
              onChange={(event) => setFrameId(event.target.value)}
            />
          </Grid> */}


        <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Frame name"
              onChange={(event) => setFrameName(event.target.value)}
            />
          </Grid>  

          <Grid>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event) => handlePicture(event)}
            />
           </Grid>


           <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-id">Select Status</InputLabel>
              <Select
                labelId="state"
                //value={age}
                onChange={(event) => setStatus(event.target.value)}
                label="Select Status"
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Deactive"}>Deactivate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
            
            
          <Grid
            item
            xs={6}
            
        style={{color: "#22a6b3", width:300 ,display:'flex',justifyContent:'center',alignItems:'center'}}
 >
          
         <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
          >
            Upload
          </Button>
          
         </label>
         </Grid>

         <Grid item xs={6} style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>    
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={adpicture.filename}
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
              Submit frame
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
