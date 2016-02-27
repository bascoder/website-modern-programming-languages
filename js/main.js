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

        function initNav() {
            function setActiveLi() {
                $('#general-nav').find('a').each(function () {
                    if ($(this).attr('href') == currentPage) {
                        $(this).parent().addClass('active');
                    }
                });
            }

            appendTemplate('_nav.html', setActiveLi);
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
        }

        this.init = function () {
            setCurrentPage();

            initNav();
            initMainContent();
        }
    };

    new Page().init();
})();
