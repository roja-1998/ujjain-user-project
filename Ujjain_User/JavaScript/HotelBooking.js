
window.onload = function () {
    var dt = new Date();
    document.getElementById("Hoteldatetime").innerHTML = dt.toLocaleTimeString();

    var user_id = localStorage.getItem('User-ID');
    fetch(`${PrivateIP}/user/getBy/${user_id}`)
    .then(response => response.json())
    .then(data => {  console.log(data) 
    document.getElementById('Login_User_Name').innerHTML = data.data.userName ;
})

//             Input Only number entering scrpit...... 
document.querySelectorAll('input[type="number"]').forEach( input => {
  input.oninput = () =>{
  if(input.value.length > input.maxLength) input.value = input.value.slice(0,input.maxLength);
  }; 
})
hotelBooking();
}
function hotelBooking(){
    console.log("Hotel Page")
   // Home Booking  Api calls 
    document.getElementById('Hotelbooking_TopRatedHotels_loader').style.display = "block";
    
    fetch(`${PrivateIP}/hotels/getAllHotels`)
    .then(response => response.json())
    .then(data => {  console.log(data.data) 
      document.getElementById('Hotelbooking_TopRatedHotels_loader').style.display = "none";
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
                          <input type="button" class="home_hotelBtn" id="hotel_btn" onclick="BookHotel_fromHome()" value="Book Now">
                      </div>
                  </div> `;
                document.getElementById("swiper-wrapper_up_hotelbooking").innerHTML = data2;
        })
        document.getElementById('hotel_btn').click();
    })
}
function swiperBtn_hotel_down(){  document.getElementById('swiper-button-prev_up_hotelbooking').style.display = "block";  }
function hotelBooking_book_now_btn(){
 document.getElementsByClassName('HotelBooking_popup')[0].style.display = "block";
 document.getElementsByClassName('HotelBooking_popup_div')[0].style.display = "block"; 
 document.getElementById('hotelsavediv').style.display = "none";
}

function closePopUp() {
  console.log("Booking - close");
  document.getElementsByClassName('HotelBooking_popup')[0].style.display = "none";
}

function popup_bookhotel_btn() {
  document.getElementById('hotelsavediv').style.display = "block";
  document.getElementsByClassName('HotelBooking_popup_div')[0].style.display = "none"; 

     //   hotel save 
     const formhotel = document.querySelector('.hotel_form');
     formhotel.addEventListener('submit', event => {
         event.preventDefault();
  
         let formData = new FormData(formhotel);
         let data;
         data = Object.fromEntries(formData);
         console.log(data);
        // var hotel_name = document.getElementById('Book_hotel_name').innerHTML;
        var hotel_ID =  sessionStorage.getItem('hotel_id');
        var user_id = localStorage.getItem('User-ID');
   
         fetch(`${PrivateIP}/hotelbookings/booking/${hotel_ID}/${user_id}`,
             {
                 method: "POST",
                 body: JSON.stringify({
                  "name": data.username   ,
                  "mobileNo": data.mobileNumber,
                  "noOfAdults": data.noofadults,
                  "noOfChildren": data.noofchilds ,
                  // "price": 150.0,
                  // "hotels": []
                 }),
                 headers: {
                     "Content-type": "application/vnd.api+json; charset=UTF-8" 
                 },
             })
   
        .then((response) => response.json())
        .then(data => {   console.log(data);

              if (data.statuscode == 200) {
              document.getElementsByClassName('HotelConfirmation_popup_div')[0].style.display = "block"; 
              } else {
                document.getElementsByClassName('HotelConfirmation_popup_div')[0].style.display = "none"; 
              }
             });
     })
}

// function hotelsave_bookbtn(){
//    document.getElementsByClassName('HotelConfirmation_popup_div')[0].style.display = "block"; 
// }

function closePopUp_Confirmation() {
    console.log("Confirmation - close");
   // hotelBooking_book_now_btn();
    document.getElementsByClassName('HotelBooking_popup')[0].style.display = "none";
    document.getElementsByClassName('HotelConfirmation_popup_div')[0].style.display = "none"; 
}


function myHotel_SaveMB(){
  const inpOb = document.getElementById('hotel_save_mb');
  if (!inpOb.checkValidity()) {
      document.getElementById("hotel_save_eror").style.display = "block";
    document.getElementById("hotel_save_eror").innerHTML = "Number should be 10 digits";
  }else{
      document.getElementById("hotel_save_eror").style.display = "none";
  }
}
//           Hotel Booking .......

function BookHotel_fromHome(){

    document.getElementsByClassName("home_hotelBtn")[0].addEventListener('click', function(){
      hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[0].innerHTML ;
        console.log(name);

        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 
      
        })
    })

    document.getElementsByClassName("home_hotelBtn")[1].addEventListener('click', function(){
      hotelBooking();
      let name = document.getElementsByClassName('home_hotelName')[1].innerHTML ;
      console.log(name);
      fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
      .then(response => response.json())
      .then(data => {  console.log(data.data[0])

        sessionStorage.setItem('hotel_id',data.data[0].id);
        document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
        document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
        document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
        document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
        document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
        document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
        document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
        document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
        document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

        document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

      })
    })

      document.getElementsByClassName("home_hotelBtn")[2].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[2].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[3].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[3].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[4].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[4].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[5].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[5].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[6].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[6].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[7].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[7].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[8].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[8].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[9].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[9].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })
      
      document.getElementsByClassName("home_hotelBtn")[10].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[10].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      
      document.getElementsByClassName("home_hotelBtn")[11].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[11].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[12].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[12].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      
      document.getElementsByClassName("home_hotelBtn")[13].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[13].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      
      document.getElementsByClassName("home_hotelBtn")[14].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[14].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      
      document.getElementsByClassName("home_hotelBtn")[15].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[15].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })
      document.getElementsByClassName("home_hotelBtn")[16].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[16].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[17].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[17].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[18].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[18].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[19].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[19].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[20].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[20].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[21].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[21].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[22].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[22].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })

      document.getElementsByClassName("home_hotelBtn")[23].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[23].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })


      document.getElementsByClassName("home_hotelBtn")[24].addEventListener('click', function(){
        hotelBooking();
        let name = document.getElementsByClassName('home_hotelName')[24].innerHTML ;
        console.log(name);
        fetch(`${PrivateIP}/hotels/getHotelWithBookings/${name}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data[0])

          sessionStorage.setItem('hotel_id',data.data[0].id);
          document.getElementById('Book_hotel_name').innerHTML = data.data[0].hotelName;
          document.getElementsByClassName('popup_hotel_name')[0].innerHTML = data.data[0].hotelName;
          document.getElementById('Hotel_type_hotelbkgin_popup').innerHTML = data.data[0].hotelType ;
          document.getElementById('Hotel_type_hotelbkg').innerHTML = data.data[0].hotelType ;
          document.getElementsByClassName('hotelpersons')[0].innerHTML = data.data[0].totalPerson;
          document.getElementById('Book_hotel_price').innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelprice_popup')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[0].innerHTML = ` &#8377; ${data.data[0].price}`;
          document.getElementsByClassName('hotelsave_rate')[1].innerHTML = ` &#8377; ${data.data[0].price}`;

          document.getElementById('popup_hotelbuid_img1').src = `${PrivateIP}/hotels/displayHotelImage?id=${data.data[0].id} ` 

        })
      })
///////////   25 Hotels can book  ...

}




