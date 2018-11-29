'use strict';
// Первый пункт задания
var ARR_LENGTH = 8;
var PIN_HEIGHT = 40;
var PIN_WIDTH = 40;

var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerType = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckinCheckout = ['12:00', '13:00', '14:00'];
var offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Функция для создания случайного целого числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Случайное целое число в интервале массива
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Тасование массива (Фишер-Йетс)
var shuffle = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var randomNumber = getRandomInt(0, i);
    var getRandomItem = arr[randomNumber];
    arr[randomNumber] = arr[i];
    arr[i] = getRandomItem;
  }
  return arr;
};

// Второй пункт задания
document.querySelector('.map').classList.remove('map--faded');

// Третий пункт задания

// Элемент в который мы будем вставлять пины
var similarListElement = document.querySelector('.map__pins');

// Шаблон пинов
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Массив с пинами
var pins = [];

// Функция для создания массива с объектами (карточками)
var createArray = function (arr) {
  for (var i = 0; i < ARR_LENGTH; i++) {
    arr[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: offerTitle[getRandomArrayElement(0, offerTitle.length)],
        address: location.x + ', ' + location.y,
        price: getRandomInt(1000, 1000000),
        type: getRandomArrayElement(0, offerType.length),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomArrayElement(0, offerCheckinCheckout.length),
        checkout: getRandomArrayElement(0, offerCheckinCheckout.length),
        features: shuffle(offerFeatures),
        description: '',
        photos: shuffle(offerPhotos)
      },
      location: {
        x: getRandomInt(0, similarListElement.offsetWidth),
        y: getRandomInt(130, 630)
      }
    };
    console.log(arr[i]);
  }
};

createArray(pins);

// Функция для создания карточки
var renderPins = function (item) {
  // Клонируем содержимое тега <template> и записываем в переменную
  var pinElement = similarPinTemplate.cloneNode(true);
  // Работаем со свойствами объекта (координаты, аватарка, адрес изображения картинки, альтернативный текст у картинки)
  pinElement.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = item.author.avatar;
  pinElement.querySelector('img').alt = item.offer.title;

  return pinElement;
};

// Создаем пустой фрагмент
var fragment = document.createDocumentFragment();

// Функция для передачи во фрагмент
var makeFragment = function (arr) {
  // Далее вставляем карточки во фрагмент
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPins(arr[i]));
  }
  return fragment;
};

// Четвертый пункт задания

// Вставляем содержимое фрагмента в DOM-дерево
similarListElement.appendChild(makeFragment(pins));

// Пятый пункт задания

// Элемент, в который мы будем вставлять объявление
var similarCardElement = document.querySelector('.map');

// Элемент до которого мы будем вставлять элемент
var before = similarCardElement.querySelector('.map__filters-container');

// Шаблон объявления
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Проверка popup__type
var addType = function (obj) {
  var result;
  if (obj === 'flat') {
    result = 'Квартира';
  }
  if (obj === 'bungalo') {
    result = 'Бунгало';
  }
  if (obj === 'house') {
    result = 'Дом';
  }
  if (obj === 'palace') {
    result = 'Дворец';
  }
  return result;
};

// Функция для создания объявления
var createCard = function (item) {
  var cardElement = similarCardTemplate.cloneNode(true);
  // Работаем со свойствами объекта
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.price + ' ₽/ночь.';
  cardElement.querySelector('.popup__type').textContent = addType(item.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + '.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + '.' + ' Выезд до' + item.offer.checkout + '.';
  cardElement.querySelector('.popup__features').textContent = item.offer.features;
  cardElement.querySelector('.popup__description').textContent = item.offer.description;
};

// Вставляем созданные карточки в блок .map до before
var makeCard = function (item) {
  fragment.appendChild(createCard(item));
  similarCardElement.insertBefore(fragment, before);
};

makeCard(pins);
