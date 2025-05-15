import axios from 'axios';
import { Search, Trash } from "lucide-react";
import { useEffect, useState } from 'react';
import './App.css';
import LoadingComponent from './components/loading';

function App() {
  

  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");

  async function getTodos(params = "") {
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
      const newData = data.slice(0, 10);
      const filteredData = newData.filter(todo =>
        todo.title.toLowerCase().includes(params.toLowerCase())
      );
      setTodos(filteredData);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodos(search);
  }, [search]);

  function handlCheck(id) {
    const updateTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updateTodos);
  }

  async function functionDeleteTodos(id) {
    setLoader(true);
    try {
      await axios.delete(`${"https://jsonplaceholder.typicode.com/todos"}/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setTimeout(() => {
        setLoader(false);
      }, 500);

      setTimeout(() => {
        alert(`Удалено id: ${id}`);
      }, 4600);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  return (
    <>
      {loader && <LoadingComponent />}
      <header className='bg-green-700/80 h-fit p-4'>
        <div className="w-[99%] h-fit items-center flex flex-col justify-between sm:flex-row">
          <img
            src="https://avesto.tj/wp-content/uploads/2024/06/logo-optimized.png"
            alt="Авесто гроуп лого"
            className='w-32'
          />
          <div className="flex flex-row w-[90%] sm:w-[40%] items-center justify-evenly h-10 p-1">
            <div className="flex items-center gap-1 relative">
              <input
                type="search"
                placeholder='Search task..'
                className='h-[35px] px-2 bg-gray-200 border rounded'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={18} className="absolute right-2" />
            </div>
            <button className='hover:border rounded hover:opacity-70 bg-gray-300 w-[18%] text-center'>
              NEW
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className='w-screen mt-4 p-4'>
          <table className='w-[95%] m-auto'>
            <thead className='bg-gray-300/50 h-[40px]'>
              <tr>
                <th>ID</th>
                <th className='text-start p-1'>Заголовок</th>
                <th>Выполнено</th>
                <th>
                  <Trash size={18} />
                </th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 ? (
                todos.map((element) => (
                  <tr key={element.id} className='border-b border-gray-200 h-[35px]'>
                    <td className='text-center'>{element.id}</td>
                    <td className={`p-1 border-l border-gray-300 ${element.completed ? 'line-through text-gray-400' : ''}`}>
                      {element.title.charAt(0).toUpperCase() + element.title.slice(1)}
                    </td>
                    <td className='text-center'>
                      <input
                        type="checkbox"
                        checked={element.completed}
                        onChange={() => handlCheck(element.id)}
                      />
                    </td>
                    <td className='border-r'>
                      <button onClick={() => functionDeleteTodos(element.id)}>
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4">Not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default App;
