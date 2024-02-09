import React from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { PiSyringeDuotone } from "react-icons/pi";
import { GiCage } from "react-icons/gi";
import { MdOutlineLocalHospital } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaUsersGear } from "react-icons/fa6";
import { RiUser3Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";

const SmallSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {showMobileSidebar, setShowMobileSidebar} = useApp()

  const menuBtnFn = (route) =>{
    navigate(route)
    setShowMobileSidebar(false)
  }

  return (
    <>
    { showMobileSidebar && <div className=" z-10 absolute transition-all ease-in-out flex  h-[100vh] md:hidden flex-col  items-center shadow-lg">
      <div className="bg-neutral relative  h-full w-40 text-gray-300 min-h-[320px] py-3">
        <div className="flex justify-center items-center mb-4">
          <span>Pet</span>
          <IoMdClose onClick={()=> setShowMobileSidebar(false)} className="absolute top-3 right-2 cursor-pointer text-lg" />
        </div>
        <div className="flex flex-col mx-1  justify-center items-center gap-4">
          <div
            onClick={()=>menuBtnFn("/dashboard")}
            className={`${
              location.pathname === "/dashboard"
                ? "bg-secondary"
                : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
            } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <IoHomeOutline className="text-xl" />
            <h3>Dashboard</h3>
          </div>

          <div
            onClick={()=>menuBtnFn("./patients")}
            className={`${
              location.pathname === "/dashboard/patients"
                ? "bg-secondary"
                : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
            } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <MdPets className="text-xl" />
            <h3>Patients</h3>

          </div>

          <div
            onClick={()=>menuBtnFn("./clinic")}
            className={`${
              location.pathname === "/dashboard/clinic"
              ? "bg-secondary"
              : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
          } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <MdOutlineLocalHospital className="text-xl" />
            <h3>Clinic</h3>
          </div>

          <div
            onClick={()=>menuBtnFn("./boarding")}
            className={`${
              location.pathname === "/dashboard/boarding"
              ? "bg-secondary"
              : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
          } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <GiCage className="text-xl" />
            <h3>Boarding</h3>
          </div>

          <div
            onClick={()=>menuBtnFn("./treatment")}
            className={`${
              location.pathname === "/dashboard/treatment"
              ? "bg-secondary"
              : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
          } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <FaUserDoctor className="text-xl" />
            <h3>Treatment</h3>
          </div>
          <div
            onClick={()=>menuBtnFn("./vaccine")}
            className={`${
              location.pathname === "/dashboard/vaccine"
              ? "bg-secondary"
              : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
          } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <PiSyringeDuotone className="text-xl" />
            <h3>Vaccine</h3>
          </div>
          {/* <div className={`${
          location.pathname === '/dashboard/patients'
            ? 'bg-secondary border-b-2 border-b-primary'
            : 'hover:bg-secondary hover:border-b-2 hover:border-b-primary'
        } p-3`}>
                         <HiOutlineDocumentReport className='text-xl'/>
                    </div> */}
          <div
            onClick={()=>menuBtnFn("./owners")}
            className={`${
              location.pathname === "/dashboard/owners"
              ? "bg-secondary"
              : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
          } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <FaUsersGear className="text-xl" />
            <h3>Owners</h3>
          </div>
          <div
            onClick={()=>menuBtnFn("./users")}
            className={`${
              location.pathname === "/dashboard/users"
              ? "bg-secondary"
              : "hover:bg-secondary hover:border-b-2 hover:border-b-primary"
          } p-2 w-full flex justify-start items-center  gap-3 cursor-pointer rounded-lg`}
          >
            <RiUser3Line className="text-xl" />
            <h3>Users</h3>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default SmallSidebar;
