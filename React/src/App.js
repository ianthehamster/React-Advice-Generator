import { useEffect, useState } from "react"; // 
/*imports 'useEffect' and 'useState' hooks from the "react" package. 
* The hooks are used for managing state and performing side effects in React components
*/

export default function App() {
  // we then declare and export a default React functional component named 'App'
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  /* we use the 'useState' hook to declare two state variables, 'advice' and 'count', 
  and their corresponding setter functions 'setAdvice' and 'setCount'. 
  * The initial value of 'advice' is an empty string, and the initial value of 'count' is 0
  */

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }
  /* we declare an asynchronous function 'getAdvice' that makes an HTTP request to the API url to fetch advice 
  * we use the fetch function to make the request and await keyword to wait for the response \
  * The response is then parsed as JSON using the json() method. 
  * The retrieved advice is set using 'setAdvice' and the count is incremented by 1 using the 'setCount' function 
  */

  useEffect(function () {
    getAdvice();
  }, []);
  /*
  * 'useEffect' hook is used to perform side effects in the component. It has 2 arguments
  * The first argument is a function which will be executed after the component has rendered. It calls the 'getAdvice' function to fetch advice
  * The second argument, [], is an empty array, which means the effect will only run once
  */

  // JSX (JavaScript XML that defines the component's UI)
  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count} />
    </div>
  );
  /* this JSX returns a div element containing an h1 element that displays the 'advice' state variable
   * also returns a button with an 'onClick' event that triggers getAdvice() function 
   * a custom 'Message' component with a prop 'count' set to the 'count' state variable
   */
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}

/* 'Message' is a separate functional component 
 * it accepts 'props' as its argument and renders a paragraph element displaying the count of advice pieces read, which is received through the 'props' object
 */
