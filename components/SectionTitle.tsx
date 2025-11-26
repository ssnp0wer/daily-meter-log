import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6 mt-10 pb-3 border-b-2 border-gray-800">
      <h2 className="text-2xl font-extrabold text-gray-900 flex items-baseline gap-3">
        {title}
        {subtitle && <span className="text-base font-semibold text-gray-500">({subtitle})</span>}
      </h2>
    </div>
  );
};