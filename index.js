const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    
    const APIKey = '1894ad0a6bbb5bc12c84b9c190261955';
    const city = document.querySelector('.search-box input').value;

    const API_KEY = `prj_live_pk_bc40b3ea3d71f83ab53f6783f02044b7acdfe8e8`;
     // Replace with your OpenCage Geocoder API key

function getLongitude(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${API_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return result.geometry.lng;
      } else {
        throw new Error('Unable to find coordinates for the specified city.');
      }
    });
}

function getLatitude(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${API_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return result.geometry.lat;
      } else {
        throw new Error('Unable to find coordinates for the specified city.');
      }
    });
}

search.addEventListener('click', () => {
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }



            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    image.onclick = function () {
                        window.location.href = 'https://8th.io/68qf7';
                      };
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    image.onclick = function () {
                        window.location.href = 'https://8th.io/vzctv';
                      };
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    image.onclick = function () {
                        window.location.href = 'https://example.com/snow';
                      };
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    image.onclick = function () {
                        window.location.href = 'https://8th.io/jhubp';
                      };
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    image.onclick = function () {
                        window.location.href = 'https://8th.io/ghtcw';
                      };
                    break;

                default:
                    image.src = '';
           
                    const myHeaders = new Headers();
                    myHeaders.append("spire-api-key", "FHTifEGYFnTDnuRC8GiWmwW3BbT4brfQ");
                    myHeaders.append("Content-Type", "application/json");
                
                    fetch(`https://api.wx.spire.com/forecast/point?lat=${getLatitude(city)}&lon=${getLongitude(city)}&bundle=maritime`, {
                        headers: myHeaders
                    })
                        .then(response => response.json())
                        .then(json1 => {
                            const winddata = json1.data[0]
                        });    
                     }
            


           
            
            
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });
    });

});
