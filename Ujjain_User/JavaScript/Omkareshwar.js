                             

window.onload = function () {
    var dt = new Date();
    document.getElementById("omkardatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

    Omkareshwar()
}


function Omkareshwar() {
    console.log("Omkareshwar  Page")
   
//                  Omkar Module  API calls from here ......

  document.getElementById('Omkar_TopVisited_loader').style.display = "block";

  fetch(`${PrivateIP}/omkareshwar/getAll/omkareshwar`)
  .then(response => response.json())
  .then(data => {  console.log(data.data) 
    document.getElementById('Omkar_TopVisited_loader').style.display = "none";

    let data2 = "";
    data.data.map( (product) => {

      data2 +=`
      <div class="swiper-slide ujjain_swiperslides">

        <div class="top_visited_contents_div">
            <img src="${PrivateIP}/omkareshwar/displayHotelImage?id=${product.id}" class="ujjain-dharshan_imgs" alt="hotel_img1">
            <div class="rating_div">
                <i class="fa fa-star checked"></i>
                <span class="rating_span">${product.rating}</span>
            </div>
            <h3 class="ujjain_place_name OmkarName">${product.name}</h3>
            <div class="destinatio_km_div">
                <img class="ujjain_desti_img" src="../Images/destination_popup_icon.png" alt="" srcset="">
                <span class="ujjain_km">${product.distance} km</span>
                <span class="ujjainprice">&#8377; ${product.price} </span>
            </div>
            <input type="button" id="omkar_book_btn" class="Topvisited_ujjain_btn omkarbtn" value="Book a Guide" onclick="" >
        </div>
                
      </div> `;
    
              document.getElementById("swiper-wrapper_omkar_up").innerHTML = data2;

               // Omkar cards On clicking Button 

            const ujjainbtn = document.querySelectorAll('.omkarbtn');
            ujjainbtn.forEach(button => {
            button.addEventListener('click', function () {

              document.getElementById('omkar_popup').style.display = "block";
              document.getElementById('omkar_popupdiv').style.display = "block";
              document.getElementById('omkarConfirmation_popupdiv').style.display = "none";
              
                // Get the parent card element
                  const card = this.closest('.top_visited_contents_div');
                
                // Get the card details  closest to parent element
                   const cardTitle = card.querySelector('h3').innerText;
                   const img = card.querySelector('img').src;

                   fetch(`${PrivateIP}/omkareshwar/GetByName/${cardTitle}`)
                   .then(response => response.json())
                   .then(data => {  console.log(data.data[0].name); 
                
                    sessionStorage.setItem("omkarID", data.data[0].id );
                    document.getElementsByClassName('omkarpujaNames')[0].innerHTML = data.data[0].name ;
                    document.getElementsByClassName('omkarkm')[0].innerHTML = `${data.data[0].distance} km ` ;
                    document.getElementsByClassName('omkarpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                    document.getElementsByClassName('omkartotalprice')[0].innerHTML = `&#8377; ${data.data[0].price} ` ;
                    document.getElementsByClassName('omkartotalprice')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
                      // image fetch 
                      document.getElementsByClassName('omkarpopup_img')[0].src = img;
                })
            });
            });

           
              
      })
          
  })



  //             Omkar Hotel  Api calls 

document.getElementById('Omkar_hotels_loader_loader').style.display = "block";

      fetch(`${PrivateIP}/hotels/getAllHotels`)
      .then(response => response.json())
      .then(data => {  console.log(data.data) 
      document.getElementById('Omkar_hotels_loader_loader').style.display = "none";

let data2 = "";
data.data.map( (product) => {
data2 +=`

<div class="swiper-slide omkar_slides_down">
  <div id="home_top_rated_div">
      <img src="${PrivateIP}/hotels/displayHotelImage?id=${product.id}" class="home_top_img1" alt="image1">
      <div class="top_visited_rating_div">
          <i class="fa fa-star checked" id="icon"></i>
          <span class="top_visited_rating_span">${product.rating}</span>
      </div>
      <p class="top_visited_hotel_name small_hotel_name">${product.hotelName}</p>
      <i class="fa fa-user" aria-hidden="true"></i>
      <span class="top-visited-km">${product.totalPerson} </span>       <br>
      <div class="price_book_holes_in_small">
          <p class="hotel_price_in_small">&#8377;${product.price}</p>
          <input type="button" class="small_hotel_book_btn" value="Book Hotel">
      </div>
      
  </div>
</div>
`;
        document.getElementById("swiper-wrapper_omkar_down").innerHTML = data2;
      } )
})

  
    // Initialize Swiper ______ Omkar UP
  
  var swiper = new Swiper("#swiper_omkar_up", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
   //  pagination: {
   //    el: ".swiper-pagination",
   //    type: "fraction",
   //  },
    navigation: {
      nextEl: "#swiper-button-next_omkar_up",
      prevEl: "#swiper-button-prev_omkar_up",
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
  
  //              omkar popup 
  
function omkarpackage_popup_btn() {

        var OmkarID = sessionStorage.getItem('omkarID');
        var user_id = localStorage.getItem('User-ID');
       
         var formdata = new FormData();
         formdata.append("userId", user_id);
         formdata.append("omkarId", OmkarID);
         
         var requestOptions = {
           method: 'POST',
           body: formdata,
           redirect: 'follow'
         };
         
         fetch(`${PrivateIP}/admin/api/omkareshwar/book`, requestOptions)
           .then(response => response.json())
           .then(result => {console.log(result)  
          
              document.getElementById('omkarConfirmation_popupdiv').style.display = "block";
              document.getElementById('omkar_popupdiv').style.display = "none";
      
          })
           .catch(error => console.log('error', error));
}
      
      
function omkarBooking_closePopUp() {
  document.getElementById('omkar_popup').style.display = "none";
}

function omkarConfirmation_closePopUp(){
  document.getElementById('omkar_popup').style.display = "none";
  omkarBooking_closePopUp();
}
  
function swiperBtn_omkar_up(){        document.getElementById('swiper-button-prev_omkar_up').style.display = "block"; }
function swiperBtn_omkar_down(){        document.getElementById('swiper-button-prev_omkar_down').style.display = "block"; }
