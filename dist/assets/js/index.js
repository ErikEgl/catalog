
const ROOT_PRODUCTS = document.getElementById('products');
const ROOT_HEADER = document.getElementById('header');
const ROOT_SHOPPING = document.getElementById('shopping');
const ROOT_SPINNER = document.getElementById('spinner');
const ROOT_ERROR = document.getElementById('error');

class LocalStorageUtil {
  constructor() {
    this.keyName = 'products';
  }
  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }
  putProducts(id) {
    let products = this.getProducts();
    let pushProducts = false;
    const index = products.indexOf(id);
    if (index === -1) {
      products.push(id);
      pushProducts = true;
    } else {
      products.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(products));
    return { pushProducts, products };
  }
}

const localStorageUtil = new LocalStorageUtil();





class Header {
  handlerOpenShoppingPage() {
    shoppingPage.render();
  }
  render(count) {
    const html = `
           <div class="header-container">
                <div class="header-counter" onClick="headerPage.handlerOpenShoppingPage();">
                    Check the cart 🔥 ${count}
                </div>
           </div>
        `;

    ROOT_HEADER.innerHTML = html;
  }
}

const headerPage = new Header();


class Products {
  constructor() {
    this.classNameActive = 'products-element__btn_active';
    this.labelAdd = 'Add to cart';
    this.labelRemove = 'Remove from cart';
  }
  handleSetLocationStorage(element, id) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);
    if (pushProducts) {
      element.classList.add(this.classNameActive);
      element.innerHTML = this.labelRemove;
    } else {
      element.classList.remove(this.classNameActive);
      element.innerHTML = this.labelAdd;
    }
    headerPage.render(products.length);
  }



  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = '';
    CATALOG.forEach(({ id, name, price, img }) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = ' ' + this.classNameActive;
        activeText = this.labelRemove;
      }
      htmlCatalog += `
        <li class="products-element">
            <span class="products-element__name">${name}</span>
            <img src="${img}" alt="${name}" class="products-element__img">
            <span class="products-element__price">⚡ ${price.toLocaleString()} EUR</span>
            <button class="products-element__btn ${activeClass}" onClick="productsPage.handleSetLocationStorage(this, '${id}');">${activeText}</button>
        </li>
        `;
    });
    const html = `
        <ul class="products-container">
            ${htmlCatalog}
        </ul>
    `;
    ROOT_PRODUCTS.innerHTML = html;
  }
}
const productsPage = new Products();


class Shopping {
    handleClear() {
        ROOT_SHOPPING.innerHTML = '';
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let sumCatalog = 0;

        CATALOG.forEach(({ id, name, price }) => {
            if (productsStore.indexOf(id) !== -1) {
                htmlCatalog += `
                    <tr>
                        <td class="shopping-element__name">⚡️ ${name}</td>
                        <td class="shopping-element__price">${price.toLocaleString()} EUR</td>
                    </tr>
                `;
                sumCatalog += price;
            }
        });

        const html = `
            <div class="shopping-container">
                <div class="shopping__close" onclick="shoppingPage.handleClear();"></div>
                <table>
                    ${htmlCatalog}
                    <tr>
                        <td class="shopping-element__name">💥 Sum:</td>
                        <td class="shopping-element__price">${sumCatalog.toLocaleString()} EUR</td>
                    </tr>
                </table>
            </div>
        `;
        ROOT_SHOPPING.innerHTML = html;
    }
}

const shoppingPage = new Shopping();
  
class Spinner {
    handleClear() {
        ROOT_SPINNER.innerHTML = '';
    }

    render() {
        const html = `
            <div class="spinner-container">
                <img class="spinner__img" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
                
                </div>
        `;

        ROOT_SPINNER.innerHTML = html;
    }
}

const spinnerPage = new Spinner();

class Error {
    render(){
        const html = `
        <div class="error-container">
            <div class="error-message">
                <h2>No Acces!</h2>
                <p>Try another time</p>
            </div>
        </div>
    `;
        ROOT_ERROR.innerHTML = html;
    }
}
const errorPage = new Error();



function render() {
  const productsStore = localStorageUtil.getProducts();

  headerPage.render(productsStore.length);
  productsPage.render();
}

spinnerPage.render();
let CATALOG = [];



// http://myjson.dit.upm.es/api/bins/rhw //put that link instead assets/js/server/catalog.json' to test on real server
fetch('assets/js/server/catalog.json')
  .then(res => res.json())
  .then(body => {
    CATALOG = body;
    spinnerPage.handleClear();
    render();
  })
  .catch(error => {
    spinnerPage.handleClear();
    errorPage.render();
  });

