require('dotenv').config()
 
  //see coutry input populate by the last search
  countryOne.value = localStorage.getItem("key1");
  countryTwo.value = localStorage.getItem("key2");
  countryThree.value = localStorage.getItem("key3");
  
  countryOne.oninput = () => {
    
    localStorage.setItem("key1", countryOne.value)
  
  };
  countryTwo.oninput = () => {
  
    localStorage.setItem("key2", countryTwo.value)
    
  };
  countryThree.oninput = () => {
    
    localStorage.setItem("key3", countryThree.value)
      
  };

  localStorage.removeItem("key1");
  localStorage.removeItem("key2");
  localStorage.removeItem("key3");

  showItemLocalStored();

  
const config = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/v1',
    headers: {
      'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
      'x-rapidapi-key': process.env.PASSWORD
    }
  };

  //show world Active Cases 
  
  axios.request(config).then(function (response) {

    let activeCasesString = "Active Cases: ";

    activeCasesString =  activeCasesString.toUpperCase();

    const worldActives =_.get(response, 'data[0].Active Cases_text', 0);

    document.getElementById("activeCasesRes").innerHTML=activeCasesString + worldActives;
      
      
  }).catch(function (error) {
    
      console.error(error);
  });


  function capitalize(string){
    if (string === "usa") {
      return string.toUpperCase();
    }else{
      string = string.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
  }

  //to show countries Active Cases sended 
  function getCoronaData(){

    var countryOne = $( "#countryOne" ).val();
    countryOne = capitalize(countryOne);
    document.getElementById("getCountryOne").innerHTML=countryOne;

  
    var countryTwo = $( "#countryTwo" ).val();
    countryTwo = capitalize(countryTwo);
    document.getElementById("getCountryTwo").innerHTML=countryTwo;

    var countryThree = $( "#countryThree" ).val();
    countryThree = capitalize(countryThree);
    document.getElementById("getCountryThree").innerHTML=countryThree;


    axios.request(config).then(function (response) {

      country = "Country_text";

      length = response.data.length;
      

      for (i = 0; i < length; i++) {

        country =_.get(response, `data[${i}].Country_text`, 0);

        //first country

        if (country == countryOne) {

          activeCountry  =_.get(response, `data[${i}].Active Cases_text`, 0);
          
          var res = activeCountry.replace(/\D/g, "");
          console.log(res)

          if( res == ""){
            res = "undefined";
            document.getElementById("countryOneRes").innerHTML= countryOne + " has " + res + " active cases!" ;
          }else{
            document.getElementById("countryOneRes").innerHTML= countryOne + " has " + res + " active cases!" ;
          }

          if (res > 1000) {

            res = res/1000;            
          }
          
          res1 = Math.trunc(res);

          var date = new Date();

          var r1 = ": " + res + " on " + date.toDateString();

          localStorage.setItem(country, r1);

          if (res1 > 250) {

            document.getElementById("grafOne").style.width = "200px";
          }else{

            document.getElementById("grafOne").style.width = res1 + "px";
          }

          document.getElementById("grafOne").style.height = "50px";

        }

        //Second country

        if (country == countryTwo) {

          activeCountry  =_.get(response, `data[${i}].Active Cases_text`, 0);

          var res = activeCountry.replace(/\D/g, "");

          if( res == ""){
            
            res = "undefined";

            document.getElementById("countryTwoRes").innerHTML= countryTwo + " has " + res + " active cases!" ;
          }else{
            
            document.getElementById("countryTwoRes").innerHTML= countryTwo + " has " + res + " active cases!" ;
          }

          if (res > 1000) {

            res = res/1000;            
          }

          res2 = Math.trunc(res);

          var date2 = new Date();

          var r2 = ": " + res + " on " + date2.toDateString();

          localStorage.setItem(country, r2);
          
          document.getElementById("grafTwo").style.height = "50px";

          if (res2 >250) {

            document.getElementById("grafTwo").style.width = "300px";
          }else{

            document.getElementById("grafTwo").style.width = res2 + "px";
          }
          
        }

        //third country

        if (country == countryThree) {

          activeCountry  =_.get(response, `data[${i}].Active Cases_text`, 0);

          var res = activeCountry.replace(/\D/g, "");

          if( res == ""){

            res = "undefined";

            document.getElementById("countryThreeRes").innerHTML= countryThree + " has " + res + " active cases!" ;
          }else{

            document.getElementById("countryThreeRes").innerHTML= countryThree + " has " + res + " active cases!" ;
          }

          if (res > 1000) {

            res = res/1000;            
          }

          res3 = Math.trunc(res);

          var date3 = new Date();

          var r3 = ": " + res  + " on " + date3.toDateString();

          localStorage.setItem(country, r3);

          if (res3 >250) {

            document.getElementById("grafThree").style.width = "300px";
          }else{

            document.getElementById("grafThree").style.width = res3 + "px";
          }
          
          document.getElementById("grafThree").style.height = "50px";
          
        }

      }
      }).catch(function (error) {
      
        console.error(error);
      });

}

function showItemLocalStored(){


  for (let index = 0; index < localStorage.length; index++) {

      const actualKey = localStorage.key(index);
      const value = localStorage.getItem(actualKey);

      if (index % 2 == 0) {

        ul.innerHTML += `<li class="list-group-item list-group-item-primary">${actualKey} ${value}</li>`;
        
      }else{
        ul.innerHTML += `<li class="list-group-item list-group-item-success">${actualKey} ${value}</li>`;
        
      }
  }

}

function deleteHistory(){
  localStorage.clear();
  location.reload();
}