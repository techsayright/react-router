import axios from 'axios';
import React, { useState } from 'react'
import { Prompt, useHistory } from 'react-router';
import styles from '../components/css/NewQuotes.module.scss'

export default function NewQuotes() {
   const history = useHistory();
   const [isFocused, setIsFocused] =useState(false);
   
    const formSubmitHandler = e=>{
        e.preventDefault();
        const {author, quote} = e.target.elements;

        if(author.value.trim().length===0 || quote.value.trim().length===0){
            alert('enter values first!')
            return
        }
        console.log(author.value, quote.value);

        const DataObj = {
            quote: quote.value,
            author: author.value
        }
        const sendData = async ()=>{
            await axios.post('http://localhost:3000/quotes', DataObj);
        }
        sendData();
        console.log(history)
        history.push('/quotes');
    }
    return (
        <div className={`text-center ${styles.NewQuotes}`}>
            <Prompt when={isFocused} message={(location)=>`Are You Sure you want to go for ${location.pathname} ? You will Lost Your Form Data`}/>
            <form onSubmit={formSubmitHandler} onFocus ={()=>{setIsFocused(true)}}>
                <div>
                    <label htmlFor="author">Author:</label> <br />
                    <input type="text" id='author' placeholder='Enter Author Name'/>
                </div>
                <div>
                    <label htmlFor="quote">Quote:</label><br />
                    <textarea type="text" id='quote' placeholder='Enter Your Quote'/>
                </div>
                <div>
                    <button type='submit' className='btn btn-secondary' onClick={()=>setIsFocused(false)}>Add Quote</button>
                </div>
            </form>
        </div>
    )
}
