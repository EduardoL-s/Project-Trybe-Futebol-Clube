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

  // método para somar os elementos do array disponível em: https://horadecodar.com.br/como-somar-elementos-de-um-array-de-maneira-performaica/

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

function calculateGoalsFavor(matches: matchForm[]) {
  const result = matches.map((element) => element.homeTeamGoals);

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateGoalsOwn(matches: matchForm[]) {
  const result = matches.map((element) => element.awayTeamGoals);

  let total = 0;

  for (let i = 0; i < result.length; i += 1) {
    total += result[i];
  }

  return total;
}

function calculateGoalsBalance(matches: matchForm[]) {
  const GP = calculateGoalsFavor(matches);
  const GC = calculateGoalsOwn(matches);

  return GP - GC;
}

function calculateEfficiency(matches: matchForm[]) {
  const P = calculateTotalPoints(matches);
  const J = matches.length;

  const total = P / (J * 3);
  const porcentagem = total * 100;

  return porcentagem.toFixed(2);
}

export {
  calculateTotalPoints,
  calculateTotalVictories,
  calculateTotalLosses,
  calculateTotalDraws,
  calculateGoalsFavor,
  calculateGoalsOwn,
  calculateGoalsBalance,
  calculateEfficiency,
};
