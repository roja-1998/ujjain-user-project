//const PrivateIP = "http://13.200.156.231:8097";

//                Const Private IP declaration                               

window.onload = function () {
    var dt = new Date();
    document.getElementById("Airportdatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

    AirportRides()
}


//                                       Airport Rides 

function AirportRides(){

    console.log('Airport Rides Page');
    document.getElementById('viewprofile').style.display = "block";
  
    const formE2 = document.querySelector('#airport');
   
    formE2.addEventListener('submit', event => {
        event.preventDefault();
   
        let formData1 = new FormData(formE2);
        var airportpickup = document.getElementById("airport-pickup").value;
        var airportdrop = document.getElementById("airport-drop").value;
        console.log("Ujjian Airport" + ' ' + airportpickup);
        console.log("drop point" + ' ' + airportdrop);
        let data1;
        data1 = Object.fromEntries(formData1);
        console.log(data1);
        var user_id = localStorage.getItem('User-ID');
        fetch(`${PrivateIP}/airportRides/save/${user_id}`,
            {
                method: "POST",
                body: JSON.stringify({
   
                    "from": airportpickup,
                    "to": airportdrop,
                    "totalprice" : 100
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            })
            .then((response) => response.json())
            .then(data1 => {
                console.log(data1);
              })
            })

    document.getElementById('Airport_popup').style.display = "block";
    document.getElementById('Airport_popupdiv').style.display = "block";

    // Initialize Swiper ______ Maa Baglamukhi Tour UP
  var swiper = new Swiper("#swiper_airport_up", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
   //  pagination: {
   //    el: ".swiper-pagination",
   //    type: "fraction",
   //  },
    navigation: {
      nextEl: "#swiper-button-next_airport_up",
      prevEl: "#swiper-button-prev_airport_up",
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
  
}


function swiperBtn_airport_up(){
document.getElementById('swiper-button-prev_airport_up').style.display = "block";
}
function Airportfirstcard(){
    document.getElementById('Airport_popup').style.display = "block";
    document.getElementById('Airport_popupdiv').style.display = "block";
    document.getElementById('Airport_confirmation_popup_div').style.display = "none";
}
function Airportbook_popup_btn() {
    document.getElementById('Airport_popup').style.display = "block";
    document.getElementById('Airport_popupdiv').style.display = "none";
    document.getElementById('Airport_confirmation_popup_div').style.display = "block";
}
function Airportconfirm_closePopUp(){
  document.getElementById('Airport_popup').style.display = "block";
    document.getElementById('Airport_popupdiv').style.display = "block";
    document.getElementById('Airport_confirmation_popup_div').style.display = "none";

}

  
  ////////////////////////////////////////////////////////////////////// 
  