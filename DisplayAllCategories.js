import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid,Avatar } from '@material-ui/core'
import Swal from 'sweetalert'
import { isEmpty,errorMessage } from "../Checks";
import SaveIcon from '@material-ui/icons/Save';
import AddCategories from './AddCategories'
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

  export default function DisplayAllCategories(props){
    const classes = useStyles();
    const [categoryList,setCategoryList] = useState([]);
    const [categoryId,setCategoryId] = useState("");
    const [categoryName,setCategoryName] = useState("")
    const [icon,setIcon] = useState({filename:"",bytes:""})
    const [open, setOpen] = React.useState(false);
  const [btnStatus,setBtnStatus] = useState(false)
  const [oldPicture,setOldPicture] = useState("")


    useEffect(function(){
        fetchAllCategories()
      },[])
    

    const fetchAllCategories = async()=>{
        var list = await getData('categories/fetchallcategories')
    
        setCategoryList(list.data)
    
      }


      const handleCancelPicture=async ()=>{
        setIcon({filename:oldPicture,bytes:""})
        setBtnStatus(false)
        }

        const handleSavePicture=async ()=>{
            var formData = new FormData();
            formData.append("icon",icon.bytes)
            formData.append("categoryid",categoryId)
            var config = { headers: { "content-type": "multipart/form-data" } };
              var result = await postDataAndImage("categories/editicon", formData, config);
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
            fetchAllCategories();
          }
          
          const handleIcon = (event)=>{
            setOldPicture(icon.filename)
            setIcon({
              filename:URL.createObjectURL(event.target.files[0]),
              bytes:event.target.files[0]
            })
            setBtnStatus(true);
          }
          
          const handleSubmit = async () =>{

          var err = false;
          if(isEmpty(categoryName)){
            err = true;
            errorMessage("Category Name should not be empty");
            
          }
          if(isEmpty(icon.filename)){
            err = true;
            errorMessage("Please Add Category Picture..."); 
          }
          if(!err){
            var body = {"categoryname":categoryName,"categoryid":categoryId}
              var result = await postDataAndImage("categories/updatecategories",body);
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
          fetchAllCategories();
          }  
          
          
          const handleDeleteCategory = async (data) => {
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
                 result = await postDataAndImage("categories/deletecategories", body);
                if (result){
                  Swal.fire("Deleted!", "Your record has been deleted.", "success");
                  fetchAllCategories();}
                else
                  Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
          
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your Record is safe :)", "error");
              }
            });
            fetchAllCategories();
          }
          
              const handleClickOpen = (data) => {
                setCategoryId(data.categoryid)
                setCategoryName(data.categoryname)
                setIcon({ filename: `${ServerURL}/images/${data.icon}`, bytes: "" })
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
                          <span>Edit Category</span>
                        </div>
                      </div></DialogTitle>
                      <DialogContent>
                      <div className={classes.droot}>
                  <div className={classes.dsubdiv}>
                 <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                   
                  <Grid item xs={12}>
                    <TextField variant="outlined" value={categoryName} fullWidth label="Category Name"
                    onChange={(event)=>setCategoryName(event.target.value)}
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
                  onChange={(event)=>handleIcon(event)}
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
                  <Avatar alt="" src={icon.filename} variant="rounded" className={classes.large} />
                  </Grid>
          
                   <Grid item md={12}>
                <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Edit Category</Button>
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
      </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY CATEGORY  </b> &nbsp;  <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={()=>props.setComponent(<AddCategories/>)}
      >
       Add Category
      </Button></>}
        columns={[
          { title: 'Id', field: 'categoryid' },
          { title: 'Category Name',
          render: rowData =><div><b>{rowData.categoryname}</b></div>},
           {
            title: "Picture",
            render: (rowData) => (
              <img
                alt={rowData.icon}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.icon}`}
              />
            ),
          },
        ]}
        data={categoryList}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Store',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Store',
            onClick: (event, rowData) => handleDeleteCategory(rowData)
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