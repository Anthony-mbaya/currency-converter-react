import React from 'react';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import {HiSwitchHorizontal} from 'react-icons/hi';
import "./App.css";
import 'react-dropdown/style.css';

export default function App() {
    const [data, setData] = useState([]);
    const [input,setInput] = useState(0);
    const [from,setFrom] = useState('usd');
    const [to,setTo] = useState('inr');
    const [options,setOptions] = useState([]);
    const [output,setOutput] = useState(0); 
    
    useEffect(() => {
        Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        .then((res) => {
            setData(res.data[from]);
        });
        },[from]);

    useEffect(() => {
            setOptions(Object.keys(data));
            convert();
        },[data])
    
        function convert(){
            var rate = data[to];
            setOutput(input * rate);
        }
        function flip(){
            var temp = from;
            setFrom(to);
            setTo(temp);
        }  

    return(
        <div id='container'>
            <div className='amt'>
                <h3>Crux Currency Converter</h3>
                <input type='text' placeholder='Enter amount' onChange={(e) => setInput(e.target.value)} className='amount' />
            </div>
           
            <div className='toFro'>
                 <h3>From</h3>
                 <Dropdown options={options} onChange={(e) => {setFrom(e.value)}} value={from} placeholder={'From'} className='dropdown' />
            
                 <HiSwitchHorizontal size='40px' onClick={() => {flip()}} className='flip' />
                 <h3>To</h3>
                <Dropdown options={options} onChange={(e) => {setTo(e.value)}} value={to} placeholder={'To'} className='dropdown' />
            </div>

            <div className='convertBtn'>
                 <button onClick={() => {convert()}} >Convert</button>
            </div>
             
            <div className='output'>
                 <h3>Coverted Amount: </h3>
                 <p>{input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to }</p>
            </div>
            
        </div>
    )
}

 