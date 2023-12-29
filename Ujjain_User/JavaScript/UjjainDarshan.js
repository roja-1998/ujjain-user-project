
window.onload = function () {
    var dt = new Date();
    document.getElementById("Ujjaindatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

    UjjainDarshan();
   
}

function UjjainDarshan() {
console.log("Ujjain Darshan Page");


//                    Ujjain Module  API calls here .....

document.getElementById('UjjainDarshan_TopVisitedplaces_loader').style.display = "block";
fetch(`${PrivateIP}/guide/allGuides`)
.then(response => response.json())
.then(data => {  console.log(data.data) 

  document.getElementById('UjjainDarshan_TopVisitedplaces_loader').style.display = "none";

  let data2 = "";

  data.data.map( (product) => {

    data2 +=`
    <div class="swiper-slide ujjain_swiperslides">
        <div class="top_visited_contents_div">
            <img src="${PrivateIP}/guide/displayHotelImage?id=${product.id}" class="ujjain-dharshan_imgs" alt="hotel_img1">
            <div class="rating_div">
                <i class="fa fa-star checked"></i>
                <span class="rating_span">${product.rating}</span>
            </div>
            <h3 class="ujjain_place_name">${product.name}</h3>
            <div class="destinatio_km_div">
                <img class="ujjain_desti_img" src="../Images/destination_popup_icon.png" alt="" srcset="">
                <span class="ujjain_km">${product.distance} km</span>
                <span class="ujjainprice">&#8377; ${product.price} </span>
            </div>
            <input type="button" id="UjjainCard_click" class="Topvisited_ujjain_btn" value="Book a Guide" onclick=""  >
        </div>
    </div> `;
  
            document.getElementById("swiper-wrapper_ujjain_up").innerHTML = data2;
     
        
            // Ujjain cards On clicking Button 

            const ujjainbtn = document.querySelectorAll('.Topvisited_ujjain_btn');
                ujjainbtn.forEach(button => {
                button.addEventListener('click', function () {

                    document.getElementById('ujjain_popup').style.display = "block";
                    document.getElementById('ujjain_popupdiv').style.display = "block";
                    document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
                      
                    // Get the parent card element
                      const card = this.closest('.top_visited_contents_div');
                    
                    // Get the card details  closest to parent element
                      const cardTitle = card.querySelector('h3').innerText;
                      const img = card.querySelector('img').src;

                           fetch(`${PrivateIP}/guide/getByName/${cardTitle}`)
                               .then(response => response.json())
                               .then(data => {  console.log(data.data[0].name) 
                                 sessionStorage.setItem("ujjain_ID",data.data[0].id );
                               
                                 document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
                                 document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
                                 document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                                 document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
                                 document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
                                  // image fetch 
                                       document.getElementsByClassName('ujjainpopup_img')[0].src = img;
                               })
                });
                });

          })

       
})
            //  Ujjain Hotel  Api calls 
      document.getElementById('UjjainDarshan_hotels_loader_loader').style.display = "block";
    fetch(`${PrivateIP}/hotels/getAllHotels`)
    .then(response => response.json())
    .then(data => {  console.log(data.data) 
            document.getElementById('UjjainDarshan_hotels_loader_loader').style.display = "none";
        let data2 = "";
        data.data.map( (product) => {
          data2 +=`
                  <div class="swiper-slide ujjan_slides_down">
                <div id="home_top_rated_div">
                    <img src="${PrivateIP}/hotels/displayHotelImage?id=${product.id}" class="home_top_img1" alt="image1">
                    <div class="top_visited_rating_div">
                        <i class="fa fa-star checked" id="icon"></i>
                        <span class="top_visited_rating_span">${product.rating}</span>
                    </div>
                    <p class="top_visited_hotel_name small_hotel_name">${product.hotelName} </p>
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <span class="top-visited-km">${product.totalPerson} </span>       <br>

                    <div class="price_book_holes_in_small">
                        <p class="hotel_price_in_small">&#8377;${product.price}</p>
                        <input type="button" class="small_hotel_book_btn" value="Book Hotel">
                    </div>
                    
                </div>
            </div>`;
            document.getElementById("swiper-wrapper_ujjain_down").innerHTML = data2;
    })
})

      // Initialize Swiper ______ ujjain UP
    
    var swiper = new Swiper("#swiper_ujjain_up", {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 30,
     //  pagination: {
     //    el: ".swiper-pagination",
     //    type: "fraction",
     //  },
      navigation: {
        nextEl: "#swiper-button-next_ujjain_up",
        prevEl: "#swiper-button-prev_ujjain_up",
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
    

////////////////////////////////////////////////////////////////////////////////////////

// function ujjainFirstcard() {

//     document.getElementsByClassName('Topvisited_ujjain_btn')[0].addEventListener( "click",
//     function first(){
//           console.log("first guide");
//           document.getElementById('ujjain_popup').style.display = "block";
//           document.getElementById('ujjain_popupdiv').style.display = "block";
//           document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//            let name = document.getElementsByClassName('ujjain_place_name')[0].innerHTML ;

//     fetch(`${PrivateIP}/guide/getByName/${name}`)
//     .then(response => response.json())
//     .then(data => {  console.log(data.data[0].name) 
    
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
    
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
//        // image fetch 
//             let img = document.getElementsByClassName('ujjain-dharshan_imgs')[0].src;
//             document.getElementsByClassName('ujjainpopup_img')[0].src = img;
//     })
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[1].addEventListener( "click",
//     function (){
//           document.getElementById('ujjain_popup').style.display = "block";
//           document.getElementById('ujjain_popupdiv').style.display = "block";
//           document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//           let name = document.getElementsByClassName('ujjain_place_name')[1].innerHTML ;
    
//           fetch(`${PrivateIP}/guide/getByName/${name}`)
//           .then(response => response.json())
//           .then(data => {  console.log(data.data[0].name) 
          
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
          
//             document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//             document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//             document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//             document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//             document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
        
//             let img = document.getElementsByClassName('ujjain-dharshan_imgs')[1].src;
//             document.getElementsByClassName('ujjainpopup_img')[0].src = img;
    
//           })
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[2].addEventListener( "click",
//     function (){
//           document.getElementById('ujjain_popup').style.display = "block";
//           document.getElementById('ujjain_popupdiv').style.display = "block";
//           document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//           let name = document.getElementsByClassName('ujjain_place_name')[2].innerHTML ;
          
//           fetch(`${PrivateIP}/guide/getByName/${name}`)
//           .then(response => response.json())
//           .then(data => {  console.log(data.data[0].name) 
    
//           sessionStorage.setItem("ujjain_ID",data.data[0].id );
    
//             document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//             document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//             document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//             document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//             document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
//             // image fetch 
//             let img = document.getElementsByClassName('ujjain-dharshan_imgs')[2].src;
//             document.getElementsByClassName('ujjainpopup_img')[0].src = img;
//           })
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[3].addEventListener( "click",
//     function (){
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//         let name = document.getElementsByClassName('ujjain_place_name')[3].innerHTML ;
      
//       fetch(`${PrivateIP}/guide/getByName/${name}`)
//       .then(response => response.json())
//       .then(data => {  console.log(data.data[0].name); 
    
//         sessionStorage.setItem("ujjain_ID", data.data[0].id );
    
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       // image fetch 
    
//       let img = document.getElementsByClassName('ujjain-dharshan_imgs')[3].src;
//       document.getElementsByClassName('ujjainpopup_img')[0].src = img;
//     })
//     });

//     document.getElementsByClassName('Topvisited_ujjain_btn')[4].addEventListener( "click",
//     function (){
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//         let name = document.getElementsByClassName('ujjain_place_name')[4].innerHTML ;
    
//     fetch(`${PrivateIP}/guide/getByName/${name}`)
//     .then(response => response.json())
//     .then(data => {  console.log(data.data[0].name) 
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
    
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
    
    
//           // image fetch 
    
//           let img = document.getElementsByClassName('ujjain-dharshan_imgs')[4].src;
//           document.getElementsByClassName('ujjainpopup_img')[0].src = img;
//     })
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[5].addEventListener( "click",
//     function (){
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//         let name = document.getElementsByClassName('ujjain_place_name')[5].innerHTML ;
        
//         fetch(`${PrivateIP}/guide/getByName/${name}`)
//       .then(response => response.json())
//       .then(data => {  console.log(data.data[0].name) 
    
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
//         // image fetch 
//         let img = document.getElementsByClassName('ujjain-dharshan_imgs')[5].src;
//         document.getElementsByClassName('ujjainpopup_img')[0].src = img;
//     })
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[6].addEventListener( "click",
//     function (){
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//         let name = document.getElementsByClassName('ujjain_place_name')[6].innerHTML ;
        
//         fetch(`${PrivateIP}/guide/getByName/${name}`)
//       .then(response => response.json())
//       .then(data => {  console.log(data.data[0].name) 
//         sessionStorage.setItem("ujjain_ID",data.data[0].id );
    
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
    
//       // image fetch 
//       let img = document.getElementsByClassName('ujjain-dharshan_imgs')[6].src;
//       document.getElementsByClassName('ujjainpopup_img')[0].src = img;
//     }) 
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[7].addEventListener( "click",
//     function (){
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
//         let name = document.getElementsByClassName('ujjain_place_name')[7].innerHTML ;

//     fetch(`${PrivateIP}/guide/getByName/${name}`)
//     .then(response => response.json())
//     .then(data => {  console.log(data.data[0].name) 
    
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
    
//       // image fetch 
    
//       let img = document.getElementsByClassName('ujjain-dharshan_imgs')[7].src;
//       document.getElementsByClassName('ujjainpopup_img')[0].src = img;

//     })
    
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[8].addEventListener( "click",
//     function (){
    
//      // document.getElementsByClassName('Topvisited_ujjain_btn')[7].style.color = "#FF5F1F";
    
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
    
//         let name = document.getElementsByClassName('ujjain_place_name')[8].innerHTML ;
        
    
//         fetch(`${PrivateIP}/guide/getByName/${name}`)
//     .then(response => response.json())
//     .then(data => {  console.log(data.data[0].name) 
    
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       // image fetch 
//       let img = document.getElementsByClassName('ujjain-dharshan_imgs')[8].src;
//       document.getElementsByClassName('ujjainpopup_img')[0].src = img;
    
//     })
    
//     });
    
//     document.getElementsByClassName('Topvisited_ujjain_btn')[9].addEventListener( "click",
//     function (){
//       console.log("tenth guide");
//         document.getElementById('ujjain_popup').style.display = "block";
//         document.getElementById('ujjain_popupdiv').style.display = "block";
//         document.getElementById('ujjainConfirmation_popupdiv').style.display = "none";
    
//         let name = document.getElementsByClassName('ujjain_place_name')[9].innerHTML ;
    
//         fetch(`${PrivateIP}/guide/getByName/${name}`)
//     .then(response => response.json())
//     .then(data => {  console.log(data.data) 
//       sessionStorage.setItem("ujjain_ID",data.data[0].id );
    
//       document.getElementsByClassName('ujjainname')[0].innerHTML = data.data[0].name ;
//       document.getElementsByClassName('ujjainkm')[0].innerHTML = `${data.data[0].distance} km ` ;
//       document.getElementsByClassName('ujjainpopup_price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
//       document.getElementsByClassName('ujjainpopup_price')[1].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       document.getElementsByClassName('ujjainpopup_price')[2].innerHTML = `&#8377; ${data.data[0].price} ` ;
//       // image fetch 
//       let img = document.getElementsByClassName('ujjain-dharshan_imgs')[9].src;
//       document.getElementsByClassName('ujjainpopup_img')[0].src = img;
    
//       // fetch('${PrivateIP}/guide/allGuides')
//       // .then(response => response.json())
//       // .then(data => {  console.log(data.data[9].id)  
//       //   document.getElementsByClassName('ujjainpopup_img')[0].src = `${PrivateIP}/guide/displayHotelImage?id=${data.data[9].id}`
    
//       //     })
          
//         })
    
//     });
// } /// ujjain book end here



function ujjainpackage_popup_btn() {
    
      document.getElementById('ujjain_popupdiv').style.display = "none";
    
     var Ujjain_id = sessionStorage.getItem('ujjain_ID');
     var user_id = localStorage.getItem('User-ID');
    
      var formdata = new FormData();
      formdata.append("userId", user_id);
      formdata.append("ujjainId", Ujjain_id);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${PrivateIP}/admin/api/ujjain/book` , requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)     })
        .catch(error => console.log('error', error));
        document.getElementById('ujjainConfirmation_popupdiv').style.display = "block";    
}

function ujjain_delete(){
    ujjainBooking_closePopUp();
}
function ujjainBooking_closePopUp(){
    document.getElementById('ujjain_popup').style.display = "none";
}
function ujjainConfirmation_closePopUp() {
    document.getElementById('ujjain_popup').style.display = "none";
    ujjainBooking_closePopUp();

    document.getElementById('shopping_main').style.display = "none";
}

function swiperBtn_ujjain_up(){        document.getElementById('swiper-button-prev_ujjain_up').style.display = "block"; }
function swiperBtn_ujjain_down(){        document.getElementById('swiper-button-prev_ujjain_down').style.display = "block"; }







































