
                const PrivateIP = "http://13.200.156.231:8097";

//                Const Private IP declaration                               

window.onload = function () {
    var dt = new Date();
    document.getElementById("Viewdatetime").innerHTML = dt.toLocaleTimeString();

    //             Input Only number entering scrpit...... 
    document.querySelectorAll('input[type="number"]').forEach( input => {
        input.oninput = () =>{
        if(input.value.length > input.maxLength) input.value = input.value.slice(0,input.maxLength);
            }; 
    })
    viewProfile();
}

function viewProfile(){
//                                                                               View Profile functions
    console.log("View Profile Page ")
    document.getElementById('profile_loader').style.display = "block";
    document.getElementById('profile_div').style.opacity ="0";
    document.getElementById('profile_div2').style.opacity ="0";
    
    ////                                                     View Profile API 
          var user_id = localStorage.getItem('User-ID');
    
        fetch(`${PrivateIP}/user/getBy/${user_id}`)
        .then(response => response.json())
        .then(data => {  console.log(data.data) 
                console.log(data.data.hotelBooking); 


    
    document.getElementById('profile_loader').style.display = "none";
    document.getElementById('profile_div').style.opacity ="1";
    document.getElementById('profile_div2').style.opacity ="1";
    
    document.getElementById("Login_User_Name").innerHTML = data.data.userName; 
     document.getElementById('username_viewprofile').setAttribute('value',data.data.userName ) ;
    document.getElementById('userMobile_viewprofile').setAttribute('value',data.data.mobileNo ) ;



      try{
    
          let data2 = "";                                      //      Hotel Bookings  Display....
          document.getElementById('HotelBookings_count').innerHTML = `( ${data.data.hotelBooking.length} )`;
          data.data.hotelBooking.map( (product) => {
            console.log(product.hotels[0])
            data2 +=`
                      <div class="child_divs hotel_booking_divs">
                          <div><img src="${PrivateIP}/hotels/displayHotelImage?id=${product.hotels[0].id}" class="hotel_build_imgs" alt=""></div>
                          <div>
                              <h1 class="hotel_names"> ${product.hotels[0].hotelName}</h1>
                              <p class="price"> <span class="currency_symbol">&#8377;</span> ${product.hotels[0].price} </p>
                          </div>
                      </div>
                    `;
                      document.getElementById("hotelbook_inViewprofile").innerHTML = data2;     
            })
        }catch{
    
        }
    
            let data3 = "";                                        //      Ujjain Bookings  Display....
            document.getElementById('VisitedBookings_count').innerHTML = `( ${data.data.ujjainBookings.length} )`;
            data.data.ujjainBookings.map( (product) => {
             
            data3 +=`
                    <div class="child_divs ujjain_Bookings_divss">
                        <div><img src="${PrivateIP}/guide/displayHotelImage?id=${product.ujjainDarshanGuide.id}" class="visited_imgs" alt=""></div>
                        <div>
                            <h1 class="hotel_names"> ${product.ujjainDarshanGuide.name}</h1>
                            <p class="price"> <span class="currency_symbol">&#8377;</span> ${product.ujjainDarshanGuide.price} </p>
                        </div>
                    </div>
    
                    `;
                      document.getElementById("UjjainBookings_inViewProfile").innerHTML = data3;    
            })
          
    
            let data4 = '';    
            document.getElementById('PujaBookings_count').innerHTML = `( ${data.data.pojaBookings.length} )`;                                            //      Poja Bookings  Display....
            data.data.pojaBookings.map( (product) => {
              
              data4 +=`
                    <div class="child_divs">
                    <div><img src="${PrivateIP}/poja/display/custom?id=${product.poja.id}" class="visited_imgs" alt=""></div>
                    <div>
                        <h1 class="puja_names">${product.poja.poojaName}</h1>
                        <img src="../Images/Location icon.png" class="Loc_imgs" alt="">
                        <span class="T_names">${product.poja.templeName}</span>
                        <span class="price pricepbkg" > <span class="currency_symbol">&#8377;</span> ${product.poja.price} </span>
                    </div>
    
                </div>
                  
                `;
                  document.getElementById("Puja_Bookings_inViewProfile").innerHTML = data4;     
            })
    
            let data5= '';             
            document.getElementById('TaxiBookings_count').innerHTML = `( ${data.data.taxiService.length} )`;                                   //      TAXI Bookings  Display....
            data.data.taxiService.map( (product) => {
    
              data5 +=`
    
              <div class="child_divs taxi_bookings">
              <div class="parent_taxi_bookings_div">
                 <div class="F_T_div"> <p class="p_tag_from_to">From :</p> <span class="hotel_names">${product.fromLocation}</span>  </div> 
                 <div class="F_T_div">  <p class="p_tag_from_to">To :</p> <span class="hotel_names">${product.toLocation}</span> </div>
                  <p class="price taxiprice_in_vieprofile"> <span class="currency_symbol">&#8377;</span> ${product.totalFare} </p>
              </div>
          </div>
                  
                `;
                  document.getElementById("TaxiBookings_viewProfile").innerHTML = data5;     
            })
    
    
            let data6= '';                                                //      Airport Bookings  Display....
            document.getElementById('AirportBookings_count').innerHTML = `( ${data.data.airport.length} )`;                                   //      TAXI Bookings  Display....

            data.data.airport.map( (product) => {
    
              data6 +=`
    
              <div class="child_divs ">
              <div class="parent_taxi_bookings_div">
                 <div class="F_T_div"> <p class="p_tag_from_to">From :</p> <span class="hotel_names">${product.from}</span>  </div> 
                 <div class="F_T_div">  <p class="p_tag_from_to">To :</p> <span class="hotel_names">${product.to}</span> </div>
                  <p class="price taxiprice_in_vieprofile"> <span class="currency_symbol">&#8377;</span> ${product.totalprice} </p>
              </div>
          </div>
                  
                `;
                  document.getElementById("AirportBook_inViewprofile").innerHTML = data6;     
            })
    
            let data7= '';                                                //      Shopping Bookings  Display....
            document.getElementById('ShoppingBookings_count').innerHTML = `( ${data.data.shopBookings.length} )`;                                   //      TAXI Bookings  Display....

            data.data.shopBookings.map( (product) => {
    
              console.log(product.shopping);
    
              data7 +=`
                      <div class="child_divs ujjain_Bookings_divss">
                        <div><img src="${PrivateIP}/shopping/displayProductImage?id=${product.shopping.id}" class="visited_imgs" alt=""></div>
                        <div>
                            <h1 class="hotel_names"> ${product.shopping.name}</h1>
                            <p class="price price1"> <span class="currency_symbol">&#8377;</span> ${product.shopping.price} </p>
                        </div>
                      </div>`;
                  document.getElementById("ShoppingBKG_inViewprofile").innerHTML = data7;     
            })
    
    
    
    
        })
    // document.getElementById('profile_view_main').style.display = "flex";
  
}

    function Edit_profileIcon(){
    console.log('edit btn clicked')
      document.getElementById('Update_btn').style.display = "block";
      document.getElementById('profile_edit_icon').style.display = "none";
    
     let readonlyInput = document.getElementById('username_viewprofile');
     let inputMobileNO =  document.getElementById('userMobile_viewprofile');
    
    readonlyInput.removeAttribute('readonly');
    inputMobileNO.removeAttribute('readonly');
    
      const formE1 = document.querySelector('#profile_update_form');
    
        formE1.addEventListener('submit', event => {
            event.preventDefault();
    
            let formData = new FormData(formE1);
    
            let data;
            data = Object.fromEntries(formData);
            console.log(data);  
    
            var user_id = localStorage.getItem('User-ID');
    
    
            fetch(`${PrivateIP}/user/updateById/${user_id}`, 
            {
                method: "PUT",
                body: JSON.stringify(
                  {
                    // "id": user_id,
                    "userName": data.username_update,
                    // "email":  data.email,
                    "mobileNo": data.userMB_update,
                    // "password": data.password
                }
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            })
    
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                //console.log(data.data)
    
                if (data.statuscode == 200) {
                  //  block of code to be executed if the condition is true
                  location.reload();
              } else {
                  //  block of code to be executed if the condition is false
                 //document.getElementById('Update_error_message').style.display = "block";
                 //document.getElementById('Update_error_message').innerHTML = data.data;
              }
    
               
            });     
          })
    }
    
    
    //  function userUpdateBtn(){
    //   // window.location.reload();
    //  }

    function myUpdate_user(){
    
      const inpOb = document.getElementById('update-number03');
        if (!inpOb.checkValidity()) {
            document.getElementById("Update_error_message").style.display = "block";
          document.getElementById("Update_error_message").innerHTML = "Number should be 10 digits";
        } else {
            document.getElementById("Update_error_message").style.display = "none";
        //   document.getElementById("demo").innerHTML = "Input OK";
        }
    
    
    }
    
    
// function Cancel_UpdateBtn(){
//       viewProfile();
// }
    
    
function Logout(){
    sessionStorage.clear();
}
