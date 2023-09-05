import { PRODUCTS } from "./PRODUCTS";

renderProducts(PRODUCTS);

selectProducts();

clearFilters();
renderHeader();
applyFilters();

function renderHeader() {
  const upperHeader$$ = document.querySelector(".upperheader");
  const headerTitle$$ = document.createElement("h1");
  headerTitle$$.innerHTML = `Vertical Shop 🧗`;
  upperHeader$$?.appendChild(headerTitle$$);
  const downHeader$$ = document.querySelector(".downheader");
  const nav$$ = document.createElement("nav");
  nav$$.classList = "nav";
  nav$$.innerHTML = `
    <a href="#">Home</li>
    <a href="#">Products</li>
    <a href="#">Spots</li>
`;
  downHeader$$.appendChild(nav$$);
}

function renderProducts(products) {
  const productsContainer$$ = document.querySelector(".products-container");
  let productsTemplate = "";

  products.forEach((product) => {
    productsTemplate += getProductsTemplate(product);
  });

  productsContainer$$.innerHTML = productsTemplate;
}
function getProductsTemplate(product) {
  return `
    <div class="single-product">
      <div class="img-container">
        <img class="frontImg" src="${product.images.frontImg}" alt="${product.name}" />
        <img class="backImg" src="${product.images.backImg}" alt="${product.name}" />
      </div>
      <h3 class="name">${product.name}</h3>
      <h4 class="price">${product.price} €</h4>
    </div>
    `;
}

function selectProducts() {
  const select$$ = document.querySelector("#brand-filter");
  let selectTemplate = `
  <option value="All">All</option>
  `;
  let sellers = [];
  PRODUCTS.forEach((product) => {
    if (!sellers.includes(product.seller)) {
      sellers.push(product.seller);
      selectTemplate += `
      <option value="${product.seller}">${product.seller}</option>`;
    }
  });
  select$$.innerHTML = selectTemplate;
}

function applyFilters() {
  const select$$ = document.querySelector("#brand-filter");
  const input$$ = document.querySelector("#price-filter");
  const button$$ = document.querySelector("#price-button");
  const noProductsMessage = document.querySelector("#no-products-message");

  select$$.addEventListener("change", (e) => {
    const selectedSeller = e.target.value;
    let filteredProducts = PRODUCTS;
    if (selectedSeller !== "All") {
      filteredProducts = PRODUCTS.filter(
        (product) => product.seller === selectedSeller
      );
    }
    const priceValue = input$$.value;
    if (priceValue > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= priceValue
      );
    }

    if (filteredProducts.length === 0) {
      noProductsMessage.style.display = "block";
    } else {
      noProductsMessage.style.display = "none";
    }
    renderProducts(filteredProducts);
  });

  button$$.addEventListener("click", (e) => {
    const select$$ = document.querySelector("#brand-filter");
    let filteredProducts = PRODUCTS;

    e.preventDefault();
    const priceValue = input$$.value;
    const sellerValue = select$$.value;

    if (priceValue || sellerValue) {
      filteredProducts = PRODUCTS.filter(
        (product) =>
          product.price <= priceValue && product.seller === select$$.value
      );
    }
    if (sellerValue === "All" && priceValue) {
      filteredProducts = PRODUCTS.filter(
        (product) => product.price <= priceValue
      );
    }

    if (filteredProducts.length === 0) {
      noProductsMessage.style.display = "block";
    } else {
      noProductsMessage.style.display = "none";
    }

    renderProducts(filteredProducts);
  });
}

function clearFilters() {
  const noProductsMessage = document.querySelector("#no-products-message");
  noProductsMessage.style.display = "none";

  const clearButton$$ = document.querySelector("#clear");
  clearButton$$.addEventListener("click", (e) => {
    const select$$ = document.querySelector("#brand-filter");
    select$$.value = "All";

    const input$$ = document.querySelector("#price-filter");
    input$$.value = "";

    renderProducts(PRODUCTS);
  });
}
