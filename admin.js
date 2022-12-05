const formValidate = document.querySelector(".form form")
const nameProduct = document.querySelector("#name-product")
const imgLink = document.querySelector("#img-link")
const productPrice = document.querySelector("#product-price")
const productDesc = document.querySelector("#description")
const adminNotification = document.querySelector(".admin-notification")
function showToastMessage(message) {
    const adminNotification = document.querySelector(".admin-notification")
    adminNotification.textContent = message;
    adminNotification.classList.toggle("active");
  
    setTimeout(() => {
      adminNotification.classList.toggle("active");
    }, 2000);
  }
const productNameErr = document.querySelector(".product-name-error")
const productLinkErr = document.querySelector(".product-link-error")
const productPriceErr = document.querySelector(".product-price-error")
const productDesErr = document.querySelector(".product-des-error")
function setNewProduct(product) {
    fetch(
        "https://e-commerce-90793-default-rtdb.firebaseio.com/products.json",
        {
            method: "POST" ,
            body: JSON.stringify(product) ,
            headers: {
                "Content-Type" : "application/JSON",
            },
        },
    ) 
}
formValidate.addEventListener("submit", (event) => {    
    event.preventDefault()
    const formData = [...new FormData(formValidate)]
    const  data = Object.fromEntries(formData)
    let formIsValid = true;
    if(data.productname.trim().length === 0) {
        productNameErr.textContent = "Không được để trống"
        formIsValid = false
    }
    if(data.imglink.trim().length === 0) {
        productLinkErr.textContent = "Không được để trống"
        formIsValid = false
    }
    if(!Number(data.productprice.trim()) || data.productprice.trim() == '0') {
        productPriceErr.textContent = "Không hợp lệ"
        formIsValid = false
    }
    if(data.description.trim().length === 0) {
        productDesErr.textContent = "Không được để trống"
        formIsValid = false
    }
    if(formIsValid) {
        const newID = Date.now().toString().slice(-5)
        const newProduct = {id: newID, productname: data.productname, imglink: data.imglink, productprice: data.productprice, description: data.description, quantity : 0};
        setNewProduct(newProduct)
        nameProduct.value = ''
        imgLink.value = ''
        productPrice.value = ''
        productDesc.value = ''  
        showToastMessage("thêm sản phẩm thành công")
    }        
    }
)
nameProduct.addEventListener("focus", (event) => {
    event.preventDefault();
    productNameErr.textContent = "";
})
imgLink.addEventListener("focus", (event) => {
    event.preventDefault()
    productLinkErr.textContent = ""
})
productPrice.addEventListener("focus", (event) => {
    event.preventDefault()
    productPriceErr.textContent = ""
})
productDesc.addEventListener("focus", (event) => {
    event.preventDefault()
    productDesErr.textContent = ""
})
