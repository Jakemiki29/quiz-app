// Quiz Data - Array of question objects
const quizData = [
    {
        qNumber: 1,
        question: "Which array method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0
    },
    {
        qNumber: 2,
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        answer: 1
    },
    {
        qNumber: 3,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<css>", "<style>", "<link>"],
        answer: 2
    },
    {
        qNumber: 4,
        question: "Which JavaScript method is used to select an element by its ID?",
        options: ["getElementById()", "getElementByClass()", "querySelector()", "selectElement()"],
        answer: 0
    },
    {
        qNumber: 5,
        question: "What is the correct way to declare a JavaScript variable?",
        options: ["variable name = value;", "var name = value;", "v name = value;", "declare name = value;"],
        answer: 1
    },
    {
        qNumber: 6,
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "<!--"],
        answer: 0
    },
    {
        qNumber: 7,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: 0
    },
    {
        qNumber: 8,
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "bg-color", "background-color", "bgcolor"],
        answer: 2
    },
    {
        qNumber: 9,
        question: "What year was HTML founded?",
        options: ["1984", "1993", "2000", "2010"],
        answer: 1
    },
    {
        qNumber: 10,
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        options: ["*", "=", "-", "x"],
        answer: 1
    }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let randomizedQuestions = [];

// Get DOM elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('answer-options');
const quizSection = document.getElementById('quiz-section');
const scoreSection = document.getElementById('score-section');
const nextButton = document.getElementById('next-btn');
const scoreTextElement = document.getElementById('score-text');
const percentageElement = document.getElementById('percentage');
const restartButton = document.getElementById('restart-btn');

// Load and display the current question
function loadQuestion() {
    // Get the current question from quizData
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    
    // Update the question text
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Loop over options and create a button for each
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('answer-btn');
        optionButton.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionButton);
    });

    nextButton.disabled = true;
    if (currentQuestionIndex === randomizedQuestions.length - 1) {
        nextButton.textContent = 'Finish Quiz';
    } else {
        nextButton.textContent = 'Next Question';
    }
}

// Handle answer selection
function selectOption(selectedIndex) {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    
    // Get all answer buttons
    const allButtons = optionsContainer.querySelectorAll('.answer-btn');
    
    // Disable all buttons so user can't change their answer
    allButtons.forEach(button => {
        button.disabled = true;
    });
    
    // Check if the selected answer is correct
    if (selectedIndex === correctAnswer) {
        // User got it right - update score
        score++;
        // Show green feedback on the correct answer
        allButtons[selectedIndex].classList.add('correct');
    } else {
        // User got it wrong - show red on their choice
        allButtons[selectedIndex].classList.add('incorrect');
        // Also show the correct answer in green
        allButtons[correctAnswer].classList.add('correct');
    }

    nextButton.disabled = false;
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < randomizedQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizSection.style.display = 'none';
    scoreSection.style.display = 'block';
    scoreTextElement.textContent = `You scored ${score} out of ${randomizedQuestions.length}`;
    const percentage = Math.round((score / randomizedQuestions.length) * 100);
    percentageElement.textContent = `${percentage}%`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSection.style.display = 'none';
    quizSection.style.display = 'block';
    randomizedQuestions = shuffleQuestions(quizData);
    loadQuestion();
}

function shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

nextButton.addEventListener('click', handleNextQuestion);
restartButton.addEventListener('click', restartQuiz);
randomizedQuestions = shuffleQuestions(quizData);
loadQuestion();
