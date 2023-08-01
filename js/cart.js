document.addEventListener("DOMContentLoaded", () => {
  //   const btn_render = document.querySelector(".render");
  const cartBlock = document.querySelector(".shopping-cart");
  function renderCart() {
    cartBlock.innerHTML = "";
    const techStore = JSON.parse(localStorage.getItem("tech_store"));
    if (techStore.length > 0) {
      techStore.forEach((element) => {
        console.log(element);
        const count = element.count;
        const imgSrc = element.imgSrc;
        const price = element.price;
        const productName = element.productName;
        const cartItem = document.createElement("div");
        console.log(count, "count");
        cartItem.classList.add("shopping-cart__item");

        cartItem.innerHTML = `  
                                      <div class="shopping-cart__item_preview">
                                          <img src=${imgSrc} alt="" />
                                      </div>
                                      <div class="shopping-cart__text">
                                          <p data-name='${productName}'>Наименование: <span class='bold'> ${productName}</span> </p>
                                          <p>Цена: <span class="bold">${price}₸</span></p>
                                      </div>
                                      <div class="counter-wrapper">
                                        <button class="trash-basket"><img src = 'img/trash.svg' class="trash-basket"></button> 
                                          <button class='decreaser'>-</button>
                                          <button class="counter">${count}</button>
                                          <button class='increaser'>+</button>
                                      </div>
                                   `;
        cartBlock.appendChild(cartItem);
      });

      const sumPriceDiv = document.createElement("div");
      const sumPriceValue = techStore.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
      sumPriceDiv.innerHTML = `<h3>Итого:  ${sumPriceValue}₸</h3>`;
      console.log("sumPriceValue", sumPriceValue);
      cartBlock.appendChild(sumPriceDiv);
    } else {
      const cartItem = document.createElement("div");
      cartItem.innerHTML = "<h1>Корзина пустая</h1>";
      cartBlock.appendChild(cartItem);
    }
  }

  cartBlock.addEventListener("click", (e) => {
    console.log(e.target, "e.target");
    const targetClass = e.target.classList;

    if (
      targetClass.contains("decreaser") ||
      targetClass.contains("increaser") ||
      targetClass.contains("trash-basket")
    ) {
      const parentDiv = e.target.closest(".shopping-cart__item");
      const productName = parentDiv.querySelector("[data-name]").dataset.name;

      const parsed = JSON.parse(localStorage.getItem("tech_store"));
      const findElement = parsed.findIndex(
        (elem) => elem.productName === productName
      );
      console.log(findElement);
      console.log(parsed[findElement]);
      if (targetClass.contains("increaser")) {
        console.log(findElement);
        parsed[findElement].count = parsed[findElement].count + 1;
        localStorage.setItem("tech_store", JSON.stringify(parsed));
      }
      if (targetClass.contains("decreaser") && parsed[findElement].count > 1) {
        console.log(findElement);
        parsed[findElement].count = parsed[findElement].count - 1;
        localStorage.setItem("tech_store", JSON.stringify(parsed));
      }
      if (targetClass.contains("trash-basket")) {
        console.log(findElement);
        const newParsed = [
          ...parsed.slice(0, findElement),
          ...parsed.slice(findElement + 1),
        ];
        localStorage.setItem("tech_store", JSON.stringify(newParsed));
        console.log(parsed, "newParse");
      }

      //   localStorage.setItem("tech_store", JSON.stringify(parsed));
      renderCart();
    }
  });

  renderCart();

  console.log(cartBlock);
});
