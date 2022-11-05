import React, { useState, useEffect } from "react";
import Header from "./Header";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { getData, ServerURL } from "../FetchNodeServices";
import Footer from "./Footer"
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
 
  sectionDesktopOne: {
    
 
    width:250,borderRadius:0,zIndex:1,position:'absolute',left:'70%',top:'50%',background:'#50526E',color:'#FFF',

    [theme.breakpoints.down("sm")]: {
      width:180,borderRadius:0,zIndex:1,position:'absolute',left:'50%',top:'25%',background:'#50526E',color:'#FFF'
      },
  },

   
  sectionDesktopTwo: {
    
 
    width:250,borderRadius:0,zIndex:1,position:'absolute',left:'70%',top:'58%',background:'#50526E',color:'#FFF',

    [theme.breakpoints.down("sm")]: {
      width:180,borderRadius:0,zIndex:1,position:'absolute',left:'50%',top:'33%',background:'#50526E',color:'#FFF'
      },
  },
  
}));











export default function Home(props) {
  const classes = useStyles();
    console.log("PROPS:",props)
    const [list, setList] = useState([]);
    const fetchAllMainPictures = async () => {
        var result = await getData("mainpage/fetchallmainpage");
        setList(result.data);
      };
    
      const DisplayMainPageImages = () => {
        return list.map((item) => {
          return (<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              {item.position==1?<div><img src={`${ServerURL}/images/${item.picture}`} width="100%"/>
              <Button variant="contained" className={classes.sectionDesktopOne}>Shop Sunglasses</Button>
              <Button variant="contained" className={classes.sectionDesktopTwo}>Shop Eyeglasses</Button>
              <div style={{textAlign: 'center', fontFamily: 'ubuntu'}}>
                  <h1>New This Week</h1>
                  <p style={{color: '#9a9a9a',fontSize:20,
    
    letterSpacing: 1,paddingLeft:20,paddingRight:20}}>
                  This summer, we’re bringing back the cat-eye trend with a colourful twist! Transform your look with these trendy tinted tonics in fresh colour options!

                  </p>
                  </div>
              </div>:<div style={{paddingLeft:20,paddingRight:20}}><img src={`${ServerURL}/images/${item.picture}`} width="100%"/></div>}

          </div>)
        });
      };
    
      useEffect(function () {
        fetchAllMainPictures();
         }, []);
    
      return (
        <div>
          <Header history={props.history}/>
          <div>
              {DisplayMainPageImages()}
          </div>
          <Footer />
          </div>
      )    

}