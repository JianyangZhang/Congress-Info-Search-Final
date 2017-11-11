### req

req is a very simple command line wrapper around Mikeal Roger's excellent [request](https://github.com/mikeal/request) library.

req tries to make some guesses as to what you'd really like to do. When a body is detected as parseable json, req will send it with the appropriate content-type.
When sending a file, req will base the Content-Type on the file's extension. On a GET request, req will print text and json to stdout, while other requests will
be saved to a file according to either a Content-Disposition filename or the path of the request. You can override this, of course, by using the -o flag (works for text and json as well).
Any headers that you manually specify will always take precedence over req's guesses.

I wrote this little wrapper because I got tired of curl's massive man-page and unintuitive flags. Is it as powerful as curl? Probably not, but it is definitely easier to use.

Usage:

    Usage: req [options] [method] uri

    Methods:
      Any valid HTTP method is supported. If unspecified, GET will be used.

    Options:
      -h, --headers      Headers to attach to the request in the form header=value                                                                                                                  
      -q, --querystring  Querystring parameters in the form param=value (these can also be passed as part of the URI)                                                                               
      -b, --body         The body of the request. If this is set to valid json, it will automatically set the json content-type. Can also attach the contents of the file using e.g. @uploadthis.txt
      -o, --output       File to write output to, otherwise will print text and json to screen and guess a filename for binaries                                                                    
      -u, --username     Username for basic auth                                                                                                                                                    
      -p, --password     Password for basic auth                                                                                                                                                    
      -f, --form         Similar to the body flag, but sends the data as x-www-form-urlencoded                                                                                                       
      -v, --verbose      Output response headers and status codes   


Some examples:

To upload the file picture.jpg to example.com (assumes a POST request, automatically sets Content-Type to image/jpeg based on file extension)

    req -b @picture.jpg example.com/pictures

To PUT some plain text as form data (x-www-form-urlencoded)

    req put -f 'formdata' example.com/forms

To POST a JSON blob to example.com/users?user=tom (automatically detects valid json and sets Content-Type to application/json)

    req -b '{"status": "bored"}' -q user=tom example.com/users

Setting multiple query strings or headers is as easy as adding more -q or -h flags (PUT example.com/users?user=tom&status=bored&location=home)

    req put -q user=tom -q status=bored -q location=home example.com/users

Basic auth? Not a problem! (Note that currently you must specify these inline. A prompt will be coming in the next version)

    req -u username -p password secureexample.com

Download a file

    req example.com/download.exe

Specify a location

    req example.com/download.exe -o realname.exe
