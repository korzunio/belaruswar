

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
    question: 'Песня «Цёмная ноч» з к/ф «Два байцы», знятага ў 1943 годзе,шырокавядомая але ў фільме гучыць яшчэ адна песня. Якая?',
    options: [
      '«Развітанне славянки»',
      '«Зямлянка»',
      '«Шаланды, поўные кефалі»',
      '«Смуглянка»'
    ],
    rightAnswer: 2
  },
  {
    question: 'Як называўся папулярны ў СССР сэрыял пра вайну, зняты ў 60-я гады ў Польшчы?',
    options: [
      '«Чатыры танкісты и сабака»',
      '«Тры танкісты, тры вясёлых сябры»',
      '«А зоры тут цихие...»',
      '«Бітва за Москву»'
    ],
    rightAnswer: 0
  },
  {
    question: 'Фільм Станіслава Растоцкага «А зоры тут ціхія ...» карыстаецца любоўю гледачоў не толькі ў Расіі. У якой краіне на аснове фільма знялі серыял?',
    options: [
      'ЗША',
      'Вялікабрытанія',
      'Манголія',
      'Кітай'
    ],
    rightAnswer: 3
  },
  {
    question: 'Фільм «Ляцяць жураўлі», зняты ў 1957 годзе, стаў пераможцам найбуйнейшага міжнароднага фестывалю. Якую ўзнагароду атрымаў фільм?',
    options: [
      '«Залаты Георгій» Маскоўскага міжнароднага кінафестывалю',
      '«Залаты мядзведзь» Берлінскага фэсту',
      '«Оскар» у намінацыі «Лепшы фільм на замежнай мове»',
      '«Залатая пальмавая галіна» Канскага кінафестывалю'
    ],
    rightAnswer: 3
  },
  {
    question: 'У 1967 годзе выйшла ваенная драма Андрэя Таркоўскага «Іванава дзяцінства». Які аповед лёг у аснову фільма?',
    options: [
      '«Яны змагаліся за Радзіму" Міхаіла Шолахава',
      '«Іван» Уладзіміра Багамолава',
      "«Праклятыя і забітыя» Віктара Астаф'ева",
      '"Сотнікаў" Васіль Быкаў'
    ],
    rightAnswer: 1
  },
  {
    question: 'Гэтая песня з фільма "У бой ідуць адны старыя" стала ўсенародна любімай і спаўняецца практычна на ўсіх канцэртах ваенна-патрыятычнай тэматыкі.',
    options: [
      '«Дзень Перамогі»',
      '«Смуглянка»',
      '«Кацюша»',
      '«Журавы»'
    ],
    rightAnswer: 1
  },
  {
    question: 'Падчас пракату гэтага фільма, які паказаў жахі вайны, у Еўропе ў кінатэатраў дзяжурылі медыкі, гледачам станавілася дрэнна ад убачанага.',
    options: [
      'Вайна',
      'Зорка',
      'Ідзі і глядзі',
      'Яны змагаліся за Радзіму'
    ],
    rightAnswer: 2
  },
  {
    question: 'Для гэтага фільма рэжысёр Сяргей Бандарчук падбіраў толькі тых акцёраў, якія бачылі вайну на свае вочы - Юрый Нікулін, Вячаслаў Ціханаў і інш.',
    options: [
      'Вайна',
      'Зорка',
      'Ідзі і глядзі',
      'Яны змагаліся за Радзіму'
    ],
    rightAnswer: 3
  },
  {
    question: 'У фільмах "А зоры тут ціхія" паводле аповесці Барыса Васільева галоўныя гераіні былі ...',
    options: [
      'Зенітчыцамі',
      'Разведчыцамі',
      'Лётчыцамі',
      'Медыкамі'
    ],
    rightAnswer: 0
  },
  {
    question: '"Давядзецца яму падлогі драіць!" - гэтую фразу ўнук-кадэт сказаў дзеду-генералу ў фільме ...',
    options: [
      '«Жывыя і мёртвыя»»',
      '«Бітва за Маскву»',
      '«Яны змагаліся за Радзіму»',
      '«Афіцэры»'
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