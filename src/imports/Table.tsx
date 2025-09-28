import svgPaths from "./svg-si21ffg1l3";
import { motion } from 'motion/react';

function Frame3814() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-white text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Class</p>
      </div>
    </div>
  );
}

function Frame3815() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-white text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Proficiency</p>
      </div>
    </div>
  );
}

function Frame3817() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-white text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Time Spent</p>
      </div>
    </div>
  );
}

function ColumnInfo() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Column info">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame3814 />
          <Frame3815 />
          <Frame3817 />
        </div>
      </div>
    </div>
  );
}

function Frame3816() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Forces</p>
      </motion.div>
    </div>
  );
}

function Frame3819() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 193, 173, 0.5))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">90%</p>
      </motion.div>
    </div>
  );
}

function Frame3820() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">20 min</p>
      </motion.div>
    </div>
  );
}

function RawTable() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3816 />
          <Frame3819 />
          <Frame3820 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3826() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Properties of Matter</p>
      </motion.div>
    </div>
  );
}

function Frame3827() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">75%</p>
      </motion.div>
    </div>
  );
}

function Frame3828() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">22 min</p>
      </motion.div>
    </div>
  );
}

function RawTable2() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3826 />
          <Frame3827 />
          <Frame3828 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3830() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">{`Speed & Direction`}</p>
      </motion.div>
    </div>
  );
}

function Frame3831() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">80%</p>
      </motion.div>
    </div>
  );
}

function Frame3832() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">22 min</p>
      </motion.div>
    </div>
  );
}

function RawTable3() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3830 />
          <Frame3831 />
          <Frame3832 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3834() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Waves</p>
      </motion.div>
    </div>
  );
}

function Frame3835() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">79%</p>
      </motion.div>
    </div>
  );
}

function Frame3836() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">20 min</p>
      </motion.div>
    </div>
  );
}

function RawTable4() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3834 />
          <Frame3835 />
          <Frame3836 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3842() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Mass</p>
      </motion.div>
    </div>
  );
}

function Frame3843() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">75%</p>
      </motion.div>
    </div>
  );
}

function Frame3844() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">32 min</p>
      </motion.div>
    </div>
  );
}

function RawTable6() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3842 />
          <Frame3843 />
          <Frame3844 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3846() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Gravity</p>
      </motion.div>
    </div>
  );
}

function Frame3847() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#ff0138" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 1, 56, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">35%</p>
      </motion.div>
    </div>
  );
}

function Frame3848() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">12 min</p>
      </motion.div>
    </div>
  );
}

function RawTable7() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3846 />
          <Frame3847 />
          <Frame3848 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3850() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Space</p>
      </motion.div>
    </div>
  );
}

function Frame3851() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">65%</p>
      </motion.div>
    </div>
  );
}

function Frame3852() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">38 min</p>
      </motion.div>
    </div>
  );
}

function RawTable8() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3850 />
          <Frame3851 />
          <Frame3852 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3854() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Sound</p>
      </motion.div>
    </div>
  );
}

function Frame3855() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">65%</p>
      </motion.div>
    </div>
  );
}

function Frame3856() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">24 min</p>
      </motion.div>
    </div>
  );
}

function RawTable9() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3854 />
          <Frame3855 />
          <Frame3856 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Frame3858() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">Universe</p>
      </motion.div>
    </div>
  );
}

function Frame3859() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px] overflow-visible">
        <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="#00c1ad" id="Ellipse 19" r="9" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 193, 173, 0.4))' }} />
        </svg>
      </div>
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">90%</p>
      </motion.div>
    </div>
  );
}

function Frame3860() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <motion.div 
        className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-white text-[14px] text-nowrap"
        whileHover={{
          textShadow: "0 0 8px rgba(213, 173, 255, 0.8), 0 0 16px rgba(134, 20, 255, 0.6)",
          transition: { duration: 0.2 }
        }}
      >
        <p className="leading-[24px] whitespace-pre">38 min</p>
      </motion.div>
    </div>
  );
}

function RawTable10() {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Raw Table"
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        transformOrigin: 'center',
        cursor: 'pointer'
      }}
    >
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <motion.div 
        className="flex flex-row items-center justify-center relative size-full"
        whileHover={{
          boxShadow: "0 8px 32px rgba(134, 20, 255, 0.15), 0 4px 16px rgba(213, 173, 255, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3858 />
          <Frame3859 />
          <Frame3860 />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Info">
      <RawTable />
      <RawTable2 />
      <RawTable3 />
      <RawTable4 />
      <RawTable6 />
      <RawTable7 />
      <RawTable8 />
      <RawTable9 />
      <RawTable10 />
    </div>
  );
}

function ArrowsCaretLeft() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="arrows/caret-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="arrows/caret-left">
          <path d={svgPaths.p2351d500} fill="rgba(255, 255, 255, 0.6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowsCaretRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrows/caret-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrows/caret-right">
          <path d={svgPaths.p15959880} fill="rgba(255, 255, 255, 0.6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3867() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <ArrowsCaretLeft />
      <div className="font-['Nunito:Light',_sans-serif] font-light leading-[0] relative shrink-0 text-white text-[13px] tracking-[0.78px] w-[60px]">
        <p className="leading-[1.65] whitespace-nowrap">1 of 1</p>
      </div>
      <ArrowsCaretRight />
    </div>
  );
}

function Showing() {
  return (
    <div className="relative shrink-0 w-full" data-name="Showing">
      <div className="flex flex-row items-end justify-center relative size-full">
        <div className="box-border content-stretch flex items-end justify-center px-[24px] py-[16px] relative w-full">
          <Frame3867 />
        </div>
      </div>
    </div>
  );
}

export default function Table() {
  return (
    <div className="bg-[#4c1d95]/90 backdrop-blur-sm box-border content-stretch flex flex-col items-start overflow-visible pb-0 pt-[12px] px-0 relative rounded-[24px] size-full [&_*]:cursor-none" data-name="Table" style={{ backdropFilter: 'blur(8px) saturate(120%) brightness(110%)', cursor: 'none' }}>
      <ColumnInfo />
      <Info />
      <Showing />
    </div>
  );
}