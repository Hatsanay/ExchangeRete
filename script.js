const currency_one = document.getElementById("currency-one"); //เป็นการตั้งตัวแปลโดยอ้างอิงมาจาก id "currency-one" จาก index.html
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById("rete");
const swap = document.getElementById("btn");

currency_one.addEventListener("change", calculateMoney); // เพิ่ม vent ให้ select เมื่อเปลี่ยนแปลง ให้ทำใน function "calculateMoney"
currency_two.addEventListener("change", calculateMoney);

amount_one.addEventListener("input", calculateMoney);
amount_two.addEventListener("input", calculateMoney);

function calculateMoney() {
  const one = currency_one.value; //นำ value จาก select มาเก็บไว้ในตัวแปล one
  const two = currency_two.value;
  let apiurl = `https://api.exchangerate-api.com/v4/latest/${one}`;
  fetch(apiurl)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[two];
      rateText.innerText = `1 ${one} = ${rate} ${two}`;
      amount_two.value = (amount_one.value * rate).toFixed(2);
      console.log(data.rates[two]); //respons rates
    });
}
swap.addEventListener('click',()=>{
    const temp = currency_one.value; // ต้นทาง
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney();
});

calculateMoney();
