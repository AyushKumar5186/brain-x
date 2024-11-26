import { useRef } from "react";
import { Button } from "../components/Button";
import { InputComp } from "../components/InputComp";
// import { BACKEND_URL } from "../config";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signup() {

    const emailRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()

    async function signup() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(email)
        

         try {
           const response =  await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
            
                email: email,
                password: password
            }
        )
            if (response) {
                alert(JSON.stringify(response.data.message))
                navigate("/signin")
            }
         } catch (error) {
            console.log(error)
         }
    }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-xl border-none p-8 min-w-48">
            <InputComp reference={emailRef} placeholder="Email"/>
            <InputComp reference={passwordRef} placeholder="Password"/>
            <div className="flex justify-center">
                <Button onClick={signup} fullWidth={true} text="Signup" variant="primary" loading={false}
                
                />
            </div>
        </div>
    </div>
  )
}