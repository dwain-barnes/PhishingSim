let currentEmailIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timeRemaining = 30;
let timerInterval;
let currentDifficulty = 'easy';

const gameContainer = document.getElementById('game-container');
const placeholderContainer = document.getElementById('placeholder-container');
const emailClient = document.getElementById('email-client');
const emailList = document.getElementById('email-list');
const emailContent = document.getElementById('email-content');
const challengeControls = document.getElementById('challenge-controls');
const identifyPhishingBtn = document.getElementById('identify-phishing');
const markSafeBtn = document.getElementById('mark-safe');
const scoreDisplay = document.getElementById('score-display');
const scoreElement = document.getElementById('score');
const timerDisplay = document.getElementById('timer-display');
const timerElement = document.getElementById('timer');
const feedbackModal = document.getElementById('feedback-modal');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackContent = document.getElementById('feedback-content');
const learningResourcesList = document.getElementById('learning-resources-list');
const nextEmailBtn = document.getElementById('next-email');
const finalScoreModal = document.getElementById('final-score-modal');
const finalScoreElement = document.getElementById('final-score');
const correctAnswersElement = document.getElementById('correct-answers');
const incorrectAnswersElement = document.getElementById('incorrect-answers');
const playAgainBtn = document.getElementById('play-again');
const difficultySelector = document.getElementById('difficulty');
const startGameBtn = document.getElementById('start-game');

function startGame() {
    currentDifficulty = difficultySelector.value;
    currentEmailIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    scoreElement.textContent = score;
    
    placeholderContainer.style.display = 'none';
    emailClient.style.display = 'flex';
    challengeControls.classList.remove('hidden');
    scoreDisplay.classList.remove('hidden');
    timerDisplay.classList.remove('hidden');

    displayEmails();
    startTimer();
}

function displayEmails() {
    const filteredEmails = emails.filter(email => email.difficulty === currentDifficulty);
    emailList.innerHTML = filteredEmails.map((email, index) => `
        <div class="email-item ${index === currentEmailIndex ? 'selected' : ''} ${email.isRead ? '' : 'unread'}" data-id="${email.id}">
            <strong>${email.sender}</strong><br>
            ${email.subject}<br>
            <span class="email-timestamp">${formatDate(email.timestamp)}</span>
        </div>
    `).join('');

    displayEmailContent(filteredEmails[currentEmailIndex]);

    document.querySelectorAll('.email-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentEmailIndex = index;
            displayEmails();
        });
    });
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function displayEmailContent(email) {
    emailContent.innerHTML = `
        <h2>From: ${email.sender}</h2>
        <h3>Subject: ${email.subject}</h3>
        <p>To: ${email.recipient}</p>
        <hr>
        <pre>${email.content}</pre>
    `;
    email.isRead = true;
}

function showFeedback(isCorrect, explanation, resources) {
    feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    feedbackContent.textContent = explanation;
    learningResourcesList.innerHTML = resources.map(resource => `<li><a href="${resource}" target="_blank">${resource}</a></li>`).join('');
    feedbackModal.classList.remove('hidden');
    feedbackModal.classList.add('fade-in');
    clearInterval(timerInterval);
}

function updateScore(increment) {
    score += increment;
    scoreElement.textContent = score;
    if (increment > 0) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
}

function startTimer() {
    timeRemaining = 30;
    timerElement.textContent = timeRemaining;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showFeedback(false, 'Time\'s up! You took too long to decide.', []);
        }
    }, 1000);
}

function showFinalScore() {
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = correctAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;
    finalScoreModal.classList.remove('hidden');
    finalScoreModal.classList.add('fade-in');
}

identifyPhishingBtn.addEventListener('click', () => {
    const filteredEmails = emails.filter(email => email.difficulty === currentDifficulty);
    const currentEmail = filteredEmails[currentEmailIndex];
    if (currentEmail.isPhishing) {
        showFeedback(true, currentEmail.explanation, currentEmail.resources);
        updateScore(1);
    } else {
        showFeedback(false, 'This was actually a legitimate email. ' + currentEmail.explanation, currentEmail.resources);
    }
});

markSafeBtn.addEventListener('click', () => {
    const filteredEmails = emails.filter(email => email.difficulty === currentDifficulty);
    const currentEmail = filteredEmails[currentEmailIndex];
    if (!currentEmail.isPhishing) {
        showFeedback(true, currentEmail.explanation, currentEmail.resources);
        updateScore(1);
    } else {
        showFeedback(false, 'This was actually a phishing email. ' + currentEmail.explanation, currentEmail.resources);
    }
});

nextEmailBtn.addEventListener('click', () => {
    feedbackModal.classList.add('hidden');
    const filteredEmails = emails.filter(email => email.difficulty === currentDifficulty);
    currentEmailIndex++;
    if (currentEmailIndex < filteredEmails.length) {
        displayEmails();
        startTimer();
    } else {
        showFinalScore();
    }
});

playAgainBtn.addEventListener('click', () => {
    finalScoreModal.classList.add('hidden');
    placeholderContainer.style.display = 'block';
    emailClient.style.display = 'none';
    challengeControls.classList.add('hidden');
    scoreDisplay.classList.add('hidden');
    timerDisplay.classList.add('hidden');
});

startGameBtn.addEventListener('click', startGame);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const filteredEmails = emails.filter(email => email.difficulty === currentDifficulty);
        if (e.key === 'ArrowUp') {
            currentEmailIndex = Math.max(0, currentEmailIndex - 1);
        } else {
            currentEmailIndex = Math.min(filteredEmails.length - 1, currentEmailIndex + 1);
        }
        displayEmails();
    }
});

// Initialize the game
difficultySelector.value = 'easy';
startGameBtn.classList.remove('hidden');
// Add onboarding tooltip
const onboardingTooltip = document.createElement('div');
onboardingTooltip.className = 'tooltip';
onboardingTooltip.textContent = 'Welcome! Start by selecting a difficulty and clicking "Start Game".';
gameContainer.appendChild(onboardingTooltip);

setTimeout(() => {
    onboardingTooltip.style.display = 'none';
}, 5000);

// Accessibility improvements
startGameBtn.setAttribute('aria-label', 'Start the phishing challenge game');
identifyPhishingBtn.setAttribute('aria-label', 'Identify the current email as a phishing attempt');
markSafeBtn.setAttribute('aria-label', 'Mark the current email as safe');
nextEmailBtn.setAttribute('aria-label', 'Move to the next email');
playAgainBtn.setAttribute('aria-label', 'Play the game again');

// Add hover tooltips to buttons
function addTooltip(element, text) {
    element.title = text;
}

addTooltip(identifyPhishingBtn, 'Click if you think this email is a phishing attempt');
addTooltip(markSafeBtn, 'Click if you think this email is safe');

// Improve focus management
function setFocusToFirstElement(container) {
    const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length) {
        focusableElements[0].focus();
    }
}

// Set focus when modals open
function showModal(modal) {
    modal.classList.remove('hidden');
    setFocusToFirstElement(modal);
}

// Update showFeedback and showFinalScore functions to use the new showModal function
function showFeedback(isCorrect, explanation, resources) {
    feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    feedbackContent.textContent = explanation;
    learningResourcesList.innerHTML = resources.map(resource => `<li><a href="${resource}" target="_blank">${resource}</a></li>`).join('');
    showModal(feedbackModal);
    feedbackModal.classList.add('fade-in');
    clearInterval(timerInterval);
}

function showFinalScore() {
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = correctAnswers;
    incorrectAnswersElement.textContent = incorrectAnswers;
    showModal(finalScoreModal);
    finalScoreModal.classList.add('fade-in');
}

// Add event listeners for closing modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!feedbackModal.classList.contains('hidden')) {
            feedbackModal.classList.add('hidden');
            setFocusToFirstElement(emailClient);
        } else if (!finalScoreModal.classList.contains('hidden')) {
            finalScoreModal.classList.add('hidden');
            setFocusToFirstElement(placeholderContainer);
        }
    }
});

// Add custom error handling
window.onerror = function(message, source, lineno, colno, error) {
    console.error('An error occurred:', message, 'at', source, 'line', lineno);
    alert('Oops! Something went wrong. Please try refreshing the page.');
    return true;
};

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedDisplayEmails = debounce(displayEmails, 250);

// Use the debounced function for email display
document.querySelectorAll('.email-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentEmailIndex = index;
        debouncedDisplayEmails();
    });
});

// Initialize the game
difficultySelector.value = 'easy';
startGameBtn.classList.remove('hidden');

