!function($) {
    var Selectpicker = function(element, options, e) {
        if (e ) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        var button = null;
        this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);
        this.style = this.options.style;
        this.size = this.options.size;
        this.init();
    };

    Selectpicker.prototype = {

        constructor: Selectpicker,

        init: function (e) {
            this.$element.hide();
            var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) : '';
            var template = this.getTemplate();
            var id = this.$element.attr('id');
            template = this.createLi(template);
            this.$element.after(template);
            this.$newElement = this.$element.next('.bootstrap-select');
            var select = this.$newElement;
            var menu = this.$newElement.find('.dropdown-menu');
            var menuA = this.$newElement.find('.dropdown-menu ul li > a');
            var liHeight = parseInt(menuA.css('line-height')) + menuA.outerHeight();
            var selectOffset_top = this.$newElement.offset().top;
            var size = 0;
            var menuHeight = 0;
            var selectHeight = this.$newElement.outerHeight();
            button = this.$newElement.find('> button');
            if (id !== undefined) {
                button.attr('id', id);
            }
            for (var i = 0; i < classList.length; i++) {
                if(classList[i] != 'selectpicker') {
                    this.$newElement.addClass(classList[i]);
                }
            }
            button.addClass(this.style);
            this.checkDisabled();
            this.clickListener();
            this.$element.find('optgroup').each(function() {
                if ($(this).attr('label')) {
                    menu.find('.opt'+$(this).index()).eq(0).before('<dt>'+$(this).attr('label')+'</dt>');
                }
                menu.find('.opt'+$(this).index()).eq(0).parent().prev().addClass('optgroup-div');
            });
            if (this.size == 'auto') {
                function getSize() {
                    var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
                    var windowHeight = window.innerHeight;
                    var menuExtras = parseInt(menu.css('padding-top')) + parseInt(menu.css('padding-bottom')) + parseInt(menu.css('border-top-width')) + parseInt(menu.css('border-bottom-width')) + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
                    var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
                    if (!select.hasClass('dropup')) {
                    size = Math.floor(selectOffset_bot/liHeight);
                    } else {
                    size = Math.floor((selectOffset_top_scroll - menuExtras)/liHeight);
                    }
                    if (size < 4) {size = 3};
                    menuHeight = liHeight*size;
                    if (menu.find('ul li').length + menu.find('dt').length > size) {
                        menu.find('ul').css({'max-height' : menuHeight + 'px', 'overflow-y' : 'scroll'});
                    } else {
                        menu.find('ul').css({'max-height' : 'none', 'overflow-y' : 'auto'});
                    }
            }
                getSize();
                $(window).resize(getSize);
                $(window).scroll(getSize);
            } else if (this.size && this.size != 'auto' && menu.find('ul li').length > this.size) {
                menuHeight = liHeight*this.size;
                if (this.size == 1) {menuHeight = menuHeight + 8}
                menu.find('ul').css({'max-height' : menuHeight + 'px', 'overflow-y' : 'scroll'});
            }
            this.$newElement.find('ul').bind('DOMNodeInserted',
            $.proxy(this.clickListener, this));
        },

        getTemplate: function() {
            var template =
                "<div class='btn-group bootstrap-select'>" +
                    "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
                        "<span class='filter-option pull-left'>__SELECTED_OPTION</span>&nbsp;" +
                        "<span class='caret'></span>" +
                    "</button>" +
                    "<div class='dropdown-menu'>" +
                        "<ul>" +
                            "__ADD_LI" +
                        "</ul>" +
                    "</div>" +
                "</div>";

            return template;
        },

        createLi: function(template) {

            var _li = [];
            var _liA = [];
            var _liHtml = '';
            var opt_index = null;
            var _this = this;
            var _selected_index = this.$element.find('option:selected').index() ? this.$element.find('option:selected').index() : 0;
            
            this.$element.find('option').each(function(){
                _li.push($(this).text());
            });

            this.$element.find('option').each(function() {
                if ($(this).parent().is('optgroup')) {
                    opt_index = String($(this).parent().index());
                    var optgroup = $(this).parent();
                    for (var i = 0; i < optgroup.length; i++) {
                        _liA.push('<a class="opt'+opt_index[i]+'" href="#">'+$(this).text()+'</a>');
                    }

                } else {
                    _liA.push('<a tabindex="-1" href="#">'+$(this).text()+'</a>');
                }
            });

            if (_li.length > 0) {
                template = template.replace('__SELECTED_OPTION', _li[_selected_index]);
                for (var i = 0; i < _li.length; i++) {
                    _liHtml += "<li rel=" + i + ">" + _liA[i] + "</li>";
                }
            }

            this.$element.find('option').eq(_selected_index).prop('selected',true);

            template = template.replace('__ADD_LI', _liHtml);

            return template;
        },

        checkDisabled: function() {
            if (this.$element.is(':disabled')) {
                button.addClass('disabled');
                button.click(function(e) {
                    e.preventDefault();
                });
            }
        },

        clickListener: function() {
            var _this = this;
            
            $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
            $('body').on('touchstart.dropdown', '.dropdown-toggle', function (e) { e.stopPropagation(); });
            
            $('.dropdown-menu').find('li dt').on('click', function(e) {
                e.stopPropagation();
            });
            
            this.$newElement.find('li a').on('click', function(e) {
                e.preventDefault();
                var selected = $(this).parent().index();
                var $this = $(this).parent(),
                    rel = $this.attr('rel'),
                    $select = $this.parents('.bootstrap-select');

                if (_this.$element.not(':disabled')){
                    $select.prev('select').find('option').eq(selected).prop('selected',true);
                    $select.find('.filter-option').html($this.text());

                    // Trigger select 'change'
                    $select.prev('select').trigger('change');
                }

            });
            this.$element.on('change', function(e) {
                var selected = $(this).find('option:selected').text();
                $(this).next('.bootstrap-select').find('.filter-option').html(selected);
            });
        }

    };

    $.fn.selectpicker = function(option, event) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('selectpicker'),
                options = typeof option == 'object' && option;
            if (!data) {
                $this.data('selectpicker', (data = new Selectpicker(this, options, event)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });
    };
    
    $.fn.selectpicker.defaults = {
        style: null,
        size: 'auto'
    }

}(window.jQuery);