let titleInput = document.querySelector("#title");
let priceInput = document.querySelector("#price");
let taxesInput = document.querySelector("#taxes");
let adsInput = document.querySelector("#ads");
let discountInput = document.querySelector("#discount");
let totalElement = document.querySelector("#total");
let countInput = document.querySelector("#count");
let categoryInput = document.querySelector("#category");
let createBtn = document.querySelector(".create");
let updateProductBtn = document.querySelector(".update-product");
let searchInput = document.querySelector("#search");
let searchTitleBtn = document.querySelector("#search-title");
let searchCategoryBtn = document.querySelector("#search-category");
let deleteAllBtn = document.querySelector(".deleteAll");

let productsArr;

if (localStorage.getItem("products")) {
  productsArr = JSON.parse(localStorage.getItem("products"));
  //read the data from localStorage
  ReadProductsData();
} else {
  productsArr = [];
}

priceInput.onkeyup = function () {
  getTotal();
};
taxesInput.onkeyup = function () {
  getTotal();
};
adsInput.onkeyup = function () {
  getTotal();
};
discountInput.onkeyup = function () {
  getTotal();
};

function getTotal() {
  if (priceInput.value !== "") {
    let theResult =
      +priceInput.value +
      +taxesInput.value +
      +adsInput.value -
      +discountInput.value;
    totalElement.innerHTML = theResult;
    totalElement.style.background = "#040";
  } else {
    totalElement.innerHTML = "";
    totalElement.style.background = "#9b3030";
  }
}

createBtn.onclick = function () {
  if (
    titleInput.value !== "" &&
    priceInput.value !== "" &&
    countInput.value !== "" &&
    categoryInput.value !== ""
  ) {
    //create the products

    for (let i = 0; i < +countInput.value; i++) {
      createProduct();
    }

    showDeleteAllBtn();
    //read the products data
    ReadProductsData();

    clearData();
  } else {
    alert("Some Fields Are Required");
  }
};

function createProduct() {
  let product = {};
  // product.id=productsId;
  product.title = titleInput.value;
  product.price = priceInput.value;
  product.taxes = taxes.value;
  product.ads = ads.value;
  product.discount = discountInput.value;
  product.total = parseInt(totalElement.innerHTML);
  product.count = +countInput.value;
  product.category = categoryInput.value;
  productsArr.push(product);
  localStorage.setItem("products", JSON.stringify(productsArr));
}

function ReadProductsData() {
  let tableBody = document.querySelector("#tbody");
  tableBody.innerHTML = "";
  for (let index = 0; index < productsArr.length; index++) {
    let tableRow = document.createElement("tr");
    let tdID = document.createElement("td");
    tdID.append(document.createTextNode(index));
    tableRow.append(tdID);

    let productKeys = Object.keys(productsArr[index]);

    for (let i = 0; i < productKeys.length; i++) {
      if (productKeys[i] === "count") {
        continue;
      } else {
        //create Table Data
        let tableData = document.createElement("td");
        tableData.append(
          document.createTextNode(productsArr[index][productKeys[i]])
        );

        //append the table data in table row
        tableRow.append(tableData);
      }
    }

    //create Update Button
    let updateBtn = document.createElement("button");
    updateBtn.id = "update";
    updateBtn.append("Update");

    //create Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "delete";
    deleteBtn.append("Delete");
    //create Table Data For Update Btn
    let tdUpdateBtn = document.createElement("td");

    //append the update Button into the tdUpdate
    tdUpdateBtn.append(updateBtn);
    //create Table Data For Delete Btn
    let tdDeleteBtn = document.createElement("td");
    //append the Delete Button into the tdDelete
    tdDeleteBtn.append(deleteBtn);

    // append tdDelete and tdUpdate Into Table Row
    tableRow.append(tdUpdateBtn);
    tableRow.append(tdDeleteBtn);

    //append the table Row Into Table Body
    tableBody.append(tableRow);
  }
}

function clearData() {
  let allInputs = document.querySelectorAll("input");

  console.log(allInputs);
  allInputs.forEach((input) => (input.value = ""));
  totalElement.innerHTML = "";
  totalElement.style.background = "#9b3030";
}

document.addEventListener("click", function (event) {
  if (event.target.id === "delete") {
    //mean this delete btn
    //the product id
    let productId = parseInt(
      event.target.parentElement.parentElement.firstChild.innerHTML
    );

    //renove the product from the Array
    productsArr.splice(productId, 1);
    //update the localStorage with new array
    localStorage.setItem("products", JSON.stringify(productsArr));
    showDeleteAllBtn();
    //remove table row
    event.target.parentElement.parentElement.remove();
    ReadProductsData();
  }
});

document.addEventListener("click", function (event) {
  if (event.target.id === "update") {
    //mean this delete btn
    //the product id
    let index = parseInt(
      event.target.parentElement.parentElement.firstChild.innerHTML
    );

    //renove the product from the Array
    titleInput.value = productsArr[index].title;
    priceInput.value = productsArr[index].price;
    taxesInput.value = productsArr[index].taxes;
    adsInput.value = productsArr[index].ads;
    discountInput.value = productsArr[index].discount;
    countInput.value = productsArr[index].count;
    categoryInput.value = productsArr[index].category;
  }
});

//--------------------------------------

document.addEventListener("click", function (event) {
  if (event.target.id === "update") {
    //mean this delete btn
    //the product id
    let index = parseInt(
      event.target.parentElement.parentElement.firstChild.innerHTML
    );

    //renove the product from the Array
    titleInput.value = productsArr[index].title;
    priceInput.value = productsArr[index].price;
    taxesInput.value = productsArr[index].taxes;
    adsInput.value = productsArr[index].ads;
    discountInput.value = productsArr[index].discount;
    // totalElement.innerHTML=productsArr[index].total;
    getTotal();
    countInput.value = productsArr[index].count;
    categoryInput.value = productsArr[index].category;

    createBtn.classList.remove("active");
    updateProductBtn.classList.add("active");
    updateProductBtn.onclick = function () {
      //update the product details
      productsArr[index].title = titleInput.value;
      productsArr[index].price = priceInput.value;
      productsArr[index].taxes = taxesInput.value;
      productsArr[index].ads = adsInput.value;
      productsArr[index].discount = discountInput.value;
      productsArr[index].count = +countInput.value;
      productsArr[index].category = categoryInput.value;
      productsArr[index].total = +totalElement.innerHTML;

      localStorage.setItem("products", JSON.stringify(productsArr));
      ReadProductsData();

      createBtn.classList.add("active");
      updateProductBtn.classList.remove("active");
      clearData();
    };
  }
});

// let searchTitleBtn=document.querySelector("#search-title");
// let searchCategoryBtn=document.querySelector("#search-category");

let searchBy = "title";
searchTitleBtn.onclick = function () {
  searchInput.focus();
  searchBy = "title";
  searchInput.placeholder = "search by title";
};
searchCategoryBtn.onclick = function () {
  searchInput.focus();
  searchBy = "category";
  searchInput.placeholder = "search by category";
};

searchInput.onkeyup = function () {
  searchMethod(searchInput.value);
};
function searchMethod(search_value) {
  let tableBody = document.querySelector("#tbody");
  tableBody.innerHTML = "";
  //this mean search by title
  if (searchBy === "title") {
    //    let filteredArr= productsArr.filter(product=>product.title.includes(search_value));

    for (let i = 0; i < productsArr.length; i++) {
      if (productsArr[i].title.includes(search_value)) {
        showProductDetails(i);
      }
    }
  }
  //this mean search by category
  else {
    for (let i = 0; i < productsArr.length; i++) {
      if (productsArr[i].category.includes(search_value)) {
        showProductDetails(i);
      }
    }
  }
}

let x = 20;
function showProductDetails(index) {
  let tableBody = document.querySelector("#tbody");

  let tableRow = document.createElement("tr");
  let tdID = document.createElement("td");
  tdID.append(document.createTextNode(index));
  tableRow.append(tdID);

  let productKeys = Object.keys(productsArr[index]);

  for (let i = 0; i < productKeys.length; i++) {
    if (productKeys[i] === "count") {
      continue;
    } else {
      //create Table Data
      let tableData = document.createElement("td");
      tableData.append(
        document.createTextNode(productsArr[index][productKeys[i]])
      );

      //append the table data in table row
      tableRow.append(tableData);
    }
  }

  //create Update Button
  let updateBtn = document.createElement("button");
  updateBtn.id = "update";
  updateBtn.append("Update");

  //create Delete Button
  let deleteBtn = document.createElement("button");
  deleteBtn.id = "delete";
  deleteBtn.append("Delete");
  //create Table Data For Update Btn
  let tdUpdateBtn = document.createElement("td");

  //append the update Button into the tdUpdate
  tdUpdateBtn.append(updateBtn);
  //create Table Data For Delete Btn
  let tdDeleteBtn = document.createElement("td");
  //append the Delete Button into the tdDelete
  tdDeleteBtn.append(deleteBtn);

  // append tdDelete and tdUpdate Into Table Row
  tableRow.append(tdUpdateBtn);
  tableRow.append(tdDeleteBtn);

  //append the table Row Into Table Body
  tableBody.append(tableRow);
}

showDeleteAllBtn();
function showDeleteAllBtn() {
  if (productsArr.length > 0) {
    //show the btn
    deleteAllBtn.classList.add("active");
  } else {
    //hide the btn
    deleteAllBtn.classList.remove("active");
  }
}

deleteAllBtn.onclick = function () {
  productsArr = [];
  localStorage.setItem("products", JSON.stringify(productsArr));
  let tableBody = document.querySelector("#tbody");
  tableBody.innerHTML = "";
  showDeleteAllBtn();
};
