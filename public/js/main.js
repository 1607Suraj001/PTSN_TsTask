async function getCurrentStockLevels(){
    const skuInput = document.querySelector("#sku_input");
    let response = document.querySelector("#response");
    
    const res = await axios.get(`http://localhost:8080/calculate?sku=${skuInput.value}`).then(function (res) {
    
    response.innerHTML = "CURRENT_STOCK_LEVEL : " + JSON.stringify(res.data); 
    });
}