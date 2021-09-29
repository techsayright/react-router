import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import CommentForm from "../components/comments/CommentForm";
import style from "../components/css/QuoteDetails.module.scss";

export default function QuoteDetails() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [singleQuote, setSingleQuote] = useState([]);
  const [comments, setComments] = useState([]);

  console.log(location);
  console.log(history);
  console.log(match);

  const fetchSingleQuote = useCallback(async () => {
    let res = await axios.get(`http://localhost:3000/quotes/${params.quoteID}`);
    setSingleQuote(res.data);
  }, [params]);

  useEffect(() => {
    fetchSingleQuote();
  }, [fetchSingleQuote]);

  const fetchComments = async () => {
    let res = await axios.get(`http://localhost:3000/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    if (location.pathname.includes("comments")) {
      console.log("comments open");
      fetchComments();
    }

    return () => {
      setComments([]);
    };
  }, [location]);

  const filteredCmnt = comments.filter(
    (cmnt) => cmnt.postId === +params.quoteID
  );

  let cmnts = null;
  if(filteredCmnt.length ===0 || !filteredCmnt){
    cmnts = <div style={{fontSize: '2rem'}}>No Comments Added ! Be the First Commentor...</div>;
  }else{
    cmnts = filteredCmnt.map((cmnt) => {
      return (
        <div>
          <h1>{cmnt.body}</h1>
          <hr />
        </div>
      );
    })
  }

  const commentFormHandler =async (comment) =>{
    console.log(comment);

    const obj ={
      body: comment,
      postId: +params.quoteID
    };
    await axios.post('http://localhost:3000/comments' , obj);
    fetchComments()
  }

  if (!singleQuote) {
    return <h1 className="text-center my-5">No Quote Found !!</h1>;
  }

  return (
    <Fragment>
      <div className={`text-center ${style.QuoteDetails}`}>
        <h1>{singleQuote.quote}</h1>
        <h3>Written By: {singleQuote.author}</h3>
      </div>

      <div className="text-center">
        <Route path={match.path} exact>
          <Link
            to={`${match.url}/comments`}
            style={{ fontSize: "2rem" }}
            className="btn btn-outline-success btn-lg text-center"
          >
            Load Comments
          </Link>
        </Route>

        <button
          className="btn btn-danger mx-4"
          style={{ fontSize: "2rem" }}
          onClick={() => history.goBack()}
        >
          Go Back
        </button>

        <Route path={`${match.path}/comments`}>
          <CommentForm getCmnt={commentFormHandler}/>
          <div className="text-center my-5">
            {cmnts}
          </div>
        </Route>
      </div>
    </Fragment>
  );
}
