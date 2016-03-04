(function () {
    "use strict";
    changeTitle('JavaScript 6');

    //TODO more data

    $(document).ready(function () {
        var url = 'https://api.github.com/search/repositories?language:javascript&sort=created&order=desc&q=javascript';
        $.getJSON(url, null, function (json) {
            var countByYear = {};
            $.each(json.items, function () {
                var item = this;
                var date = new Date(item.pushed_at);
                var year = date.getFullYear().toString();

                if (countByYear.hasOwnProperty(year)) {
                    countByYear[year] += 1;
                } else {
                    countByYear[year] = 1;
                }
            });

            console.log(countByYear);

            var series = [];
            for (var year in countByYear) {
                if (countByYear.hasOwnProperty(year)) {
                    series.push([parseInt(year), parseInt(countByYear[year])]);
                }
            }

            console.log(series);

            $('#js-popularity-graph').plot([series]);
        });
    });
})();