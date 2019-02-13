var http = require('http');
var qs = require('querystring');
var u = require('url');
var p = require('path');
var fs = require('fs');
var students = [];
var root = __dirname;
var server = http.createServer(function (req, res) {
    var url = req.url;
    var pathname = u.parse(url).pathname
    var urlparts = u.parse(req.url, true)
    console.log(pathname)
    console.log('request ' + url + ' method ' + req.method);
    // console.log(req);
    
    if ('/addStudent' == req.url) {
        if (req.method == 'POST') {
            var body = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                body += chunk
            });
            req.on('end', function () {
                var obj = qs.parse(body);
                students.push(obj)
                
                res.writeHead(200, {'Content-Type': 'text/html '});
                
                var studentsHtml = "";
                
                studentsHtml += '<div class="card mt-4 p-3">' +
                
                ' <p>Your First Name is ' + obj.firstname + '</p>' +
                ' <p>Your last name is ' + obj.lastname + '</p>' +
                ' <p>Your Mark is ' + obj.mark + '</p>' +
                ' <p>Your Nationality is ' + obj.nationality + '</p>' +
                
                '</div>'
                
                
                res.end(' <!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
                '<title>Page Title</title>' +
                '</head>' +
                '<body  class="p-3">' +
                
                studentsHtml +
                
                '</body>' +
                ' </html> ');
            });
        }
        
    }
    else if ('/liststudents' == req.url) {
        var studentsHtml = "";
        
        for (var i in students) {
            console.log("Student", students[i])
            studentsHtml += '<div class="card mt-4 p-3">' +
            
            ' <p>Your First Name is ' + students[i].firstname + '</p>' +
            ' <p>Your last name is ' + students[i].lastname + '</p>' +
            ' <p>Your Mark is ' + students[i].mark + '</p>' +
            ' <p>Your Nationality is ' + students[i].nationality + '</p>' +
            
            '</div>'
            
        }
        
        if (req.method == 'GET') {
            res.end(' <!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
            '<title>Page Title</title>' +
            '</head>' +
            '<body  class="p-3">' +
            
            studentsHtml +
            
            '</body>' +
            ' </html> ');
        }
    }
    else if ('/showstudent' == pathname) {
        var studentsHtml = "";
        var sId = urlparts.query.id
        console.log("Student", sId)
        studentsHtml += '<div class="card mt-4 p-3">' +
    
        ' <p>Your First Name is ' + students[sId].firstname + '</p>' +
        ' <p>Your last name is ' + students[sId].lastname + '</p>' +
        ' <p>Your Mark is ' + students[sId].mark + '</p>' +
        ' <p>Your Nationality is ' + students[sId].nationality + '</p>' +

        '</div>'
    

        if (req.method == 'GET') {
            res.end(' <!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
            '<title>Page Title</title>' +
            '</head>' +
            '<body  class="p-3">' +

            studentsHtml +

            '</body>' +
            ' </html> ');
        }
    }
    else if ('/deletestudent' == pathname) {
        var studentsHtml = "";
        var sId = urlparts.query.id
        studentsHtml += '<div class="card mt-4 p-3">' +
    
        ' <p>Deleted student: ' + students[sId].firstname + ' </p>' +

        '</div>'

        students.pop(sId)
    

        if (req.method == 'GET') {
            res.end(' <!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
            '<title>Page Title</title>' +
            '</head>' +
            '<body  class="p-3">' +

            studentsHtml +

            '</body>' +
            ' </html> ');
        }
    }
        else {
            var path;

            path=p.join(root, "/student.html");

            console.log("serving " + path);
            var stream = fs.createReadStream(path);

            stream.on('data', function (chunk) {
                res.write(chunk);
            });
            stream.on('end', function () {
                res.end();
            });
            stream.on('error', function(err){
                res.end('');
            });
        }
    }
);
server.listen(3000);

