export const mockBun1 = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mockBun2 = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

export const mockIngredient1 = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const mockIngredient2 = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 50,
  price: 60,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

export const mockOrder1 = {
  _id: '69b40e43a64177001b32f75d',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2026-03-13T13:16:51.984Z',
  updatedAt: '2026-03-13T13:16:52.280Z',
  number: 1111
};

export const mockOrder2 = {
  _id: '69b3fc5ca64177001b32f746',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный бессмертный люминесцентный бургер',
  createdAt: '2026-03-13T13:16:51.984Z',
  updatedAt: '2026-03-13T13:16:52.280Z',
  number: 2222
};

export const mockCurrentOrder = {
  _id: '69b3254da64177001b32f68f',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa094a'
  ],
  status: 'created',
  name: 'Space spicy альфа-сахаридный традиционный-галактический экзо-плантаго фалленианский астероидный бессмертный минеральный флюоресцентный бургер',
  createdAt: '2026-03-12T20:42:53.638Z',
  updatedAt: '2026-03-12T20:42:53.962Z',
  number: 102804
};

export const mockUserOrder = {
  _id: '69b7c821a64177001b32fcdf',
  name: 'Метеоритный флюоресцентный бургер',
  number: 102919,
  createdAt: '2026-03-16T09:06:41.669Z',
  updatedAt: '2026-03-16T09:06:41.927Z',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  status: 'done'
};

export const mockUser = {
  name: 'test user',
  email: 'test@example.com'
};
