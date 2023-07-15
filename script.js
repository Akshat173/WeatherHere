// Definilng some variables
document.getElementById('page-container').style.visibility = "hidden"

// Uv index description function
const UvInd =(num)=>{
	if(num>=0 && num<3){
		return "Low"
	}
	else if(num>=3 && num<6){
		return "Moderate"
	}
	else if(num>=6 && num<8){
		return "High"
	}
	else if(num>=8 && num<11){
		return "Very High"
	}
	else{
		return "Extreme"
	}
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

// Fetching weather data
let weatherTeller = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ef7fd927e0mshd2b8018838d3beap17b0d5jsn2cf0d5e8f32b',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            let w2 = fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`, options)
            w2.then((response)=>{
                return response.json()
            }).then((forecasts)=>{
                console.log(forecasts)
                    document.getElementById('animation').style.visibility = "hidden"
                    document.getElementById('page-container').style.visibility = "visible"
        
                    // Day and night
                    if(forecasts.current.is_day){
                        document.getElementById("png").innerHTML = `
                        <img class="img-sm" src="/WeatherHere/images/sun.png" height="60px" alt=""><span class="mb-1 mx-2 fs-1 fw-bolder tempr">${forecasts.current.temp_c}°C</span>
                    `
                    }
                    else{
                        document.getElementById("png").innerHTML = `
                        <img class="img-sm" src="/WeatherHere/images/moon.jpg" height="50px" alt=""><span class="mb-1 mx-2 fs-1 fw-bolder tempr">${forecasts.current.temp_c}°C</span>
                    `
                    }
                    
        
                // today weather
                document.getElementById("today-weather-container").innerHTML =` 
                    <p class="fw-semibold fs-6 text-capitalize mb-0">${forecasts.location.name}, ${forecasts.location.country}</p>
                    <p class="fw-semibold fs-6 text-capitalize mb-0">${forecasts.current.condition.text}</p>
                    <p class="fw-semibold fs-6 mb-0">Feels like ${forecasts.current.feelslike_c}°C</p>
                    <p class="fw-semibold fs-6 mb-0">${forecasts.location.localtime.substr(0, 10)}, ${forecasts.location.localtime.substr(10)}</p>
                `
        
                // Wind degree
                document.getElementById("arrow-head").style.transform = `rotate(${forecasts.current.wind_degree}deg)`
                // Wind speed and max-min temprature
                document.getElementById("add-info-text").innerHTML =`
                <p class="fw-semibold fs-6 mb-0">Wind Speed: ${forecasts.current.wind_kph}km/h</p>
                <p class="fw-semibold fs-6 mb-0">Wind direction:  ${forecasts.current.wind_dir}</p>
                `
        
                // Other informations (like: humidity and prescription)
                document.getElementById("additional").innerHTML = `
                <p class="fw-bolder fs-5 mt-2">Other informations:</p>
                <p class="mb-2 fw-semibold">Pressure: ${forecasts.current.pressure_mb} mb</p>
                <p class="mb-2 fw-semibold">Visibility: ${forecasts.current.vis_km} km</p>
                <p class="mb-1 fw-semibold">UV index: ${UvInd(forecasts.current.uv)} </p>
                <div class="progress mb-2" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar" style="width: ${((forecasts.current.uv)/11)*100}%"></div>
                </div>
                <p class="mb-0 fw-semibold">Humidity: ${forecasts.current.humidity}%</p>
                <div class="progress mb-2" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar" style="width: ${forecasts.current.humidity}%"></div>
                </div>
                <p class="mb-0 fw-semibold">Precipitation: ${forecasts.current.precip_mm} mm</p>
                <div class="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar" style="width:${((forecasts.current.precip_mm)/6)*100}%"></div>
                </div>`
                    
            })
        });
    }
    else{
        document.getElementById("today-weather-container").innerHTML = `
        <p class="mb-0 fw-semibold">Please allow location access to get weather information of your location...</p>
        `
        console.log("Geolocation is not supported by this browser.");
    }
	
};
weatherTeller();