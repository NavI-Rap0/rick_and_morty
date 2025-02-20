"use client";

import { useState } from "react";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
} from "tw-elements-react"; // Бібліотека tw-elements-react для стилізованого випадаючого списку

// Типізація пропсів компонента (TypeScript)
type DropdownProps = {
  label: string; // Назва фільтра (наприклад, "Стать")
  options: string[]; // Список варіантів (наприклад, ["Male", "Female", "Genderless"])
  selectedOption?: string; // Поточний вибраний варіант (якщо є)
  onSelect: (value: string) => void; // Функція для обробки вибору опції
};

export default function CustomDropdown({ label, options, selectedOption, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false); // Стан для контролю відкриття/закриття меню

  return (
    <TEDropdown
      className="flex justify-center"
      onShow={() => setIsOpen(true)} // Відкривається
      onHide={() => setIsOpen(false)} // Закривається
    >
      {/* Кнопка для відкриття дропдауну */}
      <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
        {/* Назва фільтра та поточний вибір */}
        {label}: {selectedOption || "Вибрати"}

        {/* Іконка-стрілка, яка повертається при відкритті */}
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

      {/* Випадаюче меню */}
      <TEDropdownMenu className="bg-[linear-gradient(43deg,_rgba(65,88,208,0.4)_0%,_rgba(200,80,192,0.4)_46%,_rgba(255,204,112,0.4)_100%)] backdrop-blur-md text-white bg-opacity-40 shadow-md">
        {options.map((option) => (
          <TEDropdownItem key={option}>
            {/* Кнопка вибору варіанта */}
            <button
              onClick={() => onSelect(option === selectedOption ? "" : option)} // Якщо варіант уже вибрано → скидає фільтр
              className={`block w-full min-w-[160px] text-left px-4 py-2 text-sm transition-colors duration-200 rounded-md ${
                selectedOption === option
                  ? "bg-blue-300 text-black " // Активний варіант підсвічується
                  : "text-blue-500 bg-transparent hover:text-black hover:bg-blue-300/50 " // Стиль при наведенні з прозорістю
              }`}
              style={{ textShadow: "0px 0px 5px rgba(0, 0, 0)" }} // Тінь для тексту
            >
              {option}
            </button>
          </TEDropdownItem>
        ))}
      </TEDropdownMenu>
    </TEDropdown>
  );
}

