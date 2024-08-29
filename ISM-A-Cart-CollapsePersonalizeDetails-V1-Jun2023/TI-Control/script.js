// TI Control

function cartTestTracking() {

  var gaTracking = setInterval(function () {

    if (typeof (ga) !== 'undefined') {

      clearInterval(gaTracking);

      ga('create', 'UA-168611-1', { name: 'cartTracking' });
      ga('cartTracking.set', 'dimension3', 'VWO-149 TI Control');
      ga('cartTracking.send', 'event', 'VWO', 'VWO-149', 'TI Control', { nonInteraction: 1 });

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
    vwodesc: 'ISM-A-Cart-CollapsePersonalizeDetails-V1-Jun2023 | TI Control',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
