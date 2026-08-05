
const welcomeScreen = document.getElementById("welcomeScreen");
const practiceScreen = document.getElementById("practiceScreen");
const completeScreen = document.getElementById("completeScreen");
const startBtn = document.getElementById("startBtn");
const againBtn = document.getElementById("againBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const card = document.getElementById("card");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const answerPlural = document.getElementById("answerPlural");
const requiredCount = document.getElementById("requiredCount");
const currentWarning = document.getElementById("currentWarning");
const locationNote = document.getElementById("locationNote");
const progressText = document.getElementById("progressText");
const remainingText = document.getElementById("remainingText");
const progressBar = document.getElementById("progressBar");
const ttsEnabled = document.getElementById("ttsEnabled");



let deck = [];
let position = 0;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startPractice() {
  deck = shuffle(window.QUESTIONS);
  position = 0;
  welcomeScreen.classList.add("hidden");
  completeScreen.classList.add("hidden");
  practiceScreen.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  stopSpeaking();

  if (ttsEnabled.checked) {
    setTimeout(speakQuestion, 250);
  }

  const item = deck[position];
  card.classList.remove("flipped");
  previousBtn.disabled = position === 0;
  questionNumber.textContent = `#${item.id}${item.asterisk ? " ★" : ""}`;
  questionText.textContent = item.question;
  answerList.replaceChildren();

  for (const answer of item.answers) {
    const li = document.createElement("li");
    li.textContent = answer;
    answerList.appendChild(li);
  }

  answerPlural.textContent = item.answers.length > 1 ? "S" : "";
  if (item.requiredCount) {
    requiredCount.textContent = `Give ${item.requiredCount} answers`;
    requiredCount.classList.remove("hidden");
  } else {
    requiredCount.classList.add("hidden");
  }
  if (item.locationSpecific) {
    locationNote.textContent = `Location-specific answer: ${item.locationSpecific}`;
    locationNote.classList.remove("hidden");
  } else {
    locationNote.classList.add("hidden");
  }
  currentWarning.classList.toggle("hidden", !item.current);

  const shown = position + 1;
  progressText.textContent = `Question ${shown} of ${deck.length}`;
  remainingText.textContent = `${deck.length - shown} remaining`;
  progressBar.style.width = `${(shown / deck.length) * 100}%`;
  nextBtn.textContent = shown === deck.length ? "Finish" : "Next Question";
}

function nextQuestion() {
  stopSpeaking();

  if (position >= deck.length - 1) {
    practiceScreen.classList.add("hidden");
    completeScreen.classList.remove("hidden");
    restartBtn.classList.add("hidden");
    return;
  }

  position += 1;
  showQuestion();
}

function previousQuestion() {
  stopSpeaking();

  if (position <= 0) {
    return;
  }

  position -= 1;
  showQuestion();
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

function speakText(text) {
  if (!ttsEnabled.checked || !("speechSynthesis" in window)) {
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

function speakQuestion() {
  const item = deck[position];
  speakText(item.question);
}

function speakAnswers() {
  const item = deck[position];

  const prefix = item.requiredCount
    ? `Give ${item.requiredCount} answers. `
    : "";

  speakText(prefix + item.answers.join(". "));
}

card.addEventListener("click", () => {
  const isNowFlipped = !card.classList.contains("flipped");
  card.classList.toggle("flipped");

  if (isNowFlipped) {
    speakAnswers();
  } else {
    speakQuestion();
  }
});

startBtn.addEventListener("click", startPractice);
againBtn.addEventListener("click", startPractice);
restartBtn.addEventListener("click", startPractice);
nextBtn.addEventListener("click", nextQuestion);
previousBtn.addEventListener("click", previousQuestion);

ttsEnabled.checked =
  localStorage.getItem("ttsEnabled") === "true";

ttsEnabled.addEventListener("change", () => {
  localStorage.setItem("ttsEnabled", ttsEnabled.checked);

  if (ttsEnabled.checked) {
    speakQuestion();
  } else {
    stopSpeaking();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}
