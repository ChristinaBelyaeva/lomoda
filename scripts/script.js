// Переменная для кнопки выбора города
const headerCityButton = document.querySelector('.header__city-button');

// Условия для определения города, если город не указан выводит текст по умолчанию
headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

// Функция выводит модальное окно для ввода города
headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите Ваш город');
  headerCityButton.textContent = city;
  localStorage.setItem('lomoda-location', city);
});

// блокировка скролла
const disableScroll = () => {
  // находим ширину скролла / window - это ширина всего браузера, включая скролл, document содержит только документ, скролл не учитывается
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  // убираем вертикальный прыжок при открытии модального окна, запоминаем расположение экрана при нажатии на корзину
  document.body.dbScrollY = window.scrollY;
  // Добавляем стили, overflow скрывает скролл, padding-right не дает прыгать странице горизонтально
  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `;
  // document.body.style.overflow = 'hidden'; первый вариант убрать скролл, но тогда страница сдвигается
};

// разблокировка скролла
const enableScroll = () => {
  // убираем заданные стили при скрытии скролла
  document.body.style.cssText = '';
  // При закрытии корзины остаемся на том же месте
  window.scroll({
    top: document.body.dbScrollY,
  });
  // document.body.style.overflow = '';  первый вариант убрать скролл, но тогда страница сдвигается
};

// Модальное окно
const subheaderСart = document.querySelector('.subheader__cart'); // кнопка корзины
const cartOverlay = document.querySelector('.cart-overlay'); // модальное окно

// переменная, которая содержит функцию, добавляющую класс
const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open'); // classList объект с методами / add добавляет класс / класс без точки, тк добавляем 
  disableScroll(); //блокируем скролл
};

// переменная, которая содержит функцию, убирающую класс
const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open'); // classList объект с методами / remove убирает класс
  enableScroll(); //разблокируем скролл
};

// функция, отслеживающая событие клик, добавляющая клас и открывающая модальное окно
subheaderСart.addEventListener('click', (cartModalOpen));

// функция, закрывающая модальное окно
cartOverlay.addEventListener('click', event => {
  const target = event.target; //event отслеживает по какому объекту был клик

  //условие, по которому при возврате true запускается функция закрытия окна / можно использовать (target.classList.contains('cart__btn-close')) он проверяет объект, поэтому класс без точки!
  // || это означает или, добавляем второе условие закрытия окна, клик за пределами модального окна
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose(); 
  }
});

