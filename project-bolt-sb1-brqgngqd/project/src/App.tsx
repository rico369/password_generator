import React, { useState } from 'react';
import { Copy, RefreshCw, Shield } from 'lucide-react';

function App() {
  const [password, setPassword] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [useDigits, setUseDigits] = useState<boolean>(true);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    // Implementation of the Python function in JavaScript
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    if (useDigits) {
      characters += '0123456789';
    }
    
    if (useSpecialChars) {
      characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    }
    
    if (passwordLength < 4) {
      alert('Password length should be at least 4 characters.');
      return;
    }
    
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Password Generator</h1>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Your secure password"
              className="w-full p-4 pr-12 text-lg bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Copy to clipboard"
            >
              <Copy className="h-6 w-6" />
            </button>
          </div>
          {copied && (
            <p className="text-green-600 mt-1 text-sm">Copied to clipboard!</p>
          )}
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
              Password Length: {passwordLength}
            </label>
            <input
              id="length"
              type="range"
              min="4"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>32</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="digits"
              type="checkbox"
              checked={useDigits}
              onChange={(e) => setUseDigits(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="digits" className="ml-2 block text-sm text-gray-700">
              Include Numbers (0-9)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="special"
              type="checkbox"
              checked={useSpecialChars}
              onChange={(e) => setUseSpecialChars(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="special" className="ml-2 block text-sm text-gray-700">
              Include Special Characters (!@#$%^&*)
            </label>
          </div>
        </div>
        
        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Generate Password
        </button>
        
        <div className="mt-6 text-sm text-gray-600">
          <h2 className="font-semibold mb-2">Password Strength Tips:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use at least 12 characters for better security</li>
            <li>Include numbers and special characters</li>
            <li>Mix uppercase and lowercase letters</li>
            <li>Avoid using personal information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;