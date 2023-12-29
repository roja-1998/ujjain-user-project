

window.onload = function () {   
console.log('Home Page ')

console.log(PrivateIP)

    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();

//                                                          Getting User with ID
  var user_id = localStorage.getItem('User-ID');
      fetch(`${PrivateIP}/user/getBy/${user_id}`)
      .then(response => response.json())
      .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

//               Home Hotel  Api calls 

try{
document.getElementById('home_our_hotel_loader').style.display = "block";

        fetch(`${PrivateIP}/hotels/getAllHotels`)
        .then(response => response.json())
        .then(data => {  console.log(data.data) 
            document.getElementById('home_our_hotel_loader').style.display = "none";
            let data2 = "";
            data.data.map( (product) => {
            data2 +=`
                      <div class="swiper-slide homeslides">
                          <div class="hotel_contents_div">
                              <img src="${PrivateIP}/hotels/displayHotelImage?id=${product.id}" class="hotel_imgs" alt="hotel_img1">
                              <div class="rating_div">
                                  <i class="fa fa-star checked"></i>
                                  <span class="rating_span">${product.rating}</span>
                              </div>
                              <p class="hotel_name home_hotelName">${product.hotelName}</p>
                              <i class="fa fa-user" aria-hidden="true"></i>
                              <span class="profile_num">${product.totalPerson}</span>
                              <span class="hotel_type">${product.hotelType}</span>
                              <br>
                              <span class="hotel_price">&#8377; ${product.price}</span>
                              <input type="button" class="home_hotelBtn" id="hotel_btn" onclick="Home_BookHotel()" value="Book Now">
                          </div>
                      </div>  `;
                document.getElementsByClassName("our_hotels_api")[0].innerHTML = data2;
            })
        })
// Home Ujjain API call

     document.getElementById('home_TopVisitedplaces_loader').style.display = "block";
      fetch(`${PrivateIP}/guide/allGuides`)
      .then(response => response.json())
      .then(data => {  console.log(data.data) 
          document.getElementById('home_TopVisitedplaces_loader').style.display = "none";
          let data2 = "";
          data.data.map( (product) => {
          data2 +=`
                  <div class="swiper-slide home_slides_down">
                      <div id="home_top_rated_div">
                          <img src="${PrivateIP}/guide/displayHotelImage?id=${product.id}" class="home_top_img1" alt="image1">
                          <div class="top_visited_rating_div">
                              <i class="fa fa-star checked" id="icon"></i>
                              <span class="top_visited_rating_span">${product.rating}</span>
                          </div>
                          <p class="top_visited_hotel_name">${product.name}</p>
                          <img src="../Images/destination icon.PNG" class="destination-image"
                              alt="destination-image">
                          <span class="top-visited-km">${product.distance} km</span> 
                          <input type="button"  id="top_visited_btn" value="Book a Guide" onclick="Home_ujjain_btn()">
                      </div>
                  </div> `;
                  document.getElementById("swiper-wrapper_down").innerHTML = data2;
            })
      })

// Initialize Swiper ______ Home UP
var swiper = new Swiper("#swiper_up", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
   //  pagination: {
   //    el: ".swiper-pagination",
   //    type: "fraction",
   //  },
    navigation: {
      nextEl: "#swiper-button-next_up",
      prevEl: "#prev_down_hotelBooking",       
      //prevE2: "#swiper-button-prev_up",

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
}catch{}
}
function Home_BookHotel(){
  console.log(' Hotel booking Home from');
  window.location.href = "../HotelBooking/index.html";
}
function swiperBtn_up(){  document.getElementById('prev_down_hotelBooking').style.display = "block";    }
function swiperBtn_down() {    document.getElementById('swiper-button-prev_down').style.display = "block"; }
