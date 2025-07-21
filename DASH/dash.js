import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth,
         onAuthStateChanged,
         signOut
        } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAsfbHv9FIt1o5hzyArlebh0X2n92ZeevQ",
    authDomain: "wsc-autos.firebaseapp.com",
    projectId: "wsc-autos",
    storageBucket: "wsc-autos.firebasestorage.app",
    messagingSenderId: "161409095481",
    appId: "1:161409095481:web:0e82c451534adb6647bae8",
    measurementId: "G-LP02CF98WG"
  };
     
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const DB = getFirestore(app);
  const userColRef = collection(DB, "users");


let currentUserId;
let currentuser;
const icon = document.getElementById("ic");

const  logOutBtn = document.getElementById("sigU");

onAuthStateChanged(auth, async (user)=>{
    

        if (user) {
            currentUserId = user.uid
            try {
                 const docRef = doc(userColRef, user.uid);
                 const userCredential = await getDoc(docRef); 
                 
                 if (userCredential) {
                    currentuser = userCredential.data();
                    signPortal.classList.toggle("signinDis");
                    logOutBtn.classList.toggle("logout");
                    
                    await fetchCartItems();
                    showVehicles();
                 } else {
                    window.location.href = "../index.html"
                 }
            } catch (error) {
                console.error("Error Identifying User!", error);
            }
            console.log(user.uid);
           
            console.log(userCredential);
            
            icon.classList.add("dis")

           
        }
})


if (logOutBtn) {
    logOutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("You have successfuly logged out!");
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Logout Error:", error);
        }
    });
}

const products = [
    {
        id:1,
        name: "Toyota Corolla",
        price: "22325",
        category: "CAR",
        description: "The 2025 Corolla remains a dependable, well-equipped compact car. With solid fuel economy, comprehensive safety tech, and a range of trims—from efficient hybrids to sporty FX editions and the high-performance GR—there's something for everyone.",
        imgeUrl: "../images/cor 1.webp",
        imageUrl2: "../images/cor 2.webp" 
         
    },
    {   
        id:2,
         name: "Toyota Camry",
        price: "28700",
        category: "CAR",
        description: "The 2025 Toyota Camry marks a bold shift to an all-hybrid lineup. It blends improved fuel efficiency (up to 51 mpg), spacious and refined interiors, advanced tech, and full-time AWD availability—all within a trusted midsize-sedan package. It’s a compelling choice for those seeking comfort, value, and eco-conscious performance.",
        imgeUrl: "../images/cam 1.webp",
        imageUrl2: "../images/cam 2.webp" 
    },
    {   
        id:3,
         name: "Toyota Prius",
        price: "28350",
        category: "CAR",
        description: "The 2025 Prius fuses sporty design, advanced hybrid efficiency (up to 57 mpg), robust AWD, and the choice of full hybrid or plug-in powertrain. With upscale trims (Nightshade, PHEV XSE Premium) and cutting-edge features, it’s now among the most tech-rich and stylistic hybrids on the market.",
        imgeUrl: "../images/pri 1.webp",
        imageUrl2: "../images/pri 2.webp" 
    },
    {   
        id:4,
         name: "Toyota GR86",
        price: "30400",
        category: "CAR",
        description: "The 2025 Toyota GR86 is a pure driver's coupe offering thrilling performance at a reachable price. With sharp handling, manual transmission lovers in mind, and a unique Hakone Edition for enthusiasts, it remains a standout choice among lightweight, rear-drive sports cars. Let me know if you'd like a comparison with the Subaru BRZ, Mazda Miata, or Mustang EcoBoost!.",
        imgeUrl: "../images/GR 1.webp",
        imageUrl2: "../images/GR 2.webp" 
    },
    {   
        id:5,
        name: "Toyota RAV4",
        price: "29550",
        category: "SUV",
        description: "The 2025 RAV4 offers versatility across three powertrains to match various needs—from a capable gas model to an efficient hybrid and a punchy PHEV with excellent EV range and acceleration. It’s well-equipped with tech and safety gear, roomy and practical, maintaining its top-selling SUV status with choices that cater to fuel savings, performance, or both.",
        imgeUrl: "../images/rav 1.webp",
        imageUrl2: "../images/rav 2.webp" 
    },
     {
        id:6,
        name: "Toyota Highlander",
        price: "40320",
        category: "SUV",
        description: "The 2025 Toyota Highlander offers a great blend of turbocharged performance or fuel-sipping hybrid efficiency, with standard AWD available on hybrid models. It features a refined, tech-rich cabin, three-row versatility, and top-tier safety—making it a well-rounded family SUV.",
        imgeUrl: "../images/high 1.webp",
        imageUrl2: "../images/high 2.webp" 
    },
     {
        id:7,
        name: "Toyota 4Runner",
        price: "41270",
        category: "SUV",
        description: "The 2025 Toyota 4Runner delivers modern capability with rugged DNA intact. With choice of turbo or hybrid power, serious off‑road hardware, advanced tech, and top-tier safety, it’s built for both trailblazers and shoppers wanting comfort with capability.",
        imgeUrl: "../images/run 1.webp",
        imageUrl2: "../images/run 2.webp" 
    },
    {
        id:8,
        name: "Toyota Sequoia",
        price: "62425",
        category: "SUV",
        description: "The 2025 Sequoia is a powerful, hybrid-only, full-size SUV that combines serious towing ability, a tech-filled cabin, and solid off-road chops (especially in TRD Pro), all wrapped in a family-friendly design. It’s ideal for buyers seeking modern capability without sacrificing comfort or efficiency.",
        imgeUrl: "../images/seq 1.webp",
        imageUrl2: "../images/seq 2.webp" 
    },
    {
        id:9,
        name: "Toyota Tacoma",
        price: "31590",
        category: "TRUCK",
        description: "The 2025 Tacoma marks a bold evolution—a tougher, techier midsize truck built on the TNGA‑F platform. With strong performance, hybrid capability, serious off-road credentials, and family-friendly tech, it covers all bases. While fuel economy gains are modest, improved torque and modern features make it a compelling pick. Whether you’re hauling gear or tackling trails, there’s a Tacoma that fits.",
        imgeUrl: "../images/taco 1.webp",
        imageUrl2: "../images/taco 2.webp" 
    },
    {
        id:10,
        name: "Toyota Tundra",
        price: "40090",
        category: "TRUCK",
        description: "The 2025 Tundra combines serious hauling muscle, modern hybrid efficiency, and off-road grit in a tech-rich cabin. With options like the hybrid i‑Force MAX, TRD Rally upgrades, advanced towing aids, and luxurious interior touches, it’s a versatile full-size pickup ready for work, trail, or everyday driving.Want trim-by-trim pricing, fuel economy breakdowns, or how it stacks up against the Silverado or F-150? Just let me know!",
        imgeUrl: "../images/tun 1.webp",
        imageUrl2: "../images/tun 2.webp" 
    },

]

const cart = document.getElementById("cart");
const showCars = document.getElementById("cars");
const showSuvs = document.getElementById("suv");
const showTrucks = document.getElementById("truck");


const showVehicles = async () => {
    products.forEach((el,index) => {
        showCars.innerHTML += `
        <div class="main">
        <h1 class="h1">${el.category}</h1>
        <div class="picsC">
            <img src="${el.imgeUrl}">
            <img src="${el.imageUrl2}">
        </div>
        <h3>${el.name}</h3>
        <p>$${el.price}.00 MSRP</p>
        <p>${el.description}</p>
        <h3 class="get" 
        id="${el.id}"
        name="${el.name}"
        price="${el.price}"
        image="${el.imgeUrl}"
        cate="${el.category}"
        >Get Yours</h3>
        </div>
    `

    });
    prodCart();
    
}





const prodCart = ()=> {
    const addToCart = document.querySelectorAll(".get"); 

    addToCart.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            const getId = btn.getAttribute("id");
            const getName = btn.getAttribute("name");
            const getPrice = btn.getAttribute("price");
            const getImage = btn.getAttribute("image");
            const getCate = btn.getAttribute("cate");
            
            const vehicle = {
                id: getId,
                name: getName,
                price: getPrice,
                ImageUrl: getImage,
                Category: getCate
            };

            addCarToCart(vehicle);
        })
    });
    
}

const addCarToCart = async (vehicle) =>{
    try {
        const orderColRef = collection(userColRef,currentUserId, "Cart")

        await addDoc(orderColRef, {
            Id: vehicle.id,
            Name: vehicle.name,
            Price: vehicle.price,
            imageUrl : vehicle.ImageUrl,
            category : vehicle.Category,
            Quantity : 1,
        });

        console.log("Item Saved To Firestore:", vehicle.name);
        await fetchCartItems();
        
    } catch (error) {
        console.log(error);
    }
}


const deleteItems = async (delId, dels)=>{
    try {
        const cartRef = doc(DB, "users", currentUserId, "Cart", delId);


        const deleteEach = await getDoc(cartRef)
        if (deleteEach) {
            await deleteDoc(cartRef)
        }
        await fetchCartItems();



    } catch (error) {
        console.log(error);
    }

}

const totalDisp = document.getElementById("total");

const fetchCartItems = async () =>{
    await addCarToCart();
    cart.innerHTML = "";
    try {
        const cartRef = collection(DB, "users", currentUserId, "Cart");
        const cartSnapshot = await getDocs(cartRef);
        
        cartSnapshot.forEach((docSnap) => {
            const item = docSnap.data();
            const vehicleId = docSnap.id
        const quantity = item.Quantity || 1;
        const itemId = docSnap.id;   
        const total = Number(item.Price) * Number(quantity);
        cart.innerHTML += `
            <div class="mainD">
                <div class="imageD">
                    <img src="${item.imageUrl}">
                </div>

                <div>
                <h4>${item.Name}</h4>
                <h5>Category: ${item.category}</h5>
                <p>Quantity: ${quantity}</p>
                </div>

                <div>
                <p>$${item.Price}.00 MSRP</p>
                <br>
                <button class="Qbut" id="inc" data-id="${itemId}">+</button>
                <button class="Qbut" id="dec" data-id="${itemId}">-</button>
                <br>
                <h5>Total: $${total}.00</h5>
                <button class="delBtns" car="${vehicleId}">Delete</button> 
                </div>
                
            </div>
            <hr>


        `
        

        });

       
        setupQuantity()

        const deleteCart = document.querySelectorAll(".delBtns");
        deleteCart.forEach((dels)=>{
            dels.addEventListener("click", ()=>{
                alert("Item Removed from Cart.");
                const delId = dels.getAttribute("car");
                alert(delId)
                deleteItems(delId,dels)
            })
        })

        
        
    } catch (error) {
        console.log(error);
        cart.innerHTML = "<p>Error Loading Cart.</p>"
    }
}

const setupQuantity = () =>{
    const incBtn = document.querySelectorAll("#inc");
    const decBtn = document.querySelectorAll("#dec");

    incBtn.forEach((btn)=>{
        btn.addEventListener("click", async () => {
            const itemId = btn.getAttribute("data-id");
            const cartItemRef = doc(DB, "users", currentUserId, "Cart", itemId);
            const itemSnap = await getDoc(cartItemRef);

            if (itemSnap) {
                const currentQty = itemSnap.data().Quantity || 1;
                await updateDoc(cartItemRef,{
                    Quantity: currentQty + 1,
                });
                await fetchCartItems();
                setupQuantity();   
            }
        });        
    });


    // ///////////

    decBtn.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const itemId = btn.getAttribute("data-id");
          const cartItemRef = doc(DB, "users", currentUserId, "Cart", itemId);
          const itemSnap = await getDoc(cartItemRef);
    
          if (itemSnap) {
            const currentQty = itemSnap.data().Quantity || 1;
    
            if (currentQty > 1) {
              await updateDoc(cartItemRef, {
                Quantity: currentQty - 1,
              }); 
            } else {
              // delete item if qty reaches 0
              await deleteDoc(cartItemRef);
            }
    
            await fetchCartItems(); // refresh cart
            setupQuantityButtons(); // rebind buttons
          }
        });
      });




}
setupQuantity();

// const checkoutBtn = document.getElementById("check");




document.addEventListener("click", async (e)=>{
    if (e.target  && e.target.id === "check") {
        const cartRef = collection(DB, "users", currentUserId, "Cart");
        const cartSnapshot = await getDocs(cartRef);

        if (cartSnapshot === "") {
            alert("🛒 Cart is Empty!");
            return;
        }

        let items = [];
        let totalAmount = 0;

        cartSnapshot.forEach((docSnap)=>{
            const data = docSnap.data();
            const qnty = data.Quantity || 1;
            totalAmount += qnty * data.Price;
            items.push({
                Name: data.Name,
                Quantity: qnty,
                Price: data.Price,
                Subtotal: qnty * data.Price,
                imageUrl: data.imageUrl
            });
        });


        const confirmCheckout = confirm(
            "Proceed to Checkout ? Click OK to confirm." 
        )

        if (confirmCheckout) {
            await addDoc(collection(DB, "users", currentUserId, "ConfirmedOrders"), {
                items,
                totalAmount,
                createdAt: new Date().toISOString()
            });

            for(const docSnap of cartSnapshot.docs) {
                await deleteDoc(doc(DB, "users", currentUserId, "Cart", docSnap.id));
            }

            alert("Order Placed Successfully!!");
            await fetchCartItems(); 
        }
    }
});



const signPortal = document.getElementById("sigN");
const  toSignIn = ()=>{ 
    window.location.href = "../sign/signin.html";
}
signPortal.addEventListener("click", toSignIn);



const suvModal = document.getElementById("modal");
const truckModal = document.getElementById("modal2");
const AboutModal = document.getElementById("modalBody");
const sectC = document.getElementById("sectC");
const suvBtn = document.getElementById("suv");
const truckBtn = document.getElementById("truck");
const aboutBtn = document.getElementById("us");
const closeBtn = document.querySelector(".mbut");
const closeTruckBtn = document.querySelector(".mbut2");
const closeAboutBtn = document.querySelector(".mbut3");
const moreBtn = document.getElementById("more");
const cartBtn = document.getElementById("cartBtn");





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
const ShowCart = ()=>{
    sectC.classList.toggle("cartDisp");
}
const toSignUp = ()=>{
    window.location.href= "../sign/signup.html"
}

const logO = () =>{
    logOut.classList.toggle("logout");
}

cartBtn.addEventListener("click", ShowCart);
suvBtn.addEventListener("click",showSuv);
truckBtn.addEventListener("click",showTruck);
aboutBtn.addEventListener("click",showUs);
closeBtn.addEventListener("click", closeSuv);
closeTruckBtn.addEventListener("click", closeTruck);
closeAboutBtn.addEventListener("click", closeUs);
// moreBtn.addEventListener("click", toSignUp);


// // Firebase imports
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     doc,
//     getDocs,
//     getDoc,
//     deleteDoc,
//     updateDoc
// } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
// import {
//     getAuth,
//     onAuthStateChanged,
//     signOut
// } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAsfbHv9FIt1o5hzyArlebh0X2n92ZeevQ",
//     authDomain: "wsc-autos.firebaseapp.com",
//     projectId: "wsc-autos",
//     storageBucket: "wsc-autos.appspot.com",
//     messagingSenderId: "161409095481",
//     appId: "1:161409095481:web:0e82c451534adb6647bae8",
//     measurementId: "G-LP02CF98WG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const DB = getFirestore(app);
// const userColRef = collection(DB, "users");

// // DOM Elements
// const logOutBtn = document.getElementById("sigU");
// const signPortal = document.getElementById("sigN");
// const icon = document.getElementById("ic");
// const cart = document.getElementById("cart");
// const showCars = document.getElementById("cars");
// const sectC = document.getElementById("sectC");

// // Authentication
// let currentUserId;
// let currentuser;

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         currentUserId = user.uid;

//         try {
//             const docRef = doc(userColRef, user.uid);
//             const userCredential = await getDoc(docRef);

//             if (userCredential.exists()) {
//                 currentuser = userCredential.data();
//                 signPortal.classList.toggle("signinDis");
//                 logOutBtn.classList.toggle("logout");

//                 await fetchCartItems();
//                 showVehicles();

//                 if (icon) {
//                     icon.classList.add("dis");
//                 }
//             } else {
//                 window.location.href = "../wsc.html";
//             }
//         } catch (error) {
//             console.error("Error Identifying User!", error);
//         }
//     }
// });

// // Logout
// if (logOutBtn) {
//     logOutBtn.addEventListener("click", async () => {
//         try {
//             await signOut(auth);
//             window.location.href = "../wsc.html";
//         } catch (error) {
//             console.error("Logout Error:", error);
//         }
//     });
// }

// // Product List
// const products = [/* unchanged product list, same as yours */];

// // Show Vehicles
// const showVehicles = () => {
//     products.forEach((el) => {
//         showCars.innerHTML += `
//         <div class="main">
//             <h1 class="h1">${el.category}</h1>
//             <div class="picsC">
//                 <img src="${el.imgeUrl}">
//                 <img src="${el.imageUrl2}">
//             </div>
//             <h3>${el.name}</h3>
//             <p>$${el.price}.00 MSRP</p>
//             <p>${el.description}</p>
//             <h3 class="get"
//                 id="${el.id}"
//                 name="${el.name}"
//                 price="${el.price}"
//                 image="${el.imgeUrl}"
//                 cate="${el.category}">
//                 Get Yours
//             </h3>
//         </div>`;
//     });

//     prodCart();
// };

// // Add to Cart
// const prodCart = () => {
//     const addToCart = document.querySelectorAll(".get");

//     addToCart.forEach((btn) => {
//         btn.addEventListener("click", () => {
//             const vehicle = {
//                 id: btn.getAttribute("id"),
//                 name: btn.getAttribute("name"),
//                 price: btn.getAttribute("price"),
//                 ImageUrl: btn.getAttribute("image"),
//                 Category: btn.getAttribute("cate")
//             };

//             addCarToCart(vehicle);
//         });
//     });
// };

// const addCarToCart = async (vehicle) => {
//     try {
//         const orderColRef = collection(userColRef, currentUserId, "Cart");
//         await addDoc(orderColRef, {
//             Id: vehicle.id,
//             Name: vehicle.name,
//             Price: vehicle.price,
//             imageUrl: vehicle.ImageUrl,
//             category: vehicle.Category,
//             Quantity: 1
//         });

//         console.log("Item Saved To Firestore:", vehicle.name);
//         await fetchCartItems();
//     } catch (error) {
//         console.log("Add to cart error:", error);
//     }
// };

// // Fetch Cart
// const fetchCartItems = async () => {
//     cart.innerHTML = "";
//     try {
//         const cartRef = collection(DB, "users", currentUserId, "Cart");
//         const cartSnapshot = await getDocs(cartRef);

//         cartSnapshot.forEach((docSnap) => {
//             const item = docSnap.data();
//             const quantity = item.Quantity || 1;
//             const total = Number(item.Price) * quantity;
//             const itemId = docSnap.id;

//             cart.innerHTML += `
//             <div class="mainD">
//                 <div class="imageD">
//                     <img src="${item.imageUrl}">
//                 </div>
//                 <div>
//                     <h4>${item.Name}</h4>
//                     <h5>Category: ${item.category}</h5>
//                     <p>Quantity: ${quantity}</p>
//                 </div>
//                 <div>
//                     <p>$${item.Price}.00 MSRP</p>
//                     <br>
//                     <button class="Qbut" id="inc" data-id="${itemId}">+</button>
//                     <button class="Qbut" id="dec" data-id="${itemId}">-</button>
//                     <br>
//                     <h5>Total: $${total}.00</h5>
//                     <button class="delBtns" car="${itemId}">Delete</button> 
//                 </div>
//             </div>
//             <hr>`;
//         });

//         setupQuantity();

//         const deleteButtons = document.querySelectorAll(".delBtns");
//         deleteButtons.forEach((btn) => {
//             btn.addEventListener("click", () => {
//                 const delId = btn.getAttribute("car");
//                 deleteItems(delId);
//             });
//         });

//     } catch (error) {
//         console.error("Error loading cart:", error);
//         cart.innerHTML = "<p>Error Loading Cart.</p>";
//     }
// };

// const deleteItems = async (delId) => {
//     try {
//         const cartRef = doc(DB, "users", currentUserId, "Cart", delId);
//         await deleteDoc(cartRef);
//         await fetchCartItems();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const setupQuantity = () => {
//     const incBtns = document.querySelectorAll("#inc");
//     const decBtns = document.querySelectorAll("#dec");

//     incBtns.forEach((btn) => {
//         btn.addEventListener("click", async () => {
//             const itemId = btn.getAttribute("data-id");
//             const cartItemRef = doc(DB, "users", currentUserId, "Cart", itemId);
//             const itemSnap = await getDoc(cartItemRef);

//             if (itemSnap.exists()) {
//                 const currentQty = itemSnap.data().Quantity || 1;
//                 await updateDoc(cartItemRef, {
//                     Quantity: currentQty + 1
//                 });
//                 await fetchCartItems();
//             }
//         });
//     });

//     decBtns.forEach((btn) => {
//         btn.addEventListener("click", async () => {
//             const itemId = btn.getAttribute("data-id");
//             const cartItemRef = doc(DB, "users", currentUserId, "Cart", itemId);
//             const itemSnap = await getDoc(cartItemRef);

//             if (itemSnap.exists()) {
//                 const currentQty = itemSnap.data().Quantity || 1;

//                 if (currentQty > 1) {
//                     await updateDoc(cartItemRef, {
//                         Quantity: currentQty - 1
//                     });
//                 } else {
//                     await deleteDoc(cartItemRef);
//                 }

//                 await fetchCartItems();
//             }
//         });
//     });
// };

// // Checkout
// document.addEventListener("click", async (e) => {
//     if (e.target && e.target.id === "check") {
//         const cartRef = collection(DB, "users", currentUserId, "Cart");
//         const cartSnapshot = await getDocs(cartRef);

//         if (cartSnapshot.empty) {
//             alert("🛒 Cart is Empty!");
//             return;
//         }

//         let items = [];
//         let totalAmount = 0;

//         cartSnapshot.forEach((docSnap) => {
//             const data = docSnap.data();
//             const qnty = data.Quantity || 1;
//             totalAmount += qnty * data.Price;
//             items.push({
//                 Name: data.Name,
//                 Quantity: qnty,
//                 Price: data.Price,
//                 Subtotal: qnty * data.Price,
//                 imageUrl: data.imageUrl
//             });
//         });

//         const confirmCheckout = confirm("Proceed to Checkout?");

//         if (confirmCheckout) {
//             await addDoc(collection(DB, "users", currentUserId, "ConfirmedOrders"), {
//                 items,
//                 totalAmount,
//                 createdAt: new Date().toISOString()
//             });

//             for (const docSnap of cartSnapshot.docs) {
//                 await deleteDoc(doc(DB, "users", currentUserId, "Cart", docSnap.id));
//             }

//             alert("Order Placed Successfully!");
//             await fetchCartItems();
//         }
//     }
// });

// // Navigation Buttons
// if (signPortal) {
//     signPortal.addEventListener("click", () => {
//         window.location.href = "../sign/signin.html";
//     });
// }


