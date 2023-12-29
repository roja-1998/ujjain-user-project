const PrivateIP = "http://13.200.156.231:8097";

//                Const Private IP declaration                               


window.onload = function () {
    


try{  
}catch(error){
    console.error(error);
}




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
              <input type="button" id="demo" class="Topvisited_ujjain_btn Maabagla_btn" value="Book a Guide" onclick="maabagFirstcard()" >
          </div>
        </div> `;
                document.getElementById("swiper-wrapper_maabag_up").innerHTML = data2;
                // console.log(data2);
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
        })  
  })

  
  }catch (error) {
    console.error(error);
    }
  
  
  











}