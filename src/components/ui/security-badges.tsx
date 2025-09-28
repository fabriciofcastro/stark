"use client";

const SecurityBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-4 bg-white/5 rounded-xl px-4">
      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <span className="text-gray-200">ISO 27001</span>
      </div>
      
      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <span className="text-gray-200">SOC 2 Type II</span>
      </div>
      
      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <span className="text-gray-200">LGPD</span>
      </div>
      
      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <span className="text-gray-200">PCI DSS</span>
      </div>
    </div>
  );
};

export default SecurityBadges;