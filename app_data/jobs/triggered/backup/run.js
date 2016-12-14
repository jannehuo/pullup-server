var jsonfile = require('jsonfile');
var later = require('later');
var file = '/home/site/wwwroot/data/pullups.json';
var backupFile = '/home/site/wwwroot/data/backup.json';

jsonfile.readFile(file, function(err, obj) {
    jsonfile.writeFile(backupFile, obj, function(err) {
        if (err) {
            console.log("Backup err:");
            console.log(err);
        } else {
            console.log("Backup created ", new Date());
        }
    });
});