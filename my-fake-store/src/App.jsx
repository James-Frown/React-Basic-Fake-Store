import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // API = // https://fakestoreapi.com/products
  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      console.log("This is the response json", json);

      if (response.status === 429) {
        console.log("====================================");
        console.log("this is the response message", response.status);
        console.log("====================================");
        setData(json.data);
      } else {
        console.log("The response message is valid");
        setData(json);
      }
    } catch (error) {
      setData(data);
      setLoading(false);

      console.error("HERE IS THE ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for data fetching
  useEffect(() => {
    fetchData();
  });

  // rendered data content
  const RenderedContent = () => {
    return (
      <div
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
        {data.map((item) => {
          return (
            <div
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
              <h5>{item.title}</h5>
              <p>{item.category}</p>
              <img
                src={item.image}
                alt={item.description}
                width={"150px"}
                height={"200px"}
              />
              <p>R {item.price}</p>
              <button
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

  // what is rendered to the root element
  return (
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
          <h1 style={{ color: "red", marginTop: "auto", marginBottom: "auto" }}>
            Loading...
          </h1>
        </div>
      ) : (
        <>
          <div
            style={{
              height: "10vh",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)",
            }}
          >
            <h1 style={{ margin: 0, paddingTop: "8px", paddingLeft: "38px" }}>
              StoreRUs
            </h1>
          </div>
          <div
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

// Redux - State Management

// Store (project state)
// User purchases
// User added to carts
// Total Value of Cart
// Increment / Decrement