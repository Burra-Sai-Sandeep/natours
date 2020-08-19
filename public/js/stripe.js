import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HHshiLcy7TNUz2yG1p2aI7vpPVrXsrfUDy5a4mkoluTnr3BdLAnDsmi0o1sTRA2lZf7NOHOkvvCh4LN9cjHK1Fx000VhsPyYE'
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from server(API)
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
