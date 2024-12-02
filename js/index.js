var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');
var btnAdd = document.getElementById('btnAdd');
var btnUpdate = document.getElementById('btnUpdate');
var searchInput = document.getElementById('searchInput');

var lastIndex;

var products = [

]

if (localStorage.getItem('allProducts')) {
    products = JSON.parse(localStorage.getItem('allProducts'))
    showProducts(products)
}
function addProduct() {
    var product = {
        PName: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value,
        PImage: productImage.files[0]?.name
    }
    products.push(product);
    localStorage.setItem('allProducts', JSON.stringify(products));

    clearProducts()
    showProducts(products)
}

function clearProducts() {
    productName.value = ''
    productPrice.value = ''
    productDescription.value = ''
    productCategory.value = ''
}
function showProducts(arr) {
    var cartona = ""
    for (var i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
                    <div class="product bg-light p-3 rounded ">
                        <div class="product-image">
                            <img src="./images/favicon_io/${arr[i].PImage}" alt="">
                        </div>
                        <div class="product-body">
                            <h2 class="h3">Name: <span>${arr[i].PName}</span></h2>
                            <h3 class="h4">Category: <span>${arr[i].category}</span></h3>
                            <p class="lead"><span>Description:</span>${arr[i].desc}</p>
                            <div class="product-btns">
                                <button onClick="showDataOnLabel(${i})" class="btn btn-outline-warning my-2">Update Product 🪶</button>
                                <button onClick="deleteProducts(${i})" class="btn btn-outline-danger my-2">Delete Product 🗑️</button>
                            </div>
                        </div>
                    </div>
                </div>
        
        `
    }
    document.getElementById("elementAdd").innerHTML = cartona
}

function deleteProducts(index) {
    products.splice(index, 1)
    localStorage.setItem('allProducts', JSON.stringify(products));
    showProducts(products)
}

function showDataOnLabel(index) {
    productName.value = products[index].PName;
    productPrice.value = products[index].price;
    productDescription.value = products[index].desc;
    productCategory.value = products[index].category;

    btnAdd.classList.add('d-none')
    btnUpdate.classList.remove('d-none')
}



function updateProducts() {
    products[lastIndex].PName = productName.value;
    products[lastIndex].PName = productPrice.value;
    products[lastIndex].PName = productCategory.value;
    products[lastIndex].PName = productDescription.value;
    if (productImage.files) {
        products[lastIndex].PImage = productImage.files[0]?.name;
    } else {
        products[lastIndex].PImage = product[lastIndex].PImage
    }

    localStorage.setItem('allProducts', JSON.stringify(products))
    showProducts()


    btnUpdate.classList.add('d-none')
    btnAdd.classList.remove('d-none')


}

function searchFromProducts(searchinput) {

    var result = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i].PName.includes(searchinput)) {
                result.push(products[i])

        }

    }    
    showProducts(result);

}



// var red = /^(002){0,1}01[0125][0-9]{8}$/

// function pNameInvalid(inputValue){
//     var nameValidate = /^[a-z]$/

//     if (nameValidate.test(inputValue)) {
//         console.log("hamada");
//         productName.classList.replace("is-invalid" , "is-valid");
        
//     }
//     else{
//         console.log("msh hamda");
//         productName.classList.add("is-invalid")
        
//     }
    
// }


// Regex Price
// function priceInvalid (inputValue){
//     var priceValie = /^[1-9]\d{2,5}$/

//     if (priceValie.test(inputValue)) {
//         console.log("hamada");
//         productPrice.classList.replace("is-invalid" , "is-valid");
        
//     }
//     else{
//         console.log("msh hamda");
//         productPrice.classList.add("is-invalid")
        
//     }
    
// }




function inputValidate(element){
    var inputsRegex = {
        productName: /^[A-Z][a-z]{2,6}.{2,8}$/,
        productPrice: /^[1-9]\d{2,5}$/,
        productCategory:/^(tv|mobile|screens|electronic)$/,
        productDescription:/^.{3,100}$/
    }
    if(inputsRegex[element.id].test(element.value)){
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}