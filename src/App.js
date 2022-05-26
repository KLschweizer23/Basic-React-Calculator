import React, { useState, useRef} from 'react'
import './app.css'

function App() {
  const displayedNumber = useRef()
  var firstNum = null
  var secondNum = null
  var result = null
  var operation = null
  function clear(){
    displayedNumber.current.value = 0
    clearData()
  }
  function clearData(){
    firstNum = null
    secondNum = null
    result = null
  }
  function deleteLastChar(){
    var currentVal = displayedNumber.current.value
    var leftData = currentVal.substring(0, currentVal.length - 1)
    if(leftData === '') leftData = '0'
    displayedNumber.current.value = leftData
  }
  function toPercent(){
    var value = parseInt(displayedNumber.current.value)
    var prod = value / 100;
    displayedNumber.current.value = prod
  }
  function putNumber(number){
    const currentDisplay = displayedNumber.current.value
    var finalDisplay = currentDisplay + '' + number
    if(finalDisplay.charAt(0) === '0') finalDisplay = finalDisplay.substring(1)
    displayedNumber.current.value = finalDisplay
  }
  function performOperation(pressedOperation){
    var display = displayedNumber.current.value
    if(firstNum === null){
      firstNum = parseFloat(display)
      displayedNumber.current.value = '0'
    }else{
      secondNum = parseFloat(display)
      firstNum = autoPerform(firstNum, secondNum, operation)
      secondNum = null
      displayedNumber.current.value = '0'
    }
    operation = pressedOperation
  }
  function showResult(){
    var display = displayedNumber.current.value
    if(firstNum !== null){
      secondNum = display
      displayedNumber.current.value = autoPerform(firstNum, secondNum, operation)
      clearData()
    }
  }
  function autoPerform(fNum, sNum, operation){
    if(operation === 'add')
      return Number(fNum) + Number(sNum)
    else if(operation === 'subtract')
    return Number(fNum) - Number(sNum)
    else if(operation === 'multiply')
    return Number(fNum) * Number(sNum)
    else if(operation === 'divide')
    return Number(fNum) / Number(sNum)
  }
  function dot(){
    var display = displayedNumber.current.value
    var hasDot = false
    var location = 0
    for(var i = 0; i < display.length; i++){
      if(display.charAt(i) === '.'){
        hasDot = true
        location = i
        break;
      }
    }
    display = hasDot ? display.substring(0, location) + display.substring(location + 1) : display + '.'
    displayedNumber.current.value = display
  }
  return (
    <div>
      <div class="text-center mt-5">
        <h1>Basic React Calculator</h1>
      </div>
      <div class="container w-50 bg-secondary border">
        <div class="row">
        <div class="bg-success w-100 input-group-lg">
            <input ref={displayedNumber} type="number" class="input"/>
        </div>
        </div>
        <div class="row">
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={clear}>AC</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={deleteLastChar}>del</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={toPercent}>%</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc-operations" onClick={() => performOperation('divide')}>÷</button>
          </div>
        </div>
        <div class="row">
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('7')}>7</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('8')}>8</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('9')}>9</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc-operations" onClick={() => performOperation('multiply')}>x</button>
          </div>
        </div>
        <div class="row">
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('4')}>4</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('5')}>5</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('6')}>6</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc-operations" onClick={() => performOperation('subtract')}>-</button>
          </div>
        </div>
        <div class="row">
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('1')}>1</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('2')}>2</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc" onClick={() => putNumber('3')}>3</button>
          </div>
          <div class="text-center col p-0">
            <button class="btn-calc-operations" onClick={() => performOperation('add')}>+</button>
          </div>
        </div>
        <div class="row">
          <div class="text-center col-6 p-0">
            <button class="btn-calc" onClick={() => putNumber('0')}>0</button>
          </div>
          <div class="text-center col-6 p-0">
            <button class="btn-calc-operations" onClick={showResult}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
