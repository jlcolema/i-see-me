// Combination 3
// 01. Expanded Personalization Details (Section 1)
// 02. Collapsed Apply Promo (Section 2)
// 03. Collapsed Gift Card (Section 2)

function cartTestTracking() {

  var gaTracking = setInterval(function () {

    if (typeof (ga) !== 'undefined') {

      clearInterval(gaTracking);

      ga('create', 'UA-168611-1', { name: 'cartTracking' });
      ga('cartTracking.set', 'dimension3', 'VWO-149 Combination 3');
      ga('cartTracking.send', 'event', 'VWO', 'VWO-149', 'Combination 3', { nonInteraction: 1 });

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

  // Add `.cart-collapse-test` and `cart-collapse-test--3` to the `body`.
  document.body.classList.add("cart-collapse-test", "cart-collapse-test--3");

  /* Order Summary */

  // Find elements to work with...

  // "Discount Code" form
  const discountCode = document.querySelector("#discount-coupon-form");
  // "Gift Card Code" form
  const giftCardCode = document.querySelector("#discount-aw-giftcard-form");

  // Create the structure for the toggle link...
  const addToggleToForm = (form, linkText) => {
    if(form) {
      const label = form.querySelector("label");
      if(label) {
        label.insertAdjacentHTML(
          "beforeend",
          `
            <a href="#" class="code-toggle">
              <span>${linkText}</span>
            </a>
          `
        );
      }
    }
  };

  // Add each toggle and set the text...
  addToggleToForm(discountCode, "Apply Discount");
  addToggleToForm(giftCardCode, "Apply Gift Card");

  // Add toggle functionality...
  const codeToggle = (e) => {

    e.preventDefault();

    const field = e.target.closest(".field");
    field.classList.toggle("field--is-visible");

    // Get span within `.code-toggle`
    const toggle = field.querySelector(".code-toggle span");

    if(toggle.textContent.startsWith("Apply")) {
      toggle.textContent = toggle.textContent.replace("Apply", "Hide");
    } else {
      toggle.textContent = toggle.textContent.replace("Hide", "Apply");
    }

  };

  // After adding the toggles...
  document.querySelectorAll('.code-toggle').forEach(toggle => {
    toggle.addEventListener('click', codeToggle);
  });

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
    vwodesc: 'ISM-A-Cart-CollapsePersonalizeDetails-V1-Jun2023 | Combination 3',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
