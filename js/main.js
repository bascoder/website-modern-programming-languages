(function () {
    "use strict";

    var config = {
        templateDirectory: 'templates/'
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

            appendTemplate('_nav.html', function () {
                $('#general-nav').find('a').each(function () {
                    addClicker(this);
                });

                setActiveLi();
            });
        }

        function initMainContent() {
            appendTemplate('_main_content.html');
        }

        function appendTemplate(template, callback) {
            $.get(config.templateDirectory + template, function (data) {
                $('body').append(data);
                if (isFunction(callback)) {
                    callback(data);
                }
            });
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
            initMainContent();
        };

        this.swapPage = function () {
            setCurrentPage();

            console.log("New page: ", currentPage);
            setActiveLi();
        };
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

    page.init();
    navigation.init();
})();
