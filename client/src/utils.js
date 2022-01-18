import axios from 'axios';
require('dotenv').config();
export const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:9000";

export const getProductById = async(id) => {
    console.log('in utils.getProdbyid')
    var rawData = await axios.get(`${baseUrl}/products/${id}`);
    console.log("rawData in utils: ", rawData);
    return rawData;
};

export const fillObjectWithTheValuesOfOther = (objectWithValues, objectNeedsValues) => {
    Object.keys(objectNeedsValues).forEach((key) => {
        if (typeof objectWithValues[`${key}`] !== "undefined") {
            objectNeedsValues[key] = objectWithValues[`${key}`];
        } else {

        }
    })
    return objectNeedsValues;
}
export const getAllCategories = async() => {
    var rawData = await axios(`${baseUrl}/getCategories`);
    console.log("categories: ", rawData.data.categories);
    return rawData.data.categories;
}
export const sizeArray = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']

export const extractCategoricalData = (categories) => {
    var cats = [];
    var subCats = [];
    var tags = [];
    Array.from(categories).forEach((cat, index) => {
      console.log(`categry`)
    });
    alert("extracted")
    console.log({ categories: cats, subCategories: subCats, tags: tags })
}