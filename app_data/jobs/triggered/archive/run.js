var jsonfile = require('jsonfile');
var later = require('later');
var file = '/home/site/wwwroot/data/pullups.json';
var archiveFile = '/home/site/wwwroot/data/archive.json';
var date = new Date();

jsonfile.readFile(file, function(err, obj) {
    var archiveObj = {
        "date": date,
        "results": obj
    };
    jsonfile.readFile(archiveFile, function(err, archFile) {
        archFile.archive.push(archiveObj);
        jsonfile.writeFile(archiveFile, archFile, function(err) {
            if (err) {
                console.log("Archive err:");
                console.log(err);
            } else {
                console.log("Archive created ", new Date());
            }
        });
    });
});