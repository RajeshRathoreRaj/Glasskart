import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData,ServerURL,postData,postDataAndImage } from "../FetchNodeServices";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import { isEmpty,errorMessage } from "../Checks";
import AddColor from './AddColor';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    dsubdiv: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background:'#ecf0f1',
      padding:1,
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

  export default function DisplayAllColors(props){
    const classes = useStyles();
    const [colorList,setColorList] = useState([]);
    const [colorId,setColorId] = useState("");
    const [colorName,setColorName] = useState("")
    const [status,setStatus] = useState("")
    const [adPicture,setAdPicture] = useState({filename:"",bytes:""})
    const [open, setOpen] = React.useState(false);
  const [btnStatus,setBtnStatus] = useState(false)
  const [oldPicture,setOldPicture] = useState("")


    useEffect(function(){
        fetchAllColors()
      },[])
    

    const fetchAllColors = async()=>{
        var list = await getData('color/fetchallcolors')
    
        setColorList(list.data)
    
      }


      const handleCancelPicture=async ()=>{
        setAdPicture({filename:oldPicture,bytes:""})
        setBtnStatus(false)
        }

        const handleSavePicture=async ()=>{
            var formData = new FormData();
            formData.append("adpicture",adPicture.bytes)
            formData.append("colorid",colorId)
            var config = { headers: { "content-type": "multipart/form-data" } };
              var result = await postDataAndImage("color/editadpicture", formData, config);
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
            fetchAllColors();
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
            var body = {"colorname":colorName,"status":status,"colorid":colorId}
              var result = await postData("color/updatecolor",body);
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
          fetchAllColors();
          }  
          
          
          const handleDeleteColor = async (data) => {
            var body = { colorid: data.colorid };
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
                 result = await postData("color/deletecolor", body);
                if (result){
                  Swal.fire("Deleted!", "Your record has been deleted.", "success");
                  fetchAllColors();}
                else
                  Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
          
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your Record is safe :)", "error");
              }
            });
            fetchAllColors();
          }
          
              const handleClickOpen = (data) => {
                setColorId(data.colorid)
                setColorName(data.colorname)
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
                          <span>Edit Color</span>
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
                    <TextField variant="outlined" value={colorName} fullWidth label="Color Name"
                    onChange={(event)=>setColorName(event.target.value)}
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
                <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Edit Color</Button>
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
      title={ <><span>
        <img alt="" src="/glasskart.png" width="40" />
      </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY COLOR </b> &nbsp;   <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={()=>props.setComponent(<AddColor/>) }>Add Color 
        </Button></>}       
         columns={[
          { title: 'Id', field: 'colorid' },
          { title: 'Color Name',
          render: rowData =><div><b>{rowData.colorname}</b></div>},
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
        data={colorList}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Store',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Store',
            onClick: (event, rowData) => handleDeleteColor(rowData)
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