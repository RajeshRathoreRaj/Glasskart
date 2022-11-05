import React, { useState,useEffect } from "react"
import MaterialTable from "material-table"
import { getData,postData,} from "../FetchNodeServices";
import { makeStyles } from '@material-ui/core/styles';
import {TextField,Grid,Button,} from "@material-ui/core";
import Swal from 'sweetalert2'
import {isDigits, isEmpty,errorMessage } from "../Checks";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import AddPrice from './AddPrice'
import AddIcon from '@material-ui/icons/Add';




const useStyles = makeStyles((theme) => ({
    root:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    },

    subdiv:{
     width:1300,
     height:'auto',
     background:"#ecf0f1",
     marginTop:5,
     padding:15,
     borderRadius:5,
    },

    input: {
      display: 'none',
    },
 }))


  export default  function DisplayAllPrice(props)
 {  const classes=useStyles() 
    const [open, setOpen] = React.useState(false);
    const[priceId,setPriceId]=useState("")
    const[minPrice,setMinPrice]=useState("")
    const[maxPrice,setMaxPrice]=useState("")
    var [priceList,setPriceList]=useState([])
   
    
    const fetchAllPrice=async()=>{
     var list=await getData("price/fetchallprice")
     setPriceList(list.data)
    }

    useEffect(function(){
     fetchAllPrice()
    },[])

    
    

    const handleSubmit=async()=>{
        var err=false
        if(isEmpty(minPrice))
        {err=true
        errorMessage('Minimum Price should not be blank')}
        
        if(!isDigits(minPrice))
        {err=true
        errorMessage('Minimum Price must be digit value')}
    
        if(isEmpty(maxPrice))
        {err=true
        errorMessage('Maximum Price should not be blank')}
        
    
        if(!isDigits(maxPrice))
        {err=true
         errorMessage('Maximum Price must be digit value')}
    
          
          
      
      if(!err)
      {
        var body={"priceid":priceId,"minprice":minPrice,"maxprice":maxPrice}
        var result = await postData("price/updatepricedata",body)
        if(result)
        {
          Swal.fire({
          imageUrl: '/glasskart.png',
          imageWidth:200,
          title: 'GlassKart.com',
          text: 'Record Updated sucessfully....',
          })
        }
        else
        {
          Swal.fire({
          imageUrl: '/glasskart.png',
          imageWidth:200,
          title: 'GlassKart.com',
          text: 'Fail to update record....', 
          })
        }
        setOpen(false)
      } 

     fetchAllPrice()  
    }
              
              
    const handleDeleteOpen =async (data) => {
      var body={priceid:data.priceid}
   
      Swal.fire({
       imageUrl: '/glasskart.png',
       imageWidth:200,
       title: 'GlassKart.com',
       text:'Are you sure to delete selected record', 
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it'
     }).then(async(result) => {
       if (result.isConfirmed) {
       var result=await postData('price/deleteprice',body)
        if(result)
         Swal.fire(
           'Deleted!',
           'Your record has been deleted.',
           'success'
         )
   
        else
        Swal.fire(
         'FAIL!',
         'Server Error Fail To Delete Record',
         'error'
       )
   
       // For more information about handling dismissals please visit
       // https://sweetalert2.github.io/#handling-dismissals
   
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'Your record is safe :)',
           'error'
         )
       }
       fetchAllPrice()
     }) 
    }

    const handleClickOpen = (data) => {
        setPriceId(data.priceid)
        setMinPrice(data.minprice)
        setMaxPrice(data.maxprice)
        setOpen(true);
       };
   

    const handleClose = () => {
        setOpen(false);
    };
  
  
 const storeDialog=()=>{
  return (
    <div>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:5}}>
            <div style={{fontSize:20,fontWeight:"bold",letterSpacing:1,padding:5}}>
              <span><img src='/glasskart.png' width='40'/></span>
              <span> Edit Price </span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={classes.root}>
            <div className={classes.subdiv}>
              <Grid container spacing={1}>

                <Grid item xs={6}>
                 <TextField fullWidth variant="outlined" label="Minimum Price" value={minPrice}
                 onChange={(event)=>setMinPrice(event.target.value)}></TextField>
                </Grid>

                <Grid item xs={6}>
                 <TextField fullWidth variant="outlined" label="Maximum Price" value={maxPrice}
                 onChange={(event)=>setMaxPrice(event.target.value)}></TextField>
                </Grid>

                <Grid item sm={12} >
                  <Button
                   style={{background:'#22a6b3'}} 
                   fullWidth variant="contained" 
                   color="primary"
                   onClick={()=>handleSubmit()}
                   >
                    Edit Price
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
 }



 function SimpleAction() {
    return (
      <MaterialTable
      title={   <><span>
        <img alt="" src="/glasskart.png" width="40" />
      </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY PRICE  </b> &nbsp; <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={()=>props.setComponent(<AddPrice/>)}
      >
       Add Price
      </Button></>} 
             columns={[
          { title: 'Id', field: 'frameid' 
           
          },
          { title:'Minimum Price',
           render:(rowData) =>(
           <div><b>{rowData.minprice}</b></div>)
          },

          { title:'Maximum Price',
           render:(rowData) =>(
           <div><b>{rowData.maxprice}</b></div>)
          },

        ]}
        data={priceList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },

          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleDeleteOpen(rowData)

          },
        ]}
      />
    )

  }


  return(
   <div className={classes.root}>

   
    <div className={classes.subdiv} >{SimpleAction()}</div>
    {storeDialog()}
    </div>
    
   
   

  )

  }

 
 
  