var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
var targetDir = './.docker/';
var appGzName = '.app.tar.gz';
var nodeModulesGzName = '.node_modules.tar.gz';

function packApp() {
    console.log('Create tar archive with deps...');

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    var output = fs.createWriteStream(targetDir+appGzName);
    output.on('close', function() {
        console.log(targetDir+appGzName + ' ' + Math.round(archive.pointer() ) + ' B');
    });

    var archive = archiver.create('tar', {
        gzip: true,
        gzipOptions: { level: 1 }
    });

    archive.pipe(output);
    archive.on('error', function(err) {
        throw err;
    });

    archive.directory('./config');
    archive.directory('./src');

    var currentDirPath = '.';
    fs.readdirSync(currentDirPath).forEach( fileName => {
        var filePath = path.join(currentDirPath, fileName);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            archive.file(fileName);
        }
    });
    archive.finalize();


    // - node_modules
    output = fs.createWriteStream(targetDir + nodeModulesGzName);
    output.on('close', function() {
        console.log(targetDir+nodeModulesGzName + ' ' + Math.round(archive.pointer() / 1024 / 1024 ) + ' MB');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive = archiver.create('tar', {
        gzip: true,
        gzipOptions: { level: 1 }
    });

    archive.pipe(output);
    archive.on('error', function(err) {
        throw err;
    });

    archive.directory('./node_modules');
    archive.finalize();
}

packApp();
