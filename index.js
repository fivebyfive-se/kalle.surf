const express = require('express');
const path = require('path');
const i18n = require('i18n');


i18n.configure({
    locales: ['en-US', 'sv-SE'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true
});


const routes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(i18n.init)

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')

    .use('/', routes)

    .listen(port, () => {
        console.log(`Listening on ${port}`);
    })
;