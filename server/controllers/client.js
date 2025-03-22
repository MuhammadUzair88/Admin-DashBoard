import Product from "../models/product.js"
import ProductStat from "../models/productStat.js";
import Transaction from "../models/Transaction.js";
import User from './../models/User.js';
import getCountryIso3 from "country-iso-2-to-3";


export const getProducts =async(req,res)=>{
    try{
        const products=await Product.find({});

        const productsWithStats=await Promise.all(products.map(async(product)=>{
            const stat=await ProductStat.find({productId:product._id});
            return {
                ...product._doc,
                stat,
            }
        }));
        res.status(200).json(productsWithStats);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
    
} 

export const getCustomers = async (req, res) => {
    try {
      const customers = await User.find({ role: "user" }).select("-password");
      res.status(200).json(customers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const getTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find({});
      res.status(200).json(transactions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


//   //Geography

//   export const getGeography=async(req,res)=>{
    
//    try{
//     const users=await User.find();
//     const mappedLocations=users.reduce((acc,{country})=>{
//         const countryISO3=getCountryIso3(country);
//         if(!acc[countryISO3]){
//             acc[countryISO3]=0;
//         }
//         acc[countryISO3]++;
//         return acc;
//     },{});
   
//     const formattedLocations=Object.entries(mappedLocations).map(([country,count])=>{
//         return {id:country,value:count};
//     });
//     res.status(200).json(formattedLocations);
//    }
//   catch(error){
//     res.status(404).json({message:error.message});
//   }

//   }


  // alternative way for geography function
    

  export const getGeography = async (req, res) => {
    try {
      const users = await User.find();
      const mappedLocations = {};
  
      // 🔹 Loop through each user and count the countries
      for (let i = 0; i < users.length; i++) {
        const countryISO3 = getCountryIso3(users[i].country);
        
        // If country does not exist in mappedLocations, initialize it to 0
        if (!mappedLocations[countryISO3]) {
          mappedLocations[countryISO3] = 0;
        }
  
        // Increment count for that country
        mappedLocations[countryISO3]++;
      }
  
      // 🔹 Convert the mapped object into an array of objects
      const formattedLocations = [];
      for (let country in mappedLocations) {
        formattedLocations.push({ id: country, value: mappedLocations[country] });
      }
  
      // 🔹 Send response
      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  



