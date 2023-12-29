
    const PrivateIP = "http://13.200.156.231:8097";

    //////////////////// Const Private IP declaration  ////////////////////////////////






window.onload = function () {
document.cookie = "sessionID";
    
document.querySelectorAll('input[type="number"]').forEach( input => {
    input.oninput = () =>{
        if(input.value.length > input.maxLength) input.value = input.value.slice(0,input.maxLength);
    }; 
})
    

    let slideIndex = 0;
        showSlides();
    function showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
            setTimeout(showSlides, 2000);                        // Change image every 2 seconds
    }
    }


   


function Login() {

   
    const formE1 = document.querySelector('.form1');
    formE1.addEventListener('submit', event => {
        event.preventDefault();
        let formData = new FormData(formE1);
        let data;
        data = Object.fromEntries(formData);
        console.log(data);

        document.getElementById('Login_loader').style.display = "block";
        document.getElementById('login-sec').style.opacity = "0.2";
    

        fetch(`${PrivateIP}/user/loginPage`, 
        
            {
                method: "POST",
                body: JSON.stringify({

                    "mobileNumber": data.mobilenumber,
                    "password": data.password

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8" ,
                    // 'Authorization': `Bearer ${JwtToken}`
                },
            })

            .then((response) => response.json())
            .then(data => {
                console.log(data);


                document.getElementById('Login_loader').style.display = "none";
                document.getElementById('login-sec').style.opacity = "1";


                if (data.statuscode == 200) {

                    document.getElementById("login_error_msg").innerHTML = "logged in succesfully";
                    document.getElementById("login_error_msg").style.color = "green";

                    localStorage.setItem('Login-UserName', data.data.userName);
                    localStorage.setItem('Login-MobileNumber', data.data.mobileNo);
                    localStorage.setItem('Login-Email', data.data.email);
                    localStorage.setItem('User-ID',data.data.userId );

                    sessionStorage.setItem('sessionID',data.data.userId );

                 
                    
                    var name = localStorage.getItem('Login-UserName');
                    var email = localStorage.getItem('Login-Email');
                    var mobileNo = localStorage.getItem('Login-MobileNumber');
                    
                   
                    

                                            //  Check if the session ID exists

                            if (sessionStorage.getItem('sessionID')) {
                                // Session ID exists, redirect to another page

                                location.assign("./Home/");

                                //window.alert('session storage is present');
                            } else {
                                // Session ID does not exist
                                console.log('Session ID does not exist');
                                window.alert('Please Login again, Something went wrong.');
                            }

                  


                } else {
                    document.getElementById("login_error_msg").style.display = "block";
                    document.getElementById("login_error_msg").innerHTML = data.data;

                };


            
                // if (isTokenExpired(JwtToken))
                //  {     // Token is expired, redirect to login page or handle reauthentication 

                //        window.location.href = "login.html";  
                //       return Promise.reject('Token expired');   }


                // if(data.statuscode == 500){
                //     document.getElementById("login_error_msg").innerHTML = "Internal Server Error";
                // }else{
                //     document.getElementById("login_error_msg").innerHTML = "no error";
                // }
            })
    })

}


// if(sessionStorage.getItem('UserID')){

//        location.assign("Ujjain_Home.html");
// }else{
//     window.alert('session storage is absent');

// }









function show_password_login() {

    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
      document.getElementsByClassName('eye_icon')[0].src = "./Images/icon_show.jpg";
    } else {
      x.type = "password";
      document.getElementsByClassName('eye_icon')[0].src = "./Images/icon_hide.jpg";
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////







function Register() {


    

    document.getElementById("login-div-contents").style.display = "none";
    document.getElementById("Please-register").style.display = "block";

    document.getElementById("Please-login").style.display = "none";
    document.getElementById("Please-reset").style.display = "none";
    document.getElementById("Register-div-contents").style.display = "block";  
    document.getElementById("Reset-div-contents").style.display = "none";

    // API Integration


    const formE2 = document.querySelector('.form2');

    formE2.addEventListener('submit', event => {
        event.preventDefault();

        let formData = new FormData(formE2);

        // console.log(formData.get('username'));       we can access data in input boxes here
        // console.log(formData.get('email'));
        // console.log(formData.get('mobileNumber'));
        let data;
        data = Object.fromEntries(formData);
        // console.log(data);

        document.getElementById('Login_loader').style.display = "block";
        document.getElementById('login-sec').style.opacity = "0.2";

        fetch(`${PrivateIP}/user/registration`,
            {
                method: "POST",
                body: JSON.stringify({
                    "userName": data.username,
                    "email": data.email,
                    "mobileNo": data.mobileNumber,  
                    "password": data.password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"    
                },
            })

            .then((response) => response.json())
            .then(data => {
                console.log(data);

                document.getElementById('Login_loader').style.display = "none";
                document.getElementById('login-sec').style.opacity = "1";


                if (data.statuscode == 200) {
                    //  block of code to be executed if the condition is true
                     Register_succesfull_msg();
                   // location.assign("Ujjain Home.html");

                } else {
                    //  block of code to be executed if the condition is false
                    Register_error_msg();
                    document.getElementById("error_message").innerHTML = data.data;



                }
            });


            
    })

}


function Register_succesfull_msg(){

    document.getElementById("Register_form").style.display = "none";
    document.getElementById('succesfull-registered').style.display = "block";

    document.getElementById('succesfull-registered').innerHTML = " Congratulations, your account has been successfully created you can login now."

}

function Register_error_msg() {

    document.getElementById("error_message").style.display = "block";
}



////////////////////////////////////////////////////////////////////////////////////////////////


// function Registerbtn() {
// }

// function otpblur() {

//     document.getElementById("otp-blur").style.opacity = "1";
// }


////////////////////////////////////////////////////////////////////////////////////////////


//                      Reset 


function Reset() {


    document.getElementById("Please-login").style.display = "none";
    document.getElementById("Please-register").style.display = "none";
    document.getElementById("Please-reset").style.display = "block";

    document.getElementById("login-div-contents").style.display = "none";
    document.getElementById("Register-div-contents").style.display = "none";
    document.getElementById("Reset-div-contents").style.display = "block";

    if (window.localStorage) {

        console.log("supported");
    } else {
        console.log("not supported")
    }


    const formE3 = document.querySelector('.form3');
    formE3.addEventListener('submit', event => {
        event.preventDefault();

        let formData = new FormData(formE3);
        let data;
        data = Object.fromEntries(formData);
        console.log(data);

        document.getElementById('Login_loader').style.display = "block";
        document.getElementById('login-sec').style.opacity = "0.2";

        fetch(`${PrivateIP}/user/resetPassword`, {
            
            method: 'PATCH',
            
            body: JSON.stringify({

                "mobileNumber": data.mobilenumber,
                "password": data.newpassword,
                "conformPassword": data.confirmpassword

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                document.getElementById('Login_loader').style.display = "none";
                document.getElementById('login-sec').style.opacity = "1";


                if (data.statuscode == 200) {

                    Reset_succesfull_msg();
                  
                } else {
                    document.getElementById('Reset_error_msg').innerHTML = data.data
                }

            })

    })
}

function Reset_succesfull_msg() {

    document.getElementById('succesfull-password-reset').style.display = "block";
    document.getElementById('succesfull-password-reset').innerHTML =
        "Your password has been reset successfully. Use your new password to Login.";

    document.getElementById('Please-reset').style.display = "none";
    document.getElementById('form3').style.display = "none";

}






/////////////////////////////////////////////////////////////////////////////////////////////////


// Mobile  Number min digits error ....

function myFunction() {
    const inpObj = document.getElementsByClassName('Mobile_number_inputs')[0];
    if (!inpObj.checkValidity()) {
        document.getElementById("login_error_msg").style.display = "block";
      document.getElementById("login_error_msg").innerHTML = "Number should be 10 digits";
    } else {
        document.getElementById("login_error_msg").style.display = "none";
    //   document.getElementById("demo").innerHTML = "Input OK";
    } 
}

function myReg_Mobile_no(){
    

    const inpOb = document.getElementsByClassName('Mobile_number_inputs')[1];
    if (!inpOb.checkValidity()) {
        document.getElementById("error_message").style.display = "block";
      document.getElementById("error_message").innerHTML = "Number should be 10 digits";
    } else {
        document.getElementById("error_message").style.display = "none";
    //   document.getElementById("demo").innerHTML = "Input OK";
    }


  }

  function myReset_Mobile_no(){

    const inpOb = document.getElementsByClassName('Mobile_number_inputs')[2];
    if (!inpOb.checkValidity()) {
        document.getElementById("Reset_error_msg").style.display = "block";
      document.getElementById("Reset_error_msg").innerHTML = "Number should be 10 digits";
    } else {
        document.getElementById("Reset_error_msg").style.display = "none";
    //   document.getElementById("demo").innerHTML = "Input OK";
    }

  }




