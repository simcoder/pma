const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin')
const logging = require('@google-cloud/logging')();
var cors = require('cors')
admin.initializeApp(functions.config().firebase);
// const stripe = require('stripe')(functions.config().stripe.token)
// const currency = functions.config().stripe.currency || 'USD';
const plaid = require('plaid');
const accountSid = "ACd193fd48adf06b47285e017061a75cba";
const authToken = "b873a62c5c2aa8ed05b00794f34766ee";
const client = require("twilio")(accountSid, authToken);
// const plaidClientId = functions.config().plaid.clientid || '5d223d7c4388c800137357b2';
// const plaidSecret = functions.config().plaid.secret || '74f4892a857f56f7da2848f24fa861';
// const plaidPublic = functions.config().plaid.publickey || '0191f18378a953ad00740f00442117';
// const plaidEnv = functions.config().plaid.env || plaid.environments.sandbox;
// const plaidClient = new plaid.Client(plaidClientId, plaidSecret, plaidPublic, plaidEnv);


exports.pendingActivationEvent = functions.firestore.document('pending-activations/{activationId}').onWrite((change, context) => {
  const adminId = change.after.data().adminId;
  console.log(adminId);
  try {
    return admin.firestore().collection("fcmTokens").doc(adminId).get().then(adminUser => {
      const payload = {
        notification: {
          title: "hi",
          body: "hoe",
          icon: "https://placeimg.com/250/250/people"
        }
      };
      const userFcmToken = adminUser.data().token;
      console.log(userFcmToken);
      return admin.messaging().sendToDeviceGroup(userFcmToken, payload);
    });
  } catch (err) {
    return reportError(error);
  }
});
exports.newStripeEvent = functions.database.ref('/stripe-events/{eventId}').onWrite((event, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const eventData = event.after.val();
  let userId;
  let paymentId;
  let charge;
  try {
    return admin.database().ref(`/payments`).orderByChild('charge').once("value").then(snapshot => {
      return snapshot.forEach((customerSnapshot) => {
        userId = customerSnapshot.key;
        customerSnapshot.forEach((paymentSnap) => {
          charge = paymentSnap.val().charge;
          paymentId = paymentSnap.key;
          if (charge.id === eventData.charge.id) {
            admin.database()
              .ref(`/payments/${userId}/${paymentId}/charge`)
              .set(eventData.charge);
          }
        });
      });
    });

  } catch (error) {
    return reportError({
      eventType: eventData.type,
      error
    });
  }
});
exports.stripeCharge = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const email = context.auth.token.email || null;
  const source = data.source
  const amount = data.amount;
  const receipt_email = email;
  const customerId = data.customerId;
  let payment;
  if (source) {
    payment = {
      token: source.token,
      amount
    };
  } else {
    payment = {
      amount
    }
  }

  let paymentId;
  try {
    //payment transaction
    const result = admin.database().ref(`/payments/${uid}`).push(payment)
      .once('value').then(snapshot => {
        paymentId = snapshot.key
        return snapshot.val();
      }).then(() => {
        let charge;
        if (source) {
          charge = {
            amount,
            currency,
            source: source.token.id,
            receipt_email,
            customer: customerId
          };
        } else {
          charge = {
            amount,
            currency,
            receipt_email,
            customer: customerId
          };
        }
        const idempotency_key = paymentId //create a key
        return stripe.charges.create(charge, {
            idempotency_key
          })
          .then(charge => {
            admin.database()
              .ref(`/payments/${uid}/${paymentId}/charge`)
              .set(charge)
            return {
              paymentId,
              charge
            }
          });
      });
    return result
  } catch (error) {
    console.log(error);
    return reportError(error, {
      user: uid
    });
  }

});

exports.plaidBankToken = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const publicToken = data.token;
  const accountId = data.accountId
  try {
    const result = await plaidClient.exchangePublicToken(publicToken).then(res => {
      const accessToken = res.access_token;
      return plaidClient.createStripeToken(accessToken, accountId);
    })
    return result;
  } catch (error) {
    console.log(error);
    return reportError(error, {
      user: uid
    });
  }

});

exports.stripeCreateCustomer = functions.https.onCall(async (data, context) => {
  const tokenId = data.token;
  try {
    return stripe.customers.create({
      source: tokenId,
      description: "ROAM customer"
    });
  } catch (error) {
    console.log(error);
    return reportError(error, {
      user: uid
    });
  }

});

exports.getCustomerPayments = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  try {
    return admin.database().ref(`/savedCustomerPaymentMethod/${uid}`).once('value').then(snapshot => {
      return snapshot.val();
    });
  } catch (error) {
    return reportError(error, {
      user: uid
    });
  }
});

exports.getCustomerPayments = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  try {
    return admin.database().ref(`/savedCustomerPaymentMethod/${uid}`).once('value').then(snapshot => {
      return snapshot.val();
    });
  } catch (error) {
    return reportError(error, {
      user: uid
    });
  }
});

exports.saveCustomerPayment = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  console.log(data);
  const account = data.account;
  const customerId = data.customerId;
  const payment = {
    account,
    customerId
  };
  try {
    return admin.database().ref(`/savedCustomerPaymentMethod/${uid}`).set(payment);
  } catch (error) {
    console.log(error);
    return reportError(error, {
      user: uid
    });
  }
});

const app1 = express();
app1.use(cors());
const router1 = express.Router();
app1.use('/maintenance', router1);
app1.use(require("body-parser").raw({
    type: "*/*"
  }));
exports.maintenance = functions.https.onRequest(app1);

app1.post("/ticket", async (request, response) => {
    // const drinkId = request.body.drinkId;
    // const personId = request.body.personId;
  
    // const user = await db
    //   .collection("mirabella/party/people")
    //   .doc(personId)
    //   .get();
    // const drink = await db
    //   .collection("mirabella/party/drinks")
    //   .doc(drinkId)
    //   .get();
  
    // if (user) {
      // send text message twillio
      try {
        await client.messages.create({
          body: `Heads up!  has requested a ticket`,
          from: "+12109780788",
          to: "+12259333884",
        });
        // // adjust qty
        // await db
        //   .collection("mirabella/party/drinks")
        //   .doc(drinkId)
        //   .update({
        //     name: drink.data().name,
        //     description: drink.data().description,
        //     qty: drink.data().qty - 1,
        //   });
        console.log("success sent");
      } catch (error) {
        console.log("something terrible has happend");
        console.log(error);
      }
    // }
    response.send(true);
  });


