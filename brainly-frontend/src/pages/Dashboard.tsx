import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { Logo } from "../icons/Logo";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const contents = useContent();
  return (
    <div>
      {openSidebar && (
        <Sidebar
          closeSidebar={() => {
            setOpenSidebar(false);
          }}
        />
      )}
      <div
        className={`${openSidebar && "ml-72"} min-h-screen bg-gray-100
     transition-all duration-700`}
      >
        <CreateContentModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        />
        <header className="border-b border-slate-200 bg-white h-full p-5 w-full flex justify-between items-center">
          {!openSidebar && (
            <div className="text-2xl font-bold cursor-pointer flex " onClick={() => {
                  setOpenSidebar(true);
                }}>
              <div className="pr-2 text-purple-600">
                <Logo />
              </div>
              <div
                className=""
              >
                Brain-X
              </div>
            </div>
          )}
          <div className={` flex gap-4`}>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
              variant="primary"
              text="Add content"
              startIcon={<PlusIcon />}
            />
            <Button
              variant="secondary"
              text="Share brain"
              startIcon={<ShareIcon />
              
              }
            />
          </div>
        </header>

        <div
          className={`${
            openSidebar ? "pl-4" : "pl-3"
          } flex gap-4 flex-wrap w-full pt-10 transition-all duration-700`}
        >
          {contents.map(({ title, link, type }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
