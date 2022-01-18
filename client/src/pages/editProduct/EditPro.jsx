import React from "react";
import "./EditProd.css";
import { TextField, Typography, Switch, Box, Button } from "@material-ui/core";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {getProductById,getAllCategories,fillObjectWithTheValuesOfOther } from "../../utils.js";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "../../components/snackbars/Snackbar.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import { TagsInput } from "react-tag-input-component";
import { Link } from "react-router-dom";


const EditProduct = () => {
  const pushData=(key,obj,provider)=>{
    console.log("setting "+key+ " to "+ provider[`${key}`]);
    for(let cat of provider[`${key}`]){
      obj.push(cat);
    }
    console.log(`${key}: ${obj}`)
  }
  const [fetchedCategories,setFetchedCategories]=useState([]);
  const [fetchedSubCategories,setFetchedSubCategories]=useState([]);
  const [fetchedTags,setFetchedTags]=useState([]);
  const [fetchedColors,setFetchedColors]=useState([]);
  const [fetchedSizes,setFetchedSizes]=useState([]);
  const [fetchedImages,setFetchedImages]=useState([]);
  const [loadError, setLoadError] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([])
  const [imageOptions, setImageOptions] = useState([]);
  const [product, setProduct] = useState({title:null,name:null,SKU:null,regularPrice:null,salePrice:null,totalInStock:null,weight:null,length:null,width:null,productImages:null,categories:[],subCategories:[],tags:[],sizes:[],colors:[],onSale:null,hotProduct:null,banned:null,inStock:null});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [componentLoaded,setComponentLoaded]=useState(false);
  
  var params = useParams();
  //this useEffect gets invoked whenever the component renders
  useEffect(()=>{
   async function func(){
     getProductById(params.id)
     .then((res)=>{
       console.log("fecthed product: ",res.data.product);
       Object.keys(product).forEach((key)=>{
        switch(key){
          case 'categories': 
              pushData('categories',fetchedCategories,res.data.product);
              break;
          case 'colors': 
              pushData('colors',fetchedColors,res.data.product);
              break;  
          case 'productImages': 
              pushData('productImages',fetchedImages,res.data.product);
              break;
          case 'sizes': 
              pushData('sizes',fetchedSizes,res.data.product);
              break;  
          case 'subCategories': 
              pushData('subCategories',fetchedSubCategories,res.data.product);
              break;
          case 'tags': 
              pushData('tags',fetchedTags,res.data.product);
              break;        
          default:
            setProduct({...product,[`${key}`]:res.data.product[key]});
        }
        console.log(`set ${key}, to value ${product[key]}`)
       })
       console.log(`product after loop`)
       console.log(product)
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
      alert(`${e.target.name}:${e.target.value?e.target.value:e.target.checked}`)
      setProduct({...product,'onSale':e.target.value?e.target.value:e.target.checked});
      console.log(product);
  };
  //isn't the name pretty self-explanatory?

  //this is invoked every time the value of sizes or colors is changed
const {title,name,SKU,regularPrice,salePrice,totalInStock,weight,height,length,width,images,categories,subCategories,tags,sizes,colors,onSale,hotProduct,banned,inStock}=product;
  //renders the main component
  const arr=['abc','def'];
  
  return (
    <div style={{ marginLeft: "20px" }} className="container">
      <Snackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={setSnackbarMessage}
      />
      {/* if loading there is a page-loading error ErrorMessage component would be rendered */}
      {loadError ? (
        <ErrorMessage error={loadError} />
      ) : (
        <>
          {/* this is the main component */}
          <>
            <div className="flexContainer">
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
                  Edit Product
                </Typography>
                <TextField
                  className="textField"
                  name="title"
                  value={product['title']}
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
                  value={product.name}
                  variant="outlined"
                  label="Name"
                />
                <TextField
                  className="textField"
                  name="SKU"
                  value={product['SKU']}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  label="SKU"
                />
                <TextField
                  className="textField"
                  name="regularPrice"
                  value={product['regularPrice']}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Regular Price"
                />
                <TextField
                  className="textField"
                  name="salePrice"
                  value={product['salePrice']}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Sale Price"
                />
                <TextField
                  className="textField"
                  name="totalInStock"
                  value={product['totalInStock']}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Stock"
                />
                <TextField
                  className="textField"
                  name="weight"
                  value={product['weight']}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Weight (gram)"
                />
                <TextField
                  className="textField"
                  name="length"
                  value={product['length']}
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
                  value={product['width']}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  variant="outlined"
                  type="number"
                  label="Width (CM)"
                />
                <Autocomplete
                  className="textField"
                  options={imageOptions}
                  value={fetchedImages}
                  onChange={(event, value) => handleInput(event)}
                  multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="images"
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
                  value={fetchedCategories}
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
                  options={subCategories}
                  value={fetchedSubCategories}
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
                  options={tags}
                  onChange={(event, value) => handleInput(event)}
                  multiple
                  value={fetchedTags}
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
                    onChange={setFetchedSizes}
                    className="textField"
                    name="sizes"
                    value={fetchedSizes}
                    placeHolder="sizes"
                  />
                </div>
                <TagsInput
                  onChange={setFetchedColors}
                  value={fetchedColors}
                  className="textField"
                  name="subCategories"
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
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    color="primary"
                    checked={false}></Switch>
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
                    color="primary"
                    checked={false}>
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
                    color="primary"
                    checked={false}></Switch>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Button variant="contained">
                    Submit
                  </Button>
                </Box>
              </div>
            </div>
          </>
          {/* main component ends */}
        </>
      )}
    </div>
  );
};
export default EditProduct;
