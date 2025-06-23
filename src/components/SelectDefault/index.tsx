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

  // Atualiza o texto visível quando o value muda (ex: ao carregar o form)
  useEffect(() => {
    const label = options.find((opt) => opt.value === value)?.label || '';
    setInputValue(label);
  }, [value, options]);

  // Fecha o dropdown ao clicar fora
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

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setShowOptions(false);
    onChange(option.value);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setShowOptions(true);

    const matchedOption = options.find(
      (opt) => opt.label.toLowerCase() === val.toLowerCase()
    );

    if (matchedOption) {
      onChange(matchedOption.value);
    } else {
      onChange('');
    }
  };

  // Opções com a selecionada primeiro
  const sortedOptions = (() => {
    const selected = options.find((opt) => opt.value === value);
    const others = options.filter((opt) => opt.value !== value);
    return selected ? [selected, ...others] : options;
  })();

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

      {showOptions && (
        <div className="absolute z-[99] mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-md">
          {sortedOptions.map((option) => (
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
    </div>
  );
}
