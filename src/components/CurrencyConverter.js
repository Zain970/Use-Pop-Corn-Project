import React, { useEffect, useState } from 'react'

function CurrencyConverter() {
    const [amount,setAmount] = useState(1);
    const [target,setTarget] = useState("");

    const [loading,setLoading]=useState(false);

    // Conversion
    const [from,setFrom] = useState("EUR");
    const [to,setTo] = useState("USD");

    useEffect(()=>{

        const convertCurrency = async()=>{
            setLoading(true);
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)

            const data = await res.json();

            console.log("Data : ",data.rates[to]);

            setTarget(data.rates[to]);
            setLoading(false);
        }
    

        if(amount)
        {
            if(to == from)
            {
             setTarget(amount);  
            }
            else
            {
            convertCurrency();
            }
        }

    },[from,to,amount])
  return (
    <div>
        <input  value={amount} onChange={(e)=>{setAmount(Number(e.target.value))}} disabled={loading}/>

        <select type="text"value={from} onChange={(e)=>{setFrom(e.target.value)}} disabled={loading}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
        </select>

        <select value={to} onChange={(e)=>{setTo(e.target.value)}} disabled={loading}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
        </select>
        {loading ? <p>Loading...</p> : <p>{target} {to}</p>
        }
    </div>
  )
}

export default CurrencyConverter