import React, {  useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const logo=require('../assets/img/logo.png')


const Login=()=> {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/",{
                email,password,
            })
            .then(res=>{
                if(res.data==="exist")
                {
                    history("/",{state:{id:email}})
                }
                else if(res.data==="wrongpassword")
                {
                    alert("wrong password")
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login flex flex-col gap-2 items-center py-2 w-4/12 h-auto shadow-md shadow-gray-600 mx-auto rounded-lg">
            <img src={logo} alt="" className="h-16"/>
            <h1 className="text-xl font-bold text-[#00df9a]">Login</h1>

            <form action="POST" className="w-3/4 flex flex-col gap-6 h-48 justify-center items-center">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" className="border-2 border-gray-400 rounded-lg w-3/4 p-2 text-sm outline-none focus:placeholder:translate-x-1/2 focus:placeholder:text-[8px]  focus:placeholder:duration-1000 focus:placeholder:text-[#00df9a] focus:placeholder:opacity-50 focus:placeholder:font-semibold" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="border-2 border-gray-400 rounded-lg w-3/4 p-2 text-sm outline-none focus:placeholder:translate-x-1/2 focus:placeholder:text-[8px]  focus:placeholder:duration-1000 focus:placeholder:text-[#00df9a] focus:placeholder:opacity-50 focus:placeholder:font-semibold" />
                <input type="submit" value="Login" onClick={submit} className="bg-[#00df9a] rounded-xl py-1  text-[14px] w-2/5  text-center hover:scale-105 duration-500 text-white button"/>

            </form>

            
            <p className="text-sm">Don't have an Account?</p>
            <Link to="/signup" className="flex text-sm">Signup<ArrowForwardIcon/></Link>

        </div>
    )
}

export default Login