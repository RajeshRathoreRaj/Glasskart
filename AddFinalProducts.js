import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import {postData, getData,postDataAndImage } from "../FetchNodeServices";
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

export default function AddFinalProducts(props){
     const [productId,setProductId] = useState("")
     const [productList,setProductList] = useState([]);
     const [colorId,setColorId] = useState("")
     const [colorList,setColorList] = useState([])
     const [size,setSize] = useState("")
     const [price,setPrice] = useState("")
     const [offerType,setOfferType] = useState("")
     const [offerPrice,setOfferPrice] = useState("")
     const [description,setDescription] = useState("")
     const [stock,setStock] = useState("")
     const [productPicture,setProductPicture] = useState({filename:"",bytes:""})
     const classes = useStyles();

     const fetchAllProducts = async()=>{
        var list = await getData('finalproduct/fetchallproducts')
        setProductList(list.data)
      }
      const fetchAllColors = async()=>{
        var list = await getData('finalproduct/fetchallcolors')
        setColorList(list.data)
      }

      useEffect(function(){
        fetchAllProducts()
      },[])
      useEffect(function(){
        fetchAllColors()
      },[])

      const fillProducts=()=>{
        return productList.map((item)=>{
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
      }
      const fillColors=()=>{
        return colorList.map((item)=>{
          return <MenuItem value={item.colorid}>{item.colorname}</MenuItem>
        })
      }

      const handlePicture = (event)=>{
        setProductPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]
        })
      } 

      const handleSubmit = async () =>{
       var body={productid:productId,colorid:colorId,size:size}
       var status = await postData('finalproduct/checkfinalproduct',body)
      // alert(JSON.stringify(status.result))
       if(status.result)
       {
        var err = false;
        if(isEmpty(productId)){
          err = true;
          errorMessage("Product Name should not be empty");
          
        }
        if(isEmpty(colorId)){
          err = true;
          errorMessage("Color should not be empty"); 
        }
        if(isEmpty(size)){
          err = true;
          errorMessage("Size should not be empty"); 
        }
        if(isEmpty(price)){
          err = true;
          errorMessage("Price should not be empty"); 
        }
        if(isEmpty(offerType)){
          err = true;
          errorMessage("OfferType should not be empty"); 
        }
        if(isEmpty(offerPrice)){
          err = true;
          errorMessage("Offer Price should not be empty"); 
        }
          if(isEmpty(stock)){
            err = true;
            errorMessage("Stock Value should not be empty"); 
          }
      if(isEmpty(productPicture.filename)){
          err = true;
          errorMessage("Please Add Product Picture..."); 
        }
        if(!err){
          var formData = new FormData();
          formData.append("productid",productId)
          formData.append("colorid",colorId)
          formData.append("size",size)
          formData.append("price",price)
          formData.append("offertype",offerType)
          formData.append("offerprice",offerPrice)
          formData.append("description",description)
          formData.append("stock",stock)
          formData.append("productpicture",productPicture.bytes)
          var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("finalproduct/insertfinalproduct", formData, config);
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
      else
      {
        Swal.fire({
          title: 'GlassKart.com',
          text: 'Product already exist...',
          imageUrl: '/glasskart.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
  
      }
        } 

        return(
            <div className={classes.root}>
            <div className={classes.subdiv}>
           <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
             <Grid item xs={12}><div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',fontSize:20,fontWeight:"bold",letterSpacing:1}}>
              <span><img src="./glasskart.png" alt="Remy Sharp" style={{width:50}}></img></span><span> Add Final Products</span>
             </div></Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="product-id">Select Product</InputLabel>
            <Select
              labelId="product-id"
              id="productid"
              onChange={(event)=>setProductId(event.target.value)}
              label="Select Product"
            >
              {fillProducts()}
            </Select>
          </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="color-id">Select Color</InputLabel>
            <Select
              labelId="color-id"
              id="colorid"
              onChange={(event)=>setColorId(event.target.value)}
              label="Select Color"
            >
              {fillColors()}
            </Select>
          </FormControl>
            </Grid>
             
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="size-id">Select Size</InputLabel>
            <Select
              labelId="size-id"
              id="sizeid"
              onChange={(event)=>setSize(event.target.value)}
              label="Select Size"
            >
             <MenuItem value="Small">Small</MenuItem>
             <MenuItem value="Medium">Medium</MenuItem>
             <MenuItem value="Large">Large</MenuItem>
            </Select>
          </FormControl>
            </Grid>

<Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="offer-id">Select OfferType</InputLabel>
            <Select
              labelId="offer-id"
              id="offerid"
              onChange={(event)=>setOfferType(event.target.value)}
              label="Select Offer Type"
            >
             <MenuItem value="None">None</MenuItem>
             <MenuItem value="Festival">Festival</MenuItem>
             <MenuItem value="Sale">Sale</MenuItem>
            </Select>
          </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Price"
              onChange={(event)=>setPrice(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Offer Price"
              onChange={(event)=>setOfferPrice(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Description"
              onChange={(event)=>setDescription(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Stock"
              onChange={(event)=>setStock(event.target.value)}
              />
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
            <Avatar alt="" src={productPicture.filename} variant="rounded" className={classes.large} />
            </Grid>
    
             <Grid item md={12}>
          <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Submit Final Product</Button>
          </Grid>
           </Grid>
            </div>
          </div>
          );



}