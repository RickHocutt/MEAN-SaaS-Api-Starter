var stripe = require('stripe')(config.testStripeKey);

function charge(amount, tokenId, success, error){
    stripe.charges.create({
        amount: amount,
        currency: 'usd',
        source: tokenId
    }, function(err, charge) {
        if (err) {
            error(err);
        } else {
            success(charge);
        }
    });
}
module.exports = charge;