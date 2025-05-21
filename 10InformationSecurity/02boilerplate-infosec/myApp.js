const express = require('express');
const app = express();

const helmet = require("helmet");
/*
app.use(helmet.hidePoweredBy()); // Remove powered by from Header

app.use(helmet.frameguard({action: "deny"})); // Prevent putting page in iframe "DENY, SAMEORIGIN, ALLOW-FROM"

app.use(helmet.xssFilter()); // Find and encode user input characters that may be dangerous

app.use(helmet.noSniff()); // No content or MIME sniffing to override Content-Type

app.use(helmet.ieNoOpen()); // Prevent IE usrs from executing downloads in site's context

app.use(helmet.hsts({maxAge: 90*24*60*60, force: true})) // Prevent downgrade attacks and cookie hijacking. Instruct browsers to use HTTPS for future request

app.use(helmet.dnsPrefetchControl()); // Prevents prefetching of links on pages. Prevents easdropping, slows performance.

app.use(helmet.noCache()); // Prevent caching. Slows performance

app.use(helmet.contentSecurityPolicy({ // Prevent injection of anything unintended into page
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
}));
*/

// Same as above
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  hsts: {maxAge: 90*24*60*60, force: true},
  noCache: true,
  dnsPrefetchControl: false     // disable
}))

































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
