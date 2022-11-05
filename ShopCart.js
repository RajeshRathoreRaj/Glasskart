

import  React,{useState,useEffect} from "react"
import  {Avatar}  from "@material-ui/core"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
 
export default function ShopCart(props){
    const [value,setValue]=useState(props.value)

     useEffect(function(){
      setValue(props.value)

     },[props.value])  
    const handleMinus=()=>{
        var v=parseInt(value)
        v--
        
        setValue(v)
    
      props.onChange(v)

    }

    const handlePlus=()=>{
    var v=parseInt(value)
    v++
    setValue(v)
    props.onChange(v)

    }


return(<div>
    {value==0?<div><li
                  style={{
                    listStyle: "none",
                    display: "block",
                    background: "#50526e",
                    color: "#fff",
                    padding: 20,
                    textAlign: "center",
                    marginTop: 5,
                    fontFamily: "Helvetica",
                    fontSize: 16,
                    letterSpacing: 1,
                    cursor: "pointer",
                    width:250
                  }}
                  onClick={()=>handlePlus()}
                >
                  Add to Cart
                </li></div>:
       <div style={{display:'flex',flexDirection:'row'}}>
       <Fab onClick={()=>handlePlus()} size="small" color="secondary" aria-label="add" style={{  background: "#50526e",}}>
          <AddIcon />
        </Fab>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginInline:15,fontSize:22,fontWeight:'bold'}}>
        {value}
        </div>
        <Fab onClick={()=>handleMinus()} size="small" color="secondary" aria-label="add" style={{  background: "#50526e",}}>
          <Remove />
        </Fab>
     
       </div>}

    </div>)

}
