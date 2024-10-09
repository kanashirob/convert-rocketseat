import { GetRates } from "./api.js";


// Obtendo os elementos do formulário.
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const footer = document.querySelector('main footer');
const description = document.getElementById('description');
const result = document.getElementById('result');

// Variáveis para salvar cotação de moedas do dia.
let USD, EUR, GBP;

// Requisição das cotações
GetRates().then (rates =>{
    USD = rates.USD;
    EUR = rates.EUR;
    GBP = rates.GBP;
})
// Manipulando o input amount para receber somente números.
amount.addEventListener('input', () => {
    const hasCharacterRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharacterRegex, '');
})

// Capturando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
    event.preventDefault();
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, 'US$');
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, '€');
            break;
        case 'GBP':
            convertCurrency(amount.value, GBP, '£');
            break;


    }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {

        // Exibindo cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
        let total = amount*price;
        total = formatCurrencyBRL(total).replace('R$','');
        result.textContent = `${total} Reais`
        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result");
    } catch (error) {
        console.log(error)
        // Remove a classe que exibe o footer para ocultar o resultado
        footer.classList.remove("show-result");
        alert('Não foi possível converter. Tente novamente mais tarde!')
    }
}
// Formata moeda em Real Brasileiro
function formatCurrencyBRL(value){
    return Number(value).toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL",
    })
}

