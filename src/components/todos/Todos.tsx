import TodoForm from './TodoForm'
import TodoList from './TodoList'

const Todos = (): JSX.Element => {
  return (
    <div className="bg-white p-10 rounded border shadow-xl h-max">
      <h1 className="text-3xl mb-5">React TypeScript Redux Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default Todos
