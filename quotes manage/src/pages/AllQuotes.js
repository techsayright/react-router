import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "../components/css/AllQuotes.module.scss";

export default function AllQuotes() {
  const [DummyData, SetDummyData] =useState([]);
  const history = useHistory();
  const location = useLocation();
  
  const fetchQuotes = async()=>{
    let res =await axios.get('http://localhost:3000/quotes');
    SetDummyData(res.data);
  }
  useEffect(()=>{
    fetchQuotes();
  },[])

  console.log(location);
  const queryParams = new URLSearchParams(location.search);
  const isSortingAsc = queryParams.get("sort") === "asc";

  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };

  const sortedQuotes = sortQuotes(DummyData, isSortingAsc);

  const btnHandler = () => {
    // history.push(`${location.pathname}?sort=${isSortingAsc ? "des" : "asc"}`);
    history.push({
      pathname: location.pathname,
      search:`?sort=${isSortingAsc ? "des" : "asc"}`
    });
  };

  const MapData = sortedQuotes.map((quote) => {
    return (
      <div key={quote.id} className={styles.flex}>
        <div>
          <h1>{quote.quote}</h1>
          <p align="left">
            <strong>Auther: </strong>
            {quote.author}
          </p>
        </div>
        <div>
          <Link to={`${location.pathname}/${quote.id}`} className="btn btn-secondary">
            <h1>View FullScreen</h1>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="text-center my-5">
      <button
        className="btn btn-primary mx-4"
        style={{ fontSize: "2rem", float: "left" }}
        onClick={btnHandler}
      >
        {isSortingAsc ? "Sort Quotes Descending" : "Sort Quotes Ascending"}
      </button>
      {MapData}
    </div>
  );
}
