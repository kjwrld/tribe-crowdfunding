import svgPaths from "./svg-epao1bhrco";

function Frame61789() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[49.5px]">
      <div className="h-[9px] relative shrink-0 w-[15px]" data-name="Path">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 9">
          <path d={svgPaths.pfdc03f0} fill="var(--fill-0, #F93C65)" id="Path" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f93c65] text-[0px] text-nowrap tracking-[0.12px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[18px] text-[12px] whitespace-pre">1.2%</p>
      </div>
    </div>
  );
}

function Frame61790() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Problem Solving</p>
      </div>
      <Frame61789 />
    </div>
  );
}

function Frame61791() {
  return (
    <div className="basis-0 bg-white grow h-[57px] min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(211,171,252,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between px-[12px] py-[10px] relative w-full">
          <Frame61790 />
          <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap text-right tracking-[0.36px]">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">3h 15m</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61794() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[49.5px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[9px] relative w-[14px]" data-name="Path">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
              <path d={svgPaths.p33732b80} fill="var(--fill-0, #01BE85)" id="Path" />
            </svg>
          </div>
        </div>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#01be85] text-[0px] text-nowrap tracking-[0.12px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[18px] text-[12px] whitespace-pre">3.9%</p>
      </div>
    </div>
  );
}

function Frame61795() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Logical Thinking</p>
      </div>
      <Frame61794 />
    </div>
  );
}

function Frame61792() {
  return (
    <div className="basis-0 bg-white grow h-[57px] min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(211,171,252,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between px-[12px] py-[10px] relative w-full">
          <Frame61795 />
          <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap text-right tracking-[0.36px]">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">2h 40m</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame61793() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative size-full">
      <Frame61791 />
      <Frame61792 />
    </div>
  );
}