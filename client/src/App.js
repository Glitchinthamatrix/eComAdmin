//checking git commits
import Topbar from "./components/Topbar/Topbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "./app.css";
import Home from "./pages/home/Home.jsx";
import React from "react";
import Categories from './pages/Categories/Categories.jsx';
import UploadImages from './pages/images/UploadImages.jsx';
import UserList from './pages/userList/UserList.jsx';
import Products from './pages/products/Products.jsx';
import Reports from './pages/reports/Reports.jsx';
import ManageProducts from './pages/manageProducts/ManageProducts.jsx';
import Transactions from './pages/transactions/Transactions.jsx';
import EditProduct from './pages/editProduct/EditProd.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/categories">
              <Categories />
            </Route>
            <Route exact path="/images">
              <UploadImages />
            </Route>
            <Route exact path="/userList">
              <UserList />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/reports">
              <Reports/>
            </Route>
            <Route exact path="/manageProducts">
              <ManageProducts/>
            </Route>
            <Route exact path="/editProduct/:id">
              <EditProduct/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
