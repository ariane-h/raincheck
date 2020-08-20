const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
	const { cityDets, weather, forecast, forecastContent } = data;

	details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
		    <div class="my-3">${weather.WeatherText}</div>
				<div class="display-4 my-4">
				<span>${weather.Temperature.Metric.Value}</span>
				<span>&deg;C</span>
			</div>
			<div class="my-4">
				<div class="d-flex flex-column text-lowercase justify-content-center my-4">
					<div >${forecast.Headline.Text}</div>
				</div>
				<div class="d-flex justify-content-center my-4">
						${forecastContent}
				</div>
			</div>
	`;

	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute("src", iconSrc);

	let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
	time.setAttribute("src", timeSrc);

	if (card.classList.contains("d-none")) {
		card.classList.remove("d-none");
	}
};

const updateCity = async (city) => {
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);
	const forecast = await getForecast(cityDets.Key);
	const forecastContent = await generateForecastContent(
		forecast.DailyForecasts
	);

	return { cityDets, weather, forecast, forecastContent };
};

cityForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

	updateCity(city)
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));

	localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
	updateCity(localStorage.getItem("city"))
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));
}
