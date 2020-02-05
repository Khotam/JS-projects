document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cartBtn = document.getElementById('cart');
  const cart = document.querySelector('.cart');
  const category = document.querySelector('.category');
  const searchForm = document.querySelector('.search');
  const searchInput = document.querySelector('#searchGoods');
  const goodsWrapper = document.querySelector('.goods-wrapper');
  const cartsWrapper = document.querySelector('.cart-wrapper');
  const wishlistCounter = document.querySelectorAll('.counter')[1];
  const cartsCounter = document.querySelector('.counter');
  const sumOfCarts = document.querySelector('.sum');

  const wishlist =
    JSON.parse(localStorage.getItem('wishlist')) === null
      ? []
      : JSON.parse(localStorage.getItem('wishlist'));

  const cartList =
    JSON.parse(localStorage.getItem('cart')) === null
      ? {}
      : JSON.parse(localStorage.getItem('cart'));

  let sum =
    JSON.parse(localStorage.getItem('sum')) === null ? 0 : JSON.parse(localStorage.getItem('sum'));

  // Store
  const store = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const storeCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartList));
  };

  //   Functions

  // Create card goods
  const createCardGoods = (id, title, price, img) => {
    const card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = `<div class="card">
    <div class="card-img-wrapper">
      <img class="card-img-top" src="${img}" alt="" />
      <button class="card-add-wishlist 
      ${wishlist.includes(id) ? 'active' : ''}" data-goods-id="${id}"></button>
    </div>
    <div class="card-body justify-content-between">
      <a href="#" class="card-title">${title}</a>
      <div class="card-price">${price} ₽</div>
      <div>
        <button class="card-add-cart " data-goods-id="${id}" data-price="${price}">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>`;
    return card;
  };

  // Loading
  const loading = () => {
    goodsWrapper.innerHTML = `<div id="spinner"><div class="spinner-loading"><div><div><div></div>
    </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>`;
  };

  // Render Cards
  const renderGoods = goods => {
    goodsWrapper.textContent = '';
    if (goods.length !== 0) {
      goods.forEach(({ id, title, price, imgMin }) =>
        goodsWrapper.appendChild(createCardGoods(id, title, price, imgMin))
      );
    } else {
      goodsWrapper.textContent = '❌ Not Found';
    }
  };

  // Accessing the database and getting the data
  const getGoods = (filter, render) => {
    // loading();
    fetch('./db/db.json')
      .then(response => response.json())
      .then(filter)
      .then(render)
      .catch(err => console.log(err));
  };

  const randomSort = goods => goods.sort(() => Math.random() - 0.5);

  // Filtering Goods by category
  const filterGoods = e => {
    e.preventDefault();
    const target = e.target.dataset.category;

    if (e.target.classList.contains('category-item')) {
      getGoods(goods => goods.filter(good => good.category.includes(target)), renderGoods);
    }
  };

  // Cart
  function openCart(e) {
    e.preventDefault();
    cart.style.display = 'flex';
  }

  function closeCart(e) {
    const target = e.target;
    if (e.keyCode === 27 || e.which === 27) {
      cart.style.display = '';
    }
    if (target === cart || e.target.classList.contains('cart-close')) {
      cart.style.display = '';
    }
    if (target.classList.contains('goods-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }
    if (target.classList.contains('goods-delete')) {
      deleteCart(target.dataset.goodsId, target);
    }
  }

  // Search function
  const searchGoods = e => {
    e.preventDefault();
    const inputValue = searchInput.value.trim();
    // console.log(inputValue);
    if (inputValue !== '') {
      const inputString = new RegExp(inputValue, 'i');
      getGoods(goods => goods.filter(good => inputString.test(good.title)), renderGoods);
    } else {
      searchForm.classList.add('error');
    }

    searchInput.value = '';
  };

  // Counter
  const count = () => (wishlistCounter.textContent = wishlist.length);
  const countCarts = () => (cartsCounter.textContent = Object.keys(cartList).length);

  // Handler Goods
  const handlerGoods = e => {
    const { target } = e;

    if (target.classList.contains('card-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }
    if (target.classList.contains('card-add-cart')) {
      addCart(target.dataset.goodsId, target);
    }
  };

  // Toogle Wishlist
  const toggleWishlist = (id, elem) => {
    if (wishlist.includes(id)) {
      wishlist.splice(wishlist.indexOf(id), 1);
      store();
      elem.classList.remove('active');
      // console.log(wishlist);
    } else {
      wishlist.push(id);
      store();
      elem.classList.add('active');
      // console.log(wishlist);
    }
    count();
  };

  // Add Cart
  const addCart = (id, elem) => {
    if (cartList.hasOwnProperty(id)) {
      cartList[id] += 1;
      storeCart();
    } else {
      cartList[id] = 1;
      storeCart();
    }
    countCarts();
    countSum(elem);
  };

  // Render carts

  // Filter Carts
  const filterCarts = goods => {
    // console.log(cartList);
    return goods.filter(({ id }) => cartList.hasOwnProperty(parseFloat(id)));
  };

  // Create Cart Goods
  const createCartGoods = (id, title, price, img) => {
    const cart = document.createElement('div');
    cart.className = 'goods';
    cart.innerHTML = `<div class="goods-img-wrapper">
                        <img class="goods-img" src="${img}" alt="" />
                      </div>
                      <div class="goods-description">
                        <h2 class="goods-title">${title}</h2>
                        <p class="goods-price">${price} ₽</p>
                      </div>
                      <div class="goods-price-count">
                        <div class="goods-trigger">
                          <button class="goods-add-wishlist ${
                            wishlist.includes(id) ? 'active' : ''
                          }" data-goods-id='${id}'></button>
                          <button class="goods-delete" data-price="${price}" data-goods-id='${id}'></button>
                        </div>
                        <div class="goods-count">${cartList[id]}</div>
                      </div>`;
    return cart;
  };

  // Render Carts
  const renderCartGoods = goods => {
    cartsWrapper.textContent = '';
    if (goods.length > 0) {
      goods.forEach(({ id, title, price, imgMin }) =>
        cartsWrapper.appendChild(createCartGoods(id, title, price, imgMin))
      );
    } else {
      cartsWrapper.innerHTML = `<div id="cart-empty">
                                    Ваша корзина пока пуста
                                  </div>`;
    }
  };

  const renderCarts = () => {
    getGoods(filterCarts, renderCartGoods);
    getGoods();
  };

  renderCarts();

  // Delete Cart
  const deleteCart = (id, elem) => {
    countSum(elem);
    delete cartList[id];
    storeCart();
    countCarts();
    renderCarts();
  };

  // Count Sum of the Price of Carts
  const countSum = elem => {
    console.log(elem);
    if (elem.classList.contains('card-add-cart')) {
      sum += parseFloat(elem.dataset.price);
      localStorage.setItem('sum', JSON.stringify(sum));
      sumOfCarts.textContent = Math.round(sum);
    }
    if (elem.classList.contains('goods-delete')) {
      // let values = Object.values(cartList);
      // console.log(values);
      // console.log(cartList[elem.dataset.goodsId]);
      sum -= parseFloat(elem.dataset.price) * cartList[elem.dataset.goodsId];
      localStorage.setItem('sum', JSON.stringify(sum));
      sumOfCarts.textContent = Math.round(sum);
    }
  };

  //   Event Listeners

  cartBtn.addEventListener('click', openCart);
  cartBtn.addEventListener('click', renderCarts);
  cart.addEventListener('click', closeCart);

  document.addEventListener('keydown', closeCart);

  category.addEventListener('click', filterGoods);

  searchForm.addEventListener('submit', searchGoods);
  searchForm.addEventListener('animationend', () => {
    searchForm.classList.remove('error');
  });

  goodsWrapper.addEventListener('click', handlerGoods);

  sumOfCarts.textContent = Math.round(sum);
  count();
  countCarts();
  getGoods(randomSort, renderGoods);

  //
  //
  //
});
