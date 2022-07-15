
const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')




const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))

let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID =>{
 transactions =transactions.filter(transaction => 
    transaction.id !== ID)
    uptadeLocalStorage()
    init()
}

const addTransactionIntoDOM = (transaction) => {
  
  const operator = transaction.amount < 0 ? '-' : '+'

  const CSSClas = transaction.amount < 0 ? 'minus': 'plus'

  const amountWithoutOperator = Math.abs(transaction.amount)

  const li = document.createElement('li')


  li.classList.add(CSSClas)
  li.innerHTML = `
  ${transaction.name} 
  <span>${operator} R$ ${amountWithoutOperator}</span>
  <button class="delete-btn" onclick = "removeTransaction(${transaction.id})">
  x
  </button>`
  transactionsUl.append(li)
  
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
  .filter(value => value < 0)
  .reduce((accumulator, value)=> accumulator + value, 0))
  .toFixed(2)

const getIncome = (transactionsAmounts) =>
  transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

const getTotal = (transactionsAmounts) =>
  transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts =transactions.map(({amount})=> amount)

  const total = getTotal(transactionsAmounts)

  const income = getIncome(transactionsAmounts)

  const expense = getExpenses(transactionsAmounts)
  
  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
  
}

const init = () => {
  transactionsUl.innerHTML = ''
 transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}
init()

const uptadeLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (TransactionName, transactionsAmounts) => {
  transactions.push( {
    id: generateID(), 
    name: TransactionName, 
    amount:Number(transactionsAmounts) 
  }
)
}

const limparInputs = () => {
  // limpa os inputs
  inputTransactionName.value = ''    
  inputTransactionAmount.value = ''
  
}

const handleFormSubmit =  event => {
// impedindo que a seja recarregada
  event.preventDefault()  
//criando duas const com os valores inseridos no input
  const TransactionName = inputTransactionName.value.trim()  
 //criando duas const com os valores inseridos no input
  const transactionsAmount = inputTransactionAmount.value.trim()  

  const isSomeInputEmpty = TransactionName === '' || transactionsAmount === ''
// verificando se alguns dos imputs nao foi preenchido e mandando uma msg na tela
  if(isSomeInputEmpty) {
    alert('Por favor, preencha tanto o nome quanto o valor!')
    return
  }
// criando a transação e adicionando ela no array de transação
  addToTransactionsArray(TransactionName, transactionsAmount)
  // invocando  a init para atualizar as transaçãoe na tela
  init() 
   // atualiza o localStorage
  uptadeLocalStorage()
  limparInputs()
  }
form.addEventListener('submit', handleFormSubmit)