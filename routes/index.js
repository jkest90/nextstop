'use strict'

var Auth = require('./auth');
var event = require('./events.controller.js');

module.exports = function(app) {
    // SITE ROOT
    app.get('/', Auth.render);

    app.all('/home*', Auth.session); 
    app.get('/home', (req, res)=>{
        res.sendFile('home.html', {root: 'public'})
    });
    app.get('/events', event.getEvents);
    //AUTH
    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request emdpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration

    // DAHSBOARD
    app.all('/dashboard*', Auth.session); // protect all dashboard routes from unauthorized users
    app.get('/dashboard', (req, res) => { // renders the dashboard, break this out into another controller if needed!
        res.render('dashboard', req.session)
    });
}
