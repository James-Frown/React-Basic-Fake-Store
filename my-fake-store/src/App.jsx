// importing useEffect & useState
import { useEffect, useState } from "react";

// app function where most of the code is kept
const App = () => {
  // declaring data & setData
  // data is = an empty useState array
  const [data, setData] = useState([]);
  // declaring loading & setLoading
  // loading is = a true useState boolean
  const [loading, setLoading] = useState(true);

  // decalring a fetch function
  // gets information from an API
  // the API endpoint is 
  // https://fakestoreapi.com/products
  // the function is an async arrow function
  // async allows for tasks, functions or operations to proceed independently and concurrently, 
  // without blocking the execution of the main program or 
  // waiting for each task to complete before moving on to the next one.
  const fetchData = async () => {
    // The try statement lets you test a block of code for errors. 
    // The throw statement lets you create custom errors. 
    try {
      // response is a const that = the raw data from the API
      // await is used to wait for a Promise and get its fulfillment value
      // ie: the Fake Store API data
      // It can only be used inside an async function or at the top level of a module.
      const response = await fetch("https://fakestoreapi.com/products");
      // json is a const that = json data formulate from the raw API data
      // it is just a simple JavaScript object where the properties and values are wrapped around double-quotes
      // it also uses the await operator to promise data
      // response.json() returns a promise which resolves with the result of parsing the body text as JSON
      const json = await response.json();
      // console.log is an operation that tells the console to return a value
      // in this case we are returning the json response as an appended string & const
      console.log("This is the response json", json);

      // is operates as a check
      // in this case we are checking that the const response status is equal (strict) to 429
      // the status of 429 indicates if the user has sent too many requests
      if (response.status === 429) {
        console.log("====================================");
        // the response the console sends is of the status of the API call
        console.log("this is the response message", response.status);
        console.log("====================================");
        // here we are using the setting function from useSate to set Data
        // we are setting the const data to json.data
        setData(json.data);
        // here we are also including an else statement which will occure if the status is not 429
      } else {
        // if the response was not 429 then he response was valid
        console.log("The response message is valid");
        // here we are setting the const data to the const json we parsed the API to
        setData(json);
      }

      // The catch statement lets you handle the error. 
      // error is a js operator that catches errors
    } catch (error) {
      // here we are setting data to data
      setData(data);
      // also we are setting the loading state to false
      setLoading(false);

      // this is a response in the consle of what the error was
      console.error("HERE IS THE ERROR", error);
      // The final statement lets you execute code, after try and catch, regardless of the result.
    } finally {
      // this ends the loading state
      setLoading(false);
    }
  };

  // useEffect hook allows you to preform side effects in components
  // ie: fetching data, directly updating the dom, timers
  // useEffect usally takes in two arguments
  // they are <a function> and a <dependacy>
  useEffect(() => {
    // calls the function to fetch data 
    fetchData();
  });

  // this is a function that renders the data into content
  const RenderedContent = () => {
    return (
      <div
        // this is just some styling to the contanier
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          marginLeft: "auto",
          marginRight: "auto",
          gap: "24px",
        }}
      >
        {/* map is a type of data structure or data collection */}
        {/* that is used to store the data in the form of key and value pairs */}
        {/* item is the individual object or list item and data is the item list */}
        {data.map((item) => {
          return (
            <div
              // this is just some styling to the item
              // the key is the items unique identifier
              // this is required in the map function
              // the item.id is the unique id/key
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                color: "black",
                width: "300px",
                height: "auto",
                gap: "16px",
                border: "1px solid grey",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h5
              // this is just some styling to the title
              >{item.title}</h5>
              <p
              // this is just some styling to the catagory
              >{item.category}</p>
              <img
                src={item.image}
                alt={item.description}
                width={"150px"}
                height={"200px"}
              />
              <p
              // this is just some styling to the price
              >R {item.price}</p>
              <button
                // this is just some styling to the buy button
                style={{
                  width: "200px",
                  height: "50px",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "orange",
                  color: "white",
                }}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // this is what will be rendered to the root element
  return (
    // this is a fragment
    // they let you render items into a larger group
    // it help with optimization & rendering
    // fragments let you group a list of childerne without adding extra nodes to the dom
    // you can think of them as div's without the extras
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100vh",
          }}
        >
          <div
            className="lds-spinner"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1
            // this is just styling for the loading component that renders when laoding is set to true
            style={{
              color: "black",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Loading...
          </h1>
        </div>
      ) : (
        <>
          <div
            // this is just styling for the main component that renders when laoding is set to fale
            style={{
              height: "10vh",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)",
            }}
          >
            <h1
              // this is just styling for the title of the page
              style={{ margin: 0, paddingTop: "8px", paddingLeft: "38px" }}>
              StoreRUs
            </h1>
          </div>
          <div
            // this is just styling for the content component that contains all of the processed API data
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <RenderedContent />
          </div>
        </>
      )}
    </>
  );
};

export default App;