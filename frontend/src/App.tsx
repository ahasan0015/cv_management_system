import { Outlet } from 'react-router-dom'


// import './App.css'

function App() {
  
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      

      {/* Main content */}
      <main className="flex-fill">
        <Outlet />
      </main>

      {/* Footer */}
    
    </div>
    </>
  )
}

export default App