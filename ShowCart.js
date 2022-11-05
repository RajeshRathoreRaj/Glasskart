import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import { ServerURL,postData } from "../FetchNodeServices";
import { Button, Divider } from "@material-ui/core";
import ShoppingCart from "./ShopCart";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));


export default function ShowCart(props) {

  const classes = useStyles();

  //var product = props.location.state.itemProps;
  var dispatch=useDispatch()

  const [productPicture,setProductPicture]=useState([])
  const [refresh,setRefresh]=useState(false)



  var cart=useSelector(state=>state.cart)
  var key=Object.keys(cart)
  var products=Object.values(cart)

  var totalamt=products.reduce(calaculateAmount,0)
  //console.log('Total Amount:',totalamt)

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



   
 
///////////////////////   Show Cart  ///////////////////////

const handleQtyChange = (value,item) => {
  if (value == 0) {
    dispatch({ type: "REMOVE_CART", payload: [item.finalproductid] });
  } else {
    item.qty=value
    dispatch({ type: "ADD_CART", payload: [item.finalproductid, item] });
  }
  setRefresh(!refresh);
};
const displayCartItems=()=>{
  return products.map((item)=>{

return(

  <div style={{display:'flex',flexDirection:'row',width:680}}>
  <div style={{padding:5,width:100}}>
  <img  src={`${ServerURL}/images/${item.productpicture}`} width="80" />
  
  </div>

  <div style={{display:'flex',flexDirection:'column',padding:5,width:200}}>
   <div style={{fontSize:14,fontWeight:700}} >
    {item.productname}
    </div>
    <div style={{fontSize:14,fontWeight:500}} >
     <span>{item.colorname}&nbsp;&nbsp;</span>
     <span>{item.offerprice>0?<span>&#8377; {item.offerprice}x{item.qty}</span>:<span>&#8377; {item.price}x{item.qty}</span>}</span>
    </div>
    <div  style={{fontSize:14,fontWeight:500}}>
      {item.offerprice>0?<span><s>&#8377; {item.price}</s></span>:<></>}
    </div>
    <div  style={{fontSize:14,fontWeight:500}}>
      {item.offerprice>0?<span style={{color:'green'}}>You save &#8377; {(item.price-item.offerprice)*item.qty}</span>:<span>No offer</span>}
    </div>
    
  </div>
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:200}}>
   <ShoppingCart  id={item.finalproductid} value={item.qty}  
   onChange={(value) => handleQtyChange(value,item)} 
   />
   </div>
  <div style={{width:200,fontSize:16,fontWeight:600,display:'flex',padding:5,alignItem:'right',justifyContent:'right'}} >
  {item.offerprice>0?<span>&#8377; {item.offerprice*item.qty}</span>:<span>&#8377; {item.price*item.qty}</span>}
    </div>   

 </div>

)
  })
} 






  const paymentDetails = () => {

 

    return (
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 15 ,paddingRight:80 }}>
        <div
          style={{
            padding: 15,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
            borderRadius:5


          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10,display:'flex' }}>
            Apply Coupon


             <div style={{display:'flex',justifyContent:'flex-end',display:'flex',paddingLeft:380,fontSize:14,cursor:'pointer'}}>
                <font color='red' > VIEW ALL </font>
             </div>  </div>

          <div style={{ fontWeight: 200, marginBottom: 10 }}>
          <font color='blue'><b><u>Log in </u></b></font>&nbsp;to see best offers and cashback deals
          </div>
          <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
            Currently this feature is not available
     
          </div> 
        </div>
    
        <div
          style={{
            padding: 15,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            borderRadius:5
          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Payment Details
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              M.R.P
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {actualamount}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              Savings
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {savingamout}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              Delivery Charges
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {0}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ fontWeight: 200, marginBottom: 10, width: 450 }}>
              Total Amount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                width: 250,
                textAlign: "right",
              }}
            >
              &#8377; {totalamt}
            </div>
          </div>
          <Divider />
        </div>

        <div style={{ margin: 10,display:'flex', justifyContent:'flex-end' }}>

          <Button
            variant="contained"
            color='primary'
            onClick={()=>props.history.push({'pathname':'/addresscart'})}
    >
            Place Order
          </Button>

        </div> 
      </div>
    )
  
} 

  







  return (
    <div style={{ background: "#ecf0f1" }}>
      <Header history={props.history} />
      <div style={{ padding: 25, paddingLeft:80 }}>
        <Grid container spacing={1}>
          <Grid items xs={12}  sm={6}>
            <h4>My Cart({key.length})</h4>
          </Grid>
          <Grid items xs={12}  sm={6}>
            <h4>Icon</h4>
          </Grid>

          <Grid items xs={12}  sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFF",
                borderRadius: 2,
                padding: 10,
                marginBottom:20,
                borderRadius:5,


              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,


                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  Order Summary 
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 525,
                    textAlign: "right",
                  }}
                >
                  &#8377; {totalamt}
                </div>
              </div>

              {displayCartItems()}
            </div>
          </Grid>




          <Grid items xs={12}  sm={6}>
            {paymentDetails()}
          </Grid>
        </Grid>
      </div>
    
      <Footer history={props.history} />
    </div>

  );
}
