import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import "./products.css";
import SimpleSnackbar from "../../components/snackbars/Snackbar.jsx";
import Autocomplete from "@mui/material/Autocomplete";
import {sizeArray} from '../../utils.js';
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  TextareaAutosize,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { TagsInput } from "react-tag-input-component";
require("dotenv").config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === "production" ? "" : "http://localhost:9000";

//defining function product
export default function SingleProduct() {
  const subCatRef=useRef();
  const tagsRef=useRef();
  const [categories, setCategories] = useState([]);
  const [subCategories,setSubCategories]=useState([]);
  const [tags,setTags]=useState([])
   //-------------other variables------------//
  //empty product
  const emptyProduct = {
    title: "",
    name: "",
    onSale: false,
    hotProduct: false,
    productImages: [],
    description: "",
    categories: categories,
    subCategories: subCategories,
    tags: tags,
    SKU: "",
    inStock: false,
    colors: [],
    sizes: [],
    regularPrice: null,
    salePrice: null,
    totalInStock: null,
    weight: null,
    length: null,
    width: null,
  };
  //subCategories and tags
  // var subCategories=[];
  // var tags=[]
  //subStates
  const [imageOptions, setImageOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productInStock, setProductInStock] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
 
  
  //setting inStock value of product
  const isProductInStock = (e) => {
    setProductInStock(e.target.value);
  };
  //input handler
  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value.trim() });
  };
  //setting product productImages
  const setProductImages = (arr) => {
    product.productImages = arr;
  };
  //setting if product is on sale
  const setSale = (sale) => {
    product.onSale = sale;
  };
  //setting if product is hot
  const setHot = (hot) => {
    product.hotProduct = hot;
  };
  //post-component render function
  useEffect(() => {
    console.log("setting sizes to ['sizes]");
    setSizes(['sizes']);
    console.log('sizes: ',sizes);
    const fetchData = async () => {
      const rawData = await axios.get(`${baseUrl}/images`);
      var files = [];
      rawData.data.files.forEach((file) => {
        files.push(`/images/getProuctImage/${file}`);
      });
      console.log("raw data: ", rawData);
      setImageOptions(files);
    };
    const fetchCategories = async () => {
      var rawData = await axios(`${baseUrl}/getCategories`);
      const theseCategories = [];
      rawData.data.categories.forEach((cat) => {
        theseCategories.push(cat.category);
      });
      setCategoryOptions(theseCategories);
    };
    fetchData();
    fetchCategories();
  }, []);

  useEffect(()=>{
    setSizes(['size']);
  },[])

  //setting subCategories and tags every time categories changes
  useEffect(() => {
    if(categories.length>1){
      setCategories([`${categories[(categories.length-1)]}`]);
    }
    if (categories.length < 1) {
      setSubCategories([]);
      setTags([]);
    } else {
      axios
        .get(
          `${baseUrl}/categories/getSubCategoriesAndTags/${
            categories[(categories.length-1)]
          }`
        )
        .then((res) => {
          if (res.data.status === "success") {
            setSubCategories(res.data.subCategories);
            setTags(res.data.tags);
            product.categories=categories;
            product.subCategories=res.data.subCategories;
            product.tags=res.data.tags;
          } else {
            setSnackbarMessage('cannot fetch subCategories and tags');
            setIsSnackbarOpen(true);
          }
        })
        .catch((e)=>{
          setSnackbarMessage(`Error: ${e.message}`);
          setIsSnackbarOpen(true);
        })
    }
  }, [categories]);
  //setting product colors
  useEffect(() => {
    product.colors = colors;
  }, [colors]);
  //setting sizes
  useEffect(() => {
    console.log('sizes: ',sizes)
    product.sizes = sizes;
  }, [sizes]);
  //setting productInStock
  useEffect(() => {
    product.inStock = productInStock;
  }, [productInStock]);

  //submitting product
  const submitProduct = async () => {
    console.log("submitting product: ",product);
    var emptyOnes = [];
    for (let i in product) {
      if (typeof product[i] == "string") {
        product[i] = product[i].trim();
      }
    }
    for (let i in product) {
      if (i === "hotProduct" || i === "onSale") {
        continue;
      } else if (typeof product[i] == "object" && product[i] !== null) {
        if (product[i].length < 1) {
          emptyOnes.push(i);
          console.log(i);
          console.log(product[i] + " is erroneous");
        }
      } else if (typeof product[i] === "string") {
        if (product[i] === "" || product[i].length < 1) {
          emptyOnes.push(i);
        }
      } else if (typeof product[i] === "number") {
        if (product[i] < 1) {
          emptyOnes.push(i);
        }
      }
    }
    if (emptyOnes.length < 1) {
      axios.post(`${baseUrl}/products/uploadOne`, product).then((response) => {
        if (response.data.status === "success") {
          setSnackbarMessage("Product Created Successfully");
          setIsSnackbarOpen(true);
        } else if (response.data.error) {
          setSnackbarMessage(response.data.error);
          setIsSnackbarOpen(true);
        } else {
          setSnackbarMessage("Could Not Create Product");
          setIsSnackbarOpen(true);
        }
      });
    } else {
      setSnackbarMessage(`${emptyOnes[0]} Field Cannot Be Empty`);
      setIsSnackbarOpen(true);
    }
  };
  //rendering input
  return (
    <div style={{ marginLeft: "20px" }} className="container">
      <SimpleSnackbar
        message={snackbarMessage}
        propsAnchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isSnackbarOpen}
        setOpen={setIsSnackbarOpen}
      />
      <div className="flexContainer">
        <div className="flexChild">
          <Typography
            style={{ fontSize: "20px" }}
            variant="subtitle2"
            className="textField">
            Describe the product
          </Typography>
          <TextField
            name="title"
            onChange={(e) => {
              handleInput(e);
            }}
            className="textField"
            label="Title"
            variant="outlined"
          />
          <TextField
            name="name"
            onChange={(e) => {
              handleInput(e);
            }}
            className="textField"
            label="Name"
            variant="outlined"
          />
          <Autocomplete
            className="textField"
            onChange={(event, value) => setProductImages(value)}
            options={imageOptions}
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

          <TextareaAutosize
            className="textArea"
            placeholder="Description"
            name="description"
            minRows={3}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <Autocomplete
            onChange={(event, value) => setCategories(value)}
            className="textField"
            options={categoryOptions}
            value={categories}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Autocomplete
            onChange={(event, value) => setSubCategories(value)}
            className="textField"
            ref={subCatRef}
            options={[]}
            value={subCategories}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sub-Categories"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Autocomplete
            onChange={(event, value) => setTags(value)}
            className="textField"
            options={[]}
            ref={tagsRef}
            value={tags}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <TextField
            className="textField"
            name="SKU"
            onChange={(e) => {
              handleInput(e);
            }}
            label="SKU"
            variant="outlined"
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel
                style={{ width: "200px" }}
                id="demo-simple-select-label">
                Stock Status
              </InputLabel>
              <Select
                name="inStock"
                onChange={(e) => {
                  isProductInStock(e);
                }}
                style={{ width: "200px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Stock Status">
                <MenuItem value={true}>InStock</MenuItem>
                <MenuItem value={false}>OutOfStock</MenuItem>
              </Select>
            </FormControl>
            <Box
              className="textField"
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}>
              <Typography variant="subtitle2">On Sale</Typography>
              <Checkbox
                onChange={(e) => {
                  setSale(e.target.checked);
                }}
              />
            </Box>
            <Box
              className="textField"
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}>
              <Typography variant="subtitle2">Hot Product</Typography>
              <Checkbox
                onChange={(e) => {
                  setHot(e.target.checked);
                }}
              />
            </Box>
          </Box>
          <Button
            className="textfield"
            size="large"
            style={{ color: "black", marginTop: "20px" }}
            variant="contained"
            onClick={submitProduct}>
            Submit
          </Button>
        </div>
        <div className="flexChild">
          <Typography
            style={{ fontSize: "20px" }}
            variant="subtitle2"
            className="textField">
            Availability
          </Typography>
          <div style={{ marginBottom: "20px" }}>
            <TagsInput
              value={colors}
              onChange={setColors}
              className="textField marginBottom"
              name="subCategories"
              placeHolder="colors"
            />
          </div>
          <TagsInput
            value={sizeArray}
            onChange={setSizes}
            className="textField"
            name="subCategories"
            placeHolder="sizes"
          />
          <TextField
            name="regularPrice"
            onChange={(e) => {
              handleInput(e);
            }}
            type="number"
            style={{ marginTop: "20px" }}
            className="textField"
            label="Regular Price"
            variant="outlined"
          />
          <TextField
            type="number"
            name="salePrice"
            onChange={(e) => {
              handleInput(e);
            }}
            className="textField"
            label="Sale Price"
            variant="outlined"
          />
          <TextField
            type="number"
            name="totalInStock"
            onChange={(e) => {
              handleInput(e);
            }}
            className="textField"
            label="Stock"
            variant="outlined"
          />

          <Typography
            style={{ fontSize: "20px" }}
            variant="subtitle2"
            className="textField">
            Dimensions and weight
          </Typography>
          <TextField
            name="weight"
            onChange={(e) => {
              handleInput(e);
            }}
            type="number"
            className="textField"
            label="Weight [Grams]"
            variant="outlined"
          />
          <TextField
            name="length"
            onChange={(e) => {
              handleInput(e);
            }}
            type="number"
            className="textField"
            label="Length [Centimeters]"
            variant="outlined"
          />
          <TextField
            name="width"
            onChange={(e) => {
              handleInput(e);
            }}
            type="number"
            className="textField"
            label="Width [Centimeters]"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
}
