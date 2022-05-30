import tabs from "./modules/tabs.js";
import { cards } from "./modules/cards.js";
import { timer } from "./modules/timer.js";
import { modal } from "./modules/modal.js";
import forms from "./modules/forms.js";
import { slider } from "./modules/slider.js";
import { calculator } from "./modules/calculator.js";

'use-strict';

window.addEventListener('DOMContentLoaded', () => {

    tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active' );

    tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active' );

    timer('.timer', '2022-09-01');

    modal('.modal', '[data-modal]');

    cards();

    forms();

    slider();

    calculator();
})