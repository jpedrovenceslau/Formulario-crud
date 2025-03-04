import Trash from "../../assets/excluir.png";
import { useEffect, useState, useRef } from "react";

import api from "../../services/api";

function Cadastro() {

    const [users, setUsers] = useState([])
    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()



    async function getUsers() {
         const usersFromApi = await api.get('/usuarios')  

         setUsers( usersFromApi.data)         
    }

    async function CreateUsers() {
        // event.preventDefault();
        await api.post('/usuarios', {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value
        })   
        // chamar para nao precisar recarregar a tela
        getUsers()
    }

    async function deleteUsers(id) {
         await api.delete(`/usuarios/${id}`)  

        getUsers()
   }

    useEffect (() => {
        getUsers()
    }, [])


    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">Cadastro</h2>
                <form className="flex flex-col gap-6 ">
                    <input ref={inputName} placeholder="Name" type="text" className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                    <input ref={inputAge} placeholder="Age" type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                    <input ref={inputEmail} placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                    <button onClick={CreateUsers} className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-400 cursor-pointer">cadastre-se</button>
                </form>
            </div>

            {users.map(user => (
                <div key={user.id} className="flex justify-between  max-w-md mx-auto mt-10  bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                    <div>
                        <p>Name: {user.name}</p>
                        <p>age: {user.age}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <button onClick={() => deleteUsers(user.id)}>
                        <img className="w-[50px] h-[50px] cursor-pointer " src={Trash} alt="" />
                    </button>
                </div>
            ))}
        </>
    );
}

export default Cadastro;

