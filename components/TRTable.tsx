import React from 'react';
import { TRData, TRSectionData } from '../types';

interface TRTableProps {
  data: TRData;
  onChange: (section: 'main' | 'sub', time: keyof TRSectionData, type: 'tr1' | 'tr2', value: string) => void;
}

export const TRTable: React.FC<TRTableProps> = ({ data, onChange }) => {
  const times: { key: keyof TRSectionData; label: string }[] = [
    { key: 'time08', label: '08:00' },
    { key: 'time14', label: '14:00' },
    { key: 'time20', label: '20:00' },
  ];

  // Grid definition:
  // Mobile: [Label 40px] [Time 50px] [Input] [Input]
  // Desktop: [Label 60px] [Time 80px] [Input] [Input]
  const gridCols = "grid-cols-[3.5rem_4rem_1fr_1fr] sm:grid-cols-[70px_90px_1fr_1fr]";

  const renderSection = (title: string, sectionKey: 'main' | 'sub') => (
    <div className="contents">
      {times.map((time, index) => (
        <div key={`${sectionKey}-${time.key}`} className="contents group">
          {/* Section Label (Merged visually) */}
          <div className={`flex items-center justify-center font-extrabold text-gray-900 bg-white ${index === 0 ? 'border-t-0' : 'border-t-0'} border-r-2 border-gray-200 text-lg`}>
             {index === 1 ? title : ''}
          </div>
          
          {/* Time Label */}
          <div className={`flex items-center justify-center text-base font-bold text-gray-700 bg-white border-r-2 border-gray-200 ${index !== 0 && 'border-t border-gray-200'}`}>
            {time.label}
          </div>

          {/* TR1 Input */}
          <div className={`p-3 bg-white ${index !== 0 && 'border-t border-gray-200'}`}>
            <input
              type="text"
              inputMode="decimal"
              value={data[sectionKey][time.key].tr1}
              onChange={(e) => onChange(sectionKey, time.key, 'tr1', e.target.value)}
              placeholder="값 입력"
              className="w-full p-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-center shadow-sm bg-white text-black font-bold text-lg placeholder-gray-400"
            />
          </div>

          {/* TR2 Input */}
          <div className={`p-3 bg-white ${index !== 0 && 'border-t border-gray-200'}`}>
            <input
              type="text"
              inputMode="decimal"
              value={data[sectionKey][time.key].tr2}
              onChange={(e) => onChange(sectionKey, time.key, 'tr2', e.target.value)}
              placeholder="값 입력"
              className="w-full p-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-center shadow-sm bg-white text-black font-bold text-lg placeholder-gray-400"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden">
      {/* Header Row */}
      <div className={`grid ${gridCols} bg-gray-100 border-b-2 border-gray-300`}>
        <div className="p-3 text-center text-base font-bold text-gray-800"></div> {/* Empty for Main/Sub */}
        <div className="p-3 text-center text-base font-bold text-gray-800"></div> {/* Empty for Time */}
        <div className="p-3 text-center text-base font-bold text-gray-800">TR1</div>
        <div className="p-3 text-center text-base font-bold text-gray-800">TR2</div>
      </div>

      {/* Grid Content */}
      <div className={`grid ${gridCols}`}>
        {renderSection('MAIN', 'main')}
        {/* Divider Row between MAIN and SUB */}
        <div className="col-span-4 h-0.5 bg-gray-300"></div>
        {renderSection('SUB', 'sub')}
      </div>
    </div>
  );
};