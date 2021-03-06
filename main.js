const Countdown = {
  container: document.querySelector('.nums'),
  counter: document.querySelector('.counter'),
  finalMessage: document.querySelector('.final'),
  replay: document.querySelector('#replay'),
  form: document.querySelector('form'),
  timerEl: document.querySelector('#timer'),
  
  nums: null,
  count: 3,

  reset(nums) {
    Countdown.counter.classList.remove('hide')
    Countdown.finalMessage.classList.remove('show')

    nums.forEach(num => num.classList.value = '')

    nums[0].classList.add('in')
  },

  runAnimation(nums) {
    nums.forEach((num, index) => {
      const nextToLast = nums.length - 1
  
      num.addEventListener('animationend', event => {
        if (event.animationName === 'goIn' && index !== nextToLast) {
          num.classList.remove('in')
          num.classList.add('out')
        } else if (event.animationName === 'goOut' && num.nextElementSibling) {
          num.nextElementSibling.classList.add('in')
        } else {
          Countdown.counter.classList.add('hide')
          Countdown.finalMessage.classList.add('show')
          Countdown.replay.focus()
        }
      })
    })
  },

  createNums() {
    Countdown.container.innerHTML = ''

    for (Countdown.count; Countdown.count >= 0; Countdown.count--) {
      const numEl = document.createElement('span')

      numEl.innerText = Countdown.count

      Countdown.container.appendChild(numEl)
    }

    Countdown.nums = document.querySelectorAll('.nums span')

    Countdown.nums[0].classList.add('in')
    Countdown.runAnimation(Countdown.nums)
  },

  formSubmit(event) {
    event.preventDefault()
    Countdown.count = Countdown.timerEl.value
    Countdown.createNums()

    if (Countdown.finalMessage.classList.contains('show')) {
      Countdown.counter.classList.remove('hide')
      Countdown.finalMessage.classList.remove('show')
    }
  },

  start() {
    Countdown.createNums()
    Countdown.form.addEventListener('submit', event => Countdown.formSubmit(event))
    Countdown.replay.addEventListener('click', () => Countdown.reset(Countdown.nums))
  }
}

Countdown.start()