// button isLoading change

const btn = document.querySelector('.btn')
const submit = () => {
  btn.classList.toggle('btn--loading')
  btn.setAttribute('disabled', 'disabled')
  setTimeout(() => {
    alert(
      `Стоимость автомобиля: ${currentPrice} Первоначальный взнос: ${currentInitPay} Срок: ${currentTime}`
    )
    btn.classList.toggle('btn--loading')
    btn.removeAttribute('disabled')
  }, 2000)
}

// helpers

const decorator = value =>
  value
    .toString()
    .split('')
    .filter(c => c !== ' ' && c.charCodeAt() > 47 && c.charCodeAt() < 58)
    .reverse()
    .reduce((acc, e, i) => (acc += (i >= 3 && i % 3 === 0 ? ' ' : '') + e), '')
    .split('')
    .reverse()
    .join('')

const clearDec = value =>
  +value
    .toString()
    .split('')
    .filter(c => c !== ' ')
    .join('')

// values

const maxPrice = 20000000
const minPrice = 500000
let currentPrice = 1500000

const maxInitPercent = 0.8
let maxInitPay = currentPrice * maxInitPercent
const minInitPay = 0
let currentInitPay = 150000

let maxTime = 60
let currentTime = 24

const creditPercent = 1.25

//final result

const resultTotal = document.getElementById('result-total')
const resultPay = document.getElementById('result-pay')

const result = () => {
  let totalCount = Math.ceil(
    (clearDec(price.value) - clearDec(initPay.value)) * creditPercent
    // +((creditPercent * currentTime) / 12).toFixed(2)
  )
  resultTotal.innerHTML = decorator(totalCount) + ' ₽'
  resultPay.innerHTML =
    decorator(Math.ceil(totalCount / timeValue.value)) + ' ₽'
}

// price

const price = document.getElementById('price-value')
const range = document.getElementById('price-range')

price.value = decorator(currentPrice)
range.value = Math.abs((currentPrice / maxPrice) * 100)
range.style.backgroundSize = range.value + '% 100%'

const handleRange = e => {
  e.target.value < 3
    ? (currentPrice = minPrice)
    : (currentPrice = Math.abs((maxPrice / 100) * e.target.value))
  price.value = decorator(currentPrice)
  initPayPercent.value =
    ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
  e.target.style.backgroundSize = e.target.value + '% 100%'
  maxInitPay = currentPrice * maxInitPercent

  currentInitPay = clearDec(initPay.value)
  if ((currentInitPay / currentPrice) * 100 >= 80) {
    initPay.value = decorator(currentPrice * 0.8)
    initPayPercent.value =
      ((clearDec(initPay.value) / currentPrice) * 100).toFixed(2) + '%'
  }

  rangeInitPay.value = Math.abs(
    (currentInitPay / (maxInitPay - minInitPay)) * 100
  ).toString()
  rangeInitPay.style.backgroundSize = rangeInitPay.value + '% 100%'

  result()
}

range.addEventListener('input', handleRange)

const handlePrice = () => {
  price.value = decorator(price.value)
  currentPrice = clearDec(price.value)
  range.value = Math.abs(
    (currentPrice / (maxPrice - minPrice)) * 100
  ).toString()
  range.style.backgroundSize = range.value + '% 100%'
  initPayPercent.value =
    ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
}

const handlePriceFormat = () => {
  currentPrice = clearDec(price.value)
  if (currentPrice < minPrice) {
    price.value = minPrice
    currentPrice = minPrice
  }
  if (currentPrice > maxPrice) {
    price.value = maxPrice
    currentPrice = maxPrice
    maxInitPay = currentPrice * maxInitPercent
  }
  if ((currentInitPay / currentPrice) * 100 >= 80) {
    initPay.value = decorator(currentPrice * 0.8)
    currentInitPay = currentPrice * 0.8
    initPayPercent.value =
      ((clearDec(initPay.value) / currentPrice) * 100).toFixed(2) + '%'
  }
  maxInitPay = currentPrice * maxInitPercent
  price.value = decorator(price.value)
  initPayPercent.value =
    ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
  result()
}

price.addEventListener('input', handlePrice)
price.addEventListener('focusout', handlePriceFormat)

// initial pay

const initPay = document.getElementById('initPay-value')
const rangeInitPay = document.getElementById('initPay-range')
const initPayPercent = document.getElementById('initPayPercent-value')

initPayPercent.value = ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
initPay.value = decorator(currentInitPay)
rangeInitPay.value = Math.abs((currentInitPay / maxInitPay) * 100)
rangeInitPay.style.backgroundSize = rangeInitPay.value + '% 100%'

const handleRangeInitPay = e => {
  e.target.value < 3
    ? (currentInitPay = minInitPay)
    : (currentInitPay = Math.abs((maxInitPay / 100) * e.target.value))
  initPay.value = decorator(currentInitPay)
  e.target.style.backgroundSize = e.target.value + '% 100%'
  initPayPercent.value =
    ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
  result()
}

rangeInitPay.addEventListener('input', handleRangeInitPay)

const handleInitPay = () => {
  initPay.value = decorator(initPay.value)
  currentInitPay = clearDec(initPay.value)
  rangeInitPay.value = Math.abs(
    (currentInitPay / (maxInitPay - minInitPay)) * 100
  ).toString()
  rangeInitPay.style.backgroundSize = rangeInitPay.value + '% 100%'
  initPayPercent.value =
    ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
}

const handleInitPayFormat = () => {
  currentInitPay = clearDec(initPay.value)
  if (currentInitPay < minInitPay) {
    initPay.value = minInitPay
  }
  if (currentInitPay > maxInitPay) {
    initPay.value = maxInitPay
    currentInitPay = maxInitPay
  }
  if (!currentInitPay) {
    currentInitPay = 0
    initPay.value = 0
  }
  initPay.value = decorator(initPay.value)
  initPayPercent.value =
    ((currentInitPay / currentPrice) * 100).toFixed(2) + '%'
  result()
}

initPay.addEventListener('input', handleInitPay)
initPay.addEventListener('focusout', handleInitPayFormat)

// time

const timeValue = document.getElementById('time-value')
const timeRange = document.getElementById('time-range')

timeValue.value = currentTime
timeRange.value = currentTime
timeRange.style.backgroundSize = (currentTime - 3) * 1.74 + '% 100%'
timeRange.setAttribute('min', 3)
timeRange.setAttribute('max', 60)

const handleRangeTimeValue = e => {
  e.target.style.backgroundSize = (e.target.value - 3) * 1.74 + '% 100%'
  timeRange.value = e.target.value
  currentTime = e.target.value
  timeValue.value = e.target.value
  result()
}

timeRange.addEventListener('input', handleRangeTimeValue)

const dec = value =>
  +value
    .toString()
    .split('')
    .filter(c => c.charCodeAt() > 47 && c.charCodeAt() < 58)
    .join('')

const handleTimeValue = e => {
  currentTime = dec(e.target.value)
  timeRange.value = currentTime
  timeRange.style.backgroundSize = (currentTime - 3) * 1.74 + '% 100%'
  timeValue.value = currentTime
  if (timeValue.value < 3) {
    currentTime = 3
    timeValue.value = 3
    timeRange.value = 3
  }
}

const handleTimeValueFormat = () => {
  if (timeValue.value > maxTime) {
    currentTime = maxTime
    timeValue.value = maxTime
  }
  timeRange.value = currentTime
  timeRange.style.backgroundSize = (currentTime - 3) * 1.74 + '% 100%'
  result()
}

timeValue.addEventListener('input', handleTimeValue)
timeValue.addEventListener('focusout', handleTimeValueFormat)

result()
