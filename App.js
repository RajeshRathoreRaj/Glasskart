import AddStoreCity from "./Component/Administrator/AddStoreCity";
import DisplayAllStores from "./Component/Administrator/DisplayAllStores";
import Dashboard from "./Component/Administrator/Dashboard";
import AdminLogin from "./Component/Administrator/AdminLogin";
import AddCategories from "./Component/Administrator/AddCategories";
import DisplayAllCategories from "./Component/Administrator/DisplayAllCategories";
import AddShapes from "./Component/Administrator/AddShapes";
import DisplayShapes from "./Component/Administrator/DisplayShapes";
import AddFrameTypes from "./Component/Administrator/AddFrameTypes";
import DisplayAllFrames from "./Component/Administrator/DisplayAllFrames";
import AddColor from "./Component/Administrator/AddColor";
import DisplayAllColors from "./Component/Administrator/DisplayAllColors";
import AddPrice from "./Component/Administrator/AddPrice";
import DisplayAllPrice from "./Component/Administrator/DisplayAllPrice";
import AddMaterial from "./Component/Administrator/AddMaterial";
import DisplayMaterial from "./Component/Administrator/DisplayMaterial";
import AddProducts from "./Component/Administrator/AddProducts";
import AddFinalProducts from "./Component/Administrator/AddFinalProducts";
import DisplayAllProducts from "./Component/Administrator/DisplayAllProducts";
import DisplayAllFinalProducts from "./Component/Administrator/DisplayAllFinalProducts";
import ProductPictures from "./Component/Administrator/ProductPictures";
import Header from "./Component/UserInterface/Header";
import ProductList from "./Component/UserInterface/ProductList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AddMainPage from "./Component/Administrator/AddMainPage";
import DisplayStatus from "./Component/Administrator/DisplayMainPage";
import ProductView from "./Component/UserInterface/ProductView";

import Test from "./Component/UserInterface/Test";
import Login from "./Component/UserInterface/Login"
import SignUp from "./Component/UserInterface/SignUp"
import Home from "./Component/UserInterface/Home";
import ShowCart from "./Component/UserInterface/ShowCart";
import AddressCart from "./Component/UserInterface/AddressCart";
function App(props) {
  return (
    <div>
      <Router>
        <Route
          component={AddStoreCity}
          path="/addstorecity"
          props={props.history}
        />

        <Route
          component={DisplayAllStores}
          path="/displayallstores"
          props={props.history}
        />
        <Route component={Dashboard} path="/dashboard" props={props.history} />
        <Route
          component={AdminLogin}
          path="/adminlogin"
          props={props.history}
        />

        <Route
          component={AddCategories}
          path="/addcategories"
          props={props.history}
        />

<Route
          component={Login}
          path="/login"
          props={props.history}
        />

<Route
          component={SignUp}
          path="/signup"
          props={props.history}
        />



        <Route
          component={DisplayAllCategories}
          path="/displayallcategories"
          props={props.history}
        />

        <Route
          component={AddFrameTypes}
          path="/addframetypes"
          props={props.history}
        />

        <Route
          component={DisplayAllFrames}
          path="/displayallframes"
          props={props.history}
        />

        <Route component={AddColor} path="/addcolor" props={props.history} />

        <Route
          component={DisplayAllColors}
          path="/displayallcolors"
          props={props.history}
        />

        <Route component={AddShapes} path="/addshapes" props={props.history} />

        <Route
          component={DisplayShapes}
          path="/displayshapes"
          props={props.history}
        />
        <Route
          component={AddMainPage}
          path="/addmainpage"
          props={props.history}
        />
        <Route
          component={DisplayStatus}
          path="/displaystatus"
          props={props.history}
        />

        <Route component={AddPrice} path="/addprice" props={props.history} />

        <Route
          component={DisplayAllPrice}
          path="/displayallprice"
          props={props.history}
        />

        <Route
          component={AddMaterial}
          path="/addmaterial"
          props={props.history}
        />
        <Route
          component={DisplayMaterial}
          path="/displaymaterial"
          props={props.history}
        />

        <Route
          component={AddFinalProducts}
          path="/addfinalproducts"
          props={props.history}
        />

        <Route
          component={AddProducts}
          path="/addproducts"
          props={props.history}
        />
        <Route
          component={DisplayAllProducts}
          path="/displayallproducts"
          props={props.history}
        />

        <Route
          component={DisplayAllFinalProducts}
          path="/displayallfinalproducts"
          props={props.history}
        />

        <Route
          component={ProductPictures}
          path="/productpictures"
          props={props.history}
        />
        <Route component={Header} path="/header" props={props.history} />

        <Route
          component={ProductList}
          path="/productlist"
          props={props.history}
        />

        <Route component={Test} path="/test" props={props.history} />

        <Route component={Home} path="/home" props={props.history} />

        <Route
          component={ProductView}
          path="/productview"
          props={props.history}
        />

     <Route
          component={ShowCart}
          path="/showcart"
          props={props.history}
        />


      <Route
          component={AddressCart}
          path="/addresscart"
          props={props.history}
        />
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
