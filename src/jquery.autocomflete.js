(function($){
    var Autocomflete = function(wrapper, options){

        var items = [];

        var defaults = {
            delay: 1000,
            ajax: '/'
        };
        options = $.extend(defaults,options);

        wrapper.addClass('autocomflete');

        var list =$('<ul class="items"></ul>');
        wrapper.append(list);

        var input = $('<input type="text">');
        input.keyup(function (e) {
            search($(this).val());
        });
        wrapper.append(input);

        var suggestions = $('<ul></ul>')
        wrapper.append(suggestions);

        var addItem = function (item) {
            items.push({
                key: item.key,
                value: item.value
            });
            list.append();
            var listItem = $('<li class="item"><span class="name">' + item.value + '</span></li>');
            var deleteButton = $('<a href="#">x</a>');
            deleteButton.click(function (e) {
                $(this).parent().remove();
                return false;
            });

            listItem.append(deleteButton,$('<input type="hidden" name="' + options.inputName + '" value="' + item.key + '">'));
            list.append(listItem);
        };

        var addItems = function(items){
            items.forEach(addItem);
        };

        var search = function (query) {

            $.ajax({
                url: options.ajax,
                method: 'GET',
                dataType: 'json',
                data:{
                    query: query
                }
            }).done(function (data) {

                suggestions.children().remove();
                suggestions.show();
                data.forEach(function (item) {
                    var suggestion = $('<li>' + item.value + '</li>');
                    var $item = item;
                    suggestion.click(function (e) {
                        addItem($item);
                        suggestions.hide();
                    });
                    suggestions.append(suggestion);
                });
            });
        }

    };

    $.fn.autocomflete = function(options){
        return this.each(function(){
            var wrapper = $(this);
            var autocomplete = new Autocomflete(wrapper, options);
            wrapper.data('autocomflete', autocomplete);
            return wrapper;
        });
    };

})(jQuery);