'use client';

import InputDefault from '@/components/inputDefault';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectFilterProps = {
  options: Option[];
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export default function SelectFilter({
  options,
  placeholder = 'Selecione...',
  className = '',
  value,
  onChange,
  error,
}: SelectFilterProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sempre que o valor externo mudar, atualize o texto exibido
    const label = options.find((opt) => opt.value === value)?.label || '';
    setInputValue(label);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setShowOptions(true);
  };

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setShowOptions(false);
    onChange(option.value);
  };

  // Filtrar opções por label digitado (case-insensitive)
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <InputDefault
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => setShowOptions(true)}
        autoComplete="off"
        error={error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e.target.value);
        }}
      />

      {showOptions && filteredOptions.length > 0 && (
        <div className="absolute z-[99] mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-md">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-3 py-2 hover:bg-blue-100 ${
                option.value === value ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {showOptions && filteredOptions.length === 0 && (
        <div className="absolute z-[99] mt-1 w-full rounded-md border bg-white shadow-md p-2 text-gray-500">
          Nenhum resultado encontrado.
        </div>
      )}
    </div>
  );
}
