import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import AddStoreCity from "./AddStoreCity"
import DisplayAllStores from "./DisplayAllStores"
import DisplayAllCategories from './DisplayAllCategories';
import DisplayAllFrames from './DisplayAllFrames';
import DisplayShapes from './DisplayShapes';
import DisplayMaterial from './DisplayMaterial';
import DisplayAllColors from './DisplayAllColors';
import DisplayAllPrice from './DisplayAllPrice';
import DisplayAllProducts from './DisplayAllProducts';
import DisplayAllFinalProducts from './DisplayAllFinalProducts';
import ProductPictures from './ProductPictures';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function ListItems (props)
{ const classes = useStyles();
  const handleClick=(v)=>{
  props.setComponent(v)

  }
    return(
 <div>
 <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Stores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
     

    <ListItem button onClick={()=>handleClick(<DisplayAllStores setComponent={props.setComponent}/>)} >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Store" />
    </ListItem>
    
    {/* <ListItem button onClick={()=>handleClick(<DisplayAllStores />)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="List Store" />
    </ListItem> */}
    </Typography>
        </AccordionDetails>
      </Accordion>
     
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Specifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
     

    <ListItem button onClick={()=>handleClick(<DisplayAllCategories setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<DisplayAllFrames setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Frame Type"  />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayShapes setComponent={props.setComponent}/>)} >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Shapes" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<DisplayMaterial setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Material Type" />
    </ListItem>
    
    <ListItem button  onClick={()=>handleClick(<DisplayAllColors setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Color" />
    </ListItem>
    
    <ListItem button  onClick={()=>handleClick(<DisplayAllPrice setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Price" />
    </ListItem>
    
    
    </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
     

    <ListItem button onClick={()=>handleClick(<DisplayAllProducts setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<DisplayAllFinalProducts setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Final Product"  />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<ProductPictures setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Pictures"  />
    </ListItem>
    
    </Typography>
        </AccordionDetails>
      </Accordion>
   
  </div>
  </div>
  )

}
