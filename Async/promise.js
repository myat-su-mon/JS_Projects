function get(url, success, fail) {
    return new Promise(function(resolve, reject) {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url);
        httpRequest.onload = function() {
            if(httpRequest.status === 200 ){
                resolve(httpRequest.responseText);
            } else {
                reject(Error(httpRequest.status));
            }
        
        }
        httpRequest.send();
    });
}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 +32).toFixed(0);
}

function successHandler(data) {
    const dataObj = JSON.parse(data);
    const weatherDiv = document.querySelector('#weather');
    const div = `
        <h2 class="top">
            <img
                src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png" 
                alt="${dataObj.weather[0].description}"
                width="50" 
                height="50"  
            />${dataObj.name}
        </h2>
        <p>
            <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${dataObj.weather}
        </p>
    `
    return div;
}

function failHandler(status){
    console.log(status);
}

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'adlsjfifjvn';

    const weatherDiv = document.querySelector('#weather');

    const locations = [
        'los+angeles,us', 
        'san+francisco,us', 
        'lone+pine,us',
        'mariposa,us'
    ];  

    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' + apiKey;
    const urls = locations.map(function(location) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
    });

    Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
        .then(function(responses) {
            return responses.map(function(response){
                return successHandler(response);
            });
        })
        .then(function(literals) {
            weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
        })
        .catch(function(status) {
            failHandler(status);
        })
        .finally(function() {
            weatherDiv.classList.remove('hidden');
        });
});