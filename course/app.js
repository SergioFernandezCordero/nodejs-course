const http = require('http');
const fs = require('fs');

const PORT = 4001;

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if (req.url == '/about') {
        const about = fs.readFileSync('files/about.html', { encoding: 'utf-8'});
        res.setHeader('X-Tontuna', 'This is about me');
        res.statusCode = 200;
        res.write(about, () => {
            console.log('Serving page: ' + req.url);
        });
        res.statusCode = 200;

    } else if (req.url == '/contact-me') {
        const contactMe = fs.readFileSync('files/contact-me.html', { encoding: 'utf-8'});
        res.setHeader('X-Tontuna', 'Please don\'t dial my number');
        res.statusCode = 200;
        res.write(contactMe, () => {
            console.log('Serving page: ' + req.url);
        });
        res.statusCode = 200;

    } else if (req.url == '/') {
        const main = fs.readFileSync('files/index.html', { encoding: 'utf-8'});
        res.setHeader('X-Tontuna', 'Yeah but here we are');
        res.statusCode = 200;
        res.write(main, () => {
            console.log('Serving page: ' + req.url);
        });

    } else {
        const notFound = fs.readFileSync('files/404.html', { encoding: 'utf-8'});
        res.setHeader('X-Tontuna', 'The only lost is who wanders');
        res.statusCode = 404;
        res.write(notFound, () => {
            console.log('Serving page: ' + req.url);
        });
    }
    res.end()
}).listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`)
});