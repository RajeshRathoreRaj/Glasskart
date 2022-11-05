import React, { useState, useEffect } from "react";
import { getData, ServerURL,postData } from "../FetchNodeServices";
import Radio from '@material-ui/core/Radio';
export default function ProductComponent(props) {
    var itemProps=props.product
    const [item,setItem]=useState({details:[]})
    const [details,setDetails]=useState('')
    const [selected,setSelected]=useState({finalproductid:'',colorid:'',price:'',offerpice:'',productpicture:'',stock:''})
    const [status,setStatus]=useState(false)
   
    const [productStyle, setProductStyle] = useState({
        width: 360,
        height: 300,
        padding: 10,
        margin: 10,
        borderRadius:20,
        display:'flex',
        flexDirection:'column'
      });
     const fetchFinalProductDetails=async()=>{
         var body={productid:itemProps.productid}
         const result=await postData("finalproduct/fetchallfinalproductsbyproductid",body)
         setItem((prev)=>({...prev,details:result.data}))
         if(result.data.length>0){
         var {finalproductid,colorid,colorname,price,offerprice,productpicture,stock}=result.data[0]
          setSelected({finalproductid,colorid,colorname,price,offerprice,productpicture,stock})
         }
     }

      const onChangeStyle=async(event)=>{
        setProductStyle((prev)=>({...prev,border:'1px solid #000'}))

        await fetchFinalProductDetails()
        setStatus(true)
      }
    
      const onRemoveChangeStyle=(event)=>{
        setProductStyle((prev)=>({...prev,border:null}))
        setStatus(false)
    
      }
     const handleClick=(itemProps,selected,item)=>{
       props.history.push({pathname:"/productview"},{itemProps:itemProps,selected:selected,item:item})


     }

      const handleChange=(item)=>{
        var {finalproductid,colorid,colorname,price,offerprice,productpicture}=item
        setSelected({finalproductid,colorid,colorname,price,offerprice,productpicture})
      }

    return(
<div onMouseEnter={(event)=>onChangeStyle(event)}
       //onClick={()=>handleClick(itemProps,selected,item)} 
        
        onMouseLeave={(event)=>onRemoveChangeStyle(event)} 
        style={productStyle}>
          <img  onClick={()=>handleClick(itemProps,selected,item)}  src={`${ServerURL}/images/${status?selected.productpicture:itemProps.picture}`} width="350" />

         { status && 
           <div>
          <div  style={{textAlign:'center',marginTop:20}}>
            {itemProps.productname}
          </div>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          {item.details.map((finalitem)=>{
            return(<div >
                  <Radio
                  key={finalitem.finalproductid}
            checked={selected.finalproductid === finalitem.finalproductid}
        onChange={()=>handleChange(finalitem)}
        //value="a"
        name="radio-button-demo"
        style={{color:finalitem.colorname}}
        //inputProps={{ 'aria-label': 'A' }}
      /> 

            </div>)

          })}
          
        </div>
        <div style={{textAlign:'center'}}>{selected.offerprice>0?<span><s>&#8377; {selected.price}</s> &nbsp; <span style={{color:'#0984e3'}}>&#8377; {selected.offerprice}</span></span>:<span>&#8377; {selected.price}</span>}</div>
        </div>}
         </div>
        )


    }