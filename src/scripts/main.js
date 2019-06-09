
import $ from 'jquery-nice-select/js/jquery.nice-select.js';
import menu from './menu.js';

function createList(menu) {
    $('.js-catprice').append('<div class="calc-price__title">Область исследования</div>');
    $('.js-catprice').append('<select id="select-price"></select');
    $('.js-catprice').append('<div class="calc-price__title">Выберите вид диагностики</div>');
    let $sp = $('#select-price');
    for (let item of menu) {
        $sp.append(`<option data-item-id="${item.id}" value="${item.id}">${item.title}</option>`);

        if (item.menu.length) {
            $('.js-catprice').append(`
                <select data-subselect="true" 
                    data-nice-select-id="${item.id}" 
                    visible="false"></select>`);
            for (let subItem of item.menu) {
                $(`[data-nice-select-id="${item.id}"]`).append(`<option value="${subItem.price}">${subItem.title}</option>`);
            }
        }
    }

    $sp.change();
    $('.js-catprice').append('<div class="summary-price">0</div>');
}


$(document).ready(function() {
    $(document).on('change', '#select-price', function() {
        let _this = $(this);
        
        var id = _this.val();
        var $activeList = $('[data-nice-select-id="'+ id +'"]');
        $activeList[0].options[0].selected = true;
        $activeList.change();
        $activeList.niceSelect('update');
        $('[subselect=true]').attr('visible', 'false');
        $('.nice-select-'+id).attr('visible', 'true');

    });
    $(document).on('change', '[data-subselect="true"]', function() {
        let _this = $(this); 
        var price = _this.val();
        //console.info(_this.attr('data-nice-select-id'))
        $('.nice-select-'+ _this.attr('data-nice-select-id')).attr('visible', 'true');
        $('.summary-price').text(price);
    });

    createList(menu);
    $('select').niceSelect();
    var id = $($('#select-price')[0].selectedOptions[0]).attr('data-item-id');
    $(`[data-nice-select-id="${id}"]`).change();
});