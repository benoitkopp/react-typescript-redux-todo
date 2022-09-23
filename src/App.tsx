import Todos from './components/todos/Todos'

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <Todos />
    </div>
  )
}

export default App
