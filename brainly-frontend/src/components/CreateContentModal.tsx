import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { InputComp } from "./InputComp";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

// Controlled component
export function CreateContentModal({ open, onClose }) {

  const titleRef = useRef<HTMLInputElement>() 
  const linkRef = useRef<HTMLInputElement>() 
  const [type, setType] = useState(ContentType.Youtube)

  async function addContent() {

    const title = titleRef.current?.value
    const link = linkRef.current?.value

    if (title !== "" || link !== "") {
      await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title: title,
        link: link,
        type: type
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      window.location.reload()
      onClose()
    }
  }
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/80 fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-white p-4 rounded-md px-8">
                    <div className="flex justify-end" >
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <InputComp reference={titleRef} placeholder={"Title"}/>
                        <InputComp reference={linkRef} placeholder={"Link"}/>
                    </div>
                    <h1 className="text-center text-sm">Type</h1>
                    <div className="flex gap-2 m-2 justify-center p-3">
                      <Button onClick={()=>{setType(ContentType.Youtube)}} text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"}/>
                      <Button onClick={()=>{setType(ContentType.Twitter)}} text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}/>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text="Submit" fullWidth={true}/>
                    </div>
                </span>
            </div>
        </div>
      )}
    </div>
  );
}


