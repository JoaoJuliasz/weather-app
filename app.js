window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationCity = document.querySelector('.location-city');
    let icon = document.querySelector('.icon');
    let degrees = document.querySelector('.span-temperature');

    if (navigator.geolocation || api == null) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.weatherstack.com/current?access_key=0b1ef854cb3dd285543aad519e02955f&query=${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { temperature, weather_descriptions, weather_icons } = data.current;
                    const { timezone_id, name } = data.location;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions;
                    locationTimezone.textContent = timezone_id;
                    locationCity.textContent = name;
                    icon.src = weather_icons[0];
                    degrees.textContent = '°C';

                    function changeDegree() {
                        temperature = (temperature * 9 / 5) + 32;
                        console.log(temperature)
                    }
                    changeDegree()
                });
        });




    } else {
        locationCity.textContent = 'Hey this is not working'
    }
});