// Combination 2
// 01. Collapsed Personalization Details (Section 1)
// 02. Expanded Apply Promo (Section 2)
// 03. Expanded Gift Card (Section 2)

function cartTestTracking() {

  var gaTracking = setInterval(function () {

    if (typeof (ga) !== 'undefined') {

      clearInterval(gaTracking);

      ga('create', 'UA-168611-1', { name: 'cartTracking' });
      ga('cartTracking.set', 'dimension3', 'VWO-149 Combination 2');
      ga('cartTracking.send', 'event', 'VWO', 'VWO-149', 'Combination 2', { nonInteraction: 1 });

      // Track clicks on each "Edit Personalization" link

      const cartEditPersonalizationClick = document.querySelectorAll(".action-edit");

      if (cartEditPersonalizationClick.length > 0) {
        // then, for each one, add an event listener for clicks
        cartEditPersonalizationClick.forEach((item) => {
          // do the following on click only for this clicked item
          item.addEventListener("click", () => {
            ga('cartTracking.send', 'event', 'Cart', 'Edit Personalization Click', 'Edit Personalization');
          });
        });
      }

      // Track clicks on each "Remove" link

      const cartRemoveClick = document.querySelectorAll(".action-delete");

      if (cartRemoveClick.length > 0) {
        cartRemoveClick.forEach((item) => {
          item.addEventListener("click", () => {
            ga('cartTracking.send', 'event', 'Cart', 'Remove Click', 'Remove');
          });
        });
      }

      // Track clicks on the "Proceed to Checkout" button

      // Find the button with a class of `.checkout`
      const cartProceedToCheckoutClick = document.querySelector('button[data-role="proceed-to-checkout"]');

      if (cartProceedToCheckoutClick) {
        cartProceedToCheckoutClick.addEventListener("click", () => {
          ga('cartTracking.send', 'event', 'Cart', 'Proceed to Checkout Click', 'Proceed to Checkout');
        });
      }

      // Track clicks on "View Details" and "Hide Details" links

      const cartViewAndHideDetailsClick = document.querySelectorAll(".cart-item-details-toggle__link");

      if (cartViewAndHideDetailsClick.length > 0) {
        cartViewAndHideDetailsClick.forEach((item) => {
          item.addEventListener("click", () => {
            const toggle = item.querySelector("span");
            if (toggle.textContent.startsWith("Hide")) {
              ga('cartTracking.send', 'event', 'Cart', 'View Details Click', 'View Details');
            } else {
              ga('cartTracking.send', 'event', 'Cart', 'Hide Details Click', 'Hide Details');
            }
          });
        });
      }

      // Track clicks on "Apply Discount" button

      const cartApplyDiscountClick = document.querySelector('#discount-coupon-form button[value="Apply"]');

      if (cartApplyDiscountClick) {
        cartApplyDiscountClick.addEventListener("click", () => {
          ga('cartTracking.send', 'event', 'Cart', 'Apply Discount Code Click', 'Apply Discount');
        });
      }

      // Track clicks on "Apply Gift Card" button

      const cartApplyGiftCardClick = document.querySelector('#discount-aw-giftcard-form button[value="Apply"]');

      if (cartApplyGiftCardClick) {
        cartApplyGiftCardClick.addEventListener("click", () => {
          ga('cartTracking.send', 'event', 'Cart', 'Apply Gift Card Code Click', 'Apply Gift Card');
        });
      }

      // Track clicks on "Continue Shopping" link

      const cartContinueShoppingClick = document.querySelector(".action.continue");

      if (cartContinueShoppingClick) {
        cartContinueShoppingClick.addEventListener("click", () => {
          ga('cartTracking.send', 'event', 'Cart', 'Continue Shopping Click', 'Continue Shopping');
        });
      }

    }

  }, 500);

}

var onDocumentLoad = function () {

  // Add `.cart-collapse-test` and `cart-collapse-test--2` to the `body`.
  document.body.classList.add("cart-collapse-test", "cart-collapse-test--2");

   /* Cart List */

  // Find the cart item(s)
  const cartItem = document.querySelectorAll(".cart.item");

  // If there is a cart item...
  if (cartItem.length > 0) {

    // Then for each one...

    cartItem.forEach((item) => {

      /* Product Photo Wrapper */

      // Find `.product-item-photo`
      const productItemPhoto = item.querySelector(".product-item-photo");

      // Create `.product-item-photo-wrapper`
      const productItemPhotoWrapper = document.createElement("div");
      productItemPhotoWrapper.classList.add("product-item-photo-wrapper");

      // Add `productItemPhotoWrapper` before `productItemPhoto`
      productItemPhoto.before(productItemPhotoWrapper);

      // Move `productItemPhoto` inside `productItemPhotoWrapper`
      productItemPhotoWrapper.append(productItemPhoto);

      /* Details Wrapper */

      // Find `.options-forms`
      const cartItemDetails = item.querySelector(".options-forms");

      // Create `.cart-item-details-wrapper`
      const cartItemDetailsWrapper = document.createElement("div");
      cartItemDetailsWrapper.classList.add("cart-item-details-wrapper");

      // Add `cartItemDetailsWrapper` before `cartItemDetails`
      cartItemDetails.before(cartItemDetailsWrapper);

      // Move `cartItemDetails` inside `cartItemDetailsWrapper`
      cartItemDetailsWrapper.append(cartItemDetails);

      /* Details Toggle */

      // Create `.cart-item-details-toggle` with the following HTML
      const cartItemDetailsToggle = document.createElement("div");
      cartItemDetailsToggle.classList.add("cart-item-details-toggle");
      cartItemDetailsToggle.innerHTML = `
        <a class="cart-item-details-toggle__link">
          <span>View Details</span>
        </a>
      `;
      // Add `cartItemDetailsToggle` before `cartItemDetailsWrapper`
      cartItemDetailsWrapper.before(cartItemDetailsToggle);

      // On click of `.cart-item-details-toggle__link`
      // prevent default
      // find the closest `.product-item-details` and toggle a class of `.product-item-details--is-visible`
      cartItemDetailsToggle.querySelector(".cart-item-details-toggle__link").addEventListener("click", (e) => {
        e.preventDefault();
        // Within `cartItemDetailsToggle`, find the textContent within the span
        const toggle = cartItemDetailsToggle.querySelector(".cart-item-details-toggle__link span");
        // If the textContent starts with "View"
        if (toggle.textContent.startsWith("View")) {
          // Replace "View" with "Hide"
          toggle.textContent = toggle.textContent.replace("View", "Hide");
        } else {
          // Otherwise, replace "Hide" with "View"
          toggle.textContent = toggle.textContent.replace("Hide", "View");
        }
        e.currentTarget.closest(".product-item-details").classList.toggle("product-item-details--is-visible");
      });

      /* Edit Item */

      // Find all instances of `.action-edit` and add a class of `hello-world`
      const editItem = item.querySelectorAll(".action-edit");
      // For each instance of `.action-edit`...
      editItem.forEach((item) => {
        if (item.closest(".mobile-display")) {
          // For Mobile...
        } else {
          // For Desktop...
          item.closest(".cart.item").querySelector(".cart-item-details-wrapper").append(item);
        }
      });

      /* Remove Item */

      // Find all instances of `.action-delete` and add a class of `hello-world`
      const removeItem = item.querySelectorAll(".action-delete");

      removeItem.forEach((item) => {

        // if the item is within `.mobile-display` do the following...
        if (item.closest(".mobile-display")) {
          // For Mobile...
          // Within `cart.item`, find `.product-item-head` and move `item` inside
          item.closest(".cart.item").querySelector(".product-item-photo-wrapper").append(item);
          // Select the span that contains the text
          const span = item.querySelector('span');
          span.textContent = "Remove";
        } else {
          // For Desktop...
          // Within `.cart.item`, find `.col.subtotal` and move `item` inside
          item.closest(".cart.item").querySelector(".col.subtotal").append(item);
          // Select the span that contains the text
          const span = item.querySelector('span');
          span.textContent = "Remove";
        }

      });

    });

  }

  cartTestTracking();

};

try {
  // ensures code runs when content is loaded
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    onDocumentLoad();
  } else {
    document.addEventListener("DOMContentLoaded", onDocumentLoad);
  }
} catch (err) {
  var e = {
    dev: 'U05C4LLSK6G',
    vwotest: '149',
    vwodesc: 'ISM-A-Cart-CollapsePersonalizeDetails-V1-Jun2023 | Combination 2',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
