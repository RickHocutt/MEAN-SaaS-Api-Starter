var config = require('../config'),
    sendgrid  = require('sendgrid')(config.sendgridKey);

/**
 * Send email
 * @param string to - The destination email address
 * @param string from - An optional sender email address. If not provided, the default "from" address is used.
 * @param string subject - Email subject
 * @param string text - Email message body
 */
function sendMail(to, from, subject, text) {
    console.log('sending message');
    sendgrid.send({
    to:       to,
    from:     from ? from : config.defaultFromEmail,
    subject:  subject,
    text:     text
    }, function(err, json) {
        if (err) { 
            return err; 
        } else { 
            return json; 
        }
    });
}

module.exports = sendMail;