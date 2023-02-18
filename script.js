// Definilng some variables
let time = new Date()
let day_arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let month_arr = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]


// UV index discription function
const uv_discription = (val) =>{
	if(val<=2){
		return "low";
	}
	else if(val<=5){
		return "Moderate";
	}
	else if(val<=7){
		return "High";
	}
	else if(val<=10){
		return "Very High";
	}
	else{
		return "Extreme";
	}
}
// Fetching weather data
let weatherTeller = async (city, country) => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'ef7fd927e0mshd2b8018838d3beap17b0d5jsn2cf0d5e8f32b',
			'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
		}
	};
	let w2 = fetch(`https://aerisweather1.p.rapidapi.com/forecasts/${city},${country}`, options)
	w2.then((response)=>{
		return response.json()
	}).then((forecasts)=>{
		console.log(forecasts)
		if(forecasts.success){
			let allForecasts = (forecasts.response[0].periods)
			// today weather
			document.getElementById("today-weather-container").innerHTML =` 
				<h1 class="mb-1 fw-bolder">${allForecasts[0].avgTempC}°C</h1>
				<p class="fw-semibold fs-6 text-capitalize mb-0">${allForecasts[0].weather}</p>
				<p class="fw-semibold fs-6 mb-0">Feels like ${allForecasts[0].avgFeelslikeC}°C</p>
				<p class="fw-semibold fs-6 text-capitalize mb-0">${city}, ${forecasts.response[0].place.country}</p>
				<p class="fw-semibold fs-6 mb-0">${time.getDate() + " " + month_arr[time.getMonth()] + " " + time.getFullYear() + ", " + time.getHours() + ":" + time.getMinutes()}, ${day_arr[time.getDay()]}</p>
			`

			// Wind degree
			document.getElementById("arrow-head").style.transform = `rotate(${allForecasts[0].windDirDEG}deg)`
			// Wind speed and max-min temprature
			document.getElementById("add-info-text").innerHTML =`
			<p class="fw-semibold fs-6 mb-0">Wind: ${allForecasts[0].windSpeedKPH} km/h</p>
			<p class="fw-semibold fs-6 mb-0">Max/min: ${allForecasts[0].maxTempC}°C/${allForecasts[0].minTempC}°C</p>
			`

			// Other informations (like: humidity and prescription)
			document.getElementById("additional").innerHTML = `
			<p class="fw-bolder fs-5 mt-2">Other informations:</p>
			<p class="mb-2 fw-semibold">Pressure: ${allForecasts[0].pressureMB} hPa</p>
			<p class="mb-2 fw-semibold">Visibility: ${allForecasts[0].visibilityKM} km</p>
			<p class="mb-1 fw-semibold">UV index: ${allForecasts[0].uvi} (${uv_discription(allForecasts[0].uvi)}) </p>
			<div class="progress mb-2" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  			<div class="progress-bar" style="width: ${allForecasts[0].uvi*100/11}%"></div>
			</div>
			<p class="mb-0 fw-semibold">Humidity: ${allForecasts[0].humidity}%</p>
			<div class="progress mb-2" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  			<div class="progress-bar" style="width: ${allForecasts[0].humidity}%"></div>
			</div>
			<p class="mb-0 fw-semibold">Precipitation: ${allForecasts[0].precipMM}%</p>
			<div class="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  			<div class="progress-bar" style="width: ${allForecasts[0].precipMM}%"></div>
			</div>`
			
			// Forecasts
			document.getElementById('forecast').firstElementChild.innerHTML = `
			<p class="fs-5 fw-bolder mt-2 mb-0">Forecasts:</p>
			<hr>
			`
			document.getElementById('forecast').lastElementChild.innerHTML = ""
			for(let i=1; i<allForecasts.length; i++){
				document.getElementById('forecast').firstElementChild.nextElementSibling.innerHTML += `
				<div class="mt-0 mb-0 forecast-items">
				<div class="forecast-info">
					<p class="mb-0 fw-bold">${day_arr[time.getDay() + i] + " " + allForecasts[i].dateTimeISO.substr(8, 2)}</p>
					<p class="mb-0 fw-semibold">${allForecasts[i].avgTempC}°C (${allForecasts[i].weather})</p>
					<p class="mb-0 fw-semibold">Max/min: ${allForecasts[i].maxTempC}°C/${allForecasts[i].minTempC}°C</p>
					<p class="mb-0 fw-semibold">Wind: ${allForecasts[i].windSpeedKPH} km/h</p>
				</div>
				<div class="px-2 forecast-add">
					<p class="mb-0 fw-semibold">Humidity: ${allForecasts[i].humidity}%</p>
					<p class="mb-0 fw-semibold">Precipitation: ${allForecasts[i].precipMM}%</p>
				</div>
			</div>
			<hr>
				`
			}	
		}
	})
}

document.getElementById('search-button').onclick =()=>{
	weatherTeller(document.getElementById('country').value, document.getElementById('state').value)
}