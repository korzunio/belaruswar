

const option1 = document.querySelector('.option1')
const option2 = document.querySelector('.option2')
const option3 = document.querySelector('.option3')
const option4 = document.querySelector('.option4')

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
  indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

const questions = [
  {
    question: 'Як называлася аперацыя па вызваленні Беларусі?',
    options: [
      '«Баграціон»',
      '«Іскра»',
      '«Барбароса»',
      '«Уран»'
    ],
    rightAnswer: 0
  },
  {
    question: 'Колькі працягвалася блакада Ленінграда?',
    options: [
      '855 дня',
      '743 дня',
      '872 дня',
      '651 дзень'
    ],
    rightAnswer: 2
  },
  {
    question: 'Як называлася самая буйная танкавая бітва ў гісторыі, якая мела месца падчас Вялікай Айчыннай Вайны?',
    options: [
      '«Бітва пад Прохараўкай»',
      '«Сталінградская бітва»',
      '«Ржэўская бітва»',
      '«Курская бітва»',
    ],
    rightAnswer: 3
  },
  {
    question: 'У якім годзе быў адкрыты мемарыяльны комплекс Хатынь?',
    options: [
      '1969',
      '1971',
      '1983',
      '1966'
    ],
    rightAnswer: 0
  },
  {
    question: 'Колькі вёсак было знішчана ў Беларусі?',
    options: [
      '451',
      '433',
      "425",
      '446'
    ],
    rightAnswer: 1
  },
  {
    question: 'Колькі дзён працягвалася абарона брэсцкай крэпасці?',
    options: [
      '8 дзён',
      '1 тыдзень',
      '6 дней',
      '10 дзён'
    ],
    rightAnswer: 0
  },
  {
    question: 'Колькі гарадоў атрымалі званне «Горад-герой»?',
    options: [
      '8',
      '13',
      '10',
      '12'
    ],
    rightAnswer: 3
  },
  {
    question: 'Як звалі адзінага жыхара Хатыні, якому ўдалося выратавацца?',
    options: [
      'Фёдар Вінаградаў',
      'Іосіф Камінскі',
      'Пётр Майскі',
      'Аляксандр Фралоў'
    ],
    rightAnswer: 1
  },
  {
    question: 'Калі праводзілася аперацыя «Іскра»?',
    options: [
      '8 — 24 сакавіка 1943 года',
      '10 — 25 верасня 1942 года',
      '1 — 19 чэрвеня 1944 года',
      '12 — 30 студзеня 1943 года'
    ],
    rightAnswer: 3
  },
  {
    question: 'Калі праводзілася аперацыя «Баграціон»?',
    options: [
      '16 лютага - 26 красавіка 1942 года',
      '17 чэрвеня - 9 жніўня 1943 года',
      '23 чэрвеня - 29 жніўня 1944 года',
      '2 кастрычніка - 15 снежня 1944 года'
    ],
    rightAnswer: 2
  }
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
}

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver()
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disabledOptions();
}

for (option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach(item => {
    item.classList.add('disabled');
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  })
}

const enableOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong');
  })
}

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
}

const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
  if (!optionElements[0].classList.contains('disabled')) {
    alert('Вам трэба выбраць адзін з варыянтаў адказу!');
  } else {
    randomQuestion();
    enableOptions();
  }
}

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
  window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
  validate();
})

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
})