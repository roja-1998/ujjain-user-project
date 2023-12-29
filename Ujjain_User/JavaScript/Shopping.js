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

    Shopping();
}



// Shopping 

function Shopping(){
   


document.getElementById('Shopping_loader').style.display = "block";

fetch(`${PrivateIP}/shopping/getAll/product`)
.then(response => response.json())
.then(data => {  console.log(data.data) 

  document.getElementById('Shopping_loader').style.display = "none";

  let data2 = "";

  data.data.map( (product) => {

    data2 +=`


    <div class="swiper-slide swiper-slide-active shopping_slides" role="group" aria-label="1 / 7" >
      <div class="Ujjain_FamousPujas_div shoppingdivs_contents">
          <img src="${PrivateIP}/shopping/displayProductImage?id=${product.id}" class="Ujjain_FamousPujas_imgs shopimg" alt=""
              srcset="">
          <p class="Famous_puja_name shopping_name">${product.name}</p>
          <span class="Famous_puja_price shopprice">&#8377; ${product.price} </span>
          <input type="button" id="Shopping_orderNow" class="Famous_puja_booknow_btn shopbtn" onclick="shopping_btn()" value="Order Now">
      </div>
   </div>



    `;
  
            document.getElementById("swiper-wrapper_shopping_down").innerHTML = data2;
            // console.log(data2);
  
          })
               document.getElementById('Shopping_orderNow').click(); 
})
}

  
function shopping_btn(){

    // -------shopping items couting --------
  let remove = document.getElementById('minus01');
  let add = document.getElementById('plus01');
   
  let int = document.getElementById('number');
  let integer = 0;
   
  add.addEventListener('click',function() {
  
    integer++;
    int.innerHTML = integer;
  
  });
   
  remove.addEventListener('click',function() {
    if(integer > 1){
      integer--;
    }
    int.innerHTML = integer;
   
  });
  // --------------------------------------------------
  
  
  document.getElementsByClassName('shopbtn')[0].addEventListener('click',
    function(){
  
      //document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[0].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${ data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[0].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[1].addEventListener('click',
    function(){
  
     
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[1].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[1].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[2].addEventListener('click',
    function(){
  
     
      
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[2].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[2].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[3].addEventListener('click',
    function(){
  
     
     // document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[3].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[3].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[4].addEventListener('click',
    function(){
  
      //document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[4].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[4].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[5].addEventListener('click',
    function(){
  
     
     // document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[5].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[5].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[6].addEventListener('click',
    function(){
  
     
      //document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[6].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[6].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
    document.getElementsByClassName('shopbtn')[7].addEventListener('click',
    function(){
  
     
     // document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[7].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[7].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
    
  
    document.getElementsByClassName('shopbtn')[8].addEventListener('click',
    function(){
  
     
      //document.getElementById('profile-update-container').style.display = "none";
      document.getElementById('shopping_popup').style.display = "block";
      document.getElementById('shopping_main').style.display = "block";
      document.getElementById('shopPackageBooking_popupdiv').style.display = "block";
      document.getElementById('shoppingConfirmation_popup_div').style.display = "none";  
  
      let shopName = document.getElementsByClassName('shopping_name')[8].innerHTML;
  
      fetch(`${PrivateIP}/shopping/getProductByName/${shopName}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data[0]);  
        sessionStorage.setItem('shoppingId', data.data[0].id);
      document.getElementById('shopping_name_inpoup').innerHTML = data.data[0].name;
      document.getElementsByClassName('shopping_popup_price')[0].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[1].innerHTML = `&#8377; ${data.data[0].price}`;
      document.getElementsByClassName('shopping_popup_price')[2].innerHTML = `&#8377; ${data.data[0].price}`;
  
      let shop_popup_img = document.getElementsByClassName('shopimg')[8].src;
      
      document.getElementById('shopping_poup_img').src = shop_popup_img ;
      })
  
    });
  
}
  
  
  
function shopconfirmation(){
    document.getElementById('shopping_popup').style.display = "block";
    document.getElementById('shopPackageBooking_popupdiv').style.display = "none";
    document.getElementById('shopping_main').style.display = "block";
    document.getElementById('shoppingConfirmation_popup_div').style.display = "block";
  
    var shoppingID = sessionStorage.getItem('shoppingId');
    var user_id = localStorage.getItem('User-ID');
   
     var formdata = new FormData();
     formdata.append("userId", user_id);
     formdata.append("shoppingId", shoppingID);
     formdata.append("items", "1");
     
     var requestOptions = {
       method: 'POST',
       body: formdata,
       redirect: 'follow'
     };
     
     fetch(`${PrivateIP}/admin/api/shop/book`, requestOptions)
       .then(response => response.json())
       .then(result => {console.log(result)  
      
          // document.getElementById('omkarConfirmation_popupdiv').style.display = "block";
          // document.getElementById('omkar_popupdiv').style.display = "none";
  
      })
       .catch(error => console.log('error', error));
   
}
  
function shoppingBooking_closePopUp() {
    document.getElementById('shopping_popup').style.display = "none";
    document.getElementById('shopping_main').style.display = "block";
    document.getElementById('shoppingConfirmation_popup_div').style.display = "none";
}
function ShoppingConfirmation_closePopUp() {
    document.getElementById('shopping_popup').style.display = "none";
    document.getElementById('shopping_main').style.display = "block";
    document.getElementById('shoppingConfirmation_popup_div').style.display = "none";
}
  

function swiperBtn_shopping_down(){   
  document.getElementById('swiper-button-prev_shopping_down').style.display = "block"; 
}
function swiperBtn_gallery_down(){   
  document.getElementById('swiper-button-prev_gallery_down').style.display = "block"; 
}



















