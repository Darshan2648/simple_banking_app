import React, { useState } from 'react';

// Main App component for the banking system
const App = () => {
  // State to store the current balance, initialized to 1000 for demonstration
  const [balance, setBalance] = useState(1000);
  // State to store messages displayed to the user (e.g., success, error)
  const [message, setMessage] = useState('');
  // State to store the amount entered by the user for deposit/withdrawal
  const [amount, setAmount] = useState('');

  // Function to handle deposit operation
  const handleDeposit = () => {
    // Convert the input amount to a number
    const depositAmount = parseFloat(amount);

    // Validate if the amount is a positive number
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setMessage('Please enter a valid positive amount for deposit.');
      return; // Exit the function if validation fails
    }

    // Update the balance by adding the deposit amount
    setBalance(prevBalance => prevBalance + depositAmount);
    // Set a success message
    setMessage(`Successfully deposited $${depositAmount.toFixed(2)}. Your new balance is $${(balance + depositAmount).toFixed(2)}.`);
    // Clear the input field
    setAmount('');
  };

  // Function to handle withdrawal operation
  const handleWithdraw = () => {
    // Convert the input amount to a number
    const withdrawAmount = parseFloat(amount);

    // Validate if the amount is a positive number
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setMessage('Please enter a valid positive amount for withdrawal.');
      return; // Exit the function if validation fails
    }

    // Check if there are sufficient funds for withdrawal
    if (withdrawAmount > balance) {
      setMessage('Insufficient funds. Your current balance is $' + balance.toFixed(2) + '.');
      return; // Exit the function if insufficient funds
    }

    // Update the balance by subtracting the withdrawal amount
    setBalance(prevBalance => prevBalance - withdrawAmount);
    // Set a success message
    setMessage(`Successfully withdrew $${withdrawAmount.toFixed(2)}. Your new balance is $${(balance - withdrawAmount).toFixed(2)}.`);
    // Clear the input field
    setAmount('');
  };

  // Function to handle checking the balance (updates the message with current balance)
  const handleCheckBalance = () => {
    setMessage(`Your current balance is $${balance.toFixed(2)}.`);
  };

  // Function to clear all messages and input field
  const handleClear = () => {
    setMessage('');
    setAmount('');
  };

  return (
    // Main container with responsive padding and centering
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Banking application card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6">
          Simple Banking System
        </h1>

        {/* Current Balance Display */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-center shadow-inner">
          <p className="text-lg text-blue-700 font-semibold">Current Balance:</p>
          <p className="text-4xl font-bold text-blue-900 mt-2">${balance.toFixed(2)}</p>
        </div>

        {/* Input field for amount */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
            Enter Amount:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-800"
            placeholder="e.g., 100.00"
            aria-label="Amount input"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDeposit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            aria-label="Deposit money"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            aria-label="Withdraw money"
          >
            Withdraw
          </button>
          <button
            onClick={handleCheckBalance}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 sm:col-span-2"
            aria-label="Check balance"
          >
            Check Balance
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 sm:col-span-2"
            aria-label="Clear messages and input"
          >
            Clear
          </button>
        </div>

        {/* Message Display Area */}
        {message && (
          <div
            className={`p-4 rounded-lg text-center font-medium ${
              message.includes('Successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
