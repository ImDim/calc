import menu from './menu.js';

var catpriceID = 0;

function createList(menu) {
    $('.js-catprice-admin').append(`<ul class="catprice-list-admin" id="select-price"></ul>`);
    let $sp = $('#select-price');

    for (let item of menu) {
        $sp.append(`<li class="catprice-list__item" data-item-id="${item.id}">${item.title} <span onclick="catpriceDel(this)">Удалить</span></li>`);

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
                    ${subItem.title}
                    <span class="catprice-list__price">${subItem.price}</span>
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
        Название
        <span class="catprice-list__price">0</span>
        <span onclick="catpriceDel(this)">Удалить</span>
    </li>`);
    console.info(_this)
}

window.catpriceAddList = function(_this) {
    ++window.catpriceID;
    $('#select-price').append(`<li class="catprice-list__item" data-item-id="${window.catpriceID}"> Новый список <span onclick="catpriceDel(this)">Удалить</span>
        <ul class="catprice-list-admin"
            data-subselect="true" 
            data-nice-select-id="${window.catpriceID}">
            <li class="catprice-list__item" onclick="catpriceAddItem(this)">добавить пункт</li>
        </ul>
    </li>`);

}
window.catpriceDel = function(_this) {
    $(_this).parent('*').remove();
}

$(document).ready(function() {
    createList(menu);
    
    
});
