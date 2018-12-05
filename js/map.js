'use strict';
// Первый пункт задания
var ARR_LENGTH = 8;
var PIN_HEIGHT = 40;
var PIN_WIDTH = 40;

var OFFER_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Элемент в который мы будем вставлять пины
var similarListElement = document.querySelector('.map__pins');

// Шаблон пинов
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Элемент, в который мы будем вставлять объявление
var similarCardElement = document.querySelector('.map');

// Шаблон объявления
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Создаем пустой фрагмент
var fragment = document.createDocumentFragment();

// Контейнер, до которого мы будем вставлять элемент
var before = similarCardElement.querySelector('.map__filters-container');

// Служебные функции

// Функция для создания случайного целого числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Случайное целое число в интервале массива
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Случайная длина массива
var getRandomArrayLength = function (arr) {
  return arr.slice(Math.floor(Math.random() * arr.length));
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

// Массив с пинами
var pins = [];

// Функция для создания массива с объектами (карточками)
var createArray = function (arr) {
  for (var i = 0; i < ARR_LENGTH; i++) {
    var location = {
      x: getRandomInt(0, similarListElement.offsetWidth),
      y: getRandomInt(130, 630)
    };
    arr[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomArrayElement(OFFER_TITLE),
        address: location.x + ', ' + location.y,
        price: getRandomInt(1000, 1000000),
        type: getRandomArrayElement(OFFER_TYPE),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomArrayElement(OFFER_CHECKIN),
        checkout: getRandomArrayElement(OFFER_CHECKOUT),
        features: getRandomArrayLength(shuffle(OFFER_FEATURES)),
        description: '',
        photos: shuffle(OFFER_PHOTOS)
      },
      location: location
    };
  }
};

// Вызов функции
createArray(pins);

// Функция для создания пина
var createPins = function (item) {
  // Клонируем содержимое тега <template> и записываем в переменную
  var pinElement = similarPinTemplate.cloneNode(true);
  // Работаем со свойствами объекта (координаты, аватарка, адрес изображения картинки, альтернативный текст у картинки)
  pinElement.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = item.author.avatar;
  pinElement.querySelector('img').alt = item.offer.title;

  return pinElement;
};

// Функция для отрисовки пинов
var renderPins = function (arr) {
  // Далее вставляем карточки во фрагмент
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPins(arr[i]));
  }
  return fragment;
};

// Четвертый пункт задания

// Вставляем содержимое фрагмента в DOM-дерево
similarListElement.appendChild(renderPins(pins));

// Пятый пункт задания

// Проверка popup__type
var getRightType = function (obj) {
  switch (obj) {
    case 'flat': {
      break;
    }
    case 'bungalo': {
      break;
    }
    case 'house': {
      break;
    }
    case 'palace': {
      break;
    }
  }
};

//  Функция для создания особенностей в объявлении
var getFeatures = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + arr[i];
    fragment.appendChild(li);
  }
  return fragment;
};
//  Функция для создания фотографий в объявлении
var getPhotos = function (arr) {
  for (var j = 0; j < arr.length; j++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.src = arr[j];
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 40;
    fragment.appendChild(img);
  }
  return fragment;
};

// Функция для создания объявления
var createCard = function (item) {
  var cardElement = similarCardTemplate.cloneNode(true);
  // Работаем со свойствами объекта
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь.';
  cardElement.querySelector('.popup__type').textContent = getRightType(item.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + '.' + ' Выезд до ' + item.offer.checkout + '.';
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(getFeatures(item.offer.features));
  cardElement.querySelector('.popup__description').textContent = item.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(getPhotos(item.offer.photos));
  cardElement.querySelector('.popup__avatar').src = item.author.avatar;
  return cardElement;
};
// Вставляем созданные карточки в блок .map до before
var makeCard = function (item) {
  fragment.appendChild(createCard(item));
  similarCardElement.insertBefore(fragment, before);
};


// Вызов функции
makeCard(pins[0]);
