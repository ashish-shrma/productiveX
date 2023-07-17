"use client";
import { FormikErrors } from "formik";
import { useState, useRef, useEffect } from "react";

export function Dropdown(props: {
  [x: string]: any;
  label: any;
  options: any;
}) {
  const { label, options, ...rest } = props;

  return (
    <div className="relative my-2">
      <select
        {...rest}
        id="custom_dropdown"
        className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer"
      >
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor="custom_dropdown"
        className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
}

export function Checkbox(props: { [x: string]: any; label: any }) {
  const { label, ...rest } = props;
  return (
    <div className="relative my-2">
      <input
        type="checkbox"
        {...rest}
        id="custom_checkbox"
        className="appearance-none h-4 w-4 border-2 border-black rounded-md checked:bg-black checked:border-transparent focus:outline-none"
      />
      <label htmlFor="custom_checkbox" className="ml-2 text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}

export function Input(props: { [x: string]: any; label: any }) {
  const { label, ...rest } = props;
  return (
    <div className="relative my-2">
      <input
        {...rest}
        id="floating_outlined"
        className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
}

export interface Option {
  value: string;
  label: string;
}

interface CustomMultiSelectDropdownProps {
  label: string;
  options: Option[];
  name: string;
  value: string[]; // Add the value prop
  onChange: (selectedOptions: string[]) => void; // Add onChange prop
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | false | string[] | undefined;
}

export function MultiSelectDropdown(props: CustomMultiSelectDropdownProps) {
  const { label, options, value, onChange, ...rest } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionToggle = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
    onChange(selectedOptions);
  };

  return (
    <div className="relative my-2" ref={ref}>
      <div className="relative">
        <input
          {...rest}
          id="custom_multiselect_dropdown"
          className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0"
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          value={selectedOptions
            .map(
              (selectedOption) =>
                options.find((option) => option.value === selectedOption)?.label
            )
            .join(", ")}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400 dark:text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.293 8.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </div>
      </div>

      <label
        htmlFor="custom_multiselect_dropdown"
        className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>

      {isOpen && (
        <div className="z-20 absolute bg-white dark:bg-gray-800 shadow mt-1 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleOptionToggle(option.value)}
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500"
                checked={selectedOptions.includes(option.value)}
                onChange={() => {}}
              />
              <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface CustomDatePickerProps {
  label: string;
  name: string;
  value?: string;
  onChange: (selectedDate: string) => void; // Add onChange prop
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | false | string[] | undefined;
}

export function DatePicker(props: CustomDatePickerProps) {
  const { label, value, onChange, ...rest } = props;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    onChange(selectedDate); // Call the onChange prop
  };
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative my-2">
      <div className="relative">
        <input
          {...rest}
          type="date"
          id="custom_date_picker"
          className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0"
          value={selectedDate || ""}
          onChange={handleDateChange}
          onClick={handleDropdownClick}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={`h-4 w-4 text-gray-400 dark:text-gray-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.293 8.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </div>
      </div>

      <label
        htmlFor="custom_date_picker"
        className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 cursor-pointer"
        onClick={handleDropdownClick}
      >
        {label}
      </label>
    </div>
  );
}

export interface Duration {
  hours: number;
  minutes: number;
}

interface CustomDurationPickerProps {
  label: string;
  name: string;
  value: Duration;
  onChange: (selectedDuration: Duration) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: FormikErrors<Duration> | undefined; // Update the type to FormikErrors<Duration>
}

export function DurationPicker(props: CustomDurationPickerProps) {
  const { label, value, onChange, onBlur, error, ...rest } = props;

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value);
    const updatedDuration = { ...value, hours };
    onChange(updatedDuration);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(e.target.value);
    const updatedDuration = { ...value, minutes };
    onChange(updatedDuration);
  };

  return (
    <div className="relative my-2">
      <div className="flex space-x-2">
        <input
          {...rest}
          type="number"
          id={`${props.name}_hours`}
          className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-20 text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0"
          value={value.hours.toString()} // Convert hours to string for input value
          onChange={handleHoursChange}
          onBlur={onBlur}
          min={0}
        />
        <span className="text-gray-500">hours</span>
        <input
          {...rest}
          type="number"
          id={`${props.name}_minutes`}
          className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-20 text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0"
          value={value.minutes.toString()} // Convert minutes to string for input value
          onChange={handleMinutesChange}
          onBlur={onBlur}
          min={0}
          max={59}
        />
        <span className="text-gray-500">minutes</span>
      </div>

      <label
        htmlFor={`${props.name}_hours`}
        className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 cursor-pointer"
      >
        {label}
      </label>

      {error && <div className="text-red-500">{error.hours}</div>}
    </div>
  );
}



interface CustomDaysOfWeekProps {
  label: string;
  name: string;
  value: string[]; // Add the value prop
  onChange: (selectedDays: string[]) => void; 
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | false | string[] | undefined;
}

export function DaysOfWeek(props: CustomDaysOfWeekProps) {
  const { onChange, label, value } = props;
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekends = ["Sun", "Sat"];
  const mwf = ["Mon", "Wed", "Fri"];
  const tts = ["Tue", "Thu", "Sat"];

  const handleDayToggle = (day: string) => {
    if (value.includes(day)) {
      onChange(value.filter((selectedDay) => selectedDay !== day));
    } else {
      onChange([...value, day]);
    }
  };

  const handleQuickSelect = (days: string[]) => {
    onChange(days);
  };

  return (
    <div className="my-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            className="text-xs text-gray-500 dark:text-gray-400"
            onClick={() => handleQuickSelect(daysOfWeek)}
          >
            All
          </button>
          <button
            type="button"
            className="text-xs text-gray-500 dark:text-gray-400"
            onClick={() => handleQuickSelect(weekdays)}
          >
            Weekdays
          </button>
          <button
            type="button"
            className="text-xs text-gray-500 dark:text-gray-400"
            onClick={() => handleQuickSelect(weekends)}
          >
            Weekends
          </button>
          <button
            type="button"
            className="text-xs text-gray-500 dark:text-gray-400"
            onClick={() => handleQuickSelect(mwf)}
          >
            MWF
          </button>
          <button
            type="button"
            className="text-xs text-gray-500 dark:text-gray-400"
            onClick={() => handleQuickSelect(tts)}
          >
            TTS
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mt-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border ${
              value.includes(day)
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-200 text-gray-500"
            }`}
            onClick={() => handleDayToggle(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
