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
        $items.each(function (index, item) {
            var $item = $(item);
            var position = $item.position();
            // First use CSS, fallback to jQuery position
            startPositions[item.id] = {
                top: $item.css('top') ? parseInt($item.css('top'), 10) : position.top,
                left: $item.css('left') ? parseInt($item.css('left'), 10) : position.left
            };
        });

        // Handle scrolling
        var $window = $(window);
        $window.on('scroll', function(){
            var offset = $window.scrollTop();

            $items.each(function (index, item){
                var $item = $(item);

                var start = getDataDefault($item, 'start');
                var speed = getDataDefault($item, 'speed');

                var startTop = startPositions[item.id].top;
                var parallaxOffset = offset * speed;

                // Check if we should be moving
                if (start == 'visible') {
                    if ($item.position().top > offset + $window.height()
                        || $item.position().top + $item.outerHeight() < offset) {
                        return;
                    }

                    // Have to adjust offset based on how much had to be scrolled to see the item
                    var scrollToSee = (startTop > $window.height()) ? startTop - $window.height() : 0;
                    parallaxOffset = (offset - scrollToSee) * speed;
                }
                else if (start == 'offset') {
                    var startOffset = getDataDefault($item, 'startoffset');
                    if (offset < startOffset) {
                        return;
                    }

                    // Adjust offset based on start offset
                    parallaxOffset = (offset - startOffset) * speed;
                }

                $item.css('top', (startTop - parallaxOffset) + "px");
            });
        });

        return this;
    }

    $.fn[namespace].defaults = {
        speed: 1,
        start: 'visible',
        startoffset: 0
    };

})(jQuery);
