function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() ) // aqui abaixo é a forma convencional de uma função anônima de
                               // retorno ==========>  .then( (res) => { return res.json() })
    .then( states => {
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } //ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
          // ====>  esta forma comentada é a convencional; a aplicada acima é a resumida!!!!
    })
}

populateUF()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")  // <=== forma resumida  -- ("select[name=city]") <=== forma convencional
    const stateInput = document.querySelector("[name=state]")  // <=== forma resumida  -- ("input[name=state]") <=== forma convencional

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) // aqui abaixo é a forma convencional de uma função anônima de
                               // retorno ==========>  .then( (res) => { return res.json() })
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } //citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.id}">${city.nome}</option>`
          // ====>  esta forma comentada é a convencional; a aplicada acima é a resumida!!!!
        
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Ítens de Coleta
//      pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com Javascript, 
    //   melhor usar "toggle" em vez de "add ou remove"
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // ==> verificar se existe itens selecionados, e se sim pegar os ítens selecionados
    const alreadySelected = selectedItems.findIndex( item => {  // forma convencional ===> ( function(item) {
        const itemFound = item == itemId                         // forma resumida, usando "arrow function" ===> ( (item) => {
        return itemFound                                          // e caso um só argumento, não precisa de () ===> ( item => {
    })  // a "const itemFound" acima: será true ou false!!!

    // ==> se selecionado
    if( alreadySelected >= 0 ) {
        // ==> tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
        // ==> se não selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // ==> por fim, atualizar o campo escondido com os ítens selecionados...
    collectedItems.value = selectedItems
}