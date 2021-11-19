

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
    question: 'Хто напісаў верш "Я забіты пад Ржэвам"?',
    options: [
      'Сяргей Арлоў',
      'Аляксандр Твардоўскі',
      'Уладзімір Высоцкі',
      'Іён Дэген'
    ],
    rightAnswer: 1
  },
  {
    question: 'Хто напісаў верш "Жураўлі"?',
    options: [
      'Расул Гамзатаў',
      'Ілля Сельвінскі',
      'Аляксей Суркоў',
      'Яўген Вінакураў'
    ],
    rightAnswer: 0
  },
  {
    question: 'Калі апублікавалі раман "Яны змагаліся за радзіму"?',
    options: [
      '1954 год',
      '1953 год',
      '1961 год',
      '1959 год',
    ],
    rightAnswer: 3
  },
  {
    question: 'Хто напісаў раман "Жывыя і мёртвыя" прысвечаны падзеям Другой Сусветнай Вайны?',
    options: [
      'Мікалай Панчанка',
      'Сяргей Астравой',
      'Канстанцін Сіманаў',
      'Юры Левітанскі'
    ],
    rightAnswer: 2
  },
  {
    question: 'Хто з савецкіх паэтаў не быў на вайне?',
    options: [
      'Аляксей Фацьянаў',
      'Эдуард Асадаў',
      'Сяргей Арлоў',
      'Аляксандр Громаў'
    ],
    rightAnswer: 3
  },
  {
    question: 'Хто напісаў песню "Ён не вярнуўся з бою"?',
    options: [
      'Уладзімір Высоцкі',
      'Барыс Кастроў',
      'Сяргей Арлоў',
      'Мікалай Рылянкоў'
    ],
    rightAnswer: 0
  },
  {
    question: 'Калі быў напісаны гімн абароны айчыны - Свяшчэнная Вайна?',
    options: [
      '28 чэрвеня 1941 года',
      '24 чэрвеня 1941 года',
      '3 ліпеня 1941 года',
      '15 жніўня 1941 года'
    ],
    rightAnswer: 2
  },
  {
    question: 'Хто напісаў паэму прысвечаную выдуманаму герою - Васілю Цёркіну, салдату Вялікай Айчыннай Вайны?',
    options: [
      'Фёдар Вінаградаў',
      'Мікалай Панчанка',
      'Мікалай Рылянкоў',
      'Аляксандр Твардоўскі'
    ],
    rightAnswer: 3
  },
  {
    question: 'Які з прапанаваных вершаў напісаў Давід Самойлаў?',
    options: [
      'Мужнасць',
      'Саракавыя',
      'Ён не вярнуўся з бою',
      'Брацкія магілы'
    ],
    rightAnswer: 1
  },
  {
    question: 'Хто напісаў верш "Дзень Перамогі"?',
    options: [
      'Уладзімір Харытонаў',
      'Уладзімір Высоцкі',
      'Сяргей Арлоў',
      'Мікалай Панчанка'
    ],
    rightAnswer: 0
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