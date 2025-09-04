// DOM elements
const scoreElement = document.getElementById('score');
const scoreMessageElement = document.getElementById('score-message');
const detailedResultsElement = document.getElementById('detailed-results');

// Display results
function displayResults() {
    const resultsData = JSON.parse(localStorage.getItem('quizResults'));
    
    if (!resultsData) {
        // No results data found, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    const { score, total, userAnswers, questions } = resultsData;
    
    // Display score
    scoreElement.textContent = `${score}/${total}`;
    
    // Display message based on score
    let message;
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) {
        message = "Excellent! You're a quiz master!";
    } else if (percentage >= 70) {
        message = "Great job! You know your stuff!";
    } else if (percentage >= 50) {
        message = "Good effort! Keep learning!";
    } else {
        message = "Keep studying and try again!";
    }
    
    scoreMessageElement.textContent = message;
    
    // Display detailed results
    detailedResultsElement.innerHTML = '';
    
    questions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        const isCorrect = userAnswers[index] === question.correctAnswer;
        if (isCorrect) {
            resultItem.classList.add('correct');
        } else {
            resultItem.classList.add('incorrect');
        }
        
        resultItem.innerHTML = `
            <h3>Question ${index + 1}: ${question.question}</h3>
            <p>Your answer: ${question.options[userAnswers[index]] || 'Not answered'}</p>
            <p>Correct answer: ${question.options[question.correctAnswer]}</p>
            ${!isCorrect ? '<p class="explanation">Better luck next time!</p>' : ''}
        `;
        
        detailedResultsElement.appendChild(resultItem);
    });
}

// Initialize results when page loads
document.addEventListener('DOMContentLoaded', displayResults);