async function searchApi(city){

let link = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e280139b8ca84d6583d02107231008&q=${city}&days=3`);
let response = await link.json();

// console.log(response.location);
// console.log(response.current);
// console.log(response.forecast);


displayToday(response.location,response.current);
displayTwoDays(response.forecast.forecastday);
}


document.getElementById("search").addEventListener("keyup",function(input){
    searchApi(input.target.value);
})


var days     =     ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months =      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function displayToday(loc , cur ){

  let date = new Date(cur.last_updated); 

    var dataToday = `
    <div class="itemToday">
    <div class="title d-flex justify-content-between  align-items-center px-4 py-3">
    
   <h5>${days[date.getDay()]}</h5> 
      <h6>${date.getDate() + " " + months[date.getMonth()]}</h6>
    </div>


    <div class="content px-4 py-4">
      <span class="city">${loc.name}</span>
      <h2 class="tmp">${cur.temp_c}<sup>o</sup>C  <span>  <img src="https:${cur.condition.icon}" width="80px" alt=""></span></h2>
      <span class="clr">${cur.condition.text}</span>


      <p class="mt-2"><i class="fa-solid fa-umbrella"></i><span class="ms-2">${cur.feelslike_f}</span>   <i class="fa-solid fa-compass ms-3"></i> <span class="ms-2">${cur.wind_mph}</span>  <i class="fa-solid fa-gauge-simple-high ms-3"></i> <span class="ms-2"> ${cur.gust_mph}</span></p>
    </div>
  </div>
    `
    document.getElementById("itemToday").innerHTML = dataToday ;
}

function displayTwoDays(twodays){

let one = "";
let two = "";

let dateOne =  days[new Date (twodays[1].date).getDay()];
let dateTwo =  days[new Date (twodays[2].date).getDay()];

    one += `
    <div class="itemDayTow">
    <div class="title d-flex justify-content-center  align-items-center px-4 py-3">
      <h5>${dateOne}</h5>
    </div>
    <div class="content px-4 py-4 d-flex align-items-center justify-content-center flex-column">
    <span>   <img src="https:${twodays[1].day.condition.icon}" alt=""> </span>
    <span class="sectemp my-3 my-2">${twodays[1].day.maxtemp_c}   <span  style="font-size:30px;"><sup>o</sup>c </span>  </span>
    <span class="sectrtoop my-2">${twodays[1].day.mintemp_c}<sup>o</sup>c </span>
      <span class="clr my-2">${twodays[1].day.condition.text}</span>
    </div>
  </div>
`

two += `
<div class="itemDayThree">
<div class="title d-flex justify-content-center  align-items-center px-4 py-3">
  <h5>${dateTwo}</h5>
</div>

<div class="content px-4 py-4 d-flex align-items-center justify-content-center flex-column">
<span>   <img src="https:${twodays[2].day.condition.icon}" alt=""> </span>
<span class="sectemp my-2">${twodays[2].day.maxtemp_c}  <span  style="font-size:30px;"><sup>o</sup>c </span>  </span>
<span class="sectrtoop my-2">${twodays[2].day.mintemp_c}<sup>o</sup>c</span>
  <span class="clr my-2">${twodays[2].day.condition.text}</span>
</div>
</div>
`    

document.getElementById("itemDayTow").innerHTML = one;
document.getElementById("itemDayThree").innerHTML = two;
}


// default 
searchApi("cairo");






