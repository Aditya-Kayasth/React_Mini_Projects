import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pw = ""
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (includeNumbers) {
      characters += "0123456789"
    }

    if (includeSymbols) {
      characters += "!@#$%^&*()"
    }

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length)
      pw += characters.charAt(index)
    }

    setPassword(pw)
  }, [length, includeNumbers, includeSymbols])

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select()
      window.navigator.clipboard.writeText(password)
    }
  }, [password])

// FIRST TIME 
  useEffect(() => {
    generatePassword()
  }, [length, includeNumbers, includeSymbols, generatePassword])


  return (
    <div className="min-h-screen w-full bg-[#242424] flex items-center justify-center ">
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Password Generator</h1>

      <div className="flex mb-6 space-x-3">
        <input
          type="text"
          value={password}
          placeholder="Your password"
          readOnly
          ref={passwordRef}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={copyToClipboard}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition"
        >
          Copy
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="lengthRange">
          Length: {length}
        </label>
        <input
          id="lengthRange"
          type="range"
          min="8"
          max="16"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers((prev) => !prev)}
            id="numbers"
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="numbers" className="ml-2 block text-gray-700">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols((prev) => !prev)}
            id="symbols"
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="symbols" className="ml-2 block text-gray-700">
            Include Symbols
          </label>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
