        //const PrivateIP = "http://13.200.156.231:8097";

//                Const Private IP declaration                               



window.onload = function () {
    var dt = new Date();
    document.getElementById("Pujadatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
        document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

    pujaBooking();
}

function pujaBooking(){

    console.log("Puja Page");

document.getElementById('Pujabooking_TraditionalPujas_loader').style.display = "block";

fetch(`${PrivateIP}/poja/getAllPoja`)
.then(response => response.json())
.then(data => {  console.log(data.data)
 
  document.getElementById('Pujabooking_TraditionalPujas_loader').style.display = "none";

  let data2 = "";
 
  data.data.map( (product) => {
 
    data2 +=`
                            <div class="swiper-slide puja_slides_up">
                                <div class="Traditional_Pujas_div sateesh">
                                    <img src="${PrivateIP}/poja/display/custom?id=${product.id}" class="Traditional_Pujas_imgs"
                                        alt="">
                                    <p class="puja_name pujanames_oncard">${product.poojaName}</p>
                                    <div class="Location_pujaname_div">
                                        <img src="../Images/Location icon.png" class="Traditional_location_img" alt="">
                                        <span class="Temple_name">${product.templeName}</span>
                                    </div>
 
                                    <span class="puja_price" id="first_puja_price">&#8377; ${product.price}</span>
                                    <input type="button" id="puja_Book_btn" class="puja_booknow_btn puja-api-button01" value="Book Now"
                                        onclick="pujaPackageBooking()">
                                </div>
                            </div> `;

            document.getElementById("swiper-wrapper_puja_up").innerHTML = data2;
            
            
          })
 document.getElementById('puja_Book_btn').click();
});


document.getElementById('ujjain_Famous_loader').style.display = "block";

fetch(`${PrivateIP}/poja/getAllPoja`)
.then(response => response.json())
.then(data => {  console.log(data.data)
 document.getElementById('ujjain_Famous_loader').style.display = "none";

  let data2 = "";
  data.data.map( (product) => {
 
    data2 +=`            
                            <div class="swiper-slide ujjainFamous_puja">
                                <div class="Ujjain_FamousPujas_div">
                                    <img src="${PrivateIP}/poja/display/custom?id=${product.id}"  class="Ujjain_FamousPujas_imgs"
                                        alt="" srcset="">
                                    <p class="Famous_puja_name">${product.poojaName}</p>
                                    <div class="Famous_Location_pujaname_div">
                                        <img src="../Images/Location icon.png" class="Famous_location_img" alt="">
                                        <span class="Famous_Temple_name">${product.templeName}</span>
                                    </div>
                                    <span class="Famous_puja_price">&#8377;${product.price} </span>
                                    <input type="button" class="Famous_puja_booknow_btn" value="Book Now">
                                </div>
                            </div> `;
            document.getElementById("swiper-wrapper_puja_down").innerHTML = data2;
            
          })
 
});

    // Initialize Swiper ______ Puja UP
    
    var swiper = new Swiper("#swiper_puja_up", {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 30,
     //  pagination: {
     //    el: ".swiper-pagination",
     //    type: "fraction",
     //  },
      navigation: {
        nextEl: "#swiper-button-next_puja_up",
        prevEl: "#swiper-button-prev_puja_up",
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
    
function pujaPackageBooking() {
    
      document.getElementsByClassName("puja-api-button01")[0].addEventListener("click",function() {
    
        document.getElementById('PujaBooking_popup').style.display = "block";    
      document.getElementById('pujaPackageBooking_popupdiv').style.display = "block";
       
    
      let name = document.getElementsByClassName('pujanames_oncard')[0].innerHTML ;
    
        fetch(`${PrivateIP}/poja/GetByName/${name}`)
            .then(response => response.json())
            .then(data => {console.log(data.data[0])
     
              sessionStorage.setItem('puja_id',data.data[0].id);
     
            document.getElementsByClassName('puja-api-popup-name01')[0].innerHTML = data.data[0].poojaName ;
            document.getElementsByClassName('puja-api-popup-name02')[0].innerHTML = data.data[0].templeName ;
            document.getElementsByClassName('puja-api-popup-name04')[0].innerHTML = `&#8377; ${data.data[0].price} `;
            document.getElementsByClassName('puja-api-price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
            document.getElementsByClassName('confirmation_pujaPrice')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                 
            });
        });
     
        document.getElementsByClassName("puja-api-button01")[1].addEventListener("click",function() {
          console.log("hello");
    
          document.getElementById('PujaBooking_popup').style.display = "block";    
          document.getElementById('pujaPackageBooking_popupdiv').style.display = "block";
          let name = document.getElementsByClassName('pujanames_oncard')[1].innerHTML ;
         
          fetch(`${PrivateIP}/poja/GetByName/${name}`)
              .then(response => response.json())
              .then(data => {console.log(data.data[0])
     
                sessionStorage.setItem('puja_id',data.data[0].id);
     
              document.getElementsByClassName('puja-api-popup-name01')[0].innerHTML = data.data[0].poojaName ;
              document.getElementsByClassName('puja-api-popup-name02')[0].innerHTML = data.data[0].templeName ;
              document.getElementsByClassName('puja-api-popup-name04')[0].innerHTML = `&#8377; ${data.data[0].price} `;
              document.getElementsByClassName('puja-api-price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
              document.getElementsByClassName('puja-api-price')[1].innerHTML = `&#8377; ${data.data[0].price} `;
              document.getElementById('Confirmation_booking_popup_total_price').innerHTML = `&#8377; ${data.data[0].price} `;                
              });
          });
     
          document.getElementsByClassName("puja-api-button01")[2].addEventListener("click",function() {
            console.log("hello");
    
            document.getElementById('PujaBooking_popup').style.display = "block";    
            document.getElementById('pujaPackageBooking_popupdiv').style.display = "block";
            let name = document.getElementsByClassName('pujanames_oncard')[2].innerHTML ;
            fetch(`${PrivateIP}/poja/GetByName/${name}`)
                .then(response => response.json())
                .then(data => {console.log(data.data[0])
                  sessionStorage.setItem('puja_id',data.data[0].id);
       
                document.getElementsByClassName('puja-api-popup-name01')[0].innerHTML = data.data[0].poojaName ;
                document.getElementsByClassName('puja-api-popup-name02')[0].innerHTML = data.data[0].templeName ;
                document.getElementsByClassName('puja-api-popup-name04')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                document.getElementsByClassName('puja-api-price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                document.getElementsByClassName('sateesh01')[0].innerHTML = `&#8377; ${data.data[0].price} `;            });
       
            });
    
            document.getElementsByClassName("puja-api-button01")[3].addEventListener("click",function() {
              console.log("hello");
      
              document.getElementById('PujaBooking_popup').style.display = "block";    
              document.getElementById('pujaPackageBooking_popupdiv').style.display = "block";
             
              let name = document.getElementsByClassName('pujanames_oncard')[3].innerHTML ;
              fetch(`${PrivateIP}/poja/GetByName/${name}`)
                  .then(response => response.json())
                  .then(data => {console.log(data.data[0])
                    sessionStorage.setItem('puja_id',data.data[0].id);

                  document.getElementsByClassName('puja-api-popup-name01')[0].innerHTML = data.data[0].poojaName ;
                  document.getElementsByClassName('puja-api-popup-name02')[0].innerHTML = data.data[0].templeName ;
                  document.getElementsByClassName('puja-api-popup-name04')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                  document.getElementsByClassName('puja-api-price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                  document.getElementsByClassName('sateesh01')[0].innerHTML = `&#8377; ${data.data[0].price} `;            
                });
              });
       
              document.getElementsByClassName("puja-api-button01")[4].addEventListener("click",function() {
                console.log("hello");
        
                document.getElementById('PujaBooking_popup').style.display = "block";    
                document.getElementById('pujaPackageBooking_popupdiv').style.display = "block";
               
                let name = document.getElementsByClassName('pujanames_oncard')[4].innerHTML ;
                fetch(`${PrivateIP}/poja/GetByName/${name}`)
                    .then(response => response.json())
                    .then(data => {console.log(data.data[0])
      
                      sessionStorage.setItem('puja_id',data.data[0].id);
           
                    document.getElementsByClassName('puja-api-popup-name01')[0].innerHTML = data.data[0].poojaName ;
                    document.getElementsByClassName('puja-api-popup-name02')[0].innerHTML = data.data[0].templeName ;
                    document.getElementsByClassName('puja-api-popup-name04')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                    document.getElementsByClassName('puja-api-price')[0].innerHTML = `&#8377; ${data.data[0].price} `;
                    document.getElementsByClassName('sateesh01')[0].innerHTML = `&#8377; ${data.data[0].price} `;            });
           
                });    // 5 cards will work .... 
    
      let pujaPrice = document.getElementById('first_puja_price').innerHTML;
      document.getElementById('Package_totalprice').innerHTML = pujaPrice;
     //document.getElementById('PujaBooking_popup_div').style.display = "none";
}
    
function popup_packageBooking_btn(){

        var pujaId = sessionStorage.getItem('puja_id');
        var user_id = localStorage.getItem('User-ID');
    
        var formdata = new FormData();
        formdata.append("userId", user_id);
        formdata.append("pojaId", pujaId);
        var requestOptions = {  method: 'POST',  body: formdata,  redirect: 'follow'};
    
        fetch(`${PrivateIP}/admin/api/poja/book`, requestOptions)
        .then(response => response.text())
          .then(result => console.log(result))  
          .catch(error => console.log('error', error));
      
      let pujaPrice = document.getElementById('first_puja_price').innerHTML;
     document.getElementById('Confirmation_booking_popup_total_price').innerHTML = pujaPrice;
      document.getElementById('pujaPackageBooking_popupdiv').style.display = "none";
      document.getElementById('PujaConfirmation_popup_div').style.display = "block";
     
}
function popup_pujabook_btn(){
      document.getElementById('PujaBooking_popup_div').style.display = "none"; 
      document.getElementById('PujaConfirmation_popup_div').style.display = "block"; 
}
function pujaPackageBooking_closePopUp(){
      document.getElementById('pujaPackageBooking_popupdiv').style.display = "none";
}
function pujaBooking_closePopUp(){
      document.getElementById('PujaBooking_popup_div').style.display = "none";
      document.getElementById('pujaPackageBooking_popupdiv').style.display = "none";
}
function confirBooking_closePopUp(){
      document.getElementById('PujaConfirmation_popup_div').style.display = "none";
}




function swiperBtn_puja_up(){        document.getElementById('swiper-button-prev_puja_up').style.display = "block"; }
function swiperBtn_puja_down(){        document.getElementById('swiper-button-prev_puja_down').style.display = "block"; }
