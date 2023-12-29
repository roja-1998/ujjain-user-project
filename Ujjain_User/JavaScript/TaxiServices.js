//const PrivateIP = "http://13.200.156.231:8097";

//                Const Private IP declaration                               

window.onload = function () {
    var dt = new Date();
    document.getElementById("Taxidatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

    TaxiServices();
}





//                 Taxi services   

function TaxiServices(){
    console.log('Taxi Services Page');
    document.getElementById('viewprofile').style.display = "block";
  
    const formE1 = document.querySelector('#taxi');
   
    formE1.addEventListener('submit', event => {
        event.preventDefault();
   
        let formData = new FormData(formE1);
   
        var pickup = document.getElementById("taxipickup").value;
        var drop = document.getElementById("taxi-drop").value;
        console.log("Pick-up Location" + '' + pickup);
        console.log("Desination" + '' + drop);
        let data;
        data = Object.fromEntries(formData);
        console.log(data);
        var user_id = localStorage.getItem('User-ID');
        fetch(`${PrivateIP}/taxiService/save/${user_id}`,
       
            {
                method: "POST",
                body: JSON.stringify({
   
                    "fromLocation": pickup,
                    "toLocation": drop,
                    "totalFare" : 100
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
              })
            })
  
   document.getElementById('taxi_popup').style.display = "block";
   document.getElementById('taxi_popupdiv').style.display = "block";
  
  
   // Initialize Swiper ______ Taxi UP
  
   var swiper = new Swiper("#swiper_taxi_up", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
   //  pagination: {
   //    el: ".swiper-pagination",
   //    type: "fraction",
   //  },
    navigation: {
      nextEl: "#swiper-button-next_taxi_up",
      prevEl: "#swiper-button-prev_taxi_up",
    },
  });
  
  var appendNumber = 4;
  var prependNumber = 1;
  document
    .querySelector(".prepend-2-slides")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.prependSlide([
        '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
        '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      ]);
    });
  document
    .querySelector(".prepend-slide")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.prependSlide(
        '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
      );
    });
  document
    .querySelector(".append-slide")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.appendSlide(
        '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
      );
    });
  document
    .querySelector(".append-2-slides")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.appendSlide([
        '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
        '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      ]);
    });
  
  
    /// error will get 

}
function swiperBtn_taxi_up(){
document.getElementById('swiper-button-prev_taxi_up').style.display = "block";
}
  
  // Taxi  cards functions ....... 
  
  
function Taxifirstcard(){
document.getElementById('taxi_popup').style.display = "block";
document.getElementById('taxi_popupdiv').style.display = "block";
document.getElementById('taxi_confirmation_popup_div').style.display = "none";

}

// function Taxibooking_closePopUp(){
// document.getElementById('taxi_popup').style.display = "none";
// }
function taxibook_popup_btn() {

document.getElementById('taxi_popup').style.display = "block";
document.getElementById('taxi_popupdiv').style.display = "none";
document.getElementById('taxi_confirmation_popup_div').style.display = "block";
}
function Taxiconfirm_closePopUp(){
    
document.getElementById('taxi_popupdiv').style.display = "none";
Taxibooking_closePopUp()
}
  
  
  















