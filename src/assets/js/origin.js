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

