const bodyWidth = document.querySelector(`body`).clientWidth,
    bodyHeight = document.querySelector(`body`).clientHeight,
    btnSearch = document.getElementById(`search`),
    wallpaper = document.getElementById(`wallpaper`),
    divResult = document.getElementById(`result`),
    imgIconWeather = document.getElementById(`icon-weather`),
    spanTemperature = document.getElementById(`temperature`),
    API_KEY = `Sua Key`;
    

btnSearch.addEventListener(`click`, async (e) => {
    e.preventDefault();

    const inputSearch = document.getElementById(`input-search`).value,
        URL_API = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br&q=${inputSearch}&appid=${API_KEY}`;

    wallpaper.style = `
        visibility: visible;
    `;
    
    divResult.style = `
        display: flex;
    `;

    await fetch(URL_API)

    .then((response) => response.json())
    .then((data) => {
        if(inputSearch === ``) {
            spanTemperature.innerText = `Favor, informar a cidade!`;
            
            wallpaper.style = `
                visibility: hidden;
            `;
    
            return;
        }

        imgIconWeather.setAttribute(`src`, `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        
        imgIconWeather.setAttribute(`alt`, `${data.weather[0].main}`);
            
        spanTemperature.innerHTML = `${Math.trunc(data.main.temp)}ºC - ${data.weather[0].description}`;

        wallpaper.setAttribute(`src`, `https://source.unsplash.com/${bodyWidth}x${bodyHeight}/?${inputSearch}`);

        wallpaper.setAttribute(`alt`, `${inputSearch}`);
    })
    .catch((error) => {
        console.log(error);
        alert(error);

        wallpaper.style = `
                visibility: hidden;
            `;
    });
});