var fs = require('fs'),
    mime = require('mime'),
    url = require('url'),
    package = require('../package.json');

var optionGenerator = module.exports = function () {
    if (!(this instanceof optionGenerator)) return new optionGenerator();
    this.argv = require('optimist')
        .alias('h', 'headers')
        .describe('h', 'Headers to attach to the request in the form header=value')
        .alias('q', 'querystring')
        .describe('q', 'Querystring parameters in the form param=value (these can also be passed as part of the URI)')
        .alias('b', 'body')
        .describe('b', 'The body of the request. If this is set to valid json, it will automatically set the json content-type. Can also attach the contents of the file using e.g. @uploadthis.txt')
        .alias('o', 'output')
        .describe('o', 'File to write output to, otherwise will print text and json to screen and guess a filename for binaries')
        .alias('u', 'username')
        .describe('u', 'Username for basic auth')
        .alias('p', 'password')
        .describe('p', 'Password for basic auth')
        .alias('f', 'form')
        .describe('f', 'Similar to the body flag, but sends the data as x-www-formurlencoded')
        .boolean('verbose')
        .alias('v', 'verbose')
        .describe('v', 'Output response headers and status codes')
        .usage('\nUsage: req [options] [method] uri\n\nMethods:\n  Any valid HTTP method is supported. If unspecified, GET will be used.')
        .check(function (args) {
            if (args.help || args._.length < 1) {
                throw '';
            }
        })
        .argv;

    this.opts = { encoding: null, verbose: this.argv.v, headers: {}, qs: {} };

    if (this.argv._.length > 1) {
        this.opts.method = this.argv._[0];
        if (this.opts.method.toLowerCase() === 'del') this.opts.method = 'DELETE';
        this.opts.uri = this.argv._[1];
    } else {
        if (this.argv.b || this.argv.f) {
            this.opts.method = 'post';
        } else {
            this.opts.method = 'get';
        }
        this.opts.uri = this.argv._[0];
    }
    this.opts.uri = this.opts.uri.match(/^https?|ftp/) ? this.opts.uri : 'http://' + this.opts.uri;

    var uri;

    if (this.argv.u) {
        uri = url.parse(this.opts.uri);
        uri.auth = this.argv.u;
        this.opts.uri = url.format(uri);
    }

    if (this.argv.p) {
        uri = url.parse(this.opts.uri);
        uri.auth = uri.auth ? uri.auth + ':' + this.argv.p : this.argv.p;
        this.opts.uri = url.format(uri);
    }

    if (this.argv.o) this.opts.output = this.argv.o;

    this.opts.headers['user-agent'] = 'req ' + package.version;
    if (this.argv.h) this.opts.headers = generateOpts(this.argv.h);

    if (this.argv.b || this.argv.f) {
        var type = this.argv.f ? 'form' : null,
            data = this.argv.b || this.argv.f;

        if (data[0] === '@') {
            data = data.substring(1);
            if (type === 'form') {
                this.opts.form = fs.readFileSync(data, null);
            } else {
                this.opts.body = fs.readFileSync(data, null);
                if (!this.opts.headers['content-type']) {
                    this.opts.headers['content-type'] = mime.lookup(data);
                }
            }
        } else {
            if (type === 'form') {
                this.opts.form = data;
            } else {
                try {
                    this.opts.json = JSON.parse(data);
                } catch (e) {
                    this.opts.body = data;
                    if (!this.opts.headers['content-type']) {
                        this.opts.headers['content-type'] = 'application/octet-stream';
                        console.warn('WARNING: setting Content-Type to application/octet-stream');
                    }
                }
            }
        }
    }

    if (this.argv.q) this.opts.qs = generateOpts(this.argv.q);

    function generateOpts(arg) {
        var obj = {};
        var a = arg instanceof Array ? arg : [arg];
        for (var i = 0; i < a.length; i++) {
            a[i] = a[i].split('=');
            obj[a[i][0]] = a[i][1];
        }
        return obj;
    }
};
