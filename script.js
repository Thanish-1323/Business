const cart = [];

const count =
  document.getElementById("cartCount");

const drawer =
  document.getElementById("drawer");

const backdrop =
  document.getElementById("backdrop");

const items =
  document.getElementById("cartItems");

const total =
  document.getElementById("cartTotal");


/* FORMAT PRICE */

const money = (number) => {
  return "₹" + number.toLocaleString("en-IN");
};


/* UPDATE CART */

function render() {

  count.textContent = cart.length;

  if (cart.length === 0) {

    items.innerHTML =
      '<p class="empty">Your bag is empty.</p>';

  } else {

    items.innerHTML = cart
      .map((product, index) => {

        return `
          <div class="cart-row">

            <div>

              <strong>
                ${product.name}
              </strong>

              <br>

              <small>
                ${money(product.price)}
              </small>

            </div>

            <button
              class="remove"
              onclick="removeItem(${index})"
            >
              Remove
            </button>

          </div>
        `;

      })
      .join("");
  }


  const cartTotal = cart.reduce(
    (sum, product) =>
      sum + product.price,
    0
  );

  total.textContent =
    money(cartTotal);
}


/* REMOVE PRODUCT */

function removeItem(index) {

  cart.splice(index, 1);

  render();
}


/* OPEN CART */

function openCart() {

  drawer.classList.add("open");

  backdrop.classList.add("show");
}


/* CLOSE CART */

function closeCart() {

  drawer.classList.remove("open");

  backdrop.classList.remove("show");
}


/* ADD TO CART */

document
  .querySelectorAll(".add")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        cart.push({

          name:
            button.dataset.name,

          price:
            Number(button.dataset.price)

        });

        render();

        openCart();

      }
    );

  });


/* CART BUTTON */

document
  .getElementById("cartBtn")
  .onclick = openCart;


/* CLOSE BUTTON */

document
  .getElementById("closeCart")
  .onclick = closeCart;


/* BACKDROP */

backdrop.onclick = closeCart;


/* CHECKOUT */

document
  .getElementById("checkout")
  .onclick = () => {

    if (cart.length) {

      alert(
        "Checkout is ready to connect to your payment provider."
      );

    } else {

      alert(
        "Your bag is empty."
      );

    }

  };


/* INITIAL RENDER */

render();
