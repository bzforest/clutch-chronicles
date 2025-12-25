import React from 'react';

function DesignSystem() {
  return (
    <div className="min-h-screen bg-white p-10 font-sans">
      <h1 className="text-4xl font-bold text-slate-800 mb-10">Design System</h1>

      {/* --- SECTION 1: COLORS --- */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-400 mb-6">Colors</h2>
        
        {/* Base Colors (Navy/Purple) */}
        <h3 className="text-lg text-slate-500 mb-4">Base</h3>
        <div className="grid grid-cols-6 gap-4 mb-8">
          <ColorSwatch name="Base 600" colorClass="bg-base-600" hex="#0B0C2A" textColor="text-white" />
          <ColorSwatch name="Base 500" colorClass="bg-base-500" hex="#1F1147" textColor="text-white" />
          <ColorSwatch name="Base 400" colorClass="bg-base-400" hex="#3E1678" textColor="text-white" />
          <ColorSwatch name="Base 300" colorClass="bg-base-300" hex="#7B2CBF" textColor="text-white" />
          <ColorSwatch name="Base 200" colorClass="bg-base-200" hex="#B560F4" textColor="text-black" />
          <ColorSwatch name="Base 100" colorClass="bg-base-100" hex="#EADCF8" textColor="text-black" />
        </div>

        {/* Brand & States */}
        <h3 className="text-lg text-slate-500 mb-4">Brand & States</h3>
        <div className="grid grid-cols-6 gap-4">
          <ColorSwatch name="Primary" colorClass="bg-brand-primary" hex="#FFD600" textColor="text-black" />
          <ColorSwatch name="Success" colorClass="bg-state-success" hex="#00E676" textColor="text-black" />
          <ColorSwatch name="Error" colorClass="bg-state-error" hex="#FF1744" textColor="text-white" />
        </div>
      </div>

      <hr className="my-10 border-slate-200" />

      {/* --- SECTION 2: TYPOGRAPHY --- */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-400 mb-6">Fonts</h2>
        
        <div className="space-y-6 text-slate-800">
          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Headline 1</span>
            <span className="text-headline-1">Headline 1</span>
          </div>
          
          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Headline 2</span>
            <span className="text-headline-2">Headline 2</span>
          </div>

          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Headline 3</span>
            <span className="text-headline-3">Headline 3</span>
          </div>

          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Headline 4</span>
            <span className="text-headline-4">Headline 4</span>
          </div>

          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Body 1</span>
            <span className="text-body-1">Body 1 - Lorem ipsum dolor sit amet.</span>
          </div>

          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Body 2</span>
            <span className="text-body-2">Body 2 - Lorem ipsum dolor sit amet.</span>
          </div>

          <div className="flex items-baseline gap-8">
            <span className="w-32 text-slate-400 text-sm">Body 3</span>
            <span className="text-body-3">Body 3 - Lorem ipsum dolor sit amet.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component ย่อยสำหรับแสดงกล่องสี (เพื่อความสวยงามและไม่รก)
function ColorSwatch({ name, colorClass, hex, textColor }) {
  return (
    <div className="flex flex-col">
      <div className={`h-24 w-full rounded-lg shadow-sm flex items-center justify-center ${colorClass}`}>
        {/* แสดงชื่อ class ข้างในกล่องสีเลย จะได้เช็คสีได้ง่ายๆ */}
      </div>
      <div className="mt-2">
        <p className="font-medium text-slate-700 text-sm">{name}</p>
        <p className="text-slate-400 text-xs">{hex}</p>
      </div>
    </div>
  );
}

export default DesignSystem;