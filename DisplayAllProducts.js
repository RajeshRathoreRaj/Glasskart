import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Avatar } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Swal from "sweetalert2";
import { isEmpty, errorMessage } from "../Checks";
import SaveIcon from "@material-ui/icons/Save";
import AddProduct from "./AddProducts";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    width: 1000,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },
  droot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dsubdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ecf0f1",
    padding: 1,
    borderRadius: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: "none",
  },
}));

export default function DisplayAllProducts(props) {

  DisplayAllProducts.modules = {
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
  DisplayAllProducts.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [listCategories, setListCategories] = useState([]);
  const [frameId, setFrameId] = useState("");
  const [listFrames, setListFrames] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [listMaterials, setListMaterials] = useState([]);
  const [shapeId, setShapeId] = useState("");
  const [listShapes, setListShapes] = useState([]);
  const [description, setDescription] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const [picture, setPicture] = useState({ filename: "", bytes: "" });
  const [oldPicture, setOldPicture] = useState("");
  const [status,setStatus]=useState('')
  const [adStatus,setAdStatus]=useState('')

  const fetchAllProducts = async () => {
    var list = await getData("product/fetchallproducts");
    setProductList(list.data);
  };
  const fetchAllCategories = async () => {
    var list = await getData("product/fetchallcategories");
    setListCategories(list.data);
  };
  const fetchAllFrames = async () => {
    var list = await getData("product/fetchallframes");
    setListFrames(list.data);
  };
  const fetchAllMaterials = async () => {
    var list = await getData("product/fetchallmaterials");
    setListMaterials(list.data);
  };
  const fetchAllShapes = async () => {
    var list = await getData("product/fetchallshapes");
    setListShapes(list.data);
  };

  useEffect(function () {
    fetchAllCategories();
  }, []);
  useEffect(function () {
    fetchAllFrames();
  }, []);
  useEffect(function () {
    fetchAllMaterials();
  }, []);
  useEffect(function () {
    fetchAllShapes();
  }, []);

  const fillCategories = () => {
    return listCategories.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };
  const fillFrames = () => {
    return listFrames.map((item) => {
      return <MenuItem value={item.frameid}>{item.framename}</MenuItem>;
    });
  };
  const fillMaterials = () => {
    return listMaterials.map((item) => {
      return <MenuItem value={item.materialid}>{item.materialname}</MenuItem>;
    });
  };
  const fillShapes = () => {
    return listShapes.map((item) => {
      return <MenuItem value={item.shapeid}>{item.shapename}</MenuItem>;
    });
  };

  const handleCancelPicture = async () => {
    setPicture({ filename: oldPicture, bytes: "" });
    setBtnStatus(false);
  };

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("productid", productId);
    formData.append("picture", picture.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "product/editpicture",
      formData,
      config
    );
    if (result) {
      Swal.fire({
        title: "GlassKart.com",
        text: "Your Picture has been updated successfully...",
        imageUrl: "/glasskart.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      Swal.fire({
        title: "GlassKart.com",
        text: "Error in updating the picture...",
        imageUrl: "/glasskart.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    setOpen(false);
    setBtnStatus(false);
    fetchAllProducts();
  };

  const handlePicture = (event) => {
    setOldPicture(picture.filename);
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(productName)) {
      err = true;
      errorMessage("Product Name should not be empty");
    }
    if (isEmpty(categoryId)) {
      err = true;
      errorMessage("Category should not be empty");
    }
    if (isEmpty(type)) {
      err = true;
      errorMessage("Type should not be empty");
    }
    if (isEmpty(frameId)) {
      err = true;
      errorMessage("Frame should not be empty");
    }
    if (isEmpty(materialId)) {
      err = true;
      errorMessage("Material should not be empty");
    }
    if (isEmpty(shapeId)) {
      err = true;
      errorMessage("Shape should not be empty");
    }
    if (isEmpty(picture.filename)) {
      err = true;
      errorMessage("Please Add Product Picture...");
    }
    if (!err) {
      var body = {
        productid: productId,
        productname: productName,
        type: type,
        categoryid: categoryId,
        frameid: frameId,
        materialid: materialId,
        shapeid: shapeId,
    status:status,
    adstatus:adStatus,
        description: description,
      };
      var result = await postData("product/updateproductdata", body);
      if (result) {
        Swal.fire({
          title: "GlassKart.com",
          text: "Your Record has been updated successfully...",
          imageUrl: "/glasskart.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      } else {
        Swal.fire({
          title: "GlassKart.com",
          text: "Error in updating the record...",
          imageUrl: "/glasskart.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
      setOpen(false);
    }
    fetchAllProducts();
  };

  const handleDeleteProduct = async (data) => {
    var body = { productid: data.productid };
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
        result = await postData("product/deleteproduct", body);
        if (result) {
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
          fetchAllProducts();
        } else
          Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });
    fetchAllProducts();
  };

  const handleClickOpen = (data) => {
    setProductId(data.productid);
    setProductName(data.productname);
    setType(data.type);
    setCategoryId(data.categoryid);
    setFrameId(data.frameid);
    setMaterialId(data.materialid);
    setShapeId(data.shapeid);
    setDescription(data.description);
    setStatus(data.status)
    setAdStatus(data.adstatus)
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBtnStatus(false);
  };

  const storeDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <div
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
                <span>Edit Product</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="category-id">Select Category</InputLabel>
                      <Select
                        labelId="category-id"
                        id="categoryid"
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
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
                        value={frameId}
                        onChange={(event) => setFrameId(event.target.value)}
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
                        value={materialId}
                        onChange={(event) => setMaterialId(event.target.value)}
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
                        value={shapeId}
                        onChange={(event) => setShapeId(event.target.value)}
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
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        label="Select Type"
                      >
                        <MenuItem value="Men">Men</MenuItem>
                        <MenuItem value="Women">Women</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      value={productName}
                      fullWidth
                      label="Product Name"
                      onChange={(event) => setProductName(event.target.value)}
                    />
                  </Grid>

                    
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="frame-id">Status</InputLabel>
            <Select
              labelId="frame-id"
              id="frameid"
              value={status}
              onChange={(event)=>setStatus(event.target.value)}
              label="Status"
            >
               <MenuItem value="New Arrival">New Arrival</MenuItem>
              <MenuItem value="Upcoming">Upcoming</MenuItem>
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
              value={adStatus}
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
            modules={DisplayAllProducts.modules}
            formats={DisplayAllProducts.formats}
            onChange={(txt)=>setDescription(txt)} />
 
    
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!btnStatus ? (
                      <>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(event) => handlePicture(event)}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ background: "#22a6b3" }}
                            component="span"
                          >
                            Edit Picture
                          </Button>
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                    {btnStatus ? (
                      <>
                        <Button onClick={() => handleSavePicture()}>
                          Save
                        </Button>
                        <Button onClick={() => handleCancelPicture()}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt=""
                      src={picture.filename}
                      variant="rounded"
                      className={classes.large}
                    />
                  </Grid>

                  <Grid item md={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ background: "#22a6b3" }}
                      fullWidth
                      onClick={() => handleSubmit()}
                    >
                      Submit Product
                    </Button>
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
  };

  useEffect(function () {
    fetchAllProducts();
  }, []);

  function SimpleAction() {
    return (
      <MaterialTable
        title={
          <>
            <span>
              <img alt="" src="/glasskart.png" width="40" />
            </span>{" "}
            <b style={{ fontSize: 18, opacity: 0.5 }}>DISPLAY PRODUCT </b>{" "}
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => props.setComponent(<AddProduct />)}
            >
              Add Products
            </Button>
          </>
        }
        columns={[
          { title: "Id", field: "productid" },
          {
            title: "Product Name",
            render: (rowData) => (
              <div>
                <b>{rowData.productname}</b>
              </div>
            ),
          },
          { title: "Type", render: (rowData) => <div>{rowData.type}</div> },
          {
            title: "Category",
            render: (rowData) => <div>{rowData.categoryname}</div>,
          },
          {
            title: "Frame",
            render: (rowData) => <div>{rowData.frametypename}</div>,
          },
          {
            title: "Material",
            render: (rowData) => <div>{rowData.materialname}</div>,
          },
          {
            title: "Shape",
            render: (rowData) => <div>{rowData.shapename}</div>,
          },
          {
            title: "Status",
            render: (rowData) => <div>{rowData.status}<br/> [{rowData.adstatus}] </div>,
          },
         


          {
            title: "Picture",
            render: (rowData) => (
              <img
                alt={rowData.picture}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.picture}`}
              />
            ),
          },
        ]}
        data={productList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Product",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Product",
            onClick: (event, rowData) => handleDeleteProduct(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>{SimpleAction()}</div>
      {storeDialog()}
    </div>
  );
}
