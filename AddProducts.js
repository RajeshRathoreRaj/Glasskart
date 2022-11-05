import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'
import { getData,postDataAndImage } from "../FetchNodeServices";
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

export default function AddProducts(props){
  AddProducts.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  AddProducts.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]





    const [productName,setProductName] = useState("")
    const [type,setType] = useState("")
    const [categoryId,setCategoryId] = useState("")
    const [listCategories,setListCategories] = useState([])
    const [frameId,setFrameId] = useState("")
    const [status,setStatus] = useState("")
    const [adStatus,setAdStatus] = useState("")
    const [listFrames,setListFrames] = useState([])
    const [materialId,setMaterialId] = useState("")
    const [listMaterials,setListMaterials] = useState([])
    const [shapeId,setShapeId] = useState("")
    const [listShapes,setListShapes] = useState([])
    const [description,setDescription] = useState("")
    const [picture,setPicture] = useState({filename:"",bytes:""})


    const fetchAllCategories = async()=>{
        var list = await getData('product/fetchallcategories')
        setListCategories(list.data)
      }
      const fetchAllFrames = async()=>{
        var list = await getData('product/fetchallframes')
        setListFrames(list.data)
      }
      const fetchAllMaterials = async()=>{
        var list = await getData('product/fetchallmaterials')
        setListMaterials(list.data)
      }
      const fetchAllShapes = async()=>{
        var list = await getData('product/fetchallshapes')
        setListShapes(list.data)
      }
    
      useEffect(function(){
        fetchAllCategories()
      },[])
      useEffect(function(){
        fetchAllFrames()
      },[])
      useEffect(function(){
        fetchAllMaterials()
      },[])
      useEffect(function(){
        fetchAllShapes()
      },[])


      const fillCategories=()=>{
        return listCategories.map((item)=>{
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
      }
      const fillFrames=()=>{
        return listFrames.map((item)=>{
          return <MenuItem value={item.frameid}>{item.framename}</MenuItem>
        })
      }
      const fillMaterials=()=>{
        return listMaterials.map((item)=>{
          return <MenuItem value={item.materialid}>{item.materialname}</MenuItem>
        })
      }
      const fillShapes=()=>{
        return listShapes.map((item)=>{
          return <MenuItem value={item.shapeid}>{item.shapename}</MenuItem>
        })
      }

      const classes = useStyles();

      const handlePicture = (event)=>{
        setPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]
        })
      }

      const handleSubmit = async () =>{
        var err = false;
        if(isEmpty(productName)){
          err = true;
          errorMessage("Product Name should not be empty");
          
        }
        if(isEmpty(categoryId)){
          err = true;
          errorMessage("Category should not be empty"); 
        }
        if(isEmpty(type)){
          err = true;
          errorMessage("Type should not be empty"); 
        }
        if(isEmpty(frameId)){
          err = true;
          errorMessage("Frame should not be empty"); 
        }
        if(isEmpty(materialId)){
          err = true;
          errorMessage("Material should not be empty"); 
        }
        if(isEmpty(shapeId)){
          err = true;
          errorMessage("Shape should not be empty"); 
        }
      if(isEmpty(picture.filename)){
          err = true;
          errorMessage("Please Add Product Picture..."); 
        }
        if(!err){
          var formData = new FormData();
          formData.append("productname",productName)
          formData.append("type",type)
          formData.append("categoryid",categoryId)
          formData.append("frameid",frameId)
          formData.append("materialid",materialId)
          formData.append("shapeid",shapeId)
          formData.append("status",status)
          formData.append("adstatus",adStatus)
          formData.append("description",description)
          formData.append("picture",picture.bytes)
          
          var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("product/insertproduct", formData, config);
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
             <Grid item xs={12}><div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',fontSize:20,fontWeight:"bold",letterSpacing:1}}>
              <Grid item xs={2}><img src="./glasskart.png" alt="Remy Sharp" style={{width:50}}></img></Grid><Grid item xs={3}> Add Products</Grid>
             </div></Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="category-id">Select Category</InputLabel>
            <Select
              labelId="category-id"
              id="categoryid"
              //value={age}
              onChange={(event)=>setCategoryId(event.target.value)}
              label="Select Category"
            >
              {fillCategories()}
            </Select>
          </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="frame-id">Select Frames</InputLabel>
            <Select
              labelId="frame-id"
              id="frameid"
              onChange={(event)=>setFrameId(event.target.value)}
              label="Select Frame"
            >
              {fillFrames()}
            </Select>
          </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="material-id">Select Materials</InputLabel>
            <Select
              labelId="material-id"
              id="materialid"
              onChange={(event)=>setMaterialId(event.target.value)}
              label="Select Material"
            >
              {fillMaterials()}
            </Select>
          </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="shape-id">Select Shapes</InputLabel>
            <Select
              labelId="shape-id"
              id="shapeid"
              onChange={(event)=>setShapeId(event.target.value)}
              label="Select Shape"
            >
              {fillShapes()}
            </Select>
          </FormControl>
            </Grid>
             
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="type-id">Select Type</InputLabel>
            <Select
              labelId="type-id"
              id="typeid"
              onChange={(event)=>setType(event.target.value)}
              label="Select Type"
            >
             <MenuItem value="Men">Men</MenuItem>
             <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField variant="outlined" fullWidth label="Product Name"
              onChange={(event)=>setProductName(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="frame-id">Status</InputLabel>
            <Select
              labelId="frame-id"
              id="frameid"
              onChange={(event)=>setStatus(event.target.value)}
              label="Status"
            >
               <MenuItem value="New Arrival">New Arrival</MenuItem>
              <MenuItem value="Upcoming">Upcoming</MenuItem>
              <MenuItem value="Computer Glasses">Computer Glasses</MenuItem>
              <MenuItem value="Best Seller">Best Seller</MenuItem>
            </Select>
          </FormControl>
            </Grid>

            

            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="frame-id">Ad Status</InputLabel>
            <Select
              labelId="frame-id"
              id="frameid"
              onChange={(event)=>setAdStatus(event.target.value)}
              label="Ad Status"
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not available">Not available</MenuItem>
            </Select>
          </FormControl>
            </Grid>
    
    
            <Grid item xs={12}>
             
            <ReactQuill
            value={description} 
            modules={AddProducts.modules}
            formats={AddProducts.formats}
            onChange={(txt)=>setDescription(txt)} />
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
            <Avatar alt="" src={picture.filename} variant="rounded" className={classes.large} />
            </Grid>
    
             <Grid item md={12}>
          <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Submit Product</Button>
          </Grid>
           </Grid>
            </div>
          </div>
          );
        
    
}