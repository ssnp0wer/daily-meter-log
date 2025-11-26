import React from 'react';

interface MeterRowProps {
  label: string;
  subId?: string | number;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  layout: 'two-col' | 'three-col';
}

export const MeterRow: React.FC<MeterRowProps> = ({ label, subId, value, onChange, placeholder = "값 입력", layout }) => {
  const gridClass = layout === 'three-col' 
    ? 'grid grid-cols-[35%_15%_50%] sm:grid-cols-[150px_80px_1fr]' 
    : 'grid grid-cols-[30%_70%] sm:grid-cols-[150px_1fr]';

  return (
    <div className={`${gridClass} hover:bg-gray-50 transition-colors py-3`}>
      {/* Label Column */}
      <div className={`flex items-center text-gray-900 font-bold text-lg ${layout === 'two-col' ? 'pl-6' : 'justify-center'}`}>
        {label}
      </div>

      {/* ID Column (Only for three-col layout) */}
      {layout === 'three-col' && (
        <div className="flex items-center justify-center">
           <span className="text-gray-800 font-bold bg-gray-200 px-3 py-1 rounded-md text-base min-w-[2rem] text-center">
             {subId}
           </span>
        </div>
      )}

      {/* Input Column */}
      <div className="px-4 flex items-center">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black bg-white shadow-sm font-bold text-lg placeholder-gray-400"
        />
      </div>
    </div>
  );
};