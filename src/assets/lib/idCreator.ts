let payId: number = parseInt(window.localStorage.getItem('_MaxPayId') || '15')
let incomeId: number = parseInt(window.localStorage.getItem('_MaxIncomeId') || '2')

function createPayId() {
    payId++
    window.localStorage.setItem('_MaxPayId', payId.toString())
    return payId
}

function createIncomeId() {
    incomeId++
    window.localStorage.setItem('_MaxIncomeId', incomeId.toString())
    return incomeId
}


export {createPayId,createIncomeId}