import React, { useState } from 'react';
import { Save, RefreshCw, FileDown } from 'lucide-react';
import { TRData, MeterCategoryData, DailyLogData, TRSectionData } from './types';
import { TRTable } from './components/TRTable';
import { MeterRow } from './components/MeterRow';
import { SectionTitle } from './components/SectionTitle';

const INITIAL_TR_DATA: TRData = {
  main: {
    time08: { tr1: '', tr2: '' },
    time14: { tr1: '', tr2: '' },
    time20: { tr1: '', tr2: '' },
  },
  sub: {
    time08: { tr1: '', tr2: '' },
    time14: { tr1: '', tr2: '' },
    time20: { tr1: '', tr2: '' },
  },
};

const INITIAL_METERS: MeterCategoryData = {
  calorimeter: [
    { id: 'c1', label: '312동', subId: 1, value: '' },
    { id: 'c2', label: '324동', subId: 2, value: '' },
    { id: 'c3', label: '311,314동', subId: 3, value: '' },
    { id: 'c4', label: '303,305동', subId: 4, value: '' },
  ],
  mainMeter: [
    { id: 'm1', label: '가정용', value: '' },
    { id: 'm2', label: '산업용 1', value: '' },
    { id: 'm3', label: '산업용 2', value: '' },
    { id: 'm4', label: '산업용 3', value: '' },
  ],
  market: [
    { id: 'k1', label: '309동', subId: 1, value: '' },
    { id: 'k2', label: '315동', subId: 2, value: '' },
    { id: 'k3', label: '312동', subId: 3, value: '' },
    { id: 'k4', label: '318동', subId: 4, value: '' },
  ],
};

function App() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [trData, setTrData] = useState<TRData>(INITIAL_TR_DATA);
  const [meterData, setMeterData] = useState<MeterCategoryData>(INITIAL_METERS);

  // Handlers
  const handleTRChange = (section: 'main' | 'sub', time: keyof TRSectionData, type: 'tr1' | 'tr2', value: string) => {
    setTrData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [time]: {
          ...prev[section][time],
          [type]: value
        }
      }
    }));
  };

  const handleMeterChange = (category: keyof MeterCategoryData, id: string, value: string) => {
    setMeterData(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, value } : item)
    }));
  };

  const handleReset = () => {
    if (confirm('모든 입력값을 초기화하시겠습니까?')) {
      setTrData(INITIAL_TR_DATA);
      setMeterData(INITIAL_METERS);
    }
  };

  const handleLoad = () => {
    // Mock load functionality - fills with random data for demo
    const randomVal = () => (Math.random() * 50 + 10).toFixed(1);
    
    setTrData({
      main: {
        time08: { tr1: randomVal(), tr2: randomVal() },
        time14: { tr1: randomVal(), tr2: randomVal() },
        time20: { tr1: randomVal(), tr2: randomVal() },
      },
      sub: {
        time08: { tr1: randomVal(), tr2: randomVal() },
        time14: { tr1: randomVal(), tr2: randomVal() },
        time20: { tr1: randomVal(), tr2: randomVal() },
      }
    });

    setMeterData(prev => ({
      calorimeter: prev.calorimeter.map(i => ({...i, value: (Math.random() * 1000).toFixed(0)})),
      mainMeter: prev.mainMeter.map(i => ({...i, value: (Math.random() * 5000).toFixed(0)})),
      market: prev.market.map(i => ({...i, value: (Math.random() * 500).toFixed(0)})),
    }));
  };

  const handleSave = () => {
    const data: DailyLogData = { date, trData, meters: meterData };
    console.log('Saved Data:', data);
    alert('저장되었습니다 (콘솔 확인)');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans text-gray-900">
      {/* Header Area */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">일일 검침 기록부</h1>
              <p className="text-base font-medium text-gray-500 mt-1">Daily Meter Reading Log</p>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300">
              <span className="text-base font-bold text-gray-800 pl-2">일자:</span>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent border-0 text-gray-900 font-bold text-lg focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* TR Temperature Section */}
        <section>
          <SectionTitle title="TR 온도" subtitle="TR Temperature" />
          <TRTable data={trData} onChange={handleTRChange} />
        </section>

        {/* Calorimeter Section */}
        <section>
          <SectionTitle title="열량계 검침" />
          <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
             {/* 3 Column Grid Header */}
             <div className="grid grid-cols-[35%_15%_50%] sm:grid-cols-[150px_80px_1fr] border-b-2 border-gray-200 bg-gray-100 text-center">
                <div className="p-4 font-bold text-gray-800 text-base flex items-center justify-center">건물</div>
                <div className="p-4 font-bold text-gray-800 text-base flex items-center justify-center">ID</div>
                <div className="p-4 font-bold text-gray-800 text-base flex items-center">값 입력</div>
             </div>
             <div className="divide-y divide-gray-200">
               {meterData.calorimeter.map((item) => (
                 <MeterRow
                   key={item.id}
                   label={item.label}
                   subId={item.subId}
                   value={item.value}
                   onChange={(val) => handleMeterChange('calorimeter', item.id, val)}
                   layout="three-col"
                 />
               ))}
             </div>
          </div>
        </section>

        {/* Main Meter Section */}
        <section>
          <SectionTitle title="메인 계량기" />
          <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
             {/* 2 Column Grid Header */}
             <div className="grid grid-cols-[30%_70%] sm:grid-cols-[150px_1fr] border-b-2 border-gray-200 bg-gray-100">
                <div className="p-4 font-bold text-gray-800 text-base flex items-center pl-6">구분</div>
                <div className="p-4 font-bold text-gray-800 text-base flex items-center">값 입력</div>
             </div>
             <div className="divide-y divide-gray-200">
               {meterData.mainMeter.map((item) => (
                 <MeterRow
                   key={item.id}
                   label={item.label}
                   value={item.value}
                   onChange={(val) => handleMeterChange('mainMeter', item.id, val)}
                   layout="two-col"
                 />
               ))}
             </div>
          </div>
        </section>

        {/* Market Reading Section */}
        <section>
          <SectionTitle title="알뜰시장 검침" />
          <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
             {/* 3 Column Grid Header */}
             <div className="grid grid-cols-[35%_15%_50%] sm:grid-cols-[150px_80px_1fr] border-b-2 border-gray-200 bg-gray-100 text-center">
                <div className="p-4 font-bold text-gray-800 text-base flex items-center justify-center">건물</div>
                <div className="p-4 font-bold text-gray-800 text-base flex items-center justify-center">ID</div>
                <div className="p-4 font-bold text-gray-800 text-base flex items-center">값 입력</div>
             </div>
             <div className="divide-y divide-gray-200">
               {meterData.market.map((item) => (
                 <MeterRow
                   key={item.id}
                   label={item.label}
                   subId={item.subId}
                   value={item.value}
                   onChange={(val) => handleMeterChange('market', item.id, val)}
                   layout="three-col"
                 />
               ))}
             </div>
          </div>
        </section>
      </main>

      {/* Bottom Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
          <div className="flex-shrink-0">
             <ActionButton 
               onClick={handleReset} 
               icon={<RefreshCw className="w-5 h-5" />} 
               label="초기화" 
               variant="danger" 
             />
          </div>
          <div className="flex gap-3">
             <ActionButton 
               onClick={handleLoad} 
               icon={<FileDown className="w-5 h-5" />} 
               label="불러오기" 
               variant="secondary" 
             />
             <ActionButton 
               onClick={handleSave} 
               icon={<Save className="w-5 h-5" />} 
               label="저장" 
               variant="primary" 
             />
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Button Component (Local)
interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant: 'primary' | 'secondary' | 'danger' | 'primary-gradient';
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, label, variant }) => {
  const baseClasses = "flex items-center gap-2 px-5 py-3 rounded-lg text-base font-bold transition-all shadow-sm active:scale-95 border-2";
  
  const variants = {
    primary: "bg-gray-900 text-white border-gray-900 hover:bg-gray-800",
    secondary: "bg-white text-gray-900 border-gray-900 hover:bg-gray-50",
    danger: "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300",
    "primary-gradient": "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 border-0"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};

export default App;