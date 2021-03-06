document.addEventListener('DOMContentLoaded', () => {

  const synthDrone = new Audio('assets/SynthDrone.mp3')
  const stringDrone = new Audio('assets/StringDrone.mp3')
  const bellArp = new Audio('assets/BellArp.mp3')
  const atmos = new Audio('assets/atmos.mp3')

  const bar = document.querySelector('.delay-filler')
  // const synthHit = new Audio('assets/SynthHit.mp3')


  const controls = document.querySelector('.control-buttons')
  const keys = []
  const keyAssign = ['Z', 'X', 'C', 'V', 'B']

  let synthPlay = false
  let stringPlay = false
  let bellPlay = false
  let atmosPlay = false

  function addKeys() {
    for (let i = 0; i < 5; i++) {
      const key = document.createElement('DIV')
      controls.appendChild(key)
      keys.push(key)
    }
  }

  function assignKeys() {
    keys.forEach((element, index) => {
      element.classList.add(keyAssign[index])
      document.querySelector(`.${keyAssign[index]}`).innerHTML = `<text class='button-text'>${keyAssign[index]}</text>`
    })
  }

  addKeys()
  assignKeys()
  

  //-------------------------
  //-- Synth loop handlers --
  //-------------------------

  let synthInInt = null
  let synthOutInt = null

  function synthPlayHandler(){
    clearInterval(synthOutInt)  
    if (synthDrone.paused){
      synthDrone.volume = 0.0
      synthDrone.play()
    } 
    synthInInt = setInterval(function() {
      synthDrone.volume = synthDrone.volume + 0.01 
      if (synthDrone.volume > 0.98) clearInterval(synthInInt)
    }, 25)
    synthDrone.addEventListener('timeupdate', function(){
      const buffer = .75
      if (this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
      }
    }, false)
  }

  function synthStopHandler(){
    clearInterval(synthInInt)
    synthOutInt = setInterval(function() { 
      synthDrone.volume = synthDrone.volume - 0.01
      if (synthDrone.volume < 0.015){
        clearInterval(synthOutInt)
        synthDrone.volume = 0
        synthDrone.pause()
      }
    }, 25)
  }
  
  //-------------------------
  //-- String loop handlers --
  //-------------------------

  let stringInInt = null
  let stringOutInt = null

  function stringPlayHandler(){
    clearInterval(stringOutInt)  
    if (stringDrone.paused){
      stringDrone.volume = 0.0
      stringDrone.play()
    } 
    stringInInt = setInterval(function() {
      stringDrone.volume = stringDrone.volume + 0.01 
      if (stringDrone.volume > 0.98) clearInterval(stringInInt)
    }, 25)
    stringDrone.addEventListener('timeupdate', function(){
      const buffer = .75
      if (this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
      }
    }, false)
  }

  function stringStopHandler(){
    clearInterval(stringInInt)
    stringOutInt = setInterval(function() { 
      stringDrone.volume = stringDrone.volume - 0.01
      if (stringDrone.volume < 0.015){
        clearInterval(stringOutInt)
        stringDrone.volume = 0
        stringDrone.pause()
      }
    }, 25)
  }

  //-------------------------
  //-- Bell loop handlers --
  //-------------------------

  let bellInInt = null
  let bellOutInt = null

  function bellPlayHandler(){
    clearInterval(bellOutInt)  
    if (bellArp.paused){
      bellArp.volume = 0.0
      bellArp.play()
    } 
    bellInInt = setInterval(function() {
      bellArp.volume = bellArp.volume + 0.01 
      if (bellArp.volume > 0.65) clearInterval(bellInInt)
    }, 25)
    bellArp.addEventListener('timeupdate', function(){
      const buffer = .75
      if (this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
      }
    }, false)
  }

  function bellStopHandler(){
    clearInterval(bellInInt)
    bellOutInt = setInterval(function() { 
      bellArp.volume = bellArp.volume - 0.01
      if (bellArp.volume < 0.015){
        clearInterval(bellOutInt)
        bellArp.volume = 0
        bellArp.pause()
      }
    }, 25)
  }

  //-------------------------
  //-- Atmos loop handlers --
  //-------------------------

  let atmosInInt = null
  let atmosOutInt = null

  function atmosPlayHandler(){
    clearInterval(atmosOutInt)  
    if (atmos.paused){
      atmos.volume = 0.0
      atmos.play()
    } 
    atmosInInt = setInterval(function() {
      atmos.volume = atmos.volume + 0.01 
      if (atmos.volume > 0.98) clearInterval(atmosInInt)
    }, 25)
    atmos.addEventListener('timeupdate', function(){
      const buffer = .75
      if (this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
      }
    }, false)
  }

  function atmosStopHandler(){
    clearInterval(atmosInInt)
    atmosOutInt = setInterval(function() { 
      atmos.volume = atmos.volume - 0.01
      if (atmos.volume < 0.015){
        clearInterval(atmosOutInt)
        atmos.volume = 0
        atmos.pause()
      }
    }, 25)
  }

  //----------------
  // Hit Handlers
  //----------------

  let delayTime = 1000

  function hitPlayHandler(soundFile){
    let hitVolume = 0.7
    const synthHit = new Audio(soundFile)
    synthHit.play()
    const hitInt = setInterval(function(){
      const synthHit = new Audio(soundFile)
      synthHit.volume = hitVolume
      synthHit.play()
      hitVolume -= 0.10
      if (hitVolume < 0.0) {
        clearInterval(hitInt)
      }
    }, delayTime)
  }


  //delay time
  function delayTimeHandler(direction){
    
    if (direction === 'up' && delayTime < 2000){
      delayTime += 50
      bar.style.width = ((delayTime / 2000) * 100) + '%'
    } 
    if (direction === 'down' && delayTime > 0){
      delayTime -= 50
      bar.style.width = ((delayTime / 2000) * 100) + '%'
    } 
  }


  //--------------------------
  // button styling handlers
  //--------------------------

  function buttonOn(key){
    document.querySelector(`div.${key}`).classList.add('button-on')
    document.querySelector(`div.${key} .button-text`).classList.add('button-on')
  }

  function buttonOff(key){
    document.querySelector(`div.${key}`).classList.remove('button-on')
    document.querySelector(`div.${key} .button-text`).classList.remove('button-on')
  }


  document.addEventListener('keyup', (e) => {
    //playing and pausing the 4 loops
    if (e.keyCode === 90 && !synthPlay) {
      synthPlayHandler() 
      buttonOn('Z')
      synthPlay = !synthPlay
    } else if (e.keyCode === 90 && synthPlay){
      synthStopHandler()
      buttonOff('Z')
      synthPlay = !synthPlay
    }
    if (e.keyCode === 88 && !stringPlay) {
      stringPlayHandler()
      buttonOn('X')
      stringPlay = !stringPlay
    } else if (e.keyCode === 88 && stringPlay){
      stringStopHandler()
      buttonOff('X')
      stringPlay = !stringPlay
    }
    if (e.keyCode === 67 && !bellPlay) {
      bellPlayHandler() 
      buttonOn('C')
      bellPlay = !bellPlay
    } else if (e.keyCode === 67 && bellPlay){
      bellStopHandler()
      buttonOff('C')
      bellPlay = !bellPlay
    }
    if (e.keyCode === 86 && !atmosPlay) {
      atmosPlayHandler() 
      buttonOn('V')
      atmosPlay = !atmosPlay
    } else if (e.keyCode === 86 && atmosPlay){
      atmosStopHandler()
      buttonOff('V')
      atmosPlay = !atmosPlay
    }
    if (e.keyCode === 66) {
      hitPlayHandler('assets/SynthHit.mp3') 
    }
    if (e.keyCode === 78) {
      hitPlayHandler('assets/NoiseHit.mp3') 
    }
    if (e.keyCode === 190) {
      delayTimeHandler('up')
    }
    if (e.keyCode === 188) {
      delayTimeHandler('down')
    }
  })
})