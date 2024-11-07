import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const apiKey = '';
    const url = `https://api.currencyfreaks.com/latest?apikey=${apiKey}`;
    
    const fetchRates = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data.rates;
        
        const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
        const selectedRates = currencies.map((currency) => {
          const exchangeRate = parseFloat(data[currency]);
          return {
            currency,
            exchangeRate,
            weBuy: exchangeRate * 1.05, 
            weSell: exchangeRate * 0.95 
          };
        });
        
        setRates(selectedRates);
      } catch (err) {
        setError('Gagal mengambil data nilai tukar');
      }
    };
    
    fetchRates();
  }, []);
  
  if (error) return <p>{error}</p>;
  return (
  <div className="App">
    <header>
      <h1>Currency Exchange Rates</h1>
      </header>
      <main>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.currency} style={{ margin: '20px 0', fontSize: '25px' }}>
                <td>{rate.currency}</td>
                <td>{rate.weBuy.toFixed(4)}</td>
                <td>{rate.exchangeRate.toFixed(4)}</td>
                <td>{rate.weSell.toFixed(4)}</td>
              </tr>
            ))}
            </tbody>
            <p>Rates are based from 1 USD.</p>
            <p>This application uses API from https://currencyfreaks.com</p>
      </main>
  </div>
  );
};

export default App;
