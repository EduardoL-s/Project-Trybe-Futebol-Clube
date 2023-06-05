interface matchForm {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

function calculateTotalPoints(matches: matchForm[]) {
  const result = matches.map((element) => {
    if (element.homeTeamGoals > element.awayTeamGoals) {
      return +3;
    }

    if (element.homeTeamGoals === element.awayTeamGoals) {
      return +1;
    }
    return +0;
  });

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateTotalVictories(matches: matchForm[]) {
  const result = matches.map((element) => {
    if (element.homeTeamGoals > element.awayTeamGoals) {
      return 1;
    }
    return +0;
  });

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateTotalLosses(matches: matchForm[]) {
  const result = matches.map((element) => {
    if (element.homeTeamGoals < element.awayTeamGoals) {
      return 1;
    }
    return +0;
  });

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateTotalDraws(matches: matchForm[]) {
  const result = matches.map((element) => {
    if (element.homeTeamGoals === element.awayTeamGoals) {
      return 1;
    }
    return +0;
  });

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateTotalGoalsFavor(matches: matchForm[]) {
  const result = matches.map((element) => element.homeTeamGoals);

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateTotalGoalsOwn(matches: matchForm[]) {
  const result = matches.map((element) => element.awayTeamGoals);

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

export {
  calculateTotalPoints,
  calculateTotalVictories,
  calculateTotalLosses,
  calculateTotalDraws,
  calculateTotalGoalsFavor,
  calculateTotalGoalsOwn,
};
