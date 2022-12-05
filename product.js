const body = document.querySelector('body')
const modalYes = document.querySelector('.btn-yes')
const modalNo = document.querySelector('.btn-no')
const modal = document.querySelector('.modal-container')
const ul = document.querySelector('.product ul')
const add = document.querySelectorAll('.add')
const minus = document.querySelectorAll('.minus')
const count = document.querySelectorAll('.count-product')
function updateProductList(products, handler) {
    fetch("https://e-commerce-90793-default-rtdb.firebaseio.com/products.json", {
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
  
    

    //   .then(() => {
    //     handler(products);
    //   })
    //   .catch((err) => console.log(err));
fetch(
    "https://e-commerce-90793-default-rtdb.firebaseio.com/products.json"
)     
    .then((response) => response.json())
    .then((data) => {
        const output = []; 
        for(const id in data) {
            output.push(data[id]);
        }
        load(output)
        if(output.length === 0) {
            ul.innerHTML = '<p>Danh sách sản phẩm trống, hãy thêm nó trong phần Admin</p>'
        }
        else {
            const remove = document.querySelectorAll('.button-remove') 
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
    }
)
function load(arr) {
    ul.innerHTML = ''
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i]
        ul.innerHTML += `
        <li> 
        <img src="${arr[i].imglink}">
        <a href="./product-info.html#${arr[i].id}"><h5>Name: ${arr[i].productname}</h5></a>
        <p>Price: ${arr[i].productprice} $</p>

        </div>
        <button type="Submit" class="button-buy"><a href="./product-info.html#${arr[i].id}">Details</a></button>

        <button type="Submit" class="button-remove">Remove</button>
        
        </li>
        `
    }
    // location.reload()
}
