import menu from './menu.js';

var catpriceID = 0;

function createList(menu) {
    $('.js-catprice-admin').append(`<ul class="catprice-list-admin" id="select-price"></ul>`);
    let $sp = $('#select-price');

    for (let item of menu) {
        $sp.append(`<li class="catprice-list__item" data-item-id="${item.id}">
            <span class="js-item-text" contenteditable="true">${item.title}</span>
            <span onclick="catpriceDel(this)">Удалить</span>
            </li>`);

        if (item.menu.length) {
            $(`[data-item-id="${item.id}"]`).append(`
                <ul class="catprice-list-admin"
                    data-subselect="true" 
                    data-nice-select-id="${item.id}" 
                    ></ul`);
            var list = $(`[data-nice-select-id="${item.id}"]`);

            for (let subItem of item.menu) {
                list.append(`<li 
                    class="catprice-list__item">
                    <span class="js-item-text" contenteditable="true">${subItem.title}</span>
                    <span class="catprice-list__price" contenteditable="true">${subItem.price}</span>
                    <span onclick="catpriceDel(this)">Удалить</span>
                </li>`);
            }

            list.append(`<li class="catprice-list__item" onclick="catpriceAddItem(this)">добавить пункт</li>`);
        }
    }

    $('.js-catprice-admin').append(`<div onclick="catpriceAddList(this)">добавить список</div>`);

    if (menu) {
        window.catpriceID = menu[menu.length - 1].id ? menu[menu.length - 1].id : 0;
    }
}

window.catpriceAddItem = function(_this) {
    $(_this).before(`<li 
        class="catprice-list__item">
        <span class="js-item-text" contenteditable="true">Название</span>
        <span class="catprice-list__price" contenteditable="true">0</span>
        <span onclick="catpriceDel(this)">Удалить</span>
    </li>`);
}

window.catpriceAddList = function(_this) {
    ++window.catpriceID;
    $('#select-price').append(`<li class="catprice-list__item" data-item-id="${window.catpriceID}"> 
        <span class="js-item-text" contenteditable="true">Новый список</span>
        <span onclick="catpriceDel(this)">Удалить</span>
        <ul class="catprice-list-admin"
            data-subselect="true" 
            data-nice-select-id="${window.catpriceID}">
            <li class="catprice-list__item" onclick="catpriceAddItem(this)">добавить пункт</li>
        </ul>
    </li>`);

}
window.savePricelist = function() {
    var newPricelist = [];
    var $list = $('#select-price');
    var $items = $('#select-price > .catprice-list__item');

    $items.each((i, item) => {
        var $item = $(item);
        
        var subList = [];
        $item.find('.catprice-list__item').each((k, subItem) => {
            var $subItem = $(subItem);
            if ($subItem.find('.js-item-text').text()) {
                subList.push({
                    title: $subItem.find('.js-item-text').text(),
                    price: $subItem.find('.catprice-list__price').text()
                });
            }
        });

        newPricelist.push({
            id: $item.data('item-id'),
            title: $item.find('.js-item-text').eq(0).text(),
            menu: subList
        });
    });

    console.info(newPricelist);
}

window.catpriceDel = function(_this) {
    $(_this).parent('*').remove();
}

$(document).ready(function() {
    createList(menu);
});
