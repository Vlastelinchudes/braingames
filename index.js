const modal = document.getElementById('game')
const desc = document.getElementById('boardLogo')
const question = document.getElementById('question')
const answer = document.getElementById('answer')
const teacher = document.getElementById('teacher')
const menu = document.getElementById('menu')
const show = () => {
    modal.classList.remove('hidden')
    menu.classList.add('hidden')
}
const gameover = () => {
  desc.textContent = 'U R IDIOT!!1!'
  teacher.classList.add('teacherAngry')
  setTimeout(() => location.reload(), 3000)
}
const victory = () => {
  desc.textContent = 'YOU WIN!!1!'
  teacher.classList.add('teacherHappy')
  setTimeout(() => location.reload(), 3000)
}
//EVEN/////////////////////////////////////////////////
const gameEven = () => {
  desc.textContent = 'IS IT EVEN?';
  const num = Math.floor(Math.random() * 100);
  const isEven = num % 2 === 0 ? 'YES' : 'NO';
  question.textContent = num;

  
  answer.innerHTML = '';

  const yes = document.createElement('button');
  yes.textContent = 'YES';
  const no = document.createElement('button');
  no.textContent = 'NO';
  
  answer.appendChild(yes);
  answer.appendChild(no);

  
  return new Promise((resolve) => {
    yes.addEventListener('click', () => {
      resolve(isEven === 'YES'); 
    });

    no.addEventListener('click', () => {
      resolve(isEven === 'NO');  
    });
  });
};
//EVENEND/////////////////////////////////////
//CALC////////////////////////////////////////
const gameCalc = () => {
  answer.innerHTML = ''
  const num1 = Math.floor(Math.random() * 100)
  const num2 = Math.floor(Math.random() * 100)
  const clc = Math.floor(Math.random() * 3)
  let correct = 0
  desc.textContent = 'SOLVE THIS:'
  switch (clc) {
    case 0:
      correct = num1 + num2
      question.textContent = `${num1} + ${num2}`
    break;
    case 1:
      correct = num1 - num2
      question.textContent = `${num1} - ${num2}`
      break;
    case 2:
      correct = num1 * num2
      question.textContent = `${num1} * ${num2}`
    break;
    default: question.textContent = "ERROR"
  }
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'YOUR ANSWER'
  // input.placeholder.fontsize = 20
  input.classList.add('game-input');
  answer.appendChild(input)
  return new Promise((resolve) => {
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const userAnswer = input.value.trim();
        
        resolve(userAnswer === correct.toString());
      }
    });
  });
}
//CALCEND///////////
//GCD///////////////
const gameGcd = () => {
  answer.innerHTML = ''
  const num1 = Math.floor(Math.random() * 100)
  const num2 = Math.floor(Math.random() * 100)
  const gcd = (a, b) => {
    a = Math.abs(a)
    b = Math.abs(b)
    return !b ? a : gcd(b, a % b)
  }
  let correct = gcd(num1, num2)
  desc.textContent = "WHAT'S THE COMMON DIVISOR?"
  question.textContent = `${num1} AND ${num2}`
  answer.innerHTML = ''
    const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'YOUR ANSWER'
  input.classList.add('game-input');
  answer.appendChild(input)
  return new Promise((resolve) => {
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const userAnswer = input.value.trim();
       
        resolve(userAnswer === correct.toString());
      }
    });
  });
}
//GCDEND////////////////
//PROG//////////////////
const gameProg = () => {
  let step = Math.floor(Math.random() * 10)
  let prog = []
  let num = Math.floor(Math.random() * 10)
  while (prog.length < 6) {
    prog.push(num)
    num += step
  }
  let missingIndex = Math.floor(Math.random() * prog.length)
  let correct = prog[missingIndex]
  prog[missingIndex] = '..'
  let quest = ''
  for (let i = 0; i < prog.length; i++) {
    quest += prog[i] + ' '
}
desc.textContent = "WHAT'S THE MISSING NUMBER?"
  question.textContent = quest
  answer.innerHTML = ''
    const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'YOUR ANSWER'
  input.classList.add('game-input');
  answer.appendChild(input)
  return new Promise((resolve) => {
    // 1. Выносим функцию обработки в отдельную переменную
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        const userAnswer = input.value.trim();
        
        // 2. ВАЖНО: Удаляем слушатель сразу, как только нажали Enter
        input.removeEventListener('keypress', handleKeyPress);
        
        // 3. Возвращаем результат проверки
        resolve(userAnswer === correct.toString());
      }
    };

    // Привязываем обработчик
    input.addEventListener('keypress', handleKeyPress);
  });
}
//PROGEND//////////////
//PRIME/////////
const isPrime = (num) => {
  if (num <= 1) return 'NO'

  if (num <= 3) return 'YES'

  if (num % 2 === 0 || num % 3 === 0) return 'NO'

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return 'NO'
  }

  return 'YES'
}
const gamePrime = () => {
  let quest = Math.floor(Math.random() * 100)
  let correct = isPrime(quest)
  desc.textContent = 'IS IT PRIME NUMBER?'
  answer.innerHTML = '';
  question.textContent = quest
  const yes = document.createElement('button');
  yes.textContent = 'YES';
  const no = document.createElement('button');
  no.textContent = 'NO';
  
  answer.appendChild(yes);
  answer.appendChild(no);

  
  return new Promise((resolve) => {
    yes.addEventListener('click', () => {
      resolve(correct === 'YES'); 
    });

    no.addEventListener('click', () => {
      resolve(correct === 'NO');  
    });
  });
}
const gameplay = async (func, n = 1) => {
  if (n > 3) {
    victory();
    return;
  }

  const isCorrect = await func();

  
  if (isCorrect) {
    
    await gameplay(func, n + 1);
  } else {
   
    gameover();
  }
};

const even = document.getElementById('even')
even.addEventListener('click', ()=> {
    show()
  gameplay(gameEven)
})
const calc = document.getElementById('calc')
calc.addEventListener('click', ()=> {
    show()
  gameplay(gameCalc)
})
const gcd = document.getElementById('gcd')
gcd.addEventListener('click', ()=> {
    show()
  gameplay(gameGcd)
})
const prog = document.getElementById('progression')
prog.addEventListener('click', ()=> {
    show()
  gameplay(gameProg)
}
)
const prime = document.getElementById('Prime')
prime.addEventListener('click', ()=> {
    show()
  gameplay(gamePrime)
})