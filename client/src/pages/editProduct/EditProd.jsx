import React from "react";
import "./EditProd.css";
import { TextField, Typography, Switch, Box, Button,Checkbox } from "@material-ui/core";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {getProductById,getAllCategories,fillObjectWithTheValuesOfOther } from "../../utils.js";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "../../components/snackbars/Snackbar.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import { TagsInput } from "react-tag-input-component";
import {sizeArray,baseUrl,extractCategoricalData} from '../../utils.js';
import { Link } from "react-router-dom";
import axios from "axios";


const EditProduct = () => {
  const [colors,setColors]=useState([]);
  const [sizes,setSizes]=useState([]);
  const [categoryOptions,setCategoryOptions]=useState([]);
  const [product,setProduct]=useState({name:'',title:'',description:'',SKU:'',regularPrice:0,salePrice:0,totalInStock:0,weight:0,length:0,width:0,inStock:false,onSale:false,hotProduct:false,banned:false,colors:null,sizes:null,categories:[],subCategories:[],tags:[],productImages:[]})
  const [snackbarMessage,setSnackbarMessage]=useState("");
  const [isSnackbarOpen,setIsSnackbarOpen]=useState(false);
  var params = useParams();
  //this useEffect gets invoked whenever the component renders
  
  
  const handleSubmit=(e)=>{
    console.log('edited product: ',product)
    alert("submitted")
  }

  useEffect(()=>{
    axios.get(`${baseUrl}/getCategories`)
    .then((res)=>{
      if(!res){
        setSnackbarMessage('could not recieve categories');
        setIsSnackbarOpen(true);
      }else{
        if(res.data.status==="success"){
          var catArray=[];
          res.data.categories.forEach((cat)=>{
            extractCategoricalData(res.data.categories)
          })
          setCategoryOptions(['hey']);
          setSnackbarMessage(`recieved ${res.data.categories.length} categories`);
          setIsSnackbarOpen(true);
        }
      }
    })
    .catch((e)=>{
      setSnackbarMessage(`Error: ${e.message}`);
      setIsSnackbarOpen(true);
    })
  },[])

  useEffect(()=>{
    async function func(){
     getProductById(params.id)
     .then((res)=>{
         if(res.data.status==='success'){
             Object.keys(product).forEach((key)=>{
               setProduct({...product,[key]:res.data.product[key]})
               product[`${key}`]=res.data.product[`${key}`];
             });
             res.data.product['colors'].forEach((color)=>{
               colors.push(color);
               setColors()
             });
             res.data.product['sizes'].forEach((size)=>{
               sizes.push(size);
               setSizes();
             })
             console.log("product: ",product)
         }else{
             alert('error bc');
         }
     })
     .catch((e)=>{
       console.log("error: ",e.message)
     })
    }
   func();
  },[]);
  //component to show errors on page
  
  //this function handles inputs and pushes their values into the product object
  const handleInput = (e) => {
    if(typeof e.target !='undefined'){
      setProduct({...product,[e.target.name]:e.target.value?e.target.value:e.target.checked})
      product[`${e.target.name}`]=e.target.value?e.target.value:e.target.checked;
    }else{
      
    }
  };
  //isn't the name pretty self-explanatory?
  //this is invoked every time the value of sizes or colors is changed
  //renders the main component
  return (
        <>
          <Snackbar open={isSnackbarOpen} setOpen={setIsSnackbarOpen} message={snackbarMessage}/>
            <div className="flexContainer" style={{marginLeft:'20px'}}>
              <div className="flexChild">
                <Box style={{ display: "flex", justifyContent: "right" }}>
                  <Link
                    to="/products"
                    style={{ backgroundColor: "#E0E0E0", marginLeft: "auto" }}
                    component={Button}>
                    Create new
                  </Link>
                </Box>
                <Typography variant="h5" className="textfield">
                  Edit Product {product.name}
                </Typography>
                <TextField
                  className="textField"
                  name="title"
                  value={product.title}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  label="Title"
                />
                <TextField
                  className="textField"
                  name="name"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  label="Name"
                  value={product.name}
                />
                <TextField
                  className="textField"
                  name="SKU"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  label="SKU"
                  disabled
                  value={product.SKU}
                />
                <TextField
                  className="textField"
                  name="regularPrice"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Regular Price"
                  value={product.regularPrice}
                />
                <TextField
                  className="textField"
                  name="salePrice"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Sale Price"
                  value={product.salePrice}
                />
                <TextField
                  className="textField"
                  name="totalInStock"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Stock"
                  value={product.totalInStock}
                />
                <TextField
                  className="textField"
                  name="weight"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={product.weight}
                  variant="outlined"
                  type="number"
                  label="Weight (gram)"
                />
                <TextField
                  className="textField"
                  name="length"
                  value={product.length}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Length (cm)"
                />
                <TextField
                  className="textField"
                  name="width"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  value={product.width}
                  type="number"
                  label="Width (CM)"
                />
                <Autocomplete
                  className="textField"
                  options={[]}
                  value={product.productImages}
                  onChange={(event, value) => handleInput(event)}
                  multiple
                  name="productImages"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="productImages"
                      label=" Images"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  className="textField"
                  options={categoryOptions}
                  onChange={(event, value) => handleInput(event)}
                  multiple
                  value={product.categories}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="categories"
                      label=" Categories"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  className="textField"
                  options={[]}
                  value={product.subCategories}
                  onChange={(event, value) => handleInput(event)}
                  multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="subCategories"
                      label=" Sub-Categories"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  className="textField"
                  options={[]}
                  onChange={(event, value) => handleInput(event)}
                  multiple
                  value={product.tags}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="tags"
                      label=" Tags"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <div style={{ marginBottom: "20px" }}>
                  <TagsInput
                    onChange={e=>handleInput(e)}
                    className="textField"
                    name="sizes"
                    value={sizes}
                    placeHolder="sizes"
                  />
                </div>
                <TagsInput
                  onChange={e=>{handleInput(e)}}
                  className="textField"
                  name="colors"
                  value={colors}
                  placeHolder="colors"
                />
                <Box
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Typography style={{ marginRight: "20px" }}>
                    Is this product on sale?{" "}
                  </Typography>
                  <Switch
                    name="onSale"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    checked={product.onSale}
                    color="primary">
                  </Switch>
                </Box>
                <Box
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Typography style={{ marginRight: "20px" }}>
                    Is this product trending/hot?{" "}
                  </Typography>
                  <Switch
                    name="hotProduct"
                    checked={product.hotProduct}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    color="primary"></Switch>
                </Box>
                <Box
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Typography style={{ marginRight: "20px" }}>
                    Do you want to ban this product?{" "}
                  </Typography>
                  <Switch
                    name="banned"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    checked={product.banned}
                    color="primary">
                  </Switch>
                </Box>
                <Box
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Typography style={{ marginRight: "20px" }}>
                    Is this product in stock?{" "}
                  </Typography>
                  <Switch
                    name="inStock"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    checked={product.inStock}
                    color="primary">
                  </Switch>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Button variant="contained" onClick={e=>{handleSubmit(e)}}>
                    Submit
                  </Button>
                </Box>
              </div>
            </div>
          </>
  );
};
export default EditProduct;
