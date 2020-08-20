const key = configKey;

const getForecast = async (locationKey) => {
	const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
	const query = `${locationKey}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

const getWeather = async (locationKey) => {
	const base = "http://dataservice.accuweather.com/currentconditions/v1/";
	const query = `${locationKey}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];
};

const getCity = async (city) => {
	const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
	const query = `?apikey=${key}&q=${city}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];
};

const generateForecastContent = (forecast) => {
	return new Promise((resolve, reject) => {
		let content = "";
		forecast.forEach((day) => {
			const dayForecast = `<div class="d-flex flex-column mb-3">
				<div class="p-2">${formatDate(day.Date)}</div>
					<div class="p-2"><img class="forecast-icon" src="${setWeatherIcon(
						day.Day.Icon
					)}"  />
				</div>
			</div>`;
			content += dayForecast;
		});
		resolve(content);
	});
};

const setWeatherIcon = (iconKey) => {
	return `img/icons/${iconKey}.svg`;
};

const formatDate = (date) => {
	return dateFns.format(date, "ddd Do");
};
