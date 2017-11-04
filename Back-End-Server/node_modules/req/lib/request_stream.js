var request = require('request'),
    fs = require('fs'),
    util = require('util'),
    url = require('url'),
    ProgressBar = require('progress'),
    exists = require('fs').existsSync ? require('fs').existsSync : require('path').existsSync;

var requestStream = exports.requestStream = function (req) {
    this.output = '';
    this.statusbar = null;

    function handleResponse(res) {
        var filename,
            contentType = res.headers['content-type'];

        if (req.verbose) console.log('STATUS CODE:', res.statusCode, '\nHEADERS:', util.inspect(res.headers, false, null, true));
        if (!contentType) {
            if (!req.verbose) console.log('STATUS CODE:', res.statusCode, '\nHEADERS:', util.inspect(res.headers, false, null, true));
        } else {
            if (req.output) {
                filename = req.output;
            } else {
                if (contentType.match('text') || contentType.match('json')) {
                    filename = '';
                } else {
                    var contentDisposition = res.headers['content-disposition'];
                    if (contentDisposition) {
                        filename = contentDisposition.match(/filename="?([^"]*)"?/)[1];
                    } else {
                        filename = url.parse(res.request.path).pathname.split('/').pop();
                    }
                }
            }
            if (filename) {
                filename = findFilename(filename);
                if (res.headers['content-length']) {
                    this.statusbar = new ProgressBar(filename + ' :bar :percent :etas', {
                        total: parseInt(res.headers['content-length'], 10),
                        width: 25,
                        incomplete: ' ',
                        complete: '.'
                    });
                }
                this.output = fs.createWriteStream(filename);
            }
        }
    }

    function handleData(data) {
        if (typeof this.output !== 'string') {
            this.output.write(data);
            if (this.statusbar) {
                this.statusbar.tick(data.length); 
            }
        } else {
            this.output += data.toString();
        }
    }

    function handleEnd() {
        if (typeof this.output === 'string') {
            try {
                console.log(util.inspect(JSON.parse(this.output), false, null, true));
            } catch (e) {
                console.log(this.output);
            }
        } else {
            console.log('\nDone!');
        }
    }

    this.request = request(req);
    this.request.on('response', handleResponse.bind(this));
    this.request.on('data', handleData.bind(this));
    this.request.on('end', handleEnd.bind(this));

    function findFilename(filename) {
        if (filename && exists(filename)) {
            if (filename.match(/\.[0-9]*$/)) {
                var v = filename.match(/\.([0-9]*)$/)[1];
                v = parseInt(v, 10) + 1;
                filename = filename.match(/(.*\.)[0-9]*$/)[1] + v;
            } else {
                filename = filename + '.1';
            }
            return findFilename(filename);
        } else {
            return filename;
        }
    }
};

module.exports = requestStream;
