"use client";

import { useState } from "react";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
} from "tw-elements-react";

type DropdownProps = {
  label: string;
  options: string[];
  selectedOption?: string;
  onSelect: (value: string) => void;
};

export default function CustomDropdown({ label, options, selectedOption, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TEDropdown
      className="flex justify-center"
      onShow={() => setIsOpen(true)}
      onHide={() => setIsOpen(false)}
    >

      <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">

        {label}: {selectedOption || "Вибрати"}


        <span className={`ml-2 transition-transform duration-200 text-white ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </TEDropdownToggle>


      <TEDropdownMenu className="bg-[linear-gradient(43deg,_rgba(65,88,208,0.4)_0%,_rgba(200,80,192,0.4)_46%,_rgba(255,204,112,0.4)_100%)] backdrop-blur-md  bg-opacity-40 ">
        {options.map((option) => (
          <TEDropdownItem key={option}>
            <button
              onClick={() => onSelect(option === selectedOption ? "" : option)}
              className={`block w-full min-w-[160px] text-left font-medium px-4 py-2 text-sm  duration-200 rounded-md ${
                selectedOption === option
                  ? "bg-blue-300 text-black "
                  : "text-blue-500 text-[1.1rem] hover:text-black  hover:bg-blue-300"
              }`}
              style={{ textShadow: "0px 0px 3px rgba(130, 130, 0)" }}
            >
              {option}
            </button>
          </TEDropdownItem>
        ))}
      </TEDropdownMenu>
    </TEDropdown>
  );
}

