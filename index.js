const modal = document.getElementById('game')
const show = () => {
    modal.classList.remove('hidden')
}
const even = document.getElementById('even')
even.addEventListener('click', ()=> {
    show()
})
export const random = range => Math.floor(Math.random() * range)
// func (desc, correctAnswer, qestion )
export default (desc, game) => {
  const name = greeting()
  console.log(desc)
  for (let i = 0; i < 3; i++) {
    const [question, correctAnswer] = game()
    console.log(`Question: ${question}`)
    let answer = readlineSync.question('Your answer: ')
    if (correctAnswer == answer) {
      console.log('Correct!')
    }
    else {
      gameover(name, answer, correctAnswer)
      return 0
    }
  }
  congrats(name)
}