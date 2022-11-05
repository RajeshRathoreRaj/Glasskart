import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ShopCart from "./ShopCart";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ServerURL } from '../FetchNodeServices';
import Divider from '@material-ui/core/Divider';
import { Grid, Box, Container, Fab,Button, TextField,Radio } from '@material-ui/core';
import Header from "./Header";
import Footer from "./Footer";
import Drawer from '@material-ui/core/Drawer';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 300,
        paddingInline: 20
      },
    fullList: {
        width: 'auto',
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subdiv: {
        width: '300',
        height: 'auto',
        marginTop: 10,

        borderRadius: 5,
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

export default function MainCart(props) {
    const classes = useStyles();
    var cart = useSelector(state => state.cart)
    var dispatch = useDispatch()
    var key = Object.keys(cart)
    var products = Object.values(cart)
    console.log(products)
    const [refresh, setRefresh] = useState(false)
    var userData = useSelector((state) => state.user);
    var user = Object.values(userData)[0];

    var totalAmt = products.reduce(calculateAmount, 0)
    var actualAmt = products.reduce(calculateActualAmount, 0)
    var savingAmt = products.reduce(calculateSavingAmount, 0)
    const [name,setName]=useState('')
    const [mobilenumber,setMobileNumber]=useState('')
    const [pinCode,setPinCode]=useState('')
    const [houseNumber,setHouseNumber]=useState('')
    const [address,setAddress]=useState('')
    const [landmark,setLandMark]=useState('')
    const [city,setCity]=useState('')
    const [userState,setUserState]=useState('')
    const [addresses,setAddresses]=useState({mobileno:'',name:'',mobilenumber:'',pincode:'',housenumber:'',address:'',landmark:'',city:'',state:''})

///////////////Payement Gateway////////////////////////////
const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: totalAmt*100, //  = INR 1
    name: "Glasskart",
    description: 'Gurugram,Haryana',
    image:`/glasskart.png`,
          
    handler: function (response) {
         
        alert(response.razorpay_payment_id);
    },
    prefill: {
      name: user.firstname + " " + user.lastname,
      contact:user.mobileno,
      email: user.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };


  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



////////////////////////////////////////////////////////////





    function calculateAmount(a, b) {
        var actualPrice = b.offerprice > 0 ? b.offerprice * b.qty : b.price * b.qty
        return (a + actualPrice)
    }
    function calculateActualAmount(a, b) {
        return (a + (b.price * b.qty))
    }
    function calculateSavingAmount(a, b) {
        var savingPrice = b.offerprice > 0 ? (b.price - b.offerprice) * b.qty : 0
        return (a + savingPrice)
    }

    const handleQtyChange = (value, item) => {
        if (value == 0) {
            dispatch({ type: "REMOVE_CART", payload: [item.finalproductid] });
        } else {
            item.qty = value
            dispatch({ type: "ADD_CART", payload: [item.finalproductid, item] });
        }
        setRefresh(!refresh);
    };

    const [state, setState] = React.useState({
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
      };

      const  handleSaveAddress=()=>{
          alert('x')
        var body={mobileno:user.mobileno,name:name,mobilenumber:mobilenumber,pincode:pinCode,housenumber:houseNumber,address:address,landmark:landmark,city:city,state:userState} 
       setAddresses(body)
       setRefresh(!refresh)
      }


      const drawer = () => {
        return (
            <div>
              <React.Fragment key={'right'}>
                <Drawer anchor={'right'} open={state['right']} onClose={() => toggleDrawer('right', false)}>
                  {showAddressDrawer('right')}
                </Drawer>
              </React.Fragment>
            </div>
          ) 
      }

    const showAddressDrawer = (anchor) => {
        return(
            <div className={classes.list}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs>
                        <div>
                         
                        <span style={{display:'flex',justifyContent:'center',alignItems:'center',}}><h3>Add Address</h3></span>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <TextField onChange={(event)=>setName(event.target.value)} size="small" variant="outlined" label="Name" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" onChange={(event)=>setMobileNumber(event.target.value)}  variant="outlined" label="Mob No." fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>setPinCode(event.target.value)} label="Pin Code" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>setHouseNumber(event.target.value)} label="House No." fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>setAddress(event.target.value)} label="Address" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" label="Landmark" onChange={(event)=>setLandMark(event.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>setCity(event.target.value)} label="City" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <TextField size="small" variant="outlined" onChange={(event)=>setUserState(event.target.value)} label="State" fullWidth />
                    </Grid>
                    <Grid item xs>
                        <Button onClick={()=>handleSaveAddress()} variant="contained" disableElevation size="large" fullWidth color="primary">Save Address</Button>
                    </Grid>

                </Grid>
            </div>
        )
    }


    const productDetails = () => {
        return products.map((item) => {
            return (
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ margin: 0 }}>
                            <img alt={item.productname} src={`${ServerURL}/images/${item.productpicture}`} width='150px' />
                        </div>

                        <div style={{ marginInline: 20 }}>
                            <div style={{ fontWeight: 700, margin: 2, letterSpacing: 1, display: 'flex', padding: 10 }}>
                                {item.productname} <span style={{ fontWeight: 300, letterSpacing: 0, paddingInline: 5, color: 'grey' }}>({item.colorname})</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <div style={{ fontWeight: 500, marginInline: 5 }}>
                                    <span>{item.offerprice > 0 ? <span>&#8377; {item.offerprice}</span> : <span>&#8377; {item.price} × {item.qty}</span>}</span>
                                </div>
                                <div style={{ fontWeight: 500, marginInline: 5 }}>
                                    {item.offerprice > 0 ? <span><s>&#8377; {item.price}</s></span> : <></>}
                                </div>
                                <div style={{ fontWeight: 500, marginInline: 5 }}>
                                    {item.offerprice > 0 ? <span style={{ color: 'green' }}>You save &#8377; {(item.price - item.offerprice) * item.qty}</span> : <span>No offer</span>}
                                </div>


                            </div>


                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'end', marginLeft: 40, flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10, fontWeight: 500, margin: 2 }}>
                                {item.offerprice > 0 ? <span>&#8377; {item.offerprice * item.qty}
                                </span> : <span>&#8377; {item.price * item.qty}</span>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <ShopCart id={item.finalproductid} value={item.qty}
                                    onChange={(value) => handleQtyChange(value, item)}
                                />
                            </div>
                        </div>

                    </div>
                    <div style={{ margin: 15 }}>
                        <Divider />
                    </div>
                </>)
        })
    }

    const handleSelectAddress = () => {
        // return products.map((item)=>{
        return (
            
                    <div style={{ padding: 10, }}>
                        {/* <Radio 
                            checked /> */}

                          <div>
                           <div>{addresses.name}</div>
                           <div>{addresses.address}</div>
                           <div>{addresses.city} {addresses.userState}</div>
                           <div>{addresses.pincode}</div>

                          </div>   
                        <Button 
                            onClick={() => toggleDrawer('right', true)}
                            variant="outlined" 
                            size="large" 
                            color="primary" 
                            style={{ padding: 10,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
                            <Add fontSize="large"/>
                            &nbsp;
                        <div style={{textTransform: "capitalize"}}>Add/Change Address</div>
                        </Button>
                    </div>

        )
        // })
    }

    const showMainCart = () => {
        return (
            <Box style={{}}>
                <Box style={{ display: 'flex', marginInline: 40, flexDirection: 'column' }}>
                    <Box style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', paddingBottom: 15, paddingLeft: 5 }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', fontSize: 25 }} >My Cart ({key.length})
                        </div>
                    </Box>
                    <Grid container justifyContent='space-evenly' spacing={5} direction="row">
                        <Grid item xs={7}  >
                            <Grid item xs={12}  >
                                <div style={{ border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>
                                    <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', }}>
                                        Select Delivery Address
                                    </div>
                                    <div>
                                        {handleSelectAddress()}
                                    </div>
                                </div>
                            </Grid>
                            &nbsp;
                            <Grid item xs={12}  >
                                <div style={{ border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>
                                    <div style={{ padding: 10, fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <span>Order Summary <span style={{ color: 'grey' }}>({key.length})</span></span>
                                        <span>&#8377; {totalAmt}</span>
                                    </div>

                                    {productDetails()}

                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}  >
                            <Grid item xs  >
                                <div style={{ display: 'flex', flexDirection: "column", border: '1px solid', borderRadius: 5, width: "100%", padding: 10, }}>

                                    <div style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
                                        Payment Details
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            M.R.P
                                        </div>
                                        <div
                                            style={{

                                            }}
                                        >
                                            &#8377; {actualAmt}
                                        </div>
                                    </div>
                                    <Divider variant='middle' />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            Savings
                                        </div>
                                        <div
                                            style={{
                                                color: 'green', fontWeight: 'bold'
                                            }}
                                        >
                                            &#8377; {savingAmt}
                                        </div>
                                    </div>
                                    <Divider variant='middle' />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            Delivery Charges
                                        </div>
                                        <div
                                            style={{

                                            }}
                                        >
                                            &#8377; {0}
                                        </div>
                                    </div>
                                    <Divider variant='middle' />
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                        <div style={{}}>
                                            <b>Total Amount</b>
                                        </div>
                                        <div
                                            style={{

                                            }}
                                        >
                                            <b>&#8377; {totalAmt}</b>
                                        </div>
                                    </div>
                                </div>
                                <Box style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', padding: 20 }}>
                                    <li
                                      onClick={()=>openPayModal()}
                                        style={{
                                            width: 250,
                                            listStyle: 'none',
                                            display: 'block',
                                            borderRadius: 5,
                                            background: '#50526e',
                                            color: '#fff',
                                            padding: 15,
                                            textAlign: 'center',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            letterSpacing: 0.5,
                                            cursor: 'pointer'
                                        }}>
                                        Make Payment
                                    </li>
                                </Box>
                            </Grid>


                        </Grid>

                    </Grid>

                </Box>



            </Box>

        )
    }

    return (
        <div>
            <Header history={props.history} setRefresh={setRefresh} />
            {showMainCart()}
            {drawer()}
            <Footer history={props.history} />
        </div>
    )
}