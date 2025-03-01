const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const buttons = document.querySelectorAll(".buttons button");

const modal = document.getElementById("result-modal");
const resultText = document.getElementById("result-text");
const closeModal = document.querySelector(".close");

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const tieCountElement = document.getElementById("tie-count");

const choices = {
  Rock: "🪨",
  Paper: "📄",
  Scissors: "✂️",
};

let playerScore = 0;
let computerScore = 0;
let tieCount = 0;

const getComputerChoice = () => {
  const choiceArray = Object.values(choices);
  return choiceArray[Math.floor(Math.random() * choiceArray.length)];
};

const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return { message: "It's a Tie!", class: "tie" };
  if (
    (playerChoice === "🪨" && computerChoice === "✂️") ||
    (playerChoice === "📄" && computerChoice === "🪨") ||
    (playerChoice === "✂️" && computerChoice === "📄")
  ) {
    return { message: "You Win! 🎉", class: "win" };
  }
  return { message: "You Lose! 😞", class: "lose" };
};

const updateScores = (result) => {
  if (result.class === "win") {
    playerScore++;
    playerScoreElement.textContent = playerScore;
  } else if (result.class === "lose") {
    computerScore++;
    computerScoreElement.textContent = computerScore;
  } else if (result.class === "tie") {
    tieCount++;
    tieCountElement.textContent = tieCount;
  }
};

const playGame = (event) => {
    const playerChoiceText = event.target.textContent.split(" ")[1];
    const playerChoice = choices[playerChoiceText];
    const computerChoice = getComputerChoice();
  
    // Reset hands before animation
    playerHand.textContent = "✊";
    computerHand.textContent = "✊";
  
    // Rocking animation
    playerHand.style.animation = "rock 0.5s infinite";
    computerHand.style.animation = "rock 0.5s infinite";
  
    setTimeout(() => {
      playerHand.style.animation = "";
      computerHand.style.animation = "";
  
      // Update hands
      playerHand.textContent = playerChoice;
      computerHand.textContent = computerChoice;
  
      // Get result
      const result = determineWinner(playerChoice, computerChoice);
      resultText.textContent = result.message;
      resultText.className = result.class;
  
      // Update scores
      updateScores(result);
  
      // Show modal
      modal.style.display = "flex";
  
      // Automatically close the modal after 2.5 seconds
      setTimeout(() => {
        modal.style.display = "none";
      }, 1500); // 1.5 seconds
    }, 1000);
  };

// Close modal on click
closeModal.onclick = () => {
  modal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Add event listeners to buttons
buttons.forEach((button) => button.addEventListener("click", playGame));