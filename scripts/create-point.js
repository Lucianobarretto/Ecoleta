function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
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

    fetch(url)
    .then( res => res.json() ) // aqui abaixo é a forma convencional de uma função anônima de
                               // retorno ==========>  .then( (res) => { return res.json() })
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        } //citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.id}">${city.nome}</option>`
          // ====>  esta forma comentada é a convencional; a aplicada acima é a resumida!!!!
        
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)