export default function ChallengeQs() {
  //Easy - 20s, Medium = 15s, Hard = 10s
    function diffLevel() {
      const difficulty = [10, 15, 20];
      let i = Math.floor(Math.random() * 3);
      setLevel(difficulty[i]);
      setCount(difficulty[i]);
    }

    //Generate numbers for math problem
    const num1 = Math.floor(Math.random() * 50 + 1);
    const num2 = Math.floor(Math.random() * 25 + 1);
    const num3 = Math.floor(Math.random() * 25 + 1);

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
    
    const operations = ["+", "-", "×", "÷"];
    const operationsObj = {
      "+": "+", 
      "-": "-", 
      "×": "*", 
      "÷": "/"
    };
    //Generate math problem - basic operations
    function generatePEMDAS() {
      // const operations = ["+", "-", "×", "÷"];
      let index1 = Math.floor(Math.random() * 4);
      let index2 = Math.floor(Math.random() * 4);
      let mathOper1 = operations[index1];
      let mathOper2 = operations[index2];
      
      //generate operations that are not equal to each other
      if (mathOper1 !== mathOper2) {
          //e.g.   21 ÷ 7 + 31
          //structure `${num1}  {mathOper1}  ${num2}  {mathOper2}   ${num3}`
          if (mathOper1 === "÷") {
            //Division - whole integer quotients
            const divisors = createDivisors(num1);
            let divIndex = Math.floor(Math.random() * divisors.length);
            let prob = `${num1} ${mathOper1} ${divisors[divIndex]} ${mathOper2} ${num3}`;
            setProblem(prob);
            
            //Function, like eval, evaluates a string and returns a number
            //safer and faster than eval. DO NOT USE eval!
            let solution = Function(
              "return " +
                `${num1} ${operationsObj[mathOper1]} ${divisors[divIndex]} ${operationsObj[mathOper2]} ${num3}`
            )();
            setAnswer(solution);

          } else if (mathOper2 === "÷") {
              //e.g.  18 x 32 / 4
              let prob = `${num3} ${mathOper1} ${num1} ${mathOper2} ${divisors[divIndex]}`;
              setProblem(prob);
              let solution = Function(
                  "return " +
                  `${num3} ${operationsObj[mathOper1]} ${num1} ${operationsObj[mathOper2]} ${divisors[divIndex]}`
              )();
              setAnswer(solution);
          
            //Multiplication, addition and subtraction
          } else if (mathOper1 !== "÷" && mathOper2 !== "÷") {
            //set non division problem to state
            let prob = `${num1} ${mathOper1} ${num2} ${mathOper2} ${num3}`;
            setProblem(prob);
            
            //set solution 
            let solution = Function(
            "return " +
            `${num1} ${operationsObj[mathOper1]} ${num2} ${operationsObj[mathOper2]} ${num3}`
            )();
            setAnswer(solution);
          } 
          
      } else {
          //else run the generator fn again - recursion
          generatePEMDAS();
      }
    }

    return <div>Challenge Questions</div>;
}

