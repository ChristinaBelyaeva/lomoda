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

// Модальное окно

const subheaderСart = document.querySelector('.subheader__cart'); // кнопка корзины
const cartOverlay = document.querySelector('.cart-overlay'); // модальное окно

// переменная, которая содержит функцию, добавляющую класс
const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open'); // classList объект с методами / add добавляет класс / класс без точки, тк добавляем 
};

// переменная, которая содержит функцию, убирающую класс
const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open'); // classList объект с методами / remove убирает класс
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
