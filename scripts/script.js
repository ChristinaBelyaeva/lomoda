// Переменная для кнопки выбора города
const headerCityButton = document.querySelector('.header__city-button');

// переменная определяющая хэш (#) страницы
let hash = location.hash.substring(1);

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




// запрос базы данных
// запрашиваем асинхронно, данные получаем не сразу, оператор async  пишется перед функцией
const getData = async () => {
  // fetch получаем данные, первый параметр путь до сервера, await оператор для того, чтобы оператор присваивания не работал, пока fetch не пришлет ответ 
  const data = await fetch('db.json');
// функция, которая возвращает файл с данными
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`данные не были получены, ошибка ${data.status} ${data.statusText}`);
    }
};
//  callback функции вызываются позже, здесь данные получаем и обрабатываем
const getGoods = (callback, prop, value) => {
  getData()
    .then(data => {
      if (value) {
        // здесь проверяем значение хэша
        callback(data.filter(item => item[prop] === value));
      } else {
        callback(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
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



// страница товаров

//  если код внутри try вызывает какую-либо ошибку, то срабатывает catch и выводит ошибку
try {

// переменная, которыя содержит весь список товаров на странице goods
  const goodsList = document.querySelector('.goods__list');

  if (!goodsList) {
    throw 'This is not a goods page!';
  }

  // переменная, которая содержит заголовок
  const goodsTitle = document.querySelector('.goods__title');

  // функция, которая меня заголовок
  const changeTitle = () => {
    // извлекаем хэш страницы
    goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
  }

  

// функция которая формирует карточки товаров
  const createCard = ({ id, preview, cost, brand, name, sizes }) => {

    // запрашиваем эти данные выше, ниже в развернутом виде
    // const { id, preview, cost, brand, name, sizes } = data;

    // запрашиваем id товара 
    // const id = data.id;
    // // запрашиваем картинку, картинка превью маленького размера
    // const preview = data.preview;
    // // запрашиваем стоимость товара
    // const cost = data.cost;
    // // запрашиваем бренд товара
    // const brand = data.brand;
    // // запрашиваем наименование товара
    // const name = data.name;
    // // запрашиваем размеры товара (это будет массив, т.к. несколько видов)
    // const sizes = data.sizes;



    // создаем новый элемент
    const li = document.createElement('li');
    // добавляем класс к новому элементу
    li.classList.add('goods__item');
    // делаем шаблон карточки с указанием данных, которые должны подтягиваться 
    li.innerHTML = `
    <article class="good">
      <a class="good__link-img" href="card-good.html#${id}">
        <img class="good__img" src="goods-image/${preview}" alt="">
      </a>
      <div class="good__description">
        <p class="good__price">${cost} &#8381;</p>
        <h3 class="good__title">${brand} 
        <span class="good__title__grey">/ ${name}</span>
        </h3>
        ${sizes ?
          `<p class="good__sizes">Размеры (RUS):
          <span class="good__sizes-list">${sizes.join(' ')}</span>
          </p>` :
          ''}
        <a class="good__link" href="card-good.html#${id}">Подробнее
        </a>
      </div>
    </article>
    `;
    // возвращаем на место
    return li;
  };

  // функция, которая будет рендерить карточки товара
  const renderGoodsList = data => {
    // очистили страницу от содержимого
    goodsList.textContent = '';
    console.log(data);
    // цикл который перебирает карточки
    // for (let i = 0; i < data.length; i++) {
    // }

    // другой вариант цикла
    // for (const item of data) {
    // }

    // еще вариант перебора карточек через функцию
    data.forEach((item) => {
      // создаем карточку, передаем в нее item
      const card = createCard(item);
      // в список добавляем карточку
      goodsList.append(card);
    });
  };

  // отслеживаем изменение хэша страницы
  window.addEventListener('hashchange', () => {
    // записали в переменную новый хэш
    hash = location.hash.substring(1);
    // заново вызвали страницу с товарами
    getGoods(renderGoodsList,'category', hash);
    changeTitle();
  });
  changeTitle();
  getGoods(renderGoodsList,'category', hash);

} catch (err) {
  console.warn(err);
}
  
// страница товара
try {
  // добавляем проверку страницы, на которой находимся
  if (!document.querySelector('.card-good')) {
    throw 'This is not a card-good page';
  }
  // задаем переменные с контентом страницы товара
  const cardGoodImage = document.querySelector('.card-good__image');
  const cardGoodBrand = document.querySelector('.card-good__brand');
  const cardGoodTitle = document.querySelector('.card-good__title');
  const cardGoodPrice = document.querySelector('.card-good__price');
  const cardGoodColor = document.querySelector('.card-good__color');
  const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper')
  const cardGoodColorList = document.querySelector('.card-good__color-list');
  const cardGoodSizes = document.querySelector('.card-good__sizes');
  const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
  const cardGoodBuy = document.querySelector('.card-good__buy');

  const generateList = data => data.reduce((html, item, i) => html + 
    `<li class="card-good__select-item" data-id="${i}">${item}<li>`, '');
  
  const renderCardGood = ([{ brand, name, cost, color, sizes, photo }]) => {
    cardGoodImage.src = `goods-image/${photo}`;
    cardGoodImage.alt = `${brand} ${name}`;
    cardGoodBrand.textContent = brand;
    cardGoodTitle.textContent = name;
    cardGoodPrice.textContent = `${cost} ₽`;
    if (color) {
      cardGoodColor.textContent = color[0];
      cardGoodColor.dataset.id = 0;
      cardGoodColorList.innerHTML = generateList(color);
    } else {
      cardGoodColor.style.display = 'none';
    }
    if (sizes) {
      cardGoodSizes.textContent = sizes[0];
      cardGoodSizes.dataset.id = 0;
      cardGoodSizesList.innerHTML = generateList(sizes);
    } else {
      cardGoodSizes.style.display = 'none';
    }
  };

  cardGoodSelectWrapper.forEach(item => {
    item.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.card-good__select')) {
        target.classList.toggle('card-good__select__open');
      }

      if (target.closest('.card-good__select-item')) {
        const cardGoodSelect = item.querySelector('.card-good__select');
        cardGoodSelect.textContent = target.textContent;
        cardGoodSelect.dataset.id = target.dataset.id;
        cardGoodSelect.classList.remove('card-good__select__open');
      }
    })
  })

  getGoods(renderCardGood, 'id', hash);
  
} catch (err) {
  console.warn(err);
}