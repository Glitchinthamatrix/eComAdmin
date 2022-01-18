import React from "react";
import {useRef,useEffect} from "react";
import "./Categories.css";
import { TagsInput } from "react-tag-input-component";
import SimpleSnackbar from "../../components/snackbars/Snackbar.jsx";
import BasicTable from './CategoryTable.jsx';
import axios from 'axios';
require('dotenv').config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === 'production' ? '' : 'http://localhost:9000';


export default function Categories() {
  const categoryInput=useRef();
  const [subCategories, setSubCategories] = React.useState([]);
  const [categories,setCategories]=React.useState([])
  const [tags, setTags] = React.useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [postLoading, setPostLoading] = React.useState(false);
  const URL=process.env.NODE_ENV==='development'?"http://localhost:9000":'';

  const toggleSnack = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    var category = categoryInput.current.value;
    console.log('current: ',category)
    if (
      typeof category !== "string" ||
      category.length < 1 ||
      tags.length < 1 ||
      subCategories.length < 1
    ) {
      setSnackbarMessage("Please fill in the details properly");
      setPostLoading(false);
      toggleSnack();
    } else {
      setPostLoading(true);
      const rawResponse = await fetch(
        `${URL}/categories/addCategory`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: category,
            tags:tags,
            subCategories:subCategories
          }),
        }
      );
      const data = await rawResponse.json();
      if (data.status === "success") {
        setSnackbarMessage("Category Created");
        setPostLoading(false);
        toggleSnack();
      } else if(data.error) {
        setSnackbarMessage("Error: "+data.error);
        setPostLoading(false);
        toggleSnack();
      }
      setPostLoading(false);
    }
  };

useEffect(()=>{
const fetchData=async()=>{
  var rawData=await axios.get(`${baseUrl}/getCategories`);
  setCategories(rawData.data.categories)
}
fetchData();
},[])
const fetchEm=async()=>{
  var rawData=await axios.get(`${baseUrl}/getCategories`);
  rawData.data.categories?setSnackbarMessage(`Fetched ${rawData.data.categories.length} Categories`):setSnackbarMessage('Could Not Fetch Categories');
  setIsSnackbarOpen(true);
  if(rawData.data.categories){
    setCategories(rawData.data.categories)
  }else{

  }
}
  return (
    <div className="newUser" style={{marginLeft:'20px'}}>
      <h1 className="newUserTitle">New Category</h1>
      <SimpleSnackbar
        message={snackbarMessage}
        propsAnchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isSnackbarOpen}
        setOpen={setIsSnackbarOpen}
      />
      <form
        action="#"
        method="POST"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label htmlFor="">Category</label>
          <input
            ref={categoryInput}
            type="text"
            name="category"
            placeholder="Category"
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Sub-Categories</label>
          <TagsInput
            value={subCategories}
            onChange={setSubCategories}
            name="subCategories"
            placeHolder="Sub-Categories"
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Tags</label>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="tags"
          />
        </div>
        <button
          className="newUserButton"
          onClick={(e) => {
            submitForm(e);
          }}
        >
          Submit{" "}
          <span>
            {postLoading ? (
              <i className="fa fa-spinner fa-spin" style={{ fontSize: "14px" }}></i>
            ) : (
              ""
            )}
          </span>
        </button>
      </form>
      <div style={{marginTop:'20px'}}>
      <h4 className="newUserTitle">Total Categories: {categories.length}</h4>
      <button className="newUserButton" style={{marginBottom:'20px'}} onClick={e=>{fetchEm()}}>{categories?'Refresh':'Fetch'}</button>
      
      {categories?<BasicTable rows={categories} setSnackbarMessage={setSnackbarMessage} setIsSnackbarOpen={setIsSnackbarOpen}/>:''}
      </div>
    </div>
  );
}
