import React, { Fragment, useState } from "react";

export default function CommentForm({ getCmnt }) {
  const [addCmnt, setAddCmnt] = useState(false);

  const formHandler =e=>{
    e.preventDefault();
    const {cmnt} = e.target.elements;
    if(!(cmnt.value.trim().length=== 0)){
      getCmnt(cmnt.value)
      console.log("hh");
      setAddCmnt(false);
      return
    }
  }

  return (
    <Fragment>
      <br />
      <br />
      <button
        className="btn btn-primary"
        style={{ fontSize: "2rem" }}
        onClick={() => setAddCmnt(!addCmnt)}
      >
        Want to Add Comments
      </button>
      {addCmnt && (
        <form style={{ fontSize: "2rem", margin: "2rem" }} onSubmit={formHandler}>
          <textarea
            name="cmnt"
            id="cmnt"
            cols="70"
            rows="10"
            placeholder="Enter Comments...."
            className="px-5"
          />
          <br />
          <button className="btn btn-success" style={{ fontSize: "2rem" }}>
            Add Comment
          </button>
        </form>
      )}
    </Fragment>
  );
}
