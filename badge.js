const badge1 = document.querySelector(".badge-component")
console.log(badge1);
const oldListJson = localStorage.getItem('cart');
const existingList = JSON.parse(oldListJson)
let num = 0
for(let i = 0; i < existingList.length; i++) {
    num += Number(existingList[i].quantity)
}
badge1.textContent = num