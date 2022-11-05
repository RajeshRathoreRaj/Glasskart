import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from 'clsx';

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux"; 
import MoreIcon from "@material-ui/icons/MoreVert";
import { getData,ServerURL } from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar'; 
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    border: "solid 1px #dfe6e9",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  console.log("PROPS:",props)
  /*const [refresh,setRefresh]=useState(false)
  useEffect(function(){
    setRefresh(!refresh)

  },[props])*/
  var cart=useSelector(state=>state.cart)
  var user=useSelector(state=>state.user)
  
  var key=Object.keys(cart)
  var ukey=Object.keys(user)
  var products=Object.values(cart)
  var totalamt=products.reduce(calaculateAmount,0)
  var actualamount=products.reduce(calaculateActualAmount,0)
  var savingamout=products.reduce(savingAmount,0)
  function calaculateAmount(a,b){
    var actualprice=b.offerprice>0?b.offerprice*b.qty:b.price*b.qty
   return(a+actualprice)
  }
  function calaculateActualAmount(a,b){
   
   return(a+(b.price*b.qty))

  }

  function savingAmount(a,b){
    var actualprice=b.offerprice>0?(b.price-b.offerprice)*b.qty:0     
    return(a+actualprice)
 
   }
 


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

///////////////////////   Show Cart  ///////////////////////
const displayCartItems=()=>{
  return products.map((item)=>{
    return(
        <div style={{display:'flex',flexDirection:'row',width:345}}>
         <div style={{padding:5}}>
         <img  src={`${ServerURL}/images/${item.productpicture}`} width="60" />
         
         </div>

         <div style={{display:'flex',flexDirection:'column',padding:5}}>
          <div style={{fontSize:12,fontWeight:700}} >
           {item.productname}
           </div>
           <div style={{fontSize:12,fontWeight:500}} >
            <span>{item.colorname}&nbsp;&nbsp;</span>
            <span>{item.offerprice>0?<span>&#8377; {item.offerprice}x{item.qty}</span>:<span>&#8377; {item.price}x{item.qty}</span>}</span>
           </div>
           <div  style={{fontSize:12,fontWeight:500}}>
             {item.offerprice>0?<span><s>&#8377; {item.price}</s></span>:<></>}
           </div>
           <div  style={{fontSize:12,fontWeight:500}}>
             {item.offerprice>0?<span style={{color:'green'}}>You save &#8377; {(item.price-item.offerprice)*item.qty}</span>:<span>No offer</span>}
           </div>
           
         </div>

         <div style={{fontSize:12,fontWeight:500,width:170,display:'flex',justifyContent:'flex-end',padding:5}} >
         {item.offerprice>0?<span>&#8377; {item.offerprice*item.qty}</span>:<span>&#8377; {item.price*item.qty}</span>}
           </div>   

        </div>



    )



  })


}





const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right:false,
});
const toggleDrawer = (anchor, open) => {

  /*if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }*/

  setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
    role="presentation"
    onClick={()=>toggleDrawer(anchor, false)}
    onKeyDown={()=>toggleDrawer(anchor, false)}
  >
   <div style={{width:345,display:'flex',justifyContent:'center',alignContent:'center'}}>
    <img src="/glasskart.png" width="150" />

   </div>

{key.length==0?<div style={{width:345,display:'flex',justifyContent:'center',alignContent:'center'}}><img src="/emptycart.png" width="350"/></div>:
  
  
   <>
   <div style={{width:345}}>
     <span style={{fontWeight:600,padding:5}}><img src="/cart.png" width="40"/><Badge badgeContent={key.length} color="secondary"/></span>
     <span style={{fontWeight:600,float:'right',padding:5}}>&#8377; {totalamt}</span>

   </div>
   {displayCartItems()}
    <Divider />
    <div style={{display:'flex',flexDirection:'column'}}>
    <div style={{width:345}}>
     <span style={{fontSize:14,fontWeight:600,padding:5}}>Payable:</span>
     <span style={{fontSize:14,fontWeight:600,float:'right',padding:5}}>&#8377; {actualamount}</span>

   </div>
     <div style={{width:345}}>
     <span style={{fontSize:14,fontWeight:600,padding:5}}>Savings:</span>
     <span style={{fontSize:14,fontWeight:600,float:'right',padding:5}}>&#8377; -{savingamout}</span>

   </div>
   <div style={{width:345}}>
     <span style={{fontSize:14,fontWeight:600,padding:5}}>Delivery Charges:</span>
     <span style={{fontSize:14,fontWeight:600,float:'right',padding:5}}>&#8377; {0}</span>

   </div>
 
   <Divider />
   <div style={{width:345}}>
     <span style={{fontSize:14,fontWeight:600,padding:5}}>Net Amount:</span>
     <span style={{fontSize:14,fontWeight:600,float:'right',padding:5}}>&#8377; {totalamt}</span>
   </div>
   </div>
   <div style={{width:345,display:'flex',justifyContent:'center',alignItems:'center'}}>
    {ukey.length>0?<>
      <li
                  style={{
                    listStyle: "none",
                    display: "block",
                    background: "#50526e",
                    color: "#fff",
                    padding: 15,
                    textAlign: "center",
                    marginTop: 5,
                    fontFamily: "Helvetica",
                    fontSize: 16,
                    letterSpacing: 1,
                    cursor: "pointer",
                    width:280,
                    fontWeight:700
                  }}
                  onClick={()=>props.history.push({pathname:'/showcart'})}
                >
                  Make Payment
                </li>
    
    
    </>:<><li
                  style={{
                    listStyle: "none",
                    display: "block",
                    background: "#50526e",
                    color: "#fff",
                    padding: 15,
                    textAlign: "center",
                    marginTop: 5,
                    fontFamily: "Helvetica",
                    fontSize: 16,
                    letterSpacing: 1,
                    cursor: "pointer",
                    width:280,
                    fontWeight:700
                  }}
                  onClick={()=>props.history.push({pathname:'/login'})}
                >
                  Proceed for Payment
                </li></>}</div></>}
    
   
  </div>
);
const showCart=()=>{
 return( <div>
 
   <React.Fragment key={'right'}>
    
     <Drawer anchor={'right'} open={state['right']} onClose={()=>toggleDrawer('right', false)}>
       {list('right')}
     </Drawer>
   </React.Fragment>
 
</div>)



}
////////////////////////////////////////////////////////////////////



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     {ukey.length==0?<MenuItem onClick={()=>props.history.push({'pathname':'/login'})}>Sign In</MenuItem>:<>
      
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem></>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton  onClick={()=>toggleDrawer('right', true)} aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={key.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
     
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );







  ///////////////////////My Work/////////////////////
  const [listCategories, setListCategories] = useState([]);
  const [myAnchorEl, setMyAnchorEl] = React.useState(null);
  const [menuName, setMenuName] = useState("");

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setMenuName(event.currentTarget.value);
  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const subMenu = () => {
    if (menuName == "Eyeglasses") {
      return (
        <MenuItem
          style={{
            display: "flex",
            flexDirection: "row",
            width: 1000,
            background: "#F5F3F8",
          }}
          backgroundColor={"#000"}
          onMouseLeave={() => setMyAnchorEl(null)}
        >
          <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Men',categoryid:1})} >

            <img src="/Meneye.jpg" width="500" />
          </div>
          <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Women',categoryid:1})}>
            <img src="/Womeneye.jpg" width="500" />
          </div>
        </MenuItem>
      );
    } else if (menuName == "Sunglasses") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: 1000,
            background: "#F5F3F8",
          }}
          onMouseLeave={() => setMyAnchorEl(null)}
        >
          <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Men',categoryid:2})}>
            <img src="/Mensun.jpg" width="500" />
          </div>
          <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Women',categoryid:2})}>
            <img src="/Womensun.jpg" width="500" />
          </div>
        </div>
      );
    }
  };
  const fetchAllCategories = async () => {
    var list = await getData("product/fetchallcategories");
    setListCategories(list.data);
  };
  useEffect(function () {
    fetchAllCategories();
  }, []);

  const mainMenu = () => {
    return listCategories.map((item) => {
      return (
        <Button
          //onClick={(event) => handleMyMenuClick(event)}
          onMouseEnter={(event) => handleMyMenuClick(event)}
          value={item.categoryname}
          endIcon={<ArrowDropDownIcon />}
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          {item.categoryname}
        </Button>
      );
    });
  };

  /////////////////////////////////////////////

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="#FFF">
        <Toolbar>
  
          
        <Hidden smUp>
        <MenuIcon />
         </Hidden>

          <div style={{ padding: 5 }}>
            <img src="/glasskart9.png" />
          </div>


          <Hidden smDown>
          {mainMenu()}
         </Hidden>

    

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
            {myAnchorEl ? subMenu() : <></>}
          </Menu>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton  onClick={()=>toggleDrawer('right', true)} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={key.length} color="secondary">
                <ShoppingCart  />
              </Badge>
            </IconButton>
             
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {showCart()}
      {renderMobileMenu}
      {renderMenu}
     
    </div>
  );
}
