import "./App.css"
import { MainPage } from "./Pages/index"
import { Client } from 'appwrite';

const client = new Client();
client.setProject('6789260e00308ca2f9b4');

function App() {
  return (
    <div className="App">
      <>
        <div className="App">
          <div className="container">
            <MainPage />
          </div>
        </div>
      </>
    </div>
  )
}

export default App
