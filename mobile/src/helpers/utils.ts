export const IS_NODE = true; // false for SPRING / JAVA server

const MY_HOST = '192.168.1.11'; // change to your server / lan IP address, localhost doesn't work!

const node = 'http://' + MY_HOST + ':3001/';

const root = 'http://' + MY_HOST + ':8080/';

const root_api = root + 'api/';

export function getNodePath(path: string) {
  return node + path;
}

export function getPath(path: string) {
  return root + path;
}

export function getRestPath(path = '') {
  return root_api + path;
}

export function getId(model: any) {
  return model.id || model._id;
}

export function validateField(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

export const getCategoryIcon = (name: string) => {
  let icon: any = '';

  switch (name) {
    case 'bakery':
      icon = require('../../assets/img/categories/bakery.jpg');
      break;

    case 'cereals':
      icon = require('../../assets/img/categories/cereals.jpg');
      break;

    case 'dairy':
      icon = require('../../assets/img/categories/dairy.jpg');
      break;

    case 'drinks':
      icon = require('../../assets/img/categories/drinks.jpg');
      break;

    case 'fruit & veg':
    case 'fruit n veg':
      icon = require('../../assets/img/categories/fruitveg.jpg');
      break;

    case 'meats':
      icon = require('../../assets/img/categories/meats.jpg');
      break;

    default:
  }

  return icon;
};

export const getProductIcon = (name: string) => {
  let icon: any = '';

  switch (name) {
    case 'broccoli':
      icon = require('../../assets/img/products/broccoli.png');
      break;

    case 'butter':
      icon = require('../../assets/img/products/butter.png');
      break;

    case 'cheese':
      icon = require('../../assets/img/products/cheese.png');
      break;

    case 'chicken leg':
      icon = require('../../assets/img/products/chicken-leg.png');
      break;

    case 'chocolate cookies':
      icon = require('../../assets/img/products/chocolate-cookies.png');
      break;

    case 'corn on the cob':
      icon = require('../../assets/img/products/corn-on-the-cob.png');
      break;

    case 'free range eggs':
      icon = require('../../assets/img/products/free-range-eggs.png');
      break;

    case 'granola':
      icon = require('../../assets/img/products/granola.png');
      break;

    case 'green tea':
      icon = require('../../assets/img/products/green-tea.png');
      break;

    case 'herbal tea':
      icon = require('../../assets/img/products/herbal-tea.png');
      break;

    case 'jumbo oats':
      icon = require('../../assets/img/products/jumbo-oats.png');
      break;

    case 'milk':
      icon = require('../../assets/img/products/milk.png');
      break;

    case 'organic meat patties':
      icon = require('../../assets/img/products/organic-meat-patties.png');
      break;

    case 'organic coffee':
      icon = require('../../assets/img/products/organic-coffee.png');
      break;

    case 'parma ham':
      icon = require('../../assets/img/products/parma-ham.png');
      break;

    case 'porridge oats':
      icon = require('../../assets/img/products/porridge-oats.png');
      break;

    case 'pumpkin seed bun':
      icon = require('../../assets/img/products/pumpkin-seed-bun.png');
      break;

    case 'red currants':
      icon = require('../../assets/img/products/red-currants.png');
      break;

    case 'rice flakes':
      icon = require('../../assets/img/products/rice-flakes.png');
      break;

    case 'sausages':
      icon = require('../../assets/img/products/sausages.png');
      break;

    case 'seedless watermelon':
      icon = require('../../assets/img/products/seedless-watermelon.png');
      break;

    case 'sesame seed bagel':
      icon = require('../../assets/img/products/sesame-seed-bagel.png');
      break;

    case 'sunflower seed loaf':
      icon = require('../../assets/img/products/sunflower-seed-loaf.png');
      break;

    case 'wholebean coffee':
      icon = require('../../assets/img/products/wholebean-coffee.png');
      break;

    default:
  }

  return icon;
};
