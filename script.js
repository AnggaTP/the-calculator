class Calculator{
    constructor(currentOutputText, previousOutputText){
        this.currentOutputText = currentOutputText;
        this.previousOutputText = previousOutputText;
        this.clear()
    }

    clear(){
        this.currentOutput = ''
        this.previousOutput = ''
        this.operation = undefined
    }

    delete(){
        this.currentOutput = this.currentOutput.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOutput.includes('.')) return
        this.currentOutput = this.currentOutput.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOutput === '') return
        if(this.previousOutput !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOutput = this.currentOutput
        this.currentOutput = ''
    }

    compute(){
        let result
        const prev = parseFloat(this.previousOutput) 
        const current = parseFloat(this.currentOutput)
        switch(this.operation){
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '×':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                return
        }
        this.currentOutput = result
        this.previousOutput = ''
        this.operation = undefined
    }

    updateDisplay(){
        this.currentOutputText.innerHTML = this.currentOutput 
        if(this.operation != null){
            this.previousOutputText.innerHTML = `${this.previousOutput} ${this.operation}`
        }else{
            this.previousOutputText.innerHTML = ''
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operand]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalButton = document.querySelector('[data-equal]')
const currentOutputText = document.querySelector('[data-current]')
const previousOutputText = document.querySelector('[data-previous]')

const calculator = new Calculator(currentOutputText, previousOutputText)

numberButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateDisplay()
} )

deleteButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})