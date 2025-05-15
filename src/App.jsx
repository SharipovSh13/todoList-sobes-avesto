import axios from 'axios';
import { Check, Search, Trash, Trash2, UserCheck, UserX } from "lucide-react";
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  let API = "https://jsonplaceholder.typicode.com/todos"

  const [todos, setTodos] = useState([])

  async function getTodos() {
    try {
      const { data } = await axios.get(`${API}`)

      setTodos(data)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTodos()
  }, []);










  return (
    <>
      <header className='bg-green-700/80 h-fit  p-4'>

        <div className=" w-[99%] h-fit   items-center  flex flex-col justify-between sm:flex-row ">

          <img src="https://avesto.tj/wp-content/uploads/2024/06/logo-optimized.png" alt="Авесто гроуп лого" className='w-32 ' />

          <div className="flex flex-row w-[90%]  sm:w-[40%]   items-center justify-evenly   h-10 p-1">
            <div className={`flex  items-center gap-1 relative `}>

              <input type="search" placeholder='Search task..' className='h-[35pxh]   placeholder:p-1  bg-gray-200 hover:placeholder:opacity-55 border-spacing-0.5  rounded-[3px]' />
              <Search size={18} className="absolute left-[85%]" />
            </div>

            <button className='hover:border-1   rounded hover:opacity-70 bg-gray-300   w-[18%] text-center '>
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
                <th className='text-start p-1'>Заголовок</th>
                <th>Выполнено</th>
                <th >
                  <Trash size={18} className='' />

                </th>
              </tr>
            </thead>
            <tbody className=''>
              {
                todos.slice(0, 10).map((element) => {
                  return <>
                    <tr key={element.id} className='border-b-1 border-gray-200 h-[35px]'>
                      <td className='p-0.5 border-l-1  border-gray-300 text-balance'>{element.title}</td>
                      <td className=' text-center'>{element.completed ? <input type="checkbox" /> : <input type="checkbox" />}</td>
                      <td className='border-r-1 '>
                      <button >
                        {<Trash size={18} className='' />}
                      </button>
                      </td>

                    </tr>
                  </>
                })
              }
            </tbody>
          </table>

        </div>

      </main>


    </>
  )
}

export default App
