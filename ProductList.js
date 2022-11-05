import React, { useState, useEffect } from "react";
import Header from "./Header";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { getData, ServerURL, postData } from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ProductComponent from "./ProductComponent";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
const useStyles = makeStyles((theme) => ({}));
const listAttributes = [
  { key: 1, attr: "Shape" },
  { key: 2, attr: "Frametype" },
  { key: 3, attr: "Size" },
  { key: 4, attr: "Color" },
  { key: 5, attr: "Material" },
  { key: 6, attr: "Gender" },
  { key: 7, attr: "Price" },
  { key: 8, attr: "Sorting" },
  { key: 9, attr: "Reset" },
];

export default function ProductList(props) {
  const [myAnchorEl, setMyAnchorEl] = React.useState(null);
  const [keyAttr, setKeyAttr] = useState("");
  const [list, setList] = useState([]);
  const [frameList, setFrameList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [price, setPriceList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);

  const [genderatt, setgenderatt] = useState({
    Male: { key: 1, attr: "Male", chkstatus: false },
    Female: { key: 2, attr: "Female", chkstatus: false },
  });

  const [sizeattr, setSizeAttr] = useState({
    Small: { key: 1, attr: "Small", chkstatus: false },
    Medium: { key: 2, attr: "Medium", chkstatus: false },
    Large: { key: 3, attr: "Large", chkstatus: false },
  });

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setKeyAttr(event.currentTarget.value);
  };

  const fetchAllShapes = async () => {
    var result = await getData("shapes/fetchallshapes");
    var shapesdata = {};
    result.data.map((item) => {
      shapesdata[item.shapeid] = { ...item, chkstatus: false };
    });
    console.log(shapesdata);
    setList(shapesdata);
  };
  const fetchAllFrames = async () => {
    var result = await getData("frametypes/fetchallframes");

    var framesdata = {};
    result.data.map((item) => {
      framesdata[item.frameid] = { ...item, chkstatus: false };
    });
    setFrameList(framesdata);
  };

  const fetchAllColors = async () => {
    var result = await getData("color/fetchallcolors");
    var colordata = {};
    result.data.map((item) => {
      colordata[item.colorid] = { ...item, chkstatus: false };
    });
    setColorList(colordata);
  };

  const fetchAllMaterial = async () => {
    var result = await getData("material/fetchallmaterial");
    var materialdata = {};
    result.data.map((item) => {
      materialdata[item.materialid] = { ...item, chkstatus: false };
    });
    setMaterialList(materialdata);
  };

  const fetchGender = () => {
    var result;
  };

  const fetchAllPrice = async () => {
    var result = await getData("price/fetchallprice");
    setPriceList(result.data);
  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const handleChange = (event, item) => {
    var obj = list;
    obj[item.shapeid]["chkstatus"] = event.currentTarget.checked;
    setList(obj);
    setRefresh(!refresh);
  };

  const handleChangeFrame = async(event, item) => {
    
    var obj = frameList;
    obj[item.frameid]["chkstatus"] = event.currentTarget.checked;
    setFrameList(obj);
   
    var body = {
      gender: props.location.state.gender,
      categoryid: props.location.state.categoryid,
      frameid:frameList
    };
    //alert(JSON.stringify(body));
    var result = await postData("product/fetchallproductsbygender_filter", body);

    setProducts(result.data);




    setRefresh(!refresh);
  };
  const handleChangeColor = (event, item) => {
    var obj = colorList;
    obj[item.colorid]["chkstatus"] = event.currentTarget.checked;
    setColorList(obj);
    setRefresh(!refresh);
  };

  const handleChangeMaterial = (event, item) => {
    var obj = materialList;
    obj[item.materialid]["chkstatus"] = event.currentTarget.checked;
    setMaterialList(obj);
    setRefresh(!refresh);
  };

  const handleChangeGender = (event, item) => {
    var obj = genderatt;
    obj[item.attr]["chkstatus"] = event.currentTarget.checked;
    console.log(obj[item.attr], item);
    setgenderatt(obj);
    setRefresh(!refresh);
  };

  const handleChangeSize = (event, item) => {
    var obj = sizeattr;
    obj[item.attr]["chkstatus"] = event.currentTarget.checked;

    setSizeAttr(obj);
    setRefresh(!refresh);
  };

  const subMenu = (key) => {
    switch (key) {
      case "1":
        return Object.values(list).map((item) => {
          return (
            <FormGroup>
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 150,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                value={item.shapeid}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.chkstatus}
                      onChange={(event) => handleChange(event, item)}
                    />
                  }
                  label={item.shapename}
                />
              </MenuItem>\
            </FormGroup>
          );
        });

      case "2":
        return Object.values(frameList).map((item) => {
          return (
            <FormGroup>
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 150,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                value={item.frameid}
                
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.chkstatus}
                      onChange={(event) => handleChangeFrame(event, item)}

                    />
                  }
                  label={item.framename}
                />
              </MenuItem>
            </FormGroup>
          );
        });
      case "3":
        return Object.values(sizeattr).map((item) => {
          return (
            <FormGroup>
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 150,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                value={item.attr}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.chkstatus}
                      onChange={(event) => handleChangeSize(event, item)}
                    />
                  }
                  label={item.attr}
                />
              </MenuItem>
            </FormGroup>
          );
        });

      case "4":
        return Object.values(colorList).map((item) => {
          return (
            <FormGroup>
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 150,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                value={item.colorid}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.chkstatus}
                      onChange={(event) => handleChangeColor(event, item)}
                    />
                  }
                  label={item.colorname}
                />
              </MenuItem>
            </FormGroup>
          );
        });
      case "5":
        return Object.values(materialList).map((item) => {
          return (
            <FormGroup>
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 150,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                value={item.materialid}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.chkstatus}
                      onChange={(event) => handleChangeMaterial(event, item)}
                    />
                  }
                  label={item.materialname}
                />
              </MenuItem>
            </FormGroup>
          );
        });
      case "6":
        return Object.values(genderatt).map((item) => {
          return (
            <FormGroup>
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 150,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                value={item.attr}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.chkstatus}
                      onChange={(event) => handleChangeGender(event, item)}
                    />
                  }
                  label={item.attr}
                />
              </MenuItem>
            </FormGroup>
          );
        });

      case "7":
        return price.map((item) => {
          return (
            <MenuItem
              style={{
                display: "flex",
                flexDirection: "row",
                width: 150,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              value={item.priceid}
            >
              {item.minprice} to {item.maxprice}
            </MenuItem>
          );
        });
    }
  };
  const attrMenu = () => {
    return listAttributes.map((item) => {
      return (
        <Button
          onClick={(event) => handleMyMenuClick(event)}
          //onMouseEnter={(event) => handleMyMenuClick(event)}
          value={item.key}
          endIcon={<ArrowDropDownIcon />}
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          {item.attr}
        </Button>
      );
    });
  };

  const fetchAllProducts = async () => {
    var body = {
      gender: props.location.state.gender,
      categoryid: props.location.state.categoryid,
    };
    //alert(JSON.stringify(body));
    var result = await postData("product/fetchallproductsbygender", body);

    setProducts(result.data);
  };

  const displayProducts = () => {
    return products.map((item) => {
      return <ProductComponent product={item}  history={props.history} />;
    });
  };

  useEffect(function () {
    fetchAllShapes();
    fetchAllFrames();
    fetchAllColors();
    fetchAllMaterial();
    fetchAllPrice();
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [props.location.state.gender, props.location.state.categoryid]);

  return (
    <div>
      <Header history={props.history} />
      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexWrap:'wrap',
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {attrMenu()}
        <Menu
          id="simple-menu1"
          anchorEl={myAnchorEl}
          keepMounted
          open={Boolean(myAnchorEl)}
          onClose={handleMyMenuClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {subMenu(keyAttr)}
        </Menu>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 20,
        }}
      >
        {displayProducts()}
      </div>
    </div>
  );
}
