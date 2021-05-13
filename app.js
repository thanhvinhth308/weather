const asyncRequest=require("async-request");
const { error } = require("console");
const getWeather= async(location)=>{
    const accessKey="d76b5cd4a631e1a3679a09831343d1d7";
    const url=`http://api.weatherstack.com/current?access_key=${accessKey}&query=${location}`;
    try{
        const res=await asyncRequest(url);
        const data=JSON.parse(res.body);
        const weather={
            region:data.location.region,
            country:data.location.country,
            temperature:data.current.temperature,
            wind_speed:data.current.wind_speed,
            precip:data.current.precip,
            cloudcover:data.current.cloudcover,
        };
        console.log(weather); 
        return weather;
    }
    catch(error){
        console.log("haha");
        console.log(error.message);
        console.log("haha");
        return error;
    }
}
// getWeather("tokyo");
const express=require('express');
const app=express();
const path=require("path");
const pathPublic=path.join(__dirname,"./public");
app.use(express.static(pathPublic));
app.set("view engine","hbs");
app.get("/",async(req,res)=>{
    const location= req.query.address;  
    const weather=await getWeather(location);
    console.log(weather);
    if(location){
        res.render('weather',{
            region:weather.region,
            country:weather.country,
            temperature:weather.temperature,
            wind_speed:weather.wind_speed,
            precip:weather.precip,
            cloudcover:weather.cloudcover,
            status:true,
        });
    }
    else{
        res.render('weather',{
            status:false,
        });
    }
})
const port=7000
app.listen(port,()=>{
    console.log(`ung dung chay thanh cong ${port}`);
    console.log(pathPublic);
})
