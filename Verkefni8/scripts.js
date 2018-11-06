const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const items = document.querySelector('.items');

    text.init(form, items);
});

const text = (() => {
    let items; // Listi sem inniheldur item
    let input; // Input fyrir form
    let del; // Eyða takkar fyrir alla items

    function init(_form, _items) {
        items = _items;
        input = _form.querySelector('input');
        _form.addEventListener('submit', formHandler);

        // TODO láta hluti í _items virka

        updateList();
    }

    function formHandler(e) {
        e.preventDefault();

        const value = input.value;

        if ((value.length > 0) && (value.replace(/\s/g, '').length > 0)) {
            add(input.value);
        }
        input.value = ''; // hreinsar input línu eftir notkun
    }

    // event handler fyrir það að klára færslu
    function finish(e) {
        const span = e.target.nextElementSibling;
        if (e.target.checked) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = 'none';
        }
    }

    // event handler fyrir það að breyta færslu
    function edit(e) {
        const span = e.target;
        const item = span.parentElement;
        const oldText = span.childNodes[0].nodeValue;
        const input = el('input', 'item__edit', commit);
        input.value = oldText;
        item.replaceChild(input, e.target);
        input.focus();
        input.addEventListener('keypress', commit)
    }

    // event handler fyrir það að klára að breyta færslu
    function commit(e) {
        let keyCode = e.keyCode;
        if (keyCode == ENTER_KEYCODE) {
            let input = e.target;
            let currentText = input.value;
            let item = input.parentElement;
            let span = el('span', 'item__text', edit);
            span.appendChild(document.createTextNode(currentText));
            item.replaceChild(span, e.target);
        }
    }

    // fall sem sér um að bæta við nýju item
    function add(value) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('item');

        const itemCheckbox = document.createElement('input');
        itemCheckbox.setAttribute('type', 'checkbox');
        itemCheckbox.classList.add('item__checkbox');

        const itemText = document.createTextNode(value);

        const itemSpan = document.createElement('span');
        itemSpan.classList.add('item__text');
        itemSpan.appendChild(itemText);

        const buttonText = document.createTextNode('Eyða');

        const itemButton = document.createElement('button');
        itemButton.classList.add('item__button');
        itemButton.appendChild(buttonText);

        itemElement.appendChild(itemCheckbox);
        itemElement.appendChild(itemSpan);
        itemElement.appendChild(itemButton);

        items.appendChild(itemElement);

        updateList();
    }

    // event handler til að eyða færslu
    function deleteItem(e) {
        e.preventDefault;

        this.parentNode.remove();
    }

    // hjálparfall til að útbúa element
    function el(type, className, clickHandler) {
        const element = document.createElement(type);
        element.setAttribute('class', className);
        element.addEventListener('click', clickHandler);
        return element;
    }

    // Hjálpar fall til að uppfæra listann
    function updateList() {
        // For lykkja fyrir alla eyða takkana í items
        for (let item of items.querySelectorAll('.item__button')) {
            item.addEventListener('click', deleteItem);
        }

        // For lykkja fyrir alla checkboxa í items
        for (let box of items.querySelectorAll('.item__checkbox')) {
            box.addEventListener('click', finish);
        }

        // For lykkja fyrir öll span í items
        for (let span of items.querySelectorAll('.item__text')) {
            span.addEventListener('click', edit);
        }

        // For lykkja fyrir allt sem er verið að edita í items
        for (let edit of items.querySelectorAll('.item__edit')) {
            edit.addEventListener('keypress', commit);
        }
    }

    return {
        init: init
    }
})();