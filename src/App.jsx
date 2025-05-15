
import { useState } from 'react'
import './App.css'

function App() {
  let API="https://jsonplaceholder.typicode.com/todos"
 
  

  return (
    <>
      <header className='bg-green-700/80 h-fit flex p-4'>
        <div className='w-[90%] m-auto grid grid-cols-1  gap-2 sm:grid-cols-[1fr_1fr]  items-center place-content-center' >
          <img src="https://avesto.tj/wp-content/uploads/2024/06/logo-optimized.png" alt="Авесто гроуп лого" className='w-32 ' />
          <div className='flex w-[50%] m-auto items-center justify-baseline gap-4'>
            <input type="search" placeholder='Search task..' className='placeholder:p-2 hover:placeholder:opacity-55 hover:border-2 placeholder:text-black placeholder:font-light border-1 border-gray-300 rounded-[3px]' />

            <button className='bg-gray-50/20 w-[60px] font-mono  text-white border-1 border-gray-300 rounded hover:opacity-70'>
              +
              New
            </button>
          </div>


        </div>
      </header>
      <main>
        <section className='TodoList'>

        </section>
      </main>

    </>
  )
}

export default App
