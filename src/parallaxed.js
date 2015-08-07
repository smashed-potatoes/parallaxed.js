/*!
 * parallaxed.js jQuery plugin
 * Created by Jon Melnik
 * Released under the MIT license
 */

;(function($) {
    var namespace = 'parallaxed';
    var version = 0.1;

    $.fn[namespace] = function (options) {
        var $items = this;

        // Defaults
        var settings = $.extend($.fn[namespace].defaults, options);

        // Internal helper function to get data items, falling back to the default
        var getDataDefault = function(item, id) {
            var nsId = namespace + '-' + id;
            return item.data(nsId) ? item.data(nsId) : settings[id];
        };

        // Store the initial positions of the items
        var startPositions = {};
        var startCssPositions = {};
        $items.each(function (index, item) {
            var $item = $(item);
            // Track both actual and css positions
            startPositions[item.id] = $item.position();
            startCssPositions[item.id] = {
                top: $item.css('top') ? parseInt($item.css('top'), 10) : 0,
                left: $item.css('left') ? parseInt($item.css('left'), 10) : 0
            };
        });

        // Handle scrolling
        var $window = $(window);
        $window.on('scroll', function(){
            var offsetTop = $window.scrollTop();
            var offsetLeft = $window.scrollLeft();

            $items.each(function (index, item){
                var $item = $(item);

                var start = getDataDefault($item, 'start');
                var speed = getDataDefault($item, 'speed');

                var startTop = startPositions[item.id].top;
                var startCssTop = startCssPositions[item.id].top;
                var startLeft = startPositions[item.id].left;
                var startCssLeft = startCssPositions[item.id].left;

                var parallaxOffsetTop = offsetTop * speed;
                var parallaxOffsetLeft = offsetLeft * speed;

                // Check if we should be moving
                if (start == 'visible') {
                    if ($item.position().top > offsetTop + $window.height()
                        || startTop + $item.outerHeight() < offsetTop
                        || $item.position().left > offsetLeft + $window.width()
                        || startLeft + $item.outerWidth() < offsetLeft) {
                        return;
                    }

                    // Have to adjust offset based on how much had to be scrolled to see the item
                    var scrollToSeeTop = (startTop > $window.height()) ? startTop - $window.height() : 0;
                    parallaxOffsetTop = (offsetTop - scrollToSeeTop) * speed;

                    var scrollToSeeLeft = (startLeft > $window.width()) ? startLeft - $window.width() : 0;
                    parallaxOffsetLeft = (offsetLeft - scrollToSeeLeft) * speed;
                }
                else if (start == 'offset') {
                    var startOffsetTop = getDataDefault($item, 'startoffsettop');
                    var startOffsetLeft = getDataDefault($item, 'startoffsetleft');
                    if (offsetTop < startOffsetTop || offsetLeft < startOffsetLeft) {
                        return;
                    }

                    // Adjust offset based on start offset
                    parallaxOffsetTop = (offsetTop - startOffsetTop) * speed;
                    parallaxOffsetLeft = (offsetLeft - startOffsetLeft) * speed;
                }

                if (getDataDefault($item, 'usetransform')) {
                    $item.css('transform', 'translate('+ (-parallaxOffsetLeft) +'px, '+ (-parallaxOffsetTop) +'px)');
                }
                else {
                    $item.css('top', (startCssTop - parallaxOffsetTop) + "px");
                    $item.css('left', (startCssLeft - parallaxOffsetLeft) + "px");
                }
            });
        });

        return this;
    };

    $.fn[namespace].defaults = {
        usetransform: true,
        speed: 1,
        start: 'visible',
        startoffsettop: 0,
        startoffsetleft: 0
    };

})(jQuery);
