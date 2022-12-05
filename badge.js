const badge1 = document.querySelector(".badge-component")
console.log(badge1);
fetch(
    "https://e-commerce-90793-default-rtdb.firebaseio.com/cart.json"
)     
    .then((response) => response.json())
    .then((data) => {
        const output = []; 
        for(const id in data) {
            output.push(data[id]);
        }
        let num = 0
        for(let i= 0; i<output.length; i++) {
            num += Number(output[i].quantity)
        }
        badge1.textContent = num
    }
    )
