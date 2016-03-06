/**
 * Created by Bas on 6-3-2016.
 */
(function () {
    "use strict";

    $(document).ready(function () {
        $('.menu-toggle').click(function () {
            $('#general-nav').find('> ul').toggle('swing');
        });
    });
})();
