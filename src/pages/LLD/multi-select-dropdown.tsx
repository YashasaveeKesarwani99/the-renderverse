/* requirements

1. multi select dropdown
2. search functionality
3. select all option
4. clear all option
5. display selected options as tags
6. keyboard navigation support
7. accessible (ARIA) 

*/

import React, { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectDropdownProps {
  options: Option[];
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  placeholder = "Select Options...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Option[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      selected.some((sel) => sel.value === opt.value)
  );

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(0);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  const toggleOption = (option: Option) => {
    if (selected.some((sel) => sel.value === option.value)) {
      setSelected(selected.filter((sel) => sel.value !== option.value));
    } else {
      setSelected([...selected, option]);
    }
  };

  // keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }

      return;
    }

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      const option = filteredOptions[highlightedIndex];
      if (option) toggleOption(option);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      e.preventDefault();
    }
  };

  const selectAll = () => {
    setSelected(options);
  };

  const clearAll = () => {
    setSelected([]);
  };

  const removeTag = (value: string) => {
    setSelected(selected.filter((sel) => sel.value === value));
  };

  return (
    <div
      className="relative w-full max-w-md"
      ref={containerRef}
      tabIndex={0}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onKeyDown={handleKeyDown}
    >
      {/* Selected tags */}
      <div
        className="flex flex-wrap gap-2 mb-2 min-h-[40px] items-center border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Selected options"
      >
        {selected.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {selected.map((opt) => (
          <span
            key={opt.value}
            className="flex items-center bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-sm"
          >
            {opt.label}
            <button
              className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(opt.value);
              }}
              aria-label={`Remove ${opt.label}`}
              tabIndex={-1}
              type="button"
            >
              x
            </button>
          </span>
        ))}
        <span className="flex-1" />
        <span className="text-gray-400 text-lg select-none">▼</span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-6 overflow-y-auto"
          role="listbox"
        >
          {/* Search */}
          <div className="p-2">
            <input
              className="w-full border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              autoFocus
              aria-label="Search Options"
            />
          </div>
          {/* Actions */}
          <div className="flex justify-between px-2 pb-2 gap-2">
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={selectAll}
              type="button"
            >
              Select All
            </button>
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={clearAll}
              type="button"
            >
              Clear All
            </button>
          </div>
          {/* Options */}
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-2 text-gray-400">No options</div>
          ) : (
            filteredOptions.map((opt, idx) => (
              <div
                key={opt.value}
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  selected.some((sel) => sel.value === opt.value)
                    ? "bg-blue-100 text-blue-700"
                    : idx === highlightedIndex
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => toggleOption(opt)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                role="option"
                aria-selected={selected.some((sel) => sel.value === opt.value)}
                tabIndex={-1}
              >
                <input
                  type="checkbox"
                  checked={selected.some((sel) => sel.value === opt.value)}
                  readOnly
                  className="mr-2"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const sampleOptions: Option[] = Array.from({ length: 30 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `option${i + 1}`,
}));

export default function MultiSelectDropdownDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-xl font-semibold">Multi Select Dropdown</h2>
        <MultiSelectDropdown options={sampleOptions} />
      </div>
    </div>
  );
}
