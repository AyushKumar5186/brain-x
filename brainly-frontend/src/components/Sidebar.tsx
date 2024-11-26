import { CrossIcon } from "../icons/CrossIcon";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({ closeSidebar }: any) {
  return (
    <div className="h-screen w-72 bg-white border-gray-50000 fixed left-0 top-0 pl-6">
      <div className="text-2xl font-bold pt-8 flex items-center">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        <div className="flex gap-20 items-center">
          <div>Brain-X</div>
          <div onClick={closeSidebar} className="cursor-pointer">
            <CrossIcon />
          </div>
        </div>
      </div>
      <div className="pt-8">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
