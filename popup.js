document.addEventListener('DOMContentLoaded', function () {
  const speakButton = document.getElementById('speak');

  speakButton.addEventListener('click', function () {
      const text = "Here is the summary of the webpage.";
      speakText(text);
  });

  function speakText(text) {
      if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(text);
          synth.speak(utterance);
      } else {
          alert("Sorry, your browser does not support speech synthesis.");
      }
  }
});
