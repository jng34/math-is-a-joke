import { useState, useEffect } from 'react';

export default function ProblemGen({ setLevel, setCount, setProblem, setAnswer, toggleJokeFetch }) {
  
    useEffect(() => {
      generateMathProb();
    }, [toggleJokeFetch]);
  
    //Easy - 20s, Medium = 15s, Hard = 10s
    function diffLevel() {
        const difficulty = [10, 15, 20];
        let i = Math.floor(Math.random() * 3);
        setLevel(difficulty[i]);
        setCount(difficulty[i]);
    }

    //Generate numbers for math problem
    const num1 = Math.floor(Math.random() * 100 + 1);
    const num2 = Math.floor(Math.random() * 50 + 1);

    //Create array of divisors for division with integer quotients
    function createDivisors(n) {
        let divisors = [];
        for (let i = 1; i <= num1; i++) {
        if (num1 % i === 0) {
            divisors.push(i);
        }
        }
        return divisors;
    }

    //Generate math problem - basic operations
    function generateMathProb() {
        const operations = ["+", "-", "*", "/"];
        let index = Math.floor(Math.random() * 4);
        let mathOper = operations[index];
        if (mathOper === "/") {
        //Division - whole integer quotients
        const divisors = createDivisors(num1);
        let divIndex = Math.floor(Math.random() * divisors.length);
        let divProb = `${num1} ÷ ${divisors[divIndex]}`;
        setProblem(divProb);
        setAnswer(num1 / divisors[divIndex]);
        } else if (mathOper === "*") {
        let multiplier = Math.floor(Math.random() * (num1 / 2) + 1);
        let multProb = `${num1} × ${multiplier}`;
        setProblem(multProb);
        setAnswer(num1 * multiplier);
        } else if (mathOper === "-") {
        //Subtraction - no negative answers
        if (num1 > num2) {
            let subtraction1 = `${num1} ${mathOper} ${num2}`;
            setProblem(subtraction1);
            setAnswer(num1 - num2);
        } else if (num2 > num1) {
            let subtraction2 = `${num2} ${mathOper} ${num1}`;
            setProblem(subtraction2);
            setAnswer(num2 - num1);
        }
        } else {
        let randomProb = `${num1} ${mathOper} ${num2}`;
        setProblem(randomProb);
        setAnswer(num1 + num2);
        }
    }

  return <>hello</>;
}