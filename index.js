let number1 = document.getElementById('number_1')
let number2 = document.getElementById('number_2')
let choose_operator = document.getElementById('choose_operator')
let questionsNumber = document.getElementById('questionsNumber')
let countdown = document.getElementById('Countdown')
let ranges_number = document.getElementById('range_numbers')
let start = document.getElementById('Start')
let calcul_area = document.querySelector('.calcul_area')
let result = document.getElementById('Result')
let result_area = document.querySelector('.result')
let response_area = document.querySelector('.response_area')
let response = document.getElementById('Response')
let enter = document.getElementById('enter')
let count = document.getElementById('count')
let operator = document.getElementById('operator')

let range = ranges_number.value
let sign = '*'
let ct = countdown.value
ct *= 1000
let ctb = countdown.value
ctb *= 1000
let ques = questionsNumber.value
let total = questionsNumber.value
let found = 0
let time = null

ranges_number.addEventListener('click', () => {
    range = parseInt(ranges_number.value)
})

questionsNumber.addEventListener('click', () => {
    ques = parseInt(questionsNumber.value)
    total = parseInt(questionsNumber.value)
})

choose_operator.addEventListener('click', () => {
    let value = choose_operator.value
    if(value == 'multiplication(*)') {
        sign = '*'
    } else if(value == 'substraction(-)') {
        sign = '-'
    } else if(value == 'divide(/)') {
        sign = '/'
    } else if(value == 'addition(+)') {
        sign = '+'
    } else if(value == 'square root(√)') {
        sign = '√'
    } else if(value == 'square(²)') {
        sign = '²'
    }
})

countdown.addEventListener('click', () => {
    ct = parseInt(countdown.value)
    ct *= 1000
    ctb = parseInt(countdown.value)
    ctb *= 1000
})

start.addEventListener('click', async () => {
    number1.textContent = ''
    number2.textContent = ''
    result.textContent = ''
    operator.textContent = ''
    count.textContent = ''
    response.value = ''

    if(time != null) {
        clearInterval(time)
    }

    if(document.getElementById('final_result') != null) {
        document.getElementById('final_result').remove()
    }

    calcul_area.style.visibility = 'visible'
    result.style.visibility = 'visible'
    result_area.style.visibility = 'visible'
    response_area.style.visibility = 'visible'

    start.textContent = 'restart'

    let int = ctb + 3000

    if(sign == '√' || sign == '²') {
        number2.style.display = 'none'
        operator.style.display = 'none'
        time = setInterval(async () => {
            if(ques == 0) {
                clearInterval(time)
                await display()
                return
            }
            result.textContent = ''
            await one()
            ques -= 1
        }, int)
    } else {
        time = setInterval(async () => {
            if(ques == 0) {
                clearInterval(time)
                await display()
                return
            }
            result.textContent = ''
            await two()
            ques -= 1
        }, int)
    }
})

async function two() {
    n1s = ''
    n2s = ''

    n1 = ''
    n2 = ''

    for(let i = 0; i < range; i++) {
        if(i % 3 == 0 && range > 4) {
            n1s += ' '
            n2s += ' '
        }
        ran1 = Math.floor(Math.random() * 10)
        ran2 = Math.floor(Math.random() * 10)

        n1s += ran1
        n2s += ran2

        n1 += ran1
        n2 += ran2
    }

    ct = ctb / 1000

    number1.style.visibility = 'hidden'
    operator.style.visibility = 'hidden'
    number2.style.visibility = 'hidden'
    result.style.visibility = 'hidden'
    count.style.visibility = 'hidden'

    number1.textContent = n1s
    operator.textContent = sign
    number2.textContent = n2s

    let int = setInterval(async () => {
        if(ct == 0) {
            count.textContent = ct
            clearInterval(int)
            await calcul_two(parseInt(n1), parseInt(n2), sign)
            return
        } else {
            if(number1.style.visibility == 'hidden') {
                number1.style.visibility = 'visible'
                operator.style.visibility = 'visible'
                number2.style.visibility = 'visible'
                result.style.visibility = 'visible'
                count.style.visibility = 'visible'
            }

            count.textContent = ct
            ct -= 1
        }
    }, 1000)

    response.addEventListener('keypress', async (e) => {
        if(e.key == 'Enter') {
            clearInterval(int)
            await calcul_two(parseInt(n1), parseInt(n2), sign)
            return
        }
    })

    enter.addEventListener('click', async () => {
        clearInterval(int)
        await calcul_two(parseInt(n1), parseInt(n2), sign)
        return
    })

}

async function one() {
    ns = ''
    n = ''

    for(let i = 0; i < range; i++) {
        if(i % 3 == 0 && range > 4) {
            ns += ' '
        }
        ran = Math.floor(Math.random() * 10)
        ns += ran
        n += ran
    }

    ct = ctb / 1000

    number1.style.visibility = 'hidden'
    operator.style.visibility = 'hidden'
    result.style.visibility = 'hidden'
    count.style.visibility = 'hidden'

    if(sign == '√') {
        number1.textContent = sign + ns
    } else {
        number1.textContent = ns + sign
    }

    response.addEventListener('keypress', async (e) => {
        if(e.key == 'Enter') {
            clearInterval(int)
            await calcul_one(parseInt(n), sign)
            return
        }
    })

    enter.addEventListener('click', async () => {
        clearInterval(int)
        await calcul_one(parseInt(n), sign)
        return
    })

    let int = setInterval(async () => {
        if(ct <= 0) {
            count.textContent = ct
            clearInterval(int)
            await calcul_one(parseInt(n), sign)
            return
        } else {
            if(number1.style.visibility == 'hidden') {
                number1.style.visibility = 'visible'
                operator.style.visibility = 'visible'
                result.style.visibility = 'visible'
                count.style.visibility = 'visible'
            }
            count.textContent = ct
            ct -= 1
        }
    }, 1000)
}

async function calcul_one(number, sign) {
    r = 0
    if(sign == '√') {
        r = Math.sqrt(number).toFixed(f)
    } else{
        r = Math.pow(number, 2).toFixed(f)
    }

    if(response.value == r) {
        result.style.color = 'green'
        found += 1
    } else {
        result.style.color = 'red'
    }

    result.textContent = r
    response.value = ''
    return result.textContent
}

async function calcul_two(number1, number2, sign) {
    r = 0
    if(sign == '+') {
        r = await number1 + number2
    } 
    if(sign == '-') {
        r = await number1 - number2
    }
    if(sign == '*') {
        r = await number1 * number2
    }
    if(sign == '/') {
        r = await number1 / number2
    }

    if(document.getElementById('Response').value == r) {
        result.style.color = 'green'
        found += 1
    } else {
        result.style.color = 'red'
    }
    result.textContent = r
    document.getElementById('Response').value = ''
    return result.textContent
}

async function display() {
    let span = document.createElement('span')
    span.id = 'final_result'
    span.textContent = `Final Result: ${found}/${total}`
    document.body.appendChild(span)
}