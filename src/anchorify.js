/*!
 * William DURAND <william.durand1@gmail.com>
 * MIT Licensed
 */
(function ($, undefined) {
    "use strict";

    var Anchorify = function (options) {
        var id,
            text = options.text || '¶',
            cssClass = options.cssClass || 'anchor-link';

        if ('undefined' !== typeof options.$el.attr('id')) {
            id = options.$el.attr('id');
        } else {
            id = options.$el.text()
                .trim()
                .replace(/[ ;,.'?!_]/g, '-')
                .replace(/[-]+/g, '-')
                .replace(/-$/, '')
                .toLowerCase();
        }

        if ('undefined' !== typeof Anchorify.generatedIds[id]) {
            id = id + '-' + Anchorify.generatedIds[id]++;
        } else {
            Anchorify.generatedIds[id] = 1;
        }

        options.$el.attr('id', id).append([
            '<a href="#', id, '" class="', cssClass, '">',
            text,
            '</a>'
        ].join(''));
    };

    $.fn.anchorify = function (options) {
        Anchorify.generatedIds = [];

        this.each(function () {
            new Anchorify($.extend({}, options || {}, { $el: $(this) }));
        });

        return this;
    };
})(jQuery, undefined);
