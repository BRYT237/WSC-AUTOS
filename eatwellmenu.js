import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { app } from "../landingpage/FIREBASECONFIG.js";

const auth = getAuth(app);
const db = getFirestore(app);


const userColRef = collection(db, "users");
const greetingEl = document.getElementById("greeting");
const logoutBtnEl = document.getElementById("logoutBtn");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge")

let userCurrentId;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userCurrentId = user.uid;
    try {
      const docRef = doc(userColRef, user.uid);
      const userCredential = await getDoc(docRef);

      if (userCredential.exists()) {
        const currentUser = userCredential.data();
        greetingEl.innerHTML = `Hi <span class="username"><b>${currentUser.username}</b></span>`;

        await fetchCartItems();
        displayMenuItems();
      } else {
        // 🔁 If no user doc, redirect
        window.location.href = "../landingpage/landingpage.html";
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  } 
});

logoutBtnEl.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "../landingpage/landingpage.html";
  } catch (error) {
    console.error("Logout error:", error);
  }
});

const products = [
  {
    id: 1,
    name: "Italian Shell Pasta with Zucchini, Mushrooms & Tomato Sauce",
    price: 25000,
    description: "Veggie pasta shells in rich tomato sauce, tossed with seasoned mushrooms.",
    imageUrl: "../media/italian-pasta-shells-with-mushrooms-zucchini-tomato-sauce.jpg",
    category: "pasta"
  },
  {
    id: 2,
    name: "Penne-pasta-tomato-sauce-with-chicken-tomatoes",
    price: 17500,
    description: "Tender penne pasta in tomato sauce, topped with grilled chicken and fresh tomatoes.",
     imageUrl: "../media/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table.jpg",
    category: "pasta"
  },
  {
    id: 3,
      name: "Pasta-spaghetti-with-shrimps-tomato-sauce",
    price: 30000,
    description: "Spaghetti tossed in zesty tomato sauce, topped with tender shrimp and fresh herbs for a bold, savory bite..",
    imageUrl: "../media/pasta-spaghetti-with-shrimps-tomato-sauce-served-plate-dark-surface-closeup.jpg",
    category: "pasta"
  },
  {
    id: 4,
     name: "Rigatoni-pasta-with-chicken-meat-eggplant-tomato-sauce",
    price: 50000,
    description: "Rigatoni pasta served in a rich tomato sauce with juicy chicken, tender eggplant.",
    imageUrl: "../media/rigatoni-pasta-with-chicken-meat-eggplant-tomato-sauce-bowl.jpg",
    category: "pasta"
  },
  {
    id: 5,
    name: "Baked-chicken",
    price: 30000,
    description: "Oven-roasted chicken thighs seasoned with garlic, rosemary.",
    imageUrl: "../media/tasty-appetizing-baked-chicken-served-table-with-deco-closeup.jpg",
    category: "protein"
  },
  {
    id: 6,
    name: "River Fire Fish",
    price: 15000,
    description: "River fish simmered in bold Thai sour curry with tamarind.",
    imageUrl: "../media/sour-curry-with-snakehead-fish-spicy-garden-hot-pot-thai-food.jpg",
    category: "protein"
  },
  {
    id: 7,
    name: "Paprika Braised Beef",
    price: 25000,
    description: "Slow-braised beef cubes in paprika gravy.",
    imageUrl: "../media/delicious-goulash-ready-dinner.jpg",
    category: "protein"
  },
  {
    id: 8,
    name: "Baked-chicken",
    price: 30000,
    description: "Oven-roasted chicken thighs with garlic & rosemary.",
    imageUrl: "../media/tasty-appetizing-baked-chicken-served-table-with-deco-closeup.jpg",
    category: "protein"
  },
  {
    id: 9,
    name: "Amala Ewedu with gbegiri",
    price: 7900,
    description: "Amala with rich ewedu and creamy gbegiri.",
    imageUrl: "../media/amala.png",
    category: "swallow"
  },
  {
    id: 10,
    name: "Semovita and Egusi Soup",
    price: 7900,
    description: "Semovita with richly seasoned egusi soup.",
    imageUrl: "../media/Semo.jpg",
    category: "swallow"
  },
  {
    id: 11,
    name: "Pounded Yam and vegetable soup",
    price: 15000,
    description: "Smooth pounded yam with rich Nigerian vegetable soup.",
    imageUrl: "../media/Pounded yam.jpg",
    category: "swallow"
  },
  {
    id: 12,
    name: "Pounded Yam and vegetable soup",
    price: 15000,
    description: "Stretchy yam dough with egusi, ogbono, or vegetable.",
    imageUrl: "../media/Pounded yam.jpg",
    category: "swallow"
  },
  
];

const displayMenuItems = ()=>{
    products.forEach((product)=>{
        const sectionId = {
      pasta: "pastaSection",
      protein: "proteinSection",
      swallow: "swallowSection",
      pastry: "pastrySection"
    }[product.category];
 const section = document.getElementById(sectionId)
 if (section) {
    section.innerHTML += `
     <div class="col-md-3 mb-4">
          <div class="card h-100 bg-dark text-white">
            <img src="${product.imageUrl}" class="card-img-top" style="height: 150px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-warning" >₦${product.price.toLocaleString()}</span>
                <button style="border: white thin solid;"  class="btn btn-dark  btn-outline-warning  fw-bold   btn-sm add-to-cart" 
                data-id="${product.id}" 
                data-name="${product.name}"   
                data-price="${product.price}"  
                 data-img="${product.imageUrl}">Order</button>
              </div>
            </div>
          </div>
        </div>
      `;
 }
    })
    setupCartButtons()
};

const setupCartButtons = () => {
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const getId = btn.getAttribute("data-id");
    const getName = btn.getAttribute("data-name");
    const getPrice = parseInt(btn.getAttribute("data-price"));
    const imageUrlEl = btn.getAttribute("data-img");

    const food = {
      id: getId,
      name: getName,
      price: getPrice,
      imageUrl: imageUrlEl,
    };

    AddFoodToCart(food);
  });
});
}
const AddFoodToCart = async (food) => {
  try {
    const orderColRef = collection(userColRef, userCurrentId, "Cart");

    await addDoc(orderColRef, {
      Id: food.id,
      Name: food.name,
      Price: food.price,
      imageUrl: food.imageUrl,
        Quantity: 1
    });

    console.log(" Item saved to Firestore:", food.name);
    await fetchCartItems();
  } catch (error) {
    console.error(" Error saving to cart:", error);
  }
};


const deleteProduct = async(delId,dels)=>{
  try {
     const cartRef = doc(db, "users", userCurrentId, "Cart" , delId);

     const deleteEach = await getDoc(cartRef)
     if(deleteEach){
      await deleteDoc(cartRef)
     }
     fetchCartItems()
     
     

  } catch (error) {
    console.log(error);
    
  }
}

const fetchCartItems = async () => {
  try {
    const cartRef = collection(db, "users", userCurrentId, "Cart");
    const cartSnapshot = await getDocs(cartRef);
     badgeEl.textContent = cartSnapshot.size;
    cartItemsEl.innerHTML = "";
     let totalAmount = 0;
    if (cartSnapshot.empty) {
      cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
   

    cartSnapshot.forEach((docSnap) => {
          const item = docSnap.data();
          const foodId = docSnap.id
  const quantity = item.Quantity || 1; // default quantity is 1 if missing
  const itemId = docSnap.id;
    //   const item = doc.data();
      cartItemsEl.innerHTML += `
        <div class="cart-item mb-3 border-bottom pb-2">
          <div class="d-flex align-items-center">
            <img src="${item.imageUrl}" class="me-2 rounded" style="width: 60px; height: 60px; object-fit: cover;">
            <div>
              <h6 class="mb-0">${item.Name}</h6>
              <small>₦${item.Price.toLocaleString()}</small>
            </div>
          </div>
             <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-dark decrease-btn" data-id="${itemId}">−</button>
          <span class="mx-1">${quantity}</span>
          <button class="btn btn-sm btn-dark increase-btn" data-id="${itemId}">+</button>
          </div>
          </div>
          </div>
          <button class="delBtnss" food="${foodId}">Delete</button>
      `;
    });
    


        cartItemsEl.innerHTML += `
      <div class="cart-summary mt-4 text-end border-top pt-3">
        <h5>Total: ₦${totalAmount.toLocaleString()}</h5>
        <button id="checkoutBtn" class="btn btn-success mt-2">Checkout</button>
      </div>
    `;
    setupQuantityButtons()


    const deleteCart = document.querySelectorAll(".delBtnss")
    deleteCart.forEach((dels)=>{
      dels.addEventListener("click",()=>{
        alert("jj")       
        const delId = dels.getAttribute("food")
        alert(delId)
        deleteProduct(delId,dels)
      })
    })
  } catch (error) {
    console.error("❌ Failed to fetch cart:", error);
    cartItemsEl.innerHTML = "<p>Error loading cart.</p>";
  }
};


const setupQuantityButtons = () => {
  const increaseBtns = document.querySelectorAll(".increase-btn");
  const decreaseBtns = document.querySelectorAll(".decrease-btn");

  // 🔼 INCREASE QUANTITY
  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const itemId = btn.getAttribute("data-id");
      const cartItemRef = doc(db, "users", userCurrentId, "Cart", itemId);
      const itemSnap = await getDoc(cartItemRef);

      if (itemSnap.exists()) {
        const currentQty = itemSnap.data().Quantity || 1;
        await updateDoc(cartItemRef, {
          Quantity: currentQty + 1,
        });
        await fetchCartItems(); // refresh cart
        setupQuantityButtons(); // rebind buttons
      }
    });
  });

  // 🔽 DECREASE QUANTITY
  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const itemId = btn.getAttribute("data-id");
      const cartItemRef = doc(db, "users", userCurrentId, "Cart", itemId);
      const itemSnap = await getDoc(cartItemRef);

      if (itemSnap.exists()) {
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
};
setupQuantityButtons();

// Global click listener for checkout
document.addEventListener("click", async (e) => {
  if (e.target && e.target.id === "checkoutBtn") {
    const cartRef = collection(db, "users", userCurrentId, "Cart");
    const cartSnapshot = await getDocs(cartRef);

    if (cartSnapshot.empty) {
      alert("🛒 Your cart is empty!");
      return;
    }

    let items = [];
    let totalAmount = 0;

    cartSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const qty = data.Quantity || 1;
      totalAmount += qty * data.Price;
      items.push({
        Name: data.Name,
        Quantity: qty,
        Price: data.Price,
        Subtotal: qty * data.Price,
        imageUrl: data.imageUrl
      });
    });

    // Confirm checkout
    const confirmCheckout = confirm(
      `You're about to place an order of ₦${totalAmount.toLocaleString()}.\nClick OK to confirm.`
    );

    if (confirmCheckout) {
      // Save to ConfirmedOrders
      await addDoc(collection(db, "users", userCurrentId, "ConfirmedOrders"), {
        items,
        totalAmount,
        createdAt: new Date().toISOString()
      });

      // Clear cart
      for (const docSnap of cartSnapshot.docs) {
        await deleteDoc(doc(db, "users", userCurrentId, "Cart", docSnap.id));
      }

      alert("🎉 Order placed successfully!");
      await fetchCartItems(); // refresh cart view
    }
  }
});

