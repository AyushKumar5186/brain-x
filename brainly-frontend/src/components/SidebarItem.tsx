import { ReactElement } from "react";


export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement
}){
    return <div className="flex items-center py-2 text-gray-700 cursor-pointer hover:bg-slate-200 p-4 rounded max-w-64 transition-all duration-300 bg-slate-100 my-3">
        <div className="pr-2 ">
            {icon}
        </div>
        <div className="">
         {text}
        </div>
    </div>
}