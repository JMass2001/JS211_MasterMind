"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let solution = "";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess, solution) => {
  const solutionArray = solution.split("");
  const guessArray = guess.split("");

  let exactMatches = 0;
  let inexactMatches = 0;

  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === solutionArray[i]) {
      exactMatches++;
      solutionArray[i] = null;
    }
  }

  for (let i = 0; i < guessArray.length; i++) {
    let foundIndex = solutionArray.indexOf(guessArray[i]);
    if (foundIndex > -1 && guessArray[i] !== null) {
      inexactMatches++;
      solutionArray[foundIndex] = null;
    }
  }

  return `${exactMatches}-${inexactMatches}`;
};

const validateGuess = (guess) => {
  if (guess.length !== 4) {
    return false;
  }

  for (let i = 0; i < guess.length; i++) {
    if (!letters.includes(guess[i])) {
      return false;
    }
  }

  return true;
};

//Mastermind UI Feedback Functions\\

const mastermind = (guess) => {
  if (!validateGuess(guess)) {
    console.log("Invalid guess. Please enter four letters from a-h.");
    return "Invalid guess.";
  }

  let hint = generateHint(guess, solution);

  console.log(hint);

  board.push(`${guess} - ${hint}`);

  printBoard();

  if (guess === solution) {
    console.log("Congratulations, you cracked the code!");
    return "You guessed it!";
  }

  return `Try again: Guess - ${guess}, Hint - ${hint}`;
};

if (typeof describe === "function") {
} else {
  generateSolution();

  getPrompt();
}

const getPrompt = () => {
  rl.question("guess: ", (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === "function") {
  solution = "abcd";
  describe("#mastermind()", () => {
    it("should register a guess and generate hints", () => {
      mastermind("aabb");
      assert.equal(board.length, 1);
    });
    it("should be able to detect a win", () => {
      assert.equal(mastermind(solution), "You guessed it!");
    });
  });

  describe("#generateHint()", () => {
    it("should generate hints", () => {
      const guess = "abdc";
      const solution = "abcd";
      const hint = generateHint(guess, solution);
      assert.equal(hint, "2-2");
    });

    it("should generate hints if solution has duplicates", () => {
      const guess = "aabb";
      const solution = "aabb";
      const hint = generateHint(guess, solution);
      assert.equal(hint, "4-0");
    });
  });
} else {
  generateSolution();
  getPrompt();
}
