var fs = require('fs');
var path = require('path');
var getData = function () {
    fs.readFile(path.resolve(__dirname, './input.txt'), 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    });
};
getData();
