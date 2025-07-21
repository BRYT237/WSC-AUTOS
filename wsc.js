const suvModal = document.getElementById("modal");
const truckModal = document.getElementById("modal2");
const AboutModal = document.getElementById("modalBody");
const suvBtn = document.getElementById("suv");
const truckBtn = document.getElementById("truck");
const aboutBtn = document.getElementById("us");
const closeBtn = document.querySelector(".mbut");
const closeTruckBtn = document.querySelector(".mbut2");
const closeAboutBtn = document.querySelector(".mbut3");
const moreBtn = document.getElementById("more");
const signIn = document.getElementById("signin");



const showSuv = ()=>{
    suvModal.classList.toggle("disp");
    
}
const showTruck = ()=>{
    truckModal.classList.toggle("disp2");
    
}
const showUs = ()=>{
    AboutModal.classList.toggle("disp3");
    
}
const closeSuv = ()=>{
    suvModal.classList.toggle("disp");
}

const closeTruck = ()=>{
    truckModal.classList.toggle("disp2");
}
const closeUs = ()=>{
    AboutModal.classList.toggle("disp3");
}
const toSignUp = ()=>{
    window.location.href= "../sign/signup.html"
}
const tosignIn = () =>{
    window.location.href= "../sign/signin.html"
}


signIn.addEventListener("click",tosignIn);
suvBtn.addEventListener("click",showSuv);
truckBtn.addEventListener("click",showTruck);
aboutBtn.addEventListener("click",showUs);
closeBtn.addEventListener("click", closeSuv);
closeTruckBtn.addEventListener("click", closeTruck);
closeAboutBtn.addEventListener("click", closeUs);
moreBtn.addEventListener("click", toSignUp);


