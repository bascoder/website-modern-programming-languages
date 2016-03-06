(function () {
    "use strict";

    var config = {
        templateDirectory: 'templates/',
        pagesDirectory: 'pages/'
    };

    var isFunction = function (object) {
        return object && typeof object == 'function';
    };

    var Page = function () {

        var currentPage;

        function setActiveLi() {
            $('#general-nav').find('a').each(function () {
                if ($(this).attr('href') == currentPage) {
                    $(this).parent().addClass('active');
                } else {
                    $(this).parent().removeClass('active');
                }
            });
        }

        function initNav() {

            $('#general-nav').load(config.templateDirectory + '_nav.html', null, function () {
                $('#general-nav').find('a').each(function () {
                    addClicker(this);
                });

                setActiveLi();
            });
        }

        function initMainDivision() {
            $('#main-content').load(config.templateDirectory + '_main_content.html', null, loadContent);
        }

        function loadContent() {
            var url = config.pagesDirectory + '_' + currentPage;
            console.log('Start loading ', url);
            $('#content-section').load(url, null, function () {
                console.log('Done loading ', url);
                makeRefList();
            });

            validator.updateValidator();
        }

        function setCurrentPage() {
            var pathParts = window.location.pathname.split('/');
            currentPage = pathParts[pathParts.length - 1];
            if (!currentPage || currentPage.length == 0 || currentPage == '#') {
                currentPage = 'index.html';
            }
        }

        this.init = function () {
            setCurrentPage();

            initNav();
            initMainDivision();
        };

        this.swapPage = function () {
            var previous = currentPage;
            setCurrentPage();

            if (previous != currentPage) {
                console.log("New page: ", currentPage);
                setActiveLi();
                loadContent();
            }
        };

        function makeRefList() {
            $('#ReferenceList').empty();
            var allLinks = $("a[class='ref']");
            allLinks.each(function (index) {
                index += 1;
                $(this).append(index);
                var url = $(this).attr('href');
                $('#ReferenceList').append("<li><a href='" + url + "'>" + url + "</a></li>");
            });
        }
    };

    var Navigation = function () {

        this.navigate = function (link) {
            console.log("Pushing state: ", link.href);
            history.pushState(null, null, link.href);
            page.swapPage();
        };

        this.init = function () {
            window.onpopstate = page.swapPage;
        }
    };

    function isLocalhost() {
        var hostname = window.location.hostname;
        return hostname == 'localhost' || hostname == '127.0.0.1';
    }

    var Validator = function () {
        function getValidatorUri(out) {
            var urlEncoded = encodeURI(window.location.href);
            return "https://validator.w3.org/nu/?out=" + out + "&doc=" + urlEncoded;
        }

        function validate(callback) {
            if (isLocalhost()) {
                // don't call validator for localhost to prevent IP blacklisting
                callback({messages: []});
            } else {
                $.getJSON(getValidatorUri('json'), null, function (json) {
                    callback(json);
                });
            }
        }

        function setHtmlElement(messages) {
            var validator = $('#validator');
            validator.html('<a href="' + getValidatorUri('html') + '" target="_blank">W3C error count: ' + messages);
            if (messages >= 1) {
                validator.addClass('text-error');
                validator.removeClass('text-success');
            } else {
                validator.addClass('text-success');
                validator.removeClass('text-error');
            }
        }

        this.updateValidator = function () {
            validate(function (status) {
                var messages = status.messages.length;
                setHtmlElement(messages);
            });
        }
    };

    function addClicker(link) {
        link.addEventListener("click", function (e) {
            try {
                navigation.navigate(link);
            } catch (err) {
                console.error(err);
            } finally {
                e.preventDefault();
                e.stopPropagation();
            }

        }, false);
    }

    var page = new Page();
    var navigation = new Navigation();
    var validator = new Validator();
    page.init();
    navigation.init();
})();

"use strict";

function changeTitle(title) {
    $("#title").html(title);
    if (title != 'modern programming languages 2016') {
        $('title').html(title + ' - modern programming languages 2016');
    }
}