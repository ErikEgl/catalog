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

