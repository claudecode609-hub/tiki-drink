import { AXIS_KEYS } from '../data/axisLabels';

export function computeUserScores(answers, questions) {
  const totals = {};
  AXIS_KEYS.forEach(key => { totals[key] = 0; });

  for (const { questionId, selectedAnswerIndex } of answers) {
    const question = questions.find(q => q.id === questionId);
    if (!question) continue;
    const answerScores = question.answers[selectedAnswerIndex].scores;
    AXIS_KEYS.forEach(key => {
      totals[key] += answerScores[key] || 0;
    });
  }

  return totals;
}

export function normalizeScores(rawScores, questionCount = 20, maxPerQuestion = 3) {
  // Use a more aggressive normalization to spread results further out.
  // Instead of dividing by theoretical max (60), use a practical expected max (~24).
  // This means even moderate leanings show up clearly on the sliders.
  const practicalMax = questionCount * maxPerQuestion * 0.4; // ~24
  const normalized = {};
  AXIS_KEYS.forEach(key => {
    normalized[key] = Math.max(-10, Math.min(10,
      (rawScores[key] / practicalMax) * 10
    ));
  });
  return normalized;
}

export function euclideanDistance(userScores, drinkCoordinates) {
  let sumOfSquares = 0;
  AXIS_KEYS.forEach(key => {
    const diff = (userScores[key] || 0) - (drinkCoordinates[key] || 0);
    sumOfSquares += diff * diff;
  });
  return Math.sqrt(sumOfSquares);
}

const MAX_DISTANCE = Math.sqrt(5 * Math.pow(20, 2));

export function matchPercentage(distance) {
  return Math.round((1 - distance / MAX_DISTANCE) * 100);
}

export function findMatchingDrinks(normalizedUserScores, drinks) {
  const ranked = drinks.map(drink => ({
    ...drink,
    distance: euclideanDistance(normalizedUserScores, drink.coordinates),
    matchPct: matchPercentage(euclideanDistance(normalizedUserScores, drink.coordinates)),
  }));
  ranked.sort((a, b) => a.distance - b.distance);
  return ranked;
}

export function getResults(answers, questions, drinks, questionCount) {
  const raw = computeUserScores(answers, questions);
  const normalized = normalizeScores(raw, questionCount || answers.length);
  const ranked = findMatchingDrinks(normalized, drinks);

  return {
    userScores: normalized,
    topDrink: ranked[0],
    runnerUps: ranked.slice(1, 3),
    allRanked: ranked,
  };
}
