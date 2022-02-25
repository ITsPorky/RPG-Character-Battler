// Common methods and functions

const initiateBattle = () => {
  let battlelog = [];
  battlelog.push(`Combat has been initiated!`);

  return battlelog;
};

const startBattle = (character, enemy) => {
  let battlelog = [];
  battlelog.push(`${character.name} and ${enemy.name} engage in combat.`);

  // Initiative
  let initiative = rollInitiative(2);
  if (initiative === true) {
    battlelog.push(`${character.name} rolls ${initiative[0]} for initiative.`);
    battlelog.push(`${enemy.name} rolls ${initiative[1]} for initiative.`);
  } else {
    battlelog.push(`${character.name} rolls ${initiative[0]} for initiative.`);
    battlelog.push(`${enemy.name} rolls ${initiative[1]} for initiative.`);
  }

  // Attack Phase
  while (character.hp > 0 && enemy.hp > 0) {
    if (initiative[2] === true) {
      battlelog.push(...takeTurn(character, enemy));
      battlelog.push(...takeTurn(enemy, character));
    } else {
      battlelog.push(...takeTurn(enemy, character));
      battlelog.push(...takeTurn(character, enemy));
    }
  }

  // End Battle
  if (character.hp <= 0) {
    battlelog.push(`${character.name} has died in combat`);
  } else if (enemy.hp <= 0) {
    battlelog.push(`${enemy.name} has died in combat`);
  }

  return battlelog;
};

const takeTurn = (player, enemy) => {
  let log = [];
  if (player.hp > 0) {
    log = doAttackRound(player, enemy);
  }

  return log;
};

const doAttackRound = (character, enemy) => {
  let log = [];
  log.push(`It is ${character.name}'s turn.`);
  let attacklog1 = attack(character, enemy);
  log.push(...attacklog1);

  return log;
};

const doSpecialRound = (character, enemy) => {
  let log = [];
  log.push(`It is ${character.name}'s turn.`);
  let attacklog1 = specialAttack(character, enemy);
  log.push(...attacklog1);

  return log;
};

const doHealRound = (character) => {
  let log = [];
  log.push(`It is ${character.name}'s turn.`);
  let attacklog1 = heal(character);
  log.push(...attacklog1);

  return log;
};

const doFleeRound = (enemy) => {
  let playerHit = rollDice(20);

  if (playerHit >= enemy.ac) {
    return true;
  } else {
    return false;
  }
};

const rollDice = (numberOfSides, numberOfRolls = 1) => {
  let total = 0;
  for (let i = 0; i < numberOfRolls; i++) {
    let roll = Math.floor(Math.random() * numberOfSides) + 1;
    total += roll;
  }
  return total;
};

const attack = (character, enemy) => {
  let log = [];
  let playerHit = rollDice(20);
  // Crit
  if (playerHit === 20) {
    let damage =
      getRollType(character.weapon.damage) +
      getRollType(character.weapon.damage) +
      character.weapon.modifier;
    enemy.hp -= damage;
    log.push(
      `${character.name} lands a critical hit to ${enemy.name} with their ${character.weapon.type} causing ${damage} points of damage!`
    );
  } else if (playerHit >= enemy.ac) {
    // Normal hit
    let damage =
      getRollType(character.weapon.damage) + character.weapon.modifier;
    enemy.hp -= damage;
    log.push(
      `${character.name} hits ${enemy.name} with their ${character.weapon.type} for ${damage} points of damage!`
    );
  } else {
    // Miss
    log.push(`${character.name} misses their attack!`);
  }
  log.push(`${enemy.name} has ${enemy.hp} points of HP.`);

  return log;
};

const heal = (character) => {
  let log = [];
  let heal = rollDice(4, 2) + 2;
  character.hp += heal;
  log.push(
    `${character.name} healed themselves for ${heal} HP using a common HP potion.`
  );

  return log;
};

const specialAttack = (character, enemy) => {
  let log = [];
  let playerHit = rollDice(20);
  // Crit
  if (playerHit === 20) {
    let damage =
      getRollType(character.weapon.damage) +
      getRollType(character.weapon.damage) +
      character.weapon.modifier;
    enemy.hp -= damage;
    log.push(
      `${character.name} lands a critical hit to ${enemy.name} with their ${character.weapon.type} causing ${damage} points of damage!`
    );
  } else if (playerHit >= enemy.ac) {
    // Normal hit
    let damage =
      getRollType(character.weapon.damage) + character.weapon.modifier;
    enemy.hp -= damage;
    log.push(
      `${character.name} hits ${enemy.name} with their ${character.weapon.type} for ${damage} points of damage!`
    );
  } else {
    // Miss
    log.push(`${character.name} misses their attack!`);
  }
  log.push(`${enemy.name} has ${enemy.hp} points of HP.`);

  return log;
};

const rollInitiative = () => {
  let data = [rollDice(20), rollDice(20)];
  if (data[0] >= data[1]) {
    data.push(true);
    return data; // Player goes first
  } else {
    data.push(false);
    return data; // Enemy goes first
  }
};

const rollInitiative2 = (numberOfEntities) => {
  let data = [];
  for (let i = 0; i < numberOfEntities; i++) {
    data.push(rollDice(20));
  }

  //Highest to lowest
  // data = data.sort((a, b) => b - a);

  if (data[0] >= data[1]) {
    data.push(true);
    return data; // Player goes first
  } else {
    data.push(false);
    return data; // Enemy goes first
  }
};

const getRollType = (value) => {
  switch (value) {
    case "d3":
      return rollDice(3);
    case "d4":
      return rollDice(4);
    case "d6":
      return rollDice(6);
    case "d8":
      return rollDice(8);
    case "d10":
      return rollDice(10);
    case "d12":
      return rollDice(12);
    case "2d3":
      return rollDice(3, 2);
    case "3d3":
      return rollDice(3, 3);
    case "4d3":
      return rollDice(3, 4);
    case "2d4":
      return rollDice(4, 2);
    case "3d4":
      return rollDice(4, 3);
    case "4d4":
      return rollDice(4, 4);
    case "2d6":
      return rollDice(6, 2);
  }
};

module.exports = {
  rollDice,
  attack,
  getRollType,
  doAttackRound,
  doSpecialRound,
  doHealRound,
  doFleeRound,
  startBattle,
  initiateBattle,
  rollInitiative2,
};
