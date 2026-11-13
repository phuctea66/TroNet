/**
 * Roommate Compatibility Scoring Algorithm
 * Calculates weighted match score (0 - 100%) between two profiles
 * Returns granular breakdown of matched and unmatched criteria
 */

export function calculateCompatibility(myProfile, targetProfile) {
  if (!myProfile || !targetProfile) {
    return {
      score: 0,
      level: 'Unknown',
      matches: [],
      mismatches: [
        { label: 'Profile Missing', detail: 'Complete your profile to see compatibility.' }
      ]
    };
  }

  let totalWeight = 0;
  let earnedScore = 0;
  const matches = [];
  const mismatches = [];

  // 1. Area Alignment (Weight: 25)
  const AREA_WEIGHT = 25;
  totalWeight += AREA_WEIGHT;
  if (myProfile.area && targetProfile.area) {
    if (myProfile.area.toLowerCase() === targetProfile.area.toLowerCase()) {
      earnedScore += AREA_WEIGHT;
      matches.push({
        label: 'Location Match',
        detail: `Both looking in ${myProfile.area}`
      });
    } else {
      mismatches.push({
        label: 'Different Areas',
        detail: `You: ${myProfile.area} vs. Them: ${targetProfile.area}`
      });
    }
  }

  // 2. Budget Compatibility (Weight: 25)
  const BUDGET_WEIGHT = 25;
  totalWeight += BUDGET_WEIGHT;
  const myBudget = Number(myProfile.budget) || 0;
  const targetBudget = Number(targetProfile.budget) || (Number(targetProfile.costPerPerson) || 0);

  if (myBudget > 0 && targetBudget > 0) {
    const diffRatio = Math.abs(myBudget - targetBudget) / Math.max(myBudget, targetBudget);
    if (diffRatio <= 0.15) {
      earnedScore += BUDGET_WEIGHT;
      matches.push({
        label: 'Budget Alignment',
        detail: `Budgets are closely matched (~${(targetBudget / 1000000).toFixed(1)}M VND/month)`
      });
    } else if (diffRatio <= 0.35) {
      const partial = Math.round(BUDGET_WEIGHT * 0.6);
      earnedScore += partial;
      matches.push({
        label: 'Flexible Budget',
        detail: `Moderate budget difference (~${Math.abs(myBudget - targetBudget).toLocaleString()} VND)`
      });
    } else {
      mismatches.push({
        label: 'Budget Gap',
        detail: `Your budget: ${(myBudget / 1000000).toFixed(1)}M vs. Their budget: ${(targetBudget / 1000000).toFixed(1)}M`
      });
    }
  }

  // 3. Move-in Timeline (Weight: 15)
  const TIMELINE_WEIGHT = 15;
  totalWeight += TIMELINE_WEIGHT;
  if (myProfile.moveInDate && targetProfile.moveInDate) {
    const d1 = new Date(myProfile.moveInDate);
    const d2 = new Date(targetProfile.moveInDate);
    const diffDays = Math.abs((d1 - d2) / (1000 * 60 * 60 * 24));

    if (diffDays <= 15) {
      earnedScore += TIMELINE_WEIGHT;
      matches.push({
        label: 'Synchronized Move-in',
        detail: 'Expected move-in dates are within 2 weeks of each other'
      });
    } else if (diffDays <= 45) {
      const partial = Math.round(TIMELINE_WEIGHT * 0.5);
      earnedScore += partial;
      matches.push({
        label: 'Close Move-in Window',
        detail: `Move-in dates differ by around ${Math.round(diffDays)} days`
      });
    } else {
      mismatches.push({
        label: 'Timeline Variance',
        detail: `Move-in dates are more than a month apart`
      });
    }
  }

  // 4. Lifestyle & Habit Factors (Weight: 35)
  const habitsList = [
    { key: 'sleep', weight: 8, label: 'Sleep Schedule' },
    { key: 'smoking', weight: 8, label: 'Smoking Preference' },
    { key: 'cleanliness', weight: 7, label: 'Cleanliness Standard' },
    { key: 'pets', weight: 4, label: 'Pet Policy' },
    { key: 'cooking', weight: 4, label: 'Cooking Routine' },
    { key: 'guests', weight: 4, label: 'Hosting Visitors' }
  ];

  const myHabits = myProfile.habits || {};
  const theirHabits = targetProfile.habits || {};

  habitsList.forEach(({ key, weight, label }) => {
    totalWeight += weight;
    const v1 = myHabits[key];
    const v2 = theirHabits[key];

    if (v1 && v2) {
      if (v1 === v2) {
        earnedScore += weight;
        matches.push({
          label: `${label} Match`,
          detail: `Shared preference: ${formatHabitText(key, v1)}`
        });
      } else if (isHabitCompatible(key, v1, v2)) {
        const half = Math.round(weight * 0.7);
        earnedScore += half;
        matches.push({
          label: `${label} Compatible`,
          detail: `Complementary habits: ${formatHabitText(key, v1)} & ${formatHabitText(key, v2)}`
        });
      } else {
        mismatches.push({
          label: `${label} Difference`,
          detail: `You: ${formatHabitText(key, v1)} | Them: ${formatHabitText(key, v2)}`
        });
      }
    }
  });

  const finalScore = Math.min(100, Math.max(0, Math.round((earnedScore / totalWeight) * 100)));

  let level = 'Low';
  if (finalScore >= 80) level = 'Excellent Match';
  else if (finalScore >= 65) level = 'Great Match';
  else if (finalScore >= 50) level = 'Moderate Match';

  return {
    score: finalScore,
    level,
    matches,
    mismatches
  };
}

function isHabitCompatible(key, v1, v2) {
  if (key === 'sleep' && (v1 === 'flexible' || v2 === 'flexible')) return true;
  if (key === 'smoking' && (v1 === 'no-smoking' && v2 === 'balcony-only')) return true;
  if (key === 'pets' && (v1 === 'cat-friendly' && v2 === 'any-pets')) return true;
  if (key === 'cleanliness' && ((v1 === 'very-clean' && v2 === 'moderate') || (v1 === 'moderate' && v2 === 'very-clean'))) return true;
  if (key === 'guests' && (v1 === 'rarely' && v2 === 'weekends')) return true;
  return false;
}

export function formatHabitText(key, value) {
  const map = {
    'night-owl': 'Night Owl (sleeps late)',
    'early': 'Early Bird (sleeps early)',
    'flexible': 'Flexible Schedule',
    'no-smoking': 'Non-Smoker',
    'balcony-only': 'Balcony Only',
    'smoking-ok': 'Smoker / OK',
    'no-pets': 'No Pets',
    'cat-friendly': 'Cat Friendly',
    'dog-friendly': 'Dog Friendly',
    'any-pets': 'Pet Friendly',
    'cooks-daily': 'Cooks Daily',
    'occasional': 'Cooks Occasionally',
    'eats-out': 'Usually Eats Out',
    'very-clean': 'Very Clean & Neat',
    'moderate': 'Moderately Clean',
    'relaxed': 'Relaxed',
    'rarely': 'Rarely Hosts Guests',
    'weekends': 'Weekend Guests OK'
  };
  return map[value] || value;
}
