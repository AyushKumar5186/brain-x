import axios from "axios";
import { Button } from "../components/Button";
import { InputComp } from "../components/InputComp";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    async function signin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(email)


         try {
           const response =  await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
                email: email,
                password: password
            }
        )
        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
            if (response) {
                alert(JSON.stringify(response.data.message))
              navigate("/dashboard")
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
                <Button onClick={signin} fullWidth={true} text="Signin" variant="primary" loading={false}
                
                />
            </div>
        </div>
    </div>
  )
}

