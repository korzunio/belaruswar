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
    question: 'Загад нумар 227 «Ні кроку назад» быў аддадзены Іосіфам Сталіным у ходзе:',
    options: [
      'Бітвы на Курскай дузе',
      'Бітвы за Маскву',
      'Смаленскай бітвы',
      'Сталінградскай бітвы'
    ],
    rightAnswer: 3
  },
  {
    question: 'Чаму дзень 22 чэрвеня быў абраны гітлераўскім камандаваннем для пачатку ваенных дзеянняў?',
    options: [
      'У гонар правядзення першага авіяшоу ў Рэймсе ў 1909 годзе',
      'Самы доўгі светлавы дзень у годзе',
      "Добры прагноз надвор'я для авіяцыі",
      'Дзень выбралі выпадкова'
    ],
    rightAnswer: 1
  },
  {
    question: 'Якая краіна стала саюзнікам Германіі ў першы дзень вайны?',
    options: [
      'Фінляндыя',
      'Японія',
      'Балгарыя',
      'Румынія'
    ],
    rightAnswer: 3
  },
  {
    question: 'Калі савецкія жанчыны атрымалі магчымасць уступаць у рады Чырвонай Арміі?',
    options: [
      '22 чэрвеня 1941 г.',
      '1 верасня 1939 года',
      '8 сакавіка 1942 года',
      '1 кастрычніка 1941 года'
    ],
    rightAnswer: 1
  },
  {
    question: 'Якая ваенная спецыяльнасць была самай распаўсюджанай сярод жанчын на фронце?',
    options: [
      'Снайпер',
      'Кулямётчык',
      'Медык',
      'Сапёр'
    ],
    rightAnswer: 2
  },
  {
    question: 'Які мастак стварыў самы вядомы вобраз Радзімы-маці?',
    options: [
      'Іраклій Таідзе',
      'Сяргей Герасімаў',
      'Марат Самсонаў',
      'Аляксандр Дзейнека'
    ],
    rightAnswer: 0
  },
  {
    question: 'Пад якой назвай быў вядомы 588-ы начны авіяцыйны полк - цалкам жаночы полк у складзе нашых ВПС?',
    options: [
      '«Начныя ведзьмы»',
      '«Начныя совы»',
      '«Начныя ястрабы»',
      '«Начныя анёлы»'
    ],
    rightAnswer: 0
  },
  {
    question: 'Хто змагаўся на легендарным танку «Баявая сяброўка»?',
    options: [
      'Лідзія Літвяк',
      'Марыя Кастрычніцкая',
      'Людміла Паўлічэнка',
      'Вера Валошына'
    ],
    rightAnswer: 1
  },
  {
    question: 'Колькі партызан і падпольшчыкаў атрымалі званне «Герой Савецкага Саюза»?',
    options: [
      '543',
      '249',
      '373',
      '199'
    ],
    rightAnswer: 1
  },
  {
    question: 'Знакамітая маштабная аперацыя па падрыве чыгуначных шляхоў і складаў, праведзеная партызанамі ў 1943 годзе, насіла назву ...',
    options: [
      '«Цырк»',
      '«Салют»',
      '«Карнавал»',
      '«Канцэрт»'
    ],
    rightAnswer: 3
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