const productName = document.querySelector("body h4")
const productPrice = document.querySelector(".product-price")
const productDes = document.querySelector(".p-des")
const productImg = document.querySelector(".product-des img")
const products = JSON.parse(localStorage.getItem('products'))
const productID = location.hash.replace('#',"")
const addToCart = document.querySelector(".add-to-cart")

function showToastMessage(message) {
    const adminNotification = document.querySelector(".admin-notification")
    adminNotification.textContent = message;
    adminNotification.classList.toggle("active");
  
    setTimeout(() => {
      adminNotification.classList.toggle("active");
    }, 2000);
  }

const add = document.querySelector(".add-product")
const minus = document.querySelector(".minus-product")
const count = document.querySelector(".count")
    
let a = 1
    
add.addEventListener(('click'), () => {
    a++
    count.textContent = a;
})
minus.addEventListener(('click'), () => {
    if(a < 2) return
    a--
    count.textContent = a;
})
function setNewProduct(product) {
    fetch(
        "https://e-commerce-90793-default-rtdb.firebaseio.com/cart.json/",
        {
            method: "POST" ,
            body: JSON.stringify(product) ,
            headers: {
                "Content-Type" : "application/JSON",
            },
        },
    ) 
}

fetch(
    "https://e-commerce-90793-default-rtdb.firebaseio.com/products.json/"
)     
    .then((response) => response.json())
    .then((data) => {
        const output = []; 
        for(const id in data) {
            output.push(data[id]);
        }
        // load(output)
        function findProduct() {
            for(let i = 0; i < output.length; i++) {
                if(output[i].id === productID) {
                    return output[i]
                }
            }
        }
        productName.textContent = findProduct().productname
        productPrice.textContent = `Giá: ${findProduct().productprice} $`
        productDes.textContent = findProduct().description
        productImg.src = findProduct().imglink    
        addToCart.addEventListener("click", () => {
                findProduct().quantity = count.textContent
                setNewProduct(findProduct())
                showToastMessage("Thêm sản phẩm thành công")

            }
        )
    }
)

