import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/expenses')
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount, date }),
    })
      .then((res) => res.json())
      .then((newExpense) => setExpenses([...expenses, { id: newExpense.id, title, amount, date }]));
      setTitle('');
      setAmount('');
      setDate('');
  };

  const deleteExpense = (id) => {
    fetch(`http://localhost:3001/expenses/${id}`, { method: 'DELETE' })
      .then(() => setExpenses(expenses.filter((expense) => expense.id !== id)));
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - ₹{expense.amount} on {expense.date}{' '}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;