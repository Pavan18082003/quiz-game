// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: 1
    },
    {
        question: "In which year did World War II end?",
        options: ["1945", "1918", "1939", "1941"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: 1
    },
    {
        question: "Which country has the largest population in the world?",
        options: ["India", "United States", "China", "Russia"],
        correctAnswer: 2
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Ringgit"],
        correctAnswer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    }
];

// Quiz state
let currentQuestion = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);
let timeLeft = 15 * 60; // 15 minutes in seconds
let timerInterval;

// DOM elements
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressElement = document.getElementById('progress');
const timerElement = document.getElementById('timer');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-quiz');

// Initialize the quiz
function initQuiz() {
    showQuestion(currentQuestion);
    startTimer();
    
    // Event listeners
    prevButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', goToNextQuestion);
    submitButton.addEventListener('click', submitQuiz);
    
    // Hide previous button on first question
    updateNavigationButtons();
}

// Display question
function showQuestion(index) {
    const question = quizQuestions[index];
    questionNumberElement.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    questionElement.textContent = question.question;
    
    // Update progress bar
    progressElement.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
    
    // Clear previous options
    optionsElement.innerHTML = '';
    
    // Add options
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(optionIndex));
        optionsElement.appendChild(optionElement);
    });
}

// Select an option
function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    showQuestion(currentQuestion); // Refresh to show selection
}

// Navigation functions
function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateNavigationButtons();
    }
}

function goToNextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    prevButton.style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
    nextButton.style.display = currentQuestion === quizQuestions.length - 1 ? 'none' : 'block';
    submitButton.style.display = currentQuestion === quizQuestions.length - 1 ? 'block' : 'none';
}

// Timer functions
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
        return;
    }
    
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Submit quiz
function submitQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            score++;
        }
    });
    
    // Store results in localStorage to pass to results page
    localStorage.setItem('quizResults', JSON.stringify({
        score: score,
        total: quizQuestions.length,
        userAnswers: userAnswers,
        questions: quizQuestions
    }));
    
    // Redirect to results page
    window.location.href = 'results.html';
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);