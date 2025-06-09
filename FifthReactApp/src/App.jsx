import Profile from './components/Profile '
import UserContextProvider from './context/UserContextProvider'
import './App.css'
import Login from './components/Login'

function App() {


  return (
    <UserContextProvider>
    <h1>React Context API</h1><br />

    <Login />
    <Profile />
    
    </UserContextProvider>
  )
}

export default App
