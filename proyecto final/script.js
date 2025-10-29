// ====== MODO OSCURO ======
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  darkModeBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// ====== CAMBIO DE MOOD EN HOMEPAGE ======
const moods = document.querySelectorAll('.mood');
const hero = document.querySelector('.hero');

if (hero && moods.length > 0) {
  const originalHeroHTML = hero.innerHTML;
  const originalBackground = 'linear-gradient(120deg, #ff6b81, #8e44ad)';

  moods.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      hero.style.transition = 'background 0.6s ease';
      hero.style.background = color;
      hero.innerHTML = `
        <h2>${btn.textContent}</h2>
        <p>🎥 Películas recomendadas para este mood próximamente...</p>
        <button id="backBtn" class="btn">⬅️ Volver al inicio</button>
      `;

      const backBtn = document.getElementById('backBtn');
      backBtn.addEventListener('click', () => {
        hero.innerHTML = originalHeroHTML;
        hero.style.transition = 'background 1s ease';
        hero.style.background = originalBackground;
      });
    });
  });
}

// ====== PUBLICAR EN LA COMUNIDAD ======
const postBtn = document.getElementById('postBtn');
const postInput = document.getElementById('postInput');
const postFeed = document.getElementById('postFeed');

if (postBtn && postInput && postFeed) {
  postBtn.addEventListener('click', () => {
    const text = postInput.value.trim();
    if (text === '') return;

    const post = document.createElement('div');
    post.classList.add('post');
    const now = new Date().toLocaleString('es-ES');
    post.innerHTML = `
      <p>${text}</p>
      <small>Publicado el ${now}</small>
    `;

    const noPosts = document.querySelector('.no-posts');
    if (noPosts) noPosts.remove();

    postFeed.prepend(post);
    postInput.value = '';
  });
}

// ====== TRIVIA MARVEL ======
function startMarvelTrivia() {
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options');
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');

  if (!questionElement || !optionsContainer) return; // seguridad

  const quiz = [
    {
      question: "¿Quién fue el primer Vengador en aparecer en el MCU?",
      options: ["Iron Man", "Capitán América", "Hulk", "Thor"],
      answer: "Iron Man"
    },
    {
      question: "¿Cuál es el nombre del martillo de Thor?",
      options: ["Mjölnir", "Stormbreaker", "Ragnarok", "Asgardian"],
      answer: "Mjölnir"
    },
    {
      question: "¿En qué película aparece por primera vez Thanos?",
      options: ["The Avengers (2012)", "Guardians of the Galaxy", "Avengers: Age of Ultron", "Avengers: Endgame"],
      answer: "The Avengers (2012)"
    },
    {
      question: "¿Cuál es el nombre real de Black Panther?",
      options: ["T'Challa", "M'Baku", "Okoye", "N'Jadaka"],
      answer: "T'Challa"
    },
    {
      question: "¿Quién sacrifica su vida por la Gema del Alma en Endgame?",
      options: ["Natasha Romanoff", "Tony Stark", "Steve Rogers", "Hawkeye"],
      answer: "Natasha Romanoff"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  loadQuestion();

  function loadQuestion() {
    const q = quiz[currentQuestion];
    questionElement.textContent = q.question;
    optionsContainer.innerHTML = '';
    feedback.textContent = '';

    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.textContent = option;
      btn.addEventListener('click', () => checkAnswer(option, q.answer, btn));
      optionsContainer.appendChild(btn);
    });

    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
  }

  function checkAnswer(selected, correct, btn) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => (b.disabled = true));

    if (selected === correct) {
      btn.classList.add('correct');
      feedback.textContent = '✅ ¡Correcto!';
      score++;
    } else {
      btn.classList.add('incorrect');
      feedback.textContent = `❌ Incorrecto. La respuesta correcta era: ${correct}`;
    }

    if (currentQuestion < quiz.length - 1) {
      nextBtn.style.display = 'inline-block';
    } else {
      restartBtn.style.display = 'inline-block';
      feedback.textContent += ` — Puntaje final: ${score}/${quiz.length}`;
    }
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
  });

  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
  });
}

// Ejecutar trivia solo cuando se esté en la página de Trivia
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("quiz-container")) {
    startMarvelTrivia();
  }
});

// ====== RELACIÓN ENTRE MOOD Y PELÍCULAS ======
const moodButtons = document.querySelectorAll('.mood');
const movieCards = document.querySelectorAll('.movie-card');

if (moodButtons.length > 0 && movieCards.length > 0) {
  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.textContent.toLowerCase();

      movieCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();

        if (
          (mood.includes('romántico') && title.includes('la la land')) ||
          (mood.includes('romántico') && title.includes('pride')) ||
          (mood.includes('energético') && title.includes('avengers')) ||
          (mood.includes('nostálgico') && title.includes('coco')) ||
          (mood.includes('triste') && title.includes('interstellar'))
        ) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      const msg = document.createElement('p');
      msg.textContent = `🎭 Mostrando películas para un estado de ánimo: ${btn.textContent}`;
      msg.classList.add('mood-msg');
      const oldMsg = document.querySelector('.mood-msg');
      if (oldMsg) oldMsg.remove();
      const moviesSection = document.querySelector('.movies');
      if (moviesSection) {
        moviesSection.insertBefore(msg, document.querySelector('.movie-grid'));
      }
    });
  });
}