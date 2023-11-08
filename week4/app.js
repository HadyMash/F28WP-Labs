document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn');
  const input = document.querySelector('#cityInput');
  const weatherInfo = document.querySelector('#weather-info');

  btn.addEventListener('click', async () => {
    const city = input.value;
    if (!city) {
      alert('Please enter a city');
      return;
    }

    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.set('q', city);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('appid', '73c6d89ec2c349fb9a70c8622b92c2c3');

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      const sky = data.weather[0].description;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      const parent = document.createElement('div');
      parent.classList.add('city-info');

      const firstLine = document.createElement('p');
      firstLine.innerHTML = `The weather in ${
        city[0].toUpperCase() + city.slice(1)
      } is ${sky} with a wind speed of ${windSpeed} km/h.`;
      const secondLine = document.createElement('p');
      secondLine.innerHTML = `The temperature is ${temp}°C, but it feels like ${feelsLike}°C and a humidity of ${humidity}%.`;

      parent.appendChild(firstLine);
      parent.appendChild(secondLine);

      weatherInfo.appendChild(parent);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
});
