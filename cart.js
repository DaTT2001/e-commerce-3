const ul = document.querySelector(".buy-list")
const ul2 = document.querySelector(".list-buy-product")
const product = JSON.parse(localStorage.getItem('cart'))
const totalPrice = document.querySelector(".total-price")
const badge = document.querySelector(".badge-component")
fetch(
    "https://e-commerce-90793-default-rtdb.firebaseio.com/cart.json"
)     
    .then((response) => response.json())
    .then((data) => {
        const output = []; 
        for(const id in data) {
            output.push(data[id]);
        }
        load(output)
        load2(output)
        // updateProductList(output, load)
        const remove = document.querySelectorAll('.buy-list li i')
            for(let i = 0; i < remove.length; i++) {
                remove[i].addEventListener("click", () => {
                    const cf = confirm("bạn có chắc chắn muốn xoá")
                    if(cf) {
                            output.splice(i,1)
                            console.log(output);
                            updateProductList(output,load)
                        }
                    else {
                        return
                    }
                    }
                )
            }
    }
)
function updateProductList(products, handler) {
    fetch("https://e-commerce-90793-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        handler(products);
        location.reload();
      })
      .catch((err) => console.log(err));
  }
function load(arr) {
    ul.innerHTML = ''
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i]
        ul.innerHTML += `
        <li>
        <img src="${arr[i].imglink}" alt="" width="220px" height="220px">
        <div>
            <p>Sản phẩm: ${arr[i].productname}</p>
            <br>
            <span style="display: inline-block; margin-top: 20px; margin-bottom: 30px;">Giá: </span><span class="p-price">${arr[i].productprice}</span>
            <br>
            <span>Số lượng: </span> <span class="quantity">${arr[i].quantity}</span>
        
        </div>
        <i class="fa-regular fa-circle-xmark"></i>    
        </li> 
        `
    }
}
function load2(arr) {
    let total = 0
    ul2.innerHTML = ''
    for(let i = 0; i < arr.length; i++) {
        ul2.innerHTML += `
            <li>
            <p>-${arr[i].productname} (SL: ${arr[i].quantity})</p>
            <p>x${arr[i].productprice}$</p>
        </li>
        `
        total += arr[i].quantity * arr[i].productprice

    }
    totalPrice.textContent = `${total} $`
}
