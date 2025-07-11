import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // or remove if not using classnames util

const interestOptions = [
  "AI",
  "Art",
  "Automotive Electronics",
  "Blockchain and Cryptography",
  "Cloud Computing & DevOps",
  "Computer Vision",
  "Control Systems",
  "Cybersecurity",
  "Data Science",
  "Design",
  "Digital Signal Processing",
  "Embedded Systems",
  "Entrepreneurship",
  "Finance",
  "Hardware Security",
  "IoT",
  "Machine Learning",
  "Microwave and Antenna Design",
  "PCB Design and Fabrication",
  "Power Systems",
  "Quantum Computing",
  "Renewable Energy",
  "Robotics",
  "SDE",
  "Signal Processing",
  "Software Architecture",
  "Startups",
  "Teaching",
  "UI/UX",
  "VLSI",
];

export default function MultiSelectDropdown({
  selected,
  setSelected,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <div
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          "cursor-pointer" // for clarity
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0
          ? selected.join(", ")
          : "Select areas of interest..."}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-64 overflow-y-auto rounded-md border border-input bg-background shadow-md">
          {interestOptions.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={cn(
                "flex items-center px-3 py-2 text-sm cursor-pointer transition-colors",
                selected.includes(option)
                  ? "bg-muted font-medium"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                readOnly
                className="mr-2"
              />
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
