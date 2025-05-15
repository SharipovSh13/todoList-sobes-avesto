import axios from 'axios';
import { Search, Trash } from "lucide-react";
import { useEffect, useState } from 'react'
import './App.css'
import LoadingComponent from './components/loading';

function App() {

  let API = "https://jsonplaceholder.typicode.com/todos"

  const [todos, setTodos] = useState([])
  const [loader, setLoader] = useState(true)
  const [search, setSearch] = useState("")

  async function getTodos(params = "") {
    try {
      const { data } = await axios.get(`${API}`);
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
    getTodos()
  }, []);

  useEffect(() => {
    getTodos(search);
  }, [search]);

  function handlCheck(id) {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updateTodos);
  }

  async function functionDeleteTodos(id) {
    console.log(id);
    setLoader(!loader)
    try {
      await axios.delete(`${API}/${id}`)
      setTodos(item => item.filter(todo => todo.id !== id));
      setTimeout(() => {
        setLoader(true)
      }, 500);

      setTimeout(() => {
        alert(`Удалeно id:${id}`)
      }, 4600);

    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  }

  return (
    <> {
      loader && <LoadingComponent />
    }
      <header className='bg-green-700/80 h-fit  p-4'>
        <div className=" w-[99%] h-fit   items-center  flex flex-col justify-between sm:flex-row ">
          <img src="https://avesto.tj/wp-content/uploads/2024/06/logo-optimized.png" alt="Авесто гроуп лого" className='w-32 ' />
          <div className="flex flex-row w-[90%]  sm:w-[40%]   items-center justify-evenly   h-10 p-1">
            <div className={`flex  items-center gap-1 relative `}>
              <input
                type="search"
                placeholder='Search task..'
                className='h-[35pxh] placeholder:p-1  bg-gray-200 hover:placeholder:opacity-55 border-spacing-0.5  rounded-[3px]'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={18} className="absolute left-[85%]" />
            </div>
            <button className='hover:border-1 rounded hover:opacity-70 bg-gray-300 w-[18%] text-center'>
              NEW
            </button>
          </div>
        </div>
      </header>

      <main className=''>
        <div className='w-screen mt-4 p-4'>
          <table className='w-[95%] m-auto '>
            <thead className='bg-gray-300/50 h-[40px]  '>
              <tr className=''>
                <th>ID</th>
                <th className='text-start p-1'>Заголовок</th>
                <th>Выполнено</th>
                <th>
                  <Trash size={18} className='' />
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {
                todos.length > 0 ? todos.map((element) => {
                  return (
                    <tr key={element.id} className='border-b-1 border-gray-200 h-[35px]'>
                      <td className='text-center'>{element.id}</td>
                      <td className={`p-1 border-l-1 border-gray-300 text-balance ${element.completed ? 'line-through text-gray-400' : ''}`}>
                        {element.title.slice(0, 1).toUpperCase().concat(element.title.slice(1, -1))}
                      </td>
                      <td className=' text-center'>
                        <input
                          type="checkbox"
                          checked={element.completed}
                          onChange={() => handlCheck(element.id)}
                        />
                      </td>
                      <td className='border-r-1 '>
                        <button onClick={() => functionDeleteTodos(element.id)} >
                          <Trash size={18} className='' />
                        </button>
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4">Not found</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default App;
