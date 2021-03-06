var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//we need cookies for that, therefore let's turn JAR on
request = request.defaults({
    jar: true
});

var loginInformations = { email: "xxxxxxxxxx", password: "xxxxxxxxxx", op: "Login", form_id: "packt_user_login_form", form_build_id: ""},
    extension = 'pdf', // Could be {epub,mobi}
    url = 'https://www.packtpub.com/packt/offers/free-learning',
    downloadUrl = 'https://www.packtpub.com/ebook_download/',
    bookUrl = "",
    bookName = '';

request(url, function(err, res, body) {
    if(err) {
        throw (new Error('Request failed'));
        //callback.call(null, new Error('Request failed'));
        return;
    }

    var $ = cheerio.load(body);
    bookUrl = $("a.twelve-days-claim").attr("href");

    // Get book name from image src
    var bookNames = $('.dotd-main-book-image a').attr('href').split('/');
    bookName = bookNames[bookNames.length-1];

    var newFormId = $("input[type='hidden'][id^=form][value^=form]").val();
    if (newFormId) {
        loginInformations.form_build_id = newFormId;
    }

    // Request to create cookie
    request.post({
        uri: url,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: require('querystring').stringify(loginInformations)
    }, function(err, res, body){
        if(err) {
            callback.call(null, new Error('Login failed'));
            return;
        };

        var urlFileParts = bookUrl.split('/'),
            finalUrl = downloadUrl + urlFileParts[urlFileParts.length - 2] + '/' + extension;
        console.log("Begining of the download of " + finalUrl);

        // Download the ebook :)
        console.log("Final URL : ", finalUrl);

        request('https://www.packtpub.com'+bookUrl, function(err, res, body) {
            if(err){
                throw new Error("bookUrl error");
            }
            request.get({url: finalUrl, encoding: 'binary'}, function (err, response, body) {
                fs.writeFile(bookName + "." + extension, body, 'binary', function () {
                    console.log("You have a new book :)");
                });
            });
        });
    });

});