import { useState } from "react";

const App = () => {
  const [airports] = useState([
    "BGI",
    "CDG",
    "DEL",
    "DOH",
    "DSM",
    "EWR",
    "EYW",
    "HND",
    "ICN",
    "JFK",
    "LGA",
    "LHR",
    "ORD",
    "SAN",
    "SFO",
    "SIN",
    "TLV",
    "BUD",
  ]);

  const [routes] = useState([
    ["DSM", "ORD"],
    ["ORD", "BGI"],
    ["BGI", "LGA"],
    ["SIN", "CDG"],
    ["CDG", "SIN"],
    ["CDG", "BUD"],
    ["DEL", "DOH"],
    ["DEL", "CDG"],
    ["TLV", "DEL"],
    ["EWR", "HND"],
    ["HND", "ICN"],
    ["HND", "JFK"],
    ["ICN", "JFK"],
    ["JFK", "LGA"],
    ["EYW", "LHR"],
    ["LHR", "SFO"],
    ["SFO", "SAN"],
    ["SFO", "DSM"],
    ["SAN", "EYW"],
  ]);

  const [myStartingAirport, setMyStartingAirport] = useState("");
  const [myDestinationAirport, setMyDestinationAirport] = useState("");

  const findShortPath = () => {
    const myQueue = [];
    const myVisited = new Set();
    const myPassedList = {};

    routes.forEach((route) => {
      const [from, to] = route;
      if (!myPassedList[from]) {
        myPassedList[from] = [];
      }
      myPassedList[from].push(to);

      if (!myPassedList[to]) {
        myPassedList[to] = [];
      }
      myPassedList[to].push(from);
    });

    myQueue.push([myStartingAirport, 0]);

    while (myQueue.length > 0) {
      const [currentAirport, stops] = myQueue.shift();

      if (currentAirport === myDestinationAirport) {
        return stops;
      }

      myVisited.add(currentAirport);

      if (myPassedList[currentAirport]) {
        for (const nextAirport of myPassedList[currentAirport]) {
          if (!myVisited.has(nextAirport)) {
            myQueue.push([nextAirport, stops + 1]);
          }
        }
      }
    }

    return -1;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="block">
          <div className="aviasales">
            <select
              className="airport"
              onChange={({ target }) => setMyStartingAirport(target.value)}
            >
              {airports.map((item) => (
                <option className="airport-item" value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="airport"
              onChange={({ target }) => setMyDestinationAirport(target.value)}
            >
              {airports.map((item) => (
                <option className="airport-item" value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="result">
            <p className="result-text">Transfers {findShortPath()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
