

var name = document.getElementsByName('fullName')[0];
var email = document.getElementsByName('email')[0];
var password = document.getElementsByName('password')[0];
var con_password= document.getElementsByName('confirm_Password')[0];
const pEmail =document.querySelector(".validEmail")
const pPass =document.querySelector(".validPassword")
const pConfirm =document.querySelector(".validConfirm")

const passwordSymbols = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.onblur=()=>{
   if(!emailRegex.test(email.value)){
    pEmail.innerHTML = 'Invalid Email Address'
    pEmail.classList.add('emailP')
   }
   else{
    pEmail.innerHTML = ''
    pEmail.classList.remove('emailP')
   }
}

password.onblur=()=>{
    if(!passwordSymbols.test(password.value)){
        pPass.innerHTML ='Invalid Password'
        pPass.classList.add('passp')
    }else{
        pPass.innerHTML=''
        pPass.classList.remove('passp')
    }
}



