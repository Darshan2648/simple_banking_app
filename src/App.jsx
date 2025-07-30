import React, { useState } from 'react';

// Main App component for the banking system
const App = () => {
  // State to store the current balance, initialized to 1000 for demonstration
  const [balance, setBalance] = useState(1000);
  // State to store messages displayed to the user (e.g., success, error)
  const [message, setMessage] = useState('');
  // State to store the amount entered by the user for deposit/withdrawal
  const [amount, setAmount] = useState('');
  // NEW STATE: State to store a list of transactions
  // Each transaction will be an object { type: 'deposit' | 'withdraw', amount: number, date: string }
  const [transactions, setTransactions] = useState([]);

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
    setBalance(prevBalance => {
      const newBalance = prevBalance + depositAmount;
      // Record the transaction
      setTransactions(prevTransactions => [
        ...prevTransactions,
        {
          type: 'deposit',
          amount: depositAmount,
          date: new Date().toLocaleString(), // Get current date and time
          id: Date.now() + Math.random(), // Unique ID for React list keys
        },
      ]);
      // Set a success message with the new balance
      setMessage(`Successfully deposited $${depositAmount.toFixed(2)}. Your new balance is $${newBalance.toFixed(2)}.`);
      return newBalance;
    });

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
    setBalance(prevBalance => {
      const newBalance = prevBalance - withdrawAmount;
      // Record the transaction
      setTransactions(prevTransactions => [
        ...prevTransactions,
        {
          type: 'withdraw',
          amount: withdrawAmount,
          date: new Date().toLocaleString(), // Get current date and time
          id: Date.now() + Math.random(), // Unique ID for React list keys
        },
      ]);
      // Set a success message with the new balance
      setMessage(`Successfully withdrew $${withdrawAmount.toFixed(2)}. Your new balance is $${newBalance.toFixed(2)}.`);
      return newBalance;
    });

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
    // Main container with a subtle gradient background and perfect centering
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Banking application card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6">
          Simple Banking System
        </h1>

        {/* Current Balance Display - Enhanced blue background and text */}
        <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center shadow-inner">
          <p className="text-lg text-blue-700 font-semibold">Current Balance:</p>
          <p className="text-4xl font-extrabold text-blue-800 mt-2">${balance.toFixed(2)}</p>
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

        {/* Action Buttons - Colors remain strong, hover effects are good */}
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

        {/* Message Display Area - Colors are already distinct for success/error */}
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

        {/* Transaction History - Subtle color backgrounds for items */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-600 text-center">No transactions yet.</p>
          ) : (
            <ul className="space-y-3">
              {/* Render transactions in reverse order to show latest first */}
              {transactions.slice().reverse().map((transaction) => (
                <li
                  key={transaction.id} // Unique key for list items
                  className={`p-3 rounded-lg flex justify-between items-center shadow-sm ${
                    transaction.type === 'deposit' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 capitalize">
                      {transaction.type}:
                      <span className={`ml-2 ${transaction.type === 'deposit' ? 'text-green-700' : 'text-red-700'}`}>
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </span>
                    <span className="text-sm text-gray-500">{transaction.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
