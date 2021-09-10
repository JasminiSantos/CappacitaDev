const eye = document.querySelector("#eye");
const password = document.querySelector("#password")
eye.addEventListener('click',() => {
    if(password.type === "password"){
        password.type = "text";
        eye.setAttribute('src',"./assets/olho-fechado.svg");
    }
    else{
        password.type = "password";
        eye.setAttribute('src',"./assets/olho-aberto.svg");       
    }
});