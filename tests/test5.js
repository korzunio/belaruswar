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
    question: 'Колькі партызанскіх атрадаў налічвалася ў Беларусі на канец 1942 года?',
    options: [
      '365',
      '289',
      '470',
      '301'
    ],
    rightAnswer: 0
  },
  {
    question: 'Якое галоўнае адрозненне партызан ад дыверсантаў?',
    options: [
      'Дзеянне толькі паасобку',
      'Наяўнасць добраахвотнай падтрымкі ад мірнага насельніцтва',
      'Бескантрольнасць дзеянняў',
      'Дзеянне толькі на акупаванай тэрыторыі'
    ],
    rightAnswer: 3
  },
  {
    question: 'Калі пачаў фармавацца савецкі партызанскі рух?',
    options: [
      '1941 год',
      '1940 год',
      '1939 год',
      '1942 год',
    ],
    rightAnswer: 0
  },
  {
    question: 'У якой з савецкіх рэспублік партызанскі рух першапачаткова быў вельмі актыўным?',
    options: [
      'Узбекскай',
      'Украінской',
      'Беларускай',
      'Эстонскай'
    ],
    rightAnswer: 2
  },
  {
    question: 'Хто напісаў верш «Беларускiм партызанам», які стаў партызанскiм гiмнам, друкаваўся ў лiстоўках, падпольных газетах.',
    options: [
      'Якуб Колас',
      'Янка Купала',
      'Аркадзь Куляшоў',
      'Пімен Панчанка'
    ],
    rightAnswer: 1
  },
  {
    question: 'У якім годзе быў створаны Цэнтральны штаб партызанскага руху СССР?',
    options: [
      '1941 год',
      '1942 год',
      '1943 год',
      '1940 год'
    ],
    rightAnswer: 1
  },
  {
    question: 'Хто быў адным з першых арганізатараў партызанскага руху ў Беларусі?',
    options: [
      'Зіна Партнова',
      'Мікалай Гастэла',
      'Алег Кашавы',
      'Ціхан Папяркоў'
    ],
    rightAnswer: 3
  },
  {
    question: "Чым праславілася Зоя Касмадзям'янская?",
    options: [
      'Застрэлілася, каб не патрапіць у палон',
      'Адна прыкрывала адыход свайго атрада.',
      'Не выдала ніякай інфармацыі пад жорсткімі катаваннямі',
      'Застрэліла афіцэра нямецкай групы карнікаў'
    ],
    rightAnswer: 2
  },
  {
    question: 'Хто з партызан-піянераў вядомы тым, што атруціў каля 100 нямецкіх афіцэраў?',
    options: [
      'Зінаіда Партнова',
      'Лізавета Чайкіна',
      'Уладзімір Дубінін',
      'Валянцін Коцік'
    ],
    rightAnswer: 0
  },
  {
    question: 'Якая вайна, праведзеная беларускімі партызанамі ў 1943 годзе, у значнай ступені садзейнічала разгрому ворага і развіццю наступлення Савецкай Арміі?',
    options: [
      'Руская вайна',
      'Рэйкавая вайна',
      'Беларуская вайна',
      'Танкавая вайна'
    ],
    rightAnswer: 1
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