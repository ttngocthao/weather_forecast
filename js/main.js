/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

function loadWeather(){
    var zip = document.getElementById('zip').value;
    //handle error in case no zip code input
    if(zip ===''){
        zip = '2643743';
    }
    var currentWeatherPath = "http://api.openweathermap.org/data/2.5/weather?id=" + zip +'&units=metric&APPID=088a0ac4bc2a245e4028db50368dab23';
    var forecastPath = "http://api.openweathermap.org/data/2.5/forecast?id=" + zip +'&units=metric&APPID=088a0ac4bc2a245e4028db50368dab23';
    //london id is 2643743 stanwell 2637035 singapore 1880252
    // GET THE CONDITIONS
weatherConditions.open('GET',currentWeatherPath, true);
weatherConditions.responseType = 'text';
weatherConditions.send(null);
    
    // GET THE FORECARST
weatherForecast.open('GET',forecastPath, true);
weatherForecast.responseType = 'text'; 
weatherForecast.send();

}

weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        document.getElementById('location').innerHTML = cObj.name;
        document.getElementById('weather').innerHTML = cObj.weather[0].main;
        document.getElementById('temperature').innerHTML = cObj.main.temp.toFixed(1);
        document.getElementById('desc').innerHTML = cObj.weather[0].description;

    } //end if
}; //end function



weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
    console.log(fObj);
    var dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        
    //Day 1
    var date = new Date(fObj.list[7].dt_txt.slice(0,10)); //convert date string into date
    document.getElementById('r1c1').innerHTML = dayOfWeek[date.getDay()]; ;
    document.getElementById('r1c3').innerHTML = fObj.list[4].main.temp_max.toFixed(1) + "\xB0"  ;
    document.getElementById('r1c4').innerHTML = fObj.list[1].main.temp_min.toFixed(1) + "\xB0";
    var imgPath = "https://openweathermap.org/img/w/" + fObj.list[8].weather[0].icon +".png";    //get image for the weather
    console.log(imgPath);
    document.getElementById('r1c2').src = imgPath  ;
    
    //Day 2
    var date = new Date(fObj.list[15].dt_txt.slice(0,10));
    document.getElementById('r2c1').innerHTML = dayOfWeek[date.getDay()]; ;
    document.getElementById('r2c3').innerHTML = fObj.list[12].main.temp_max.toFixed(1) + "\xB0"  ;
    document.getElementById('r2c4').innerHTML = fObj.list[9].main.temp_min.toFixed(1) + "\xB0";
    var imgPath = "https://openweathermap.org/img/w/" + fObj.list[16].weather[0].icon +".png";
    document.getElementById('r2c2').src = imgPath  ;

    //Day 3
    var date = new Date(fObj.list[23].dt_txt.slice(0,10));
    document.getElementById('r3c1').innerHTML = dayOfWeek[date.getDay()]; ;
    document.getElementById('r3c3').innerHTML = fObj.list[20].main.temp_max.toFixed(1) + "\xB0"  ;
    document.getElementById('r3c4').innerHTML = fObj.list[17].main.temp_min.toFixed(1) + "\xB0";
    var imgPath = "https://openweathermap.org/img/w/" + fObj.list[24].weather[0].icon +".png";
    document.getElementById('r3c2').src = imgPath  ;


} //end if
}; //end function

loadWeather();//default page when it is loaded.
