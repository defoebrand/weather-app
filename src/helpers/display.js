import contentCreator from './contentCreator';
import {
  capFirst,
  clearContent,
} from './helpers';

const chosenUnit = () => {
  const unitValue = document.getElementById('C');
  let unit = 'C';
  if (unitValue.checked !== true) {
    unit = 'F';
  }
  return unit;
};

const chooseSpeed = (unit) => {
  let speed = 'm/s';
  if (unit !== 'C') {
    speed = 'mph';
  }
  return speed;
};

const imperialOrMetric = (unitSym) => {
  let unit = 'metric';
  if (unitSym !== 'C') {
    unit = 'imperial';
  }
  return unit;
};

const printWeather = (weatherJson) => {
  const weatherBox = document.querySelector('.weatherBox');
  clearContent(weatherBox);
  weatherBox.appendChild(contentCreator.withText('p', 'Location:'));
  weatherBox.appendChild(contentCreator.withText('p', `${weatherJson.name}`, 'cityName'));
  weatherBox.appendChild(contentCreator.withText('p', `${weatherJson.sys.country}`));
  weatherBox.appendChild(contentCreator.withText('p', 'Temperature:'));
  weatherBox.appendChild(contentCreator.withHTML('p', `Feel: ${weatherJson.main.feels_like}<sup>°${chosenUnit()}</sup>`));
  weatherBox.appendChild(contentCreator.withHTML('p', `Actual: ${weatherJson.main.temp}<sup>°${chosenUnit()}</sup>`));
  weatherBox.appendChild(contentCreator.withText('p', 'Wind:'));
  weatherBox.appendChild(contentCreator.withText('p', `${weatherJson.wind.speed} ${chooseSpeed(chosenUnit())}`));
  weatherBox.appendChild(contentCreator.withText('p', `${weatherJson.wind.deg}°`));
  weatherBox.appendChild(contentCreator.withText('p', `Humidity: ${weatherJson.main.humidity}%`));
  weatherBox.appendChild(contentCreator.withText('p', `Clouds: ${weatherJson.clouds.all}%`));
  weatherBox.appendChild(contentCreator.withText('p', `${capFirst(weatherJson.weather[0].description)}`, 'description'));
};

const getWeather = async (cityName) => {
  const unit = imperialOrMetric(chosenUnit());
  const errors = document.querySelector('.errors');
  try {
    const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c718936db7e8ffb4daa086761e71f389&units=${unit}`, {
      mode: 'cors'
    });
    const weatherJson = await weatherResult.json();
    errors.textContent = '';
    printWeather(weatherJson);
  } catch (err) {
    errors.textContent = err;
  }
};

const runSearch = (cityInput, printTime) => {
  const before = Date.now();
  getWeather(cityInput.value).then(() => {
    const after = Date.now();
    printTime.textContent = `Your request took ${((after - before) / 1000)} seconds to complete`;
  });
  cityInput.value = '';
};

export {
  getWeather,
  runSearch,
};