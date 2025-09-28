function Frame61803() {
  return (
    <div className="absolute h-[60px] left-[22px] top-[36px] w-[375px]">
      <div className="absolute bottom-0 left-0 right-0 top-[-1.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 61">
          <g id="Frame 61803">
            <line id="Line 20" opacity="0.3" stroke="var(--stroke-0, #BDB9E4)" strokeDasharray="3 3" strokeLinecap="round" x1="0.5" x2="374.5" y1="0.5" y2="0.5" />
            <line id="Line 19" opacity="0.3" stroke="var(--stroke-0, #BDB9E4)" strokeDasharray="3 3" strokeLinecap="round" x1="0.5" x2="374.5" y1="30.5" y2="30.5" />
            <line id="Line 18" opacity="0.3" stroke="var(--stroke-0, #BDB9E4)" strokeDasharray="3 3" strokeLinecap="round" x1="0.5" x2="374.5" y1="60.5" y2="60.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame61802() {
  return (
    <div className="content-stretch flex flex-col font-['Nunito:Regular',_sans-serif] font-normal gap-[6px] items-start leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] w-[15px]">
      <div className="relative shrink-0 w-full">
        <p className="leading-[24px]">3h</p>
      </div>
      <div className="relative shrink-0 w-full">
        <p className="leading-[24px]">2h</p>
      </div>
      <div className="relative shrink-0 w-full">
        <p className="leading-[24px]">1h</p>
      </div>
    </div>
  );
}

function Frame61796() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative shrink-0 w-[30px]">
      <div className="bg-[#bdb9e4] h-[87px] rounded-[10px] shrink-0 w-full" />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] w-full">
        <p className="leading-[24px]">Mon</p>
      </div>
    </div>
  );
}

function Frame61797() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative shrink-0 w-[30px]">
      <div className="bg-[#bdb9e4] h-[108px] rounded-[10px] shrink-0 w-full" />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-center w-full">
        <p className="leading-[24px]">Tue</p>
      </div>
    </div>
  );
}

function Frame61798() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative shrink-0 w-[30px]">
      <div className="bg-[#bdb9e4] h-[46px] rounded-[10px] shrink-0 w-full" />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] w-full">
        <p className="leading-[24px]">Wed</p>
      </div>
    </div>
  );
}

function Frame61799() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative shrink-0 w-[30px]">
      <div className="bg-[#bdb9e4] h-[98px] rounded-[10px] shrink-0 w-full" />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] w-full">
        <p className="leading-[24px]">Thu</p>
      </div>
    </div>
  );
}

function Frame61800() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative shrink-0 w-[30px]">
      <div className="bg-[#bdb9e4] h-[83px] rounded-[10px] shrink-0 w-full" />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-center w-full">
        <p className="leading-[24px]">Fri</p>
      </div>
    </div>
  );
}

function Frame61801() {
  return (
    <div className="content-stretch flex gap-[44px] items-end relative shrink-0">
      <Frame61796 />
      <Frame61797 />
      <Frame61798 />
      <Frame61799 />
      <Frame61800 />
    </div>
  );
}

function Frame61804() {
  return (
    <div className="absolute content-stretch flex gap-[31px] items-center left-0 top-0">
      <Frame61802 />
      <Frame61801 />
    </div>
  );
}

export default function Frame61805() {
  return (
    <div className="relative size-full">
      <Frame61803 />
      <Frame61804 />
    </div>
  );
}