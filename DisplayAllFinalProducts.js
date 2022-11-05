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
import AddFinalProduct from "./AddFinalProducts";
import AddIcon from "@material-ui/icons/Add";

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

export default function DisplayAllFinalProducts(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [finalProductId, setFinalProductId] = useState("");
  const [finalProductList, setFinalProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [productList, setProductList] = useState([]);
  const [colorId, setColorId] = useState("");
  const [colorList, setColorList] = useState([]);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [offerType, setOfferType] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [productPicture, setProductPicture] = useState({
    filename: "",
    bytes: "",
  });
  const [btnStatus, setBtnStatus] = useState(false);
  const [oldPicture, setOldPicture] = useState("");

  const fetchAllProducts = async () => {
    var list = await getData("finalproduct/fetchallproducts");
    setProductList(list.data);
  };
  const fetchAllColors = async () => {
    var list = await getData("finalproduct/fetchallcolors");
    setColorList(list.data);
  };
  const fetchAllFinalProducts = async () => {
    var list = await getData("finalproduct/fetchallfinalproducts");
    setFinalProductList(list.data);
  };

  useEffect(function () {
    fetchAllProducts();
  }, []);
  useEffect(function () {
    fetchAllColors();
  }, []);
  useEffect(function () {
    fetchAllFinalProducts();
  }, []);

  const fillProducts = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };
  const fillColors = () => {
    return colorList.map((item) => {
      return <MenuItem value={item.colorid}>{item.colorname}</MenuItem>;
    });
  };

  const handleCancelPicture = async () => {
    setProductPicture({ filename: oldPicture, bytes: "" });
    setBtnStatus(false);
  };

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("finalproductid", finalProductId);
    formData.append("productpicture", productPicture.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "finalproduct/editproductpicture",
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
    fetchAllFinalProducts();
  };

  const handlePicture = (event) => {
    setOldPicture(productPicture.filename);
    setProductPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(productId)) {
      err = true;
      errorMessage("Product should not be empty");
    }
    if (isEmpty(colorId)) {
      err = true;
      errorMessage("Color should not be empty");
    }
    if (isEmpty(size)) {
      err = true;
      errorMessage("Size Name should not be empty");
    }
    if (isEmpty(offerType)) {
      err = true;
      errorMessage("Offer Type one should not be empty");
    }
    if (isEmpty(price)) {
      err = true;
      errorMessage("Price should not be empty");
    }
    if (isEmpty(offerPrice)) {
      err = true;
      errorMessage("Latitude should not be empty");
    }
    if (isEmpty(stock)) {
      err = true;
      errorMessage("Stock Value should not be empty");
    }
    if (isEmpty(productPicture.filename)) {
      err = true;
      errorMessage("Please Add Product Picture...");
    }
    if (!err) {
      var body = {
        finalproductid: finalProductId,
        productid: productId,
        colorid: colorId,
        size: size,
        price: price,
        offertype: offerType,
        offerprice: offerPrice,
        description: description,
        stock: stock,
      };
      var result = await postData("finalproduct/updatefinalproductdata", body);
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
    fetchAllFinalProducts();
  };

  const handleDeleteProduct = async (data) => {
    var body = { finalproductid: data.finalproductid };
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
        result = await postData("finalproduct/deletefinalproduct", body);
        if (result) {
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
          fetchAllFinalProducts();
        } else
          Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });
    fetchAllFinalProducts();
  };

  const handleClickOpen = (data) => {
    setFinalProductId(data.finalproductid);
    setProductId(data.productid);
    setColorId(data.colorid);
    setSize(data.size);
    setPrice(data.price);
    setOfferType(data.offertype);
    setOfferPrice(data.offerprice);
    setDescription(data.description);
    setStock(data.stock);
    setProductPicture({
      filename: `${ServerURL}/images/${data.productpicture}`,
      bytes: "",
    });
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
                <span>Edit Final Product</span>
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
                      <InputLabel id="product-id">Select Product</InputLabel>
                      <Select
                        labelId="product-id"
                        id="productid"
                        value={productId}
                        onChange={(event) => setProductId(event.target.value)}
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
                        value={colorId}
                        onChange={(event) => setColorId(event.target.value)}
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
                        value={size}
                        onChange={(event) => setSize(event.target.value)}
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
                        value={offerType}
                        onChange={(event) => setOfferType(event.target.value)}
                        label="Select Offer Type"
                      >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Festival">Festival</MenuItem>
                        <MenuItem value="Sale">Sale</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      value={price}
                      fullWidth
                      label="Price"
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={offerPrice}
                      label="Offer Price"
                      onChange={(event) => setOfferPrice(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={description}
                      label="Description"
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={stock}
                      label="Stock"
                      onChange={(event) => setStock(event.target.value)}
                    />
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
                      src={productPicture.filename}
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
                      Edit Final Product
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

  function SimpleAction() {
    return (
      <MaterialTable
        title={
          <>
            <span>
              <img alt="" src="/glasskart.png" width="40" />
            </span>{" "}
            <b style={{ fontSize: 18, opacity: 0.5 }}>DISPLAY FINAL PRODUCT </b>{" "}
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => props.setComponent(<AddFinalProduct />)}
            >
              Add Final Product
            </Button>
          </>
        }
        columns={[
          { title: "Id", field: "finalproductid" },
          {
            title: "Product Name",
            render: (rowData) => (
              <div>
                <b>{rowData.productid}</b>
              </div>
            ),
          },
          { title: "Color", render: (rowData) => <div>{rowData.colorid}</div> },
          { title: "Size", render: (rowData) => <div>{rowData.size}</div> },
          { title: "Price", render: (rowData) => <div>{rowData.price}</div> },
          {
            title: "Offer",
            render: (rowData) => (
              <div>
                {rowData.offerprice}
                <br />
                {rowData.offertype}
              </div>
            ),
          },
          { title: "Stock", render: (rowData) => <div>{rowData.stock}</div> },
          {
            title: "Description",
            render: (rowData) => <div>{rowData.description}</div>,
          },
          {
            title: "Picture",
            render: (rowData) => (
              <img
                alt={rowData.productpicture}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.productpicture}`}
              />
            ),
          },
        ]}
        data={finalProductList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Final Product",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Final Product",
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
