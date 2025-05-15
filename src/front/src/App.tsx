import { useState } from 'react'
import Header from './widgets/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* header */}
      <Header />
      {/* side pannel */}
    </>
  )
}

export default App
