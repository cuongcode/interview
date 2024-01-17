import React, { useState } from "react";
import { Text } from "./text";
import { clsx } from "clsx";
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useCheckClickOutside } from "../hooks";

export const SelectUserDropdown = ({users, selectedUser, className, setSelectedUser}:{users:any; selectedUser: any; className?: string; setSelectedUser:any}) => {
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useCheckClickOutside(()=> {
      setIsDropdown(false)
    })
    const _onSelectUser = (user:any) => {
      setSelectedUser(user.name)
      setIsDropdown(false)
    }
    return (
      <div className="relative">
        <button
          className={clsx("flex items-center justify-between border border-gray-700 rounded-lg h-10 p-3 hover:border-gray-600", className)}
          onClick={()=>{setIsDropdown(true)}}
        >
          <Text preset="p4" text={selectedUser} />
          <ChevronDownIcon className="w-4 h-4" />
      </button>
      {isDropdown ?
            <div ref={dropdownRef} className="flex flex-col absolute w-72 bg-bluetheme-60 left-0 top-11 rounded-lg">
              {users?.map((user:any)=> <button key={user.name} className="py-3 px-4 text-left hover:bg-bluetheme-80" onClick={()=>_onSelectUser(user)}>{user.name}</button> )}
            </div>
          : null}
      </div>
    );
  };