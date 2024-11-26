import { useRef } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {

  async function onDelete() {
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/content/delete`, {
        title: title,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      
    } catch (error) {
      console.log(error)
    }
    window.location.reload()

  }
  return (
    <div>
      <div className="p-4 bg-white rounded-md border-slate-200 max-w-72 border min-h-64 max-h-64 min-w-72 overflow-y-scroll overflow-x-hidden no-scrollbar">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2" >
              {type === "youtube" ? <YoutubeIcon/> : <TwitterIcon/>}
            </div>
            <div  >
              {title}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <a href={link} target="_blank" >
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500 cursor-pointer" onClick={onDelete}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={
                link.includes("watch")
                  ? link.replace("watch", "embed").replace("?v=", "/")
                  : link
                      .split("?")[0]
                      .replace("youtu.be", "www.youtube.com/embed")
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
