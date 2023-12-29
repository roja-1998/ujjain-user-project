   // const PrivateIP = "http://13.200.156.231:8097";

//                Const Private IP declaration                               


window.onload = function () {

    var dt = new Date();
    document.getElementById("Mabagladatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})
    
try{    //               Maabaglamukhi Api calls 
    
  document.getElementById('Maabagla_TopVisited_loader').style.display = "block";
  fetch(`${PrivateIP}/maaBaglamukhi/getAll/maaBaglamukhi`)
  .then(response => response.json())
  .then(data => {  console.log(data.data) 
    document.getElementById('Maabagla_TopVisited_loader').style.display = "none";
    let data2 = "";
    data.data.map( (product) => {
      data2 +=`
      <div class="swiper-slide ujjain_swiperslides Maabagla_slides">
          <div class="top_visited_contents_div">
              <img src="${PrivateIP}/maaBaglamukhi/displayHotelImage?id=${product.id}" class="ujjain-dharshan_imgs" alt="hotel_img1">
              <div class="rating_div">
                  <i class="fa fa-star checked"></i>
                  <span class="rating_span">${product.rating}</span>
              </div>
              <h3 class="ujjain_place_name Maabagla_name">${product.name}</h3>
              <div class="destinatio_km_div">
                  <img class="ujjain_desti_img" src="../Images/destination_popup_icon.png" alt="" srcset="">
                  <span class="ujjain_km">${product.distance} km</span>
                  <span class="ujjainprice">&#8377; ${product.price} </span>
              </div>
              <input type="button" id="maabaglabook_btn" class="Topvisited_ujjain_btn Maabagla_btn" value="Book a Guide" onclick="" >
          </div>
      </div> `;
              document.getElementById("swiper-wrapper_maabag_up").innerHTML = data2;

                // Maabaglamukhi cards On clicking Button 

            const ujjainbtn = document.querySelectorAll('.Maabagla_btn');
            ujjainbtn.forEach(button => {
            button.addEventListener('click', function () {

              document.getElementById('maabag_popup').style.display = "block";
              document.getElementById('maabag_popupdiv').style.display = "block";
              document.getElementById('maabagConfirmation_popupdiv').style.display = "none";
          
                // Get the parent card element
                  const card = this.closest('.top_visited_contents_div');
                
                // Get the card details  closest to parent element
                   const cardTitle = card.querySelector('h3').innerText;
                   const img = card.querySelector('img').src;

                   fetch(`${PrivateIP}/maaBaglamukhi/GetByName/${cardTitle}`)
                   .then(response => response.json())
                   .then(data => {  console.log(data.data[0].name); 

                    sessionStorage.setItem("MaabaglaID", data.data[0].id );
                    document.getElementsByClassName('mabaglaname')[0].innerHTML = data.data[0].name ;
                    document.getElementsByClassName('mabaglakm')[0].innerHTML = `${data.data[0].distance} km ` ;
                    document.getElementsByClassName('maabaglaprice')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                    document.getElementsByClassName('maabagla_totalprice')[0].innerHTML = `&#8377; ${data.data[0].price} ` ;
                    document.getElementsByClassName('maabagla_totalprice')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
                  
                    // image fetch 
                      document.getElementsByClassName('mabagala_popupimg')[0].src = img;
               
            

                })
            });
            });
             
      })
     
  })
  //                        MAAbgla Hotel  Api calls 

  document.getElementById('Maabagla_hotels_loader_loader').style.display = "block";
  fetch(`${PrivateIP}/hotels/getAllHotels`)
  .then(response => response.json())
  .then(data => {  console.log(data.data) 
          document.getElementById('Maabagla_hotels_loader_loader').style.display = "none";
          let data2 = "";
          data.data.map( (product) => {
          data2 +=`
                  <div class="swiper-slide maabag_slides_down">
                  <div id="home_top_rated_div">
                      <img src="${PrivateIP}/hotels/displayHotelImage?id=${product.id}" class="home_top_img1" alt="image1">
                      <div class="top_visited_rating_div">
                          <i class="fa fa-star checked" id="icon"></i>
                          <span class="top_visited_rating_span">${product.rating}</span>
                      </div>
                      <p class="top_visited_hotel_name small_hotel_name"> ${product.hotelName}          </p>
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <span class="top-visited-km">${product.totalPerson} </span>       <br>
                      <div class="price_book_holes_in_small">
                          <p class="hotel_price_in_small">&#8377;${product.price}</p>
                          <input type="button" class="small_hotel_book_btn" value="Book Hotel">
                      </div>
                  </div>
              </div>  `;
                          document.getElementById("swiper-wrapper_maabag_down").innerHTML = data2;  
      } )
})
}catch (error) {
  console.error(error);
  }
    console.log("MaaBaglamukhi  Page")

    // Initialize Swiper ______ Maa Baglamukhi Tour UP
  
  var swiper = new Swiper("#swiper_maabag_up", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
   //  pagination: {
   //    el: ".swiper-pagination",
   //    type: "fraction",
   //  },
    navigation: {
      nextEl: "#swiper-button-next_maabag_up",
      prevEl: "#swiper-button-prev_maabag_up",
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


function MaaBaglamukhi() {}
function swiperBtn_maabag_up(){        document.getElementById('swiper-button-prev_maabag_up').style.display = "block"; }
function swiperBtn_maabag_down(){        document.getElementById('swiper-button-prev_maabag_down').style.display = "block"; }

function maabagpackage_popup_btn(){

  var MaabagID = sessionStorage.getItem('MaabaglaID');
  var user_id = localStorage.getItem('User-ID');
 
   var formdata = new FormData();
   formdata.append("userId", user_id);
   formdata.append("maabaglaId", MaabagID);
   
   var requestOptions = {
     method: 'POST',
     body: formdata,
     redirect: 'follow'
   };
   
   fetch(`${PrivateIP}/admin/api/maaBaglamukhi/book`, requestOptions)
     .then(response => response.json())
     .then(result => {console.log(result)  
    
        document.getElementById('maabagConfirmation_popupdiv').style.display = "block";
        document.getElementById('maabag_popupdiv').style.display = "none";

    })
     .catch(error => console.log('error', error));
 
}

function maabagBooking_closePopUp(){
  document.getElementById('maabag_popup').style.display = "none";
}
function maabagConfirmation_closePopUp() {
  document.getElementById('maabag_popup').style.display = "none";
  maabagBooking_closePopUp();
}

// function maabagFirstcard() {
  
//     document.getElementsByClassName('Maabagla_btn')[0].addEventListener( "click",
//     function (){
  
//       document.getElementById('maabag_popup').style.display = "block";
//       document.getElementById('maabag_popupdiv').style.display = "block";
//       document.getElementById('maabagConfirmation_popupdiv').style.display = "none";
  
//         let name = document.getElementsByClassName('Maabagla_name')[0].innerHTML ;
//         fetch(`${PrivateIP}/maaBaglamukhi/GetByName/${name}`)
//        .then(response => response.json())
//        .then(data => {  console.log(data.data[0].name); 
    
//         sessionStorage.setItem("MaabaglaID", data.data[0].id );
//         document.getElementsByClassName('mabaglaname')[0].innerHTML = data.data[0].name ;
//         document.getElementsByClassName('mabaglakm')[0].innerHTML = `${data.data[0].distance} km ` ;
//         document.getElementsByClassName('maabaglaprice')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//         document.getElementsByClassName('maabagla_totalprice')[0].innerHTML = `&#8377; ${data.data[0].price} ` ;
//         document.getElementsByClassName('maabagla_totalprice')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
      
//       // image fetch 
//       let MaabaglaID = sessionStorage.getItem('MaabaglaID');
//       document.getElementsByClassName('mabagala_popupimg')[0].src = `${PrivateIP}/maaBaglamukhi/displayHotelImage?id=${MaabaglaID}`
   
//     })
//     });
  
// }
  






