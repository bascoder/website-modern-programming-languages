(function () {
    "use strict";

    // photo-browser closure
    (function () {
        var query = 'HTML5';
        var progressBar; // init in document ready

        function updatePhotoBrowser() {
            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86246acf24db7bc59ed876a377caef89&format=json&nojsoncallback=1&results=photos&per_page=4&text=";
            var size = 'm';

            progressBar.progressbar({
                value: false
            });

            $.getJSON(url + query, null, function (json) {
                try {
                    var photosDiv = $('#photos').detach();
                    photosDiv.empty();
                    $.each(json.photos.photo, function () {
                        var photo = this;

                        var photoUrl = "https://farm"
                            + photo['farm']
                            + ".staticflickr.com/"
                            + photo['server']
                            + "/" + photo['id']
                            + "_" + photo['secret']
                            + "_" + size + ".jpg";

                        photosDiv.append('<img src="' + photoUrl + '" alt="' + photo.title + '" />');
                    });
                    $('#photo-browser').append(photosDiv);
                } finally {
                    progressBar.progressbar('destroy');
                }
            });
        }

        $(document).ready(function () {
            progressBar = $('#pgPhotoBrowser');
            updatePhotoBrowser();

            //setup select
            $('#photoBrowserQuery').change(function () {
                var selected = $(this).children('option:selected');
                query = selected.html();

                updatePhotoBrowser();
            });
        });
    })();


    changeTitle('Programmeer en scripting talen in 2016');
})();