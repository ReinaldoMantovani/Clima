document.querySelector('.busca').addEventListener('submit', async (event)=> {
   event.preventDefault();

   let input = document.querySelector('#searchInput').value;

   if(input !== '') {
      clearInfo();
      showWaring('Carregando...');

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=550c0d2046f3ba378fc98ae09f1a9f12&units=metric&lang=pt_br`;

      let results = await fetch(url);
      let json = await  results.json();
     console.log(json);
      

     if(json.cod === 200) {
         showInfo({
             name: json.name,
             country: json.sys.country,
             temp: json.main.temp,
             tempIcon: json.weather[0].icon,
             windDescription: json.weather[0].description,
             windSpeed: json.wind.speed,
             windAngle: json.wind
             
         });
     }else {
         clearInfo();
         showWaring('Localização não encontrada.');
     }
   }else {
       clearInfo();
   }

});

function clearInfo() {
    showWaring('');
    document.querySelector('.resultado').style.display = 'none';
}

function showInfo(json) {
    showWaring('');


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
    document.querySelector('.description').innerHTML = `${json.windDescription}`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

   
    

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function showWaring(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

/* background squares */
const ulSquares = document.querySelector("ul.squares");

for (let i = 0; i < 11; i++) {
  const li = document.createElement("li");

  const random = (min, max) => Math.random() * (max - min) + min;

  const size = Math.floor(random(10, 120));
  const position = random(1, 99);
  const delay = random(5, 0.1);
  const duration = random(24, 12);

  li.style.width = `${size}px`;
  li.style.height = `${size}px`;
  li.style.bottom = `-${size}px`;

  li.style.left = `${position}%`;

  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

  ulSquares.appendChild(li);

}
