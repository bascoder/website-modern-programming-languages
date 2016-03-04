(function () {
    "use strict";
    $(document).ready(function () {
        var url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=86246acf24db7bc59ed876a377caef89&user_id=140094901@N04&format=json&nojsoncallback=1";
        var size = 'm';

        $.getJSON(url, null, function (json) {
            $.each(json.photos.photo, function () {
                var photo = this;

                var photoUrl = "https://farm"
                    + photo['farm']
                    + ".staticflickr.com/"
                    + photo['server']
                    + "/" + photo['id']
                    + "_" + photo['secret']
                    + "_" + size + ".jpg";

                $('#photo-browser').append('<img src="' + photoUrl + '" alt="' + photo.title + '" />');
            });


        });
    });

    changeTitle('Programmeer en scripting talen in 2016');
})();