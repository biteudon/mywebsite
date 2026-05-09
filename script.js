// script.js - Score Upgrader functionality

(function() {
  // ----- TARGET PHRASE (master string for 100% score) -----
  const TARGET_PHRASE = "The quick brown fox jumps over the lazy dog";
  
  // DOM elements
  const textarea = document.getElementById('userInput');
  const calcBtn = document.getElementById('calcBtn');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const resultDiv = document.getElementById('result');
  const targetSpan = document.getElementById('targetPhraseDisplay');
  
  // set the target phrase inside span
  targetSpan.textContent = TARGET_PHRASE;

  // ---------- Helper: compute similarity score (0-100) based on character-wise positional match ----------
  function computeScore(inputText, targetText) {
    if (!inputText && !targetText) return 100;
    if (!inputText) return 0;
    
    const input = inputText;
    const target = targetText;
    
    // EXACT MATCH -> instant 100%
    if (input === target) {
      return 100;
    }
    
    // position-based matching score
    const minLen = Math.min(input.length, target.length);
    let matchingChars = 0;
    for (let i = 0; i < minLen; i++) {
      if (input[i] === target[i]) {
        matchingChars++;
      }
    }
    
    const maxLen = Math.max(input.length, target.length);
    let rawScore = (matchingChars / maxLen) * 100;
    
    rawScore = Math.min(100, Math.max(0, rawScore));
    return Math.round(rawScore * 100) / 100;
  }
  
  // Function to update UI with score based on current textarea value
  function updateScoreDisplay() {
    const currentText = textarea.value;
    const score = computeScore(currentText, TARGET_PHRASE);
    
    let displayScore;
    if (Number.isInteger(score)) {
      displayScore = score;
    } else {
      displayScore = score.toFixed(2);
    }
    
    if (score === 100) {
      resultDiv.innerHTML = `🏆 PERFECT 100% 🏆<br>✨ EXACT MATCH ✨`;
      resultDiv.style.color = "#0f0";
      resultDiv.style.textShadow = "0 0 6px #00ff00";
    } else {
      resultDiv.innerHTML = `📈 SCORE: ${displayScore}%`;
      resultDiv.style.color = "#0f0";
      resultDiv.style.textShadow = "none";
      if (score < 30) {
        resultDiv.style.color = "#ffaa66";
      } else {
        resultDiv.style.color = "#0f0";
      }
    }
    return score;
  }
  
  // UPGRADE FUNCTION: sets textarea to EXACT target phrase, then updates score → 100%
  function upgradeToHundred() {
    textarea.value = TARGET_PHRASE;
    const newScore = computeScore(TARGET_PHRASE, TARGET_PHRASE);
    resultDiv.innerHTML = `🏆 PERFECT 100% 🏆<br>✨ UPGRADED SUCCESSFULLY ✨`;
    resultDiv.style.color = "#0f0";
    resultDiv.style.textShadow = "0 0 8px #00ff80";
    textarea.style.borderColor = "#00ff80";
    textarea.style.transition = "0.2s";
    setTimeout(() => {
      textarea.style.borderColor = "#3a3a4a";
    }, 600);
    console.log("✅ UPGRADE ACTIVATED: Score set to 100% !");
  }
  
  // Enhanced calculate with micro-interaction
  function calculateAndShow() {
    const currentText = textarea.value;
    const score = computeScore(currentText, TARGET_PHRASE);
    
    let displayVal;
    if (Number.isInteger(score)) {
      displayVal = score;
    } else {
      displayVal = score.toFixed(2);
    }
    
    if (score === 100) {
      resultDiv.innerHTML = `🏆 PERFECT 100% 🏆<br>⭐ AMAZING EXACT MATCH! ⭐`;
      resultDiv.style.color = "#0f0";
      resultDiv.style.textShadow = "0 0 6px #00ff00";
    } else {
      resultDiv.innerHTML = `📊 SCORE: ${displayVal}%`;
      if (score < 30) {
        resultDiv.style.color = "#ffaa66";
      } else if (score >= 70) {
        resultDiv.style.color = "#aaffaa";
      } else {
        resultDiv.style.color = "#0f0";
      }
      if (score < 100 && score > 0) {
        resultDiv.style.transform = "scale(1.01)";
        setTimeout(() => { resultDiv.style.transform = ""; }, 200);
      }
    }
    return score;
  }
  
  // live update while typing
  function attachLiveUpdate() {
    textarea.addEventListener('input', function() {
      const currentText = textarea.value;
      const liveScore = computeScore(currentText, TARGET_PHRASE);
      let showScore;
      if (Number.isInteger(liveScore)) {
        showScore = liveScore;
      } else {
        showScore = liveScore.toFixed(2);
      }
      
      if (liveScore === 100) {
        resultDiv.innerHTML = `🏆 PERFECT 100% 🏆<br>🎯 EXACT MATCH! 🎯`;
        resultDiv.style.color = "#0f0";
        resultDiv.style.textShadow = "0 0 5px #0f0";
      } else {
        resultDiv.innerHTML = `📈 SCORE: ${showScore}%`;
        if (liveScore < 30) resultDiv.style.color = "#ffaa66";
        else if (liveScore >= 85) resultDiv.style.color = "#b3ffb3";
        else resultDiv.style.color = "#0f0";
      }
    });
  }
  
  // Event listeners
  calcBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateAndShow();
    calcBtn.style.transform = "scale(0.97)";
    setTimeout(() => { calcBtn.style.transform = ""; }, 120);
  });
  
  upgradeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    upgradeToHundred();
    resultDiv.style.animation = "none";
    resultDiv.offsetHeight; // reflow
    resultDiv.style.animation = "glowPulse 0.5s ease";
    setTimeout(() => {
      resultDiv.style.animation = "";
    }, 500);
  });
  
  // Add keyframe animation style (if not already present in CSS)
  if (!document.querySelector('#dynamic-keyframes')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "dynamic-keyframes";
    styleSheet.textContent = `
      @keyframes glowPulse {
        0% { text-shadow: 0 0 0px #0f0; opacity: 0.9; transform: scale(1);}
        50% { text-shadow: 0 0 20px #0f0, 0 0 8px #0f0; opacity: 1; transform: scale(1.02);}
        100% { text-shadow: 0 0 0px #0f0; opacity: 1; transform: scale(1);}
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Set initial placeholder and score display
  textarea.value = "";
  const initialScore = computeScore("", TARGET_PHRASE);
  if (initialScore === 0) {
    resultDiv.innerHTML = `📈 SCORE: 0%`;
    resultDiv.style.color = "#ffaa66";
  } else {
    resultDiv.innerHTML = `📈 SCORE: ${initialScore}%`;
  }
  
  textarea.placeholder = '✏️ Type the target phrase exactly as shown above...\nOr just click "UPGRADE TO 100%"!';
  
  attachLiveUpdate();
  console.log("🔥 SCORE UPGRADE SYSTEM READY 🔥 | Target phrase loaded, upgrade button gives 100% instantly!");
})();