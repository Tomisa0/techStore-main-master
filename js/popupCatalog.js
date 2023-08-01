function openModal(productId) {
  // Определение данных о товаре на основе productId
  var productData;

  if (productId === "product1") {
    productData = {
      name: "",
      description: ["", "", "", "", ""],
    };
  } else if (productId === "product2") {
    productData = {
      name: "",
      description: ["", "", "", "", "", ""],
    };
  }

  // Заполнение модального окна данными о товаре
  document.getElementById("product-name").textContent = productData.name;

  var descriptionElement = document.getElementById("product-description");
  descriptionElement.innerHTML = ""; // Очистка содержимого элемента

  // Добавление каждой характеристики в отдельный абзац
  for (var i = 0; i < productData.description.length; i++) {
    var p = document.createElement("p");
    p.textContent = productData.description[i];
    descriptionElement.appendChild(p);
  }

  // Открытие модального окна
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  // Закрытие модального окна
  document.getElementById("modal").style.display = "none";
}

// Обработчик события для клика вне модального окна
window.addEventListener("click", function (event) {
  var modal = document.getElementById("modal");
  if (event.target == modal) {
    closeModal();
  }
});

// Обработчик события для кнопок открытия модального окна
var openModalButtons = document.querySelectorAll(".open-modal-button");
openModalButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var productId = button.dataset.productId;
    openModal(productId);
  });
});

// Обработчик события для кнопки закрытия модального окна
var closeModalButton = document.getElementById("close-modal-button");
closeModalButton.addEventListener("click", closeModal);
