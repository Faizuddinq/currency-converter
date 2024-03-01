const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption); 
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    // console.log(fromCurr.value, toCurr.value);
    msg.innerText = "Getting Exchange Rate...";
    const URL =`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = amtval*rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
}
const updateFlag = (element)=>{
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};
const swapIcon =  () => {
    let tempCode=fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
    // const fromDiv = document.querySelector('.from');
    // const toDiv = document.querySelector('.to');
    // const temp = document.createElement('div');
    // Swap the positions of "to" and "from" divs
    // fromDiv.parentNode.insertBefore(temp, fromDiv);
    // toDiv.parentNode.insertBefore(fromDiv, toDiv.nextSibling);
    // temp.parentNode.insertBefore(toDiv, temp);
    // temp.parentNode.removeChild(temp);

};
  
  // Event listener for the swap icon
const swapicon = document.getElementById('swapicon');
swapicon.addEventListener('click', () => {
    swapIcon();
  });
btn.addEventListener("click", (evt)=>{
        evt.preventDefault();
        updateExchangeRate()
});
window.addEventListener("load", ()=>{
    updateExchangeRate();
});
