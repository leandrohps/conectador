window.addEventListener("load", () => {
    setTimeout(
        function open() {
            document.querySelector(".popwindow").style.display = "block"
        },
        500
    )
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".popwindow").style.display = "none"
});

const active = document.getElementById('canvas')
let dotNum = 1

let checkLastFunction = 1

active.addEventListener('click', (evento) => {
    const popWindow = document.querySelector('.popwindow')
    let i, left = evento.clientX, top = evento.clientY
    i = document.createElement('div')
    i.classList.add('dot', `dot${dotNum}`)
    i.style.left = left + "px"
    i.style.top = top + "px"
    i.style.position = "absolute"
    i.style.height = "10px"
    i.style.width = "10px"
    i.style.backgroundColor = "black"
    document.body.appendChild(i)
    dotNum++
    active.style.border = "hidden"
    popWindow.style.display = "none"
})

let checkIfBoxIsChecked
const checkBox = document.querySelector('input[name=checkbox]')
checkBox.addEventListener('change', (e) => {
    if (e.target.checked) {
        checkIfBoxIsChecked = true
    } else {
        checkIfBoxIsChecked = false
    }
})

let dots
let dotsLength

let lines
let linesLength

function dotsArray() {
    dots = document.querySelectorAll('.dot')
    dotsLength = dots.length
}
function linesArray() {
    lines = document.querySelectorAll('.line')
    linesLength = lines.length
}

function reset() {
    dotsArray()
    linesArray()
    if (dotsLength > 0) {
        dots.forEach((div) => div.remove())
        dotNum = 1
    }
    if (linesLength > 0) {
        lines.forEach((div) => div.remove())
    }
}

function apagarPontos() {
    dotsArray()
    if (dotsLength > 0) {
        dots.forEach((div) => div.remove())
        dotNum = 1
    }
}

function apagarLinhas() {
    linesArray()
    if (linesLength > 0) {
        lines.forEach((div) => div.remove())
    }
}

function apagar() {
    dotsArray()
    linesArray()
    if (dotsLength >= 3) {
        dots[dotsLength - 1].remove()
        dotNum--

        if (linesLength >= 1) {
            if (checkLastFunction == 0) {
                apagarLinhas()
                conectarTodos()
            } if (checkLastFunction == 1) {
                apagarLinhas()
                conectar1()
            }
        }
    } else {
        dots[dotsLength - 1].remove()
        dotNum--
        apagarLinhas()
    }
}

function conectarTodos() {
    if (checkLastFunction !== 0) {
        checkLastFunction = 0
    }
    dotsArray()
    linesArray()

    let dotsCheck = 0
    if (dotsLength >= 2) {
        if (linesLength == 0) {
            for (let index1 = 1; index1 < dotsLength; index1++) {
                let dot1 = document.querySelector(`.dot${index1}`)
                let rect1 = dot1.getBoundingClientRect()
                let x1 = (rect1.left + rect1.right) / 2
                let y1 = (rect1.top + rect1.bottom) / 2
                for (let index2 = index1 + 1; index2 <= dotsLength; index2++) {
                    let dot2 = document.querySelector(`.dot${index2}`)
                    let rect2 = dot2.getBoundingClientRect()
                    let x2 = (rect2.left + rect2.right) / 2
                    let y2 = (rect2.top + rect2.bottom) / 2
                    criarLinha(x1, y1, x2, y2)
                    dotsCheck = dotsLength
                }
            }
        }

        if (dotsLength > dotsCheck) {
            apagarLinhas()
            conectarTodos()
        }
    }
}

function conectar1() {
    if (checkLastFunction != 1) {
        checkLastFunction = 1
    }
    dotsArray()
    linesArray()

    let dotsCheck = 0
    if (dotsLength >= 2) {
        if (linesLength == 0) {
            for (let index1 = 1; index1 < dotsLength; index1++) {
                let dot1 = document.querySelector(`.dot${index1}`)
                let rect1 = dot1.getBoundingClientRect()
                let x1 = (rect1.left + rect1.right) / 2
                let y1 = (rect1.top + rect1.bottom) / 2
                let dot2 = document.querySelector(`.dot${index1 + 1}`)
                let rect2 = dot2.getBoundingClientRect()
                let x2 = (rect2.left + rect2.right) / 2
                let y2 = (rect2.top + rect2.bottom) / 2
                criarLinha(x1, y1, x2, y2)
                dotsCheck = dotsLength
            }

            if (checkIfBoxIsChecked) {
                let lastDot = document.querySelector(`.dot${dotsLength}`)
                let rect1 = lastDot.getBoundingClientRect()
                let x1 = (rect1.left + rect1.right) / 2
                let y1 = (rect1.top + rect1.bottom) / 2
                let firstDot = document.querySelector(`.dot1`)
                let rect2 = firstDot.getBoundingClientRect()
                let x2 = (rect2.left + rect2.right) / 2
                let y2 = (rect2.top + rect2.bottom) / 2
                criarLinha(x1, y1, x2, y2)
                dotsCheck = dotsLength
            }
        }

        if (dotsLength > dotsCheck) {
            apagarLinhas()
            conectar1()
        }
    }
}

function criarLinha(x1, y1, x2, y2) {
    distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)))

    xMid = (x1 + x2) / 2
    yMid = (y1 + y2) / 2

    slopeInRadian = Math.atan2(y1 - y2, x1 - x2)
    slopeInDegrees = (slopeInRadian * 180) / Math.PI

    line = document.createElement('div')
    line.classList.add('line')
    line.style.width = distance + "px"
    line.style.left = xMid - (distance / 2) + "px"
    line.style.top = yMid + "px"
    line.style.transform = "rotate(" + slopeInDegrees + "deg)"

    const range = document.querySelector('.rangeSlider')
    line.style.height = range.value + "px"

    line.style.animation = "phasingIntoBeing " + 0.5 + "s ease-in"

    document.body.appendChild(line);
}

const range = document.querySelector('.rangeSlider')
range.addEventListener('input', () => {
    const lines = document.querySelectorAll('.line')
    const dots = document.querySelectorAll('.dot')
    const slider = document.querySelector('.slider')
    const rangeValue = range.value
    lines.forEach(line => line.style.height = rangeValue + "px")
    slider.style.height = rangeValue + "px"
    if (range.value < 3) {
        dots.forEach(dot => {
            dot.style.height = 10 + "px"
            dot.style.width = 10 + "px"
        })
        slider.style.setProperty('--sizeW', 10 + "px")
        slider.style.setProperty('--sizeH', 10 + "px")
    }
    if (range.value >= 3) {
        dots.forEach(dot => {
            dot.style.height = 13 + "px"
            dot.style.width = 13 + "px"
        })
        slider.style.setProperty('--sizeW', 13 + "px")
        slider.style.setProperty('--sizeH', 13 + "px")
    }
})