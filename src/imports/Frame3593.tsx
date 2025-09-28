import svgPaths from "./svg-pbf887kdnb";

function ArrowsCaretDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrows/caret-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrows/caret-down">
          <path d={svgPaths.p2c39c4f0} fill="var(--fill-0, #4E4E4E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TribeMenu() {
  return (
    <div className="box-border content-stretch flex gap-[6px] items-center px-0 py-[5px] relative shrink-0" data-name="Tribe menu">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4e4e4e] text-[0px] text-nowrap tracking-[0.36px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">Science Tribe</p>
      </div>
      <ArrowsCaretDown />
    </div>
  );
}

function ArrowsCaretDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrows/caret-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrows/caret-down">
          <path d={svgPaths.p2c39c4f0} fill="var(--fill-0, #4E4E4E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TribeMenu1() {
  return (
    <div className="box-border content-stretch flex gap-[6px] items-center px-0 py-[5px] relative shrink-0" data-name="Tribe menu">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4e4e4e] text-[0px] text-nowrap tracking-[0.36px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">All Subjects</p>
      </div>
      <ArrowsCaretDown1 />
    </div>
  );
}

function Frame3869() {
  return (
    <div className="content-stretch flex gap-[24px] h-full items-center relative shrink-0">
      <TribeMenu />
      <TribeMenu1 />
    </div>
  );
}

function InterfaceTrash() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="interface/trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="interface/trash">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p309fef00} fill="var(--fill-0, #230048)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow h-[65px] items-center min-h-px min-w-px relative rounded-[12px] shrink-0">
      <InterfaceTrash />
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-full items-center justify-center px-[12px] py-[15px] relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#230048] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Frame6 />
    </div>
  );
}

function InterfaceSettings() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="interface/settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="interface/settings">
          <path d={svgPaths.p170aed00} fill="var(--fill-0, #230048)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[10px] h-[65px] items-center relative rounded-[12px] shrink-0">
      <InterfaceSettings />
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center px-[12px] py-[15px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#230048] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame7 />
    </div>
  );
}

function InterfaceSearch() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="interface/search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="interface/search">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p214858d0} fill="var(--fill-0, #5B6178)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[33px] h-full items-center px-[24px] py-[3px] relative rounded-[24px] shrink-0" data-name="Search Bar">
      <InterfaceSearch />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#5b6178] text-[0px] text-nowrap tracking-[0.36px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">Search</p>
      </div>
    </div>
  );
}

function Frame3875() {
  return (
    <div className="basis-0 content-stretch flex gap-[20px] grow h-[44px] items-end justify-end min-h-px min-w-px relative shrink-0">
      <Button1 />
      <Button2 />
      <SearchBar />
    </div>
  );
}

function DashboardFilters() {
  return (
    <div className="content-stretch flex gap-[16px] h-[37px] items-center justify-end relative shrink-0 w-[1120px]" data-name="Dashboard filters">
      <Frame3869 />
      <Frame3875 />
    </div>
  );
}

function Group317() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mb-[-36px] place-items-start relative shrink-0 w-full">
      <div className="[grid-area:1_/_1] bg-[rgba(255,255,255,0.32)] h-[36px] ml-0 mt-0 relative rounded-[30px] w-[949px]">
        <div aria-hidden="true" className="absolute border-2 border-[#d5adff] border-dashed inset-0 pointer-events-none rounded-[30px]" />
      </div>
      <div className="[grid-area:1_/_1] bg-[#e51d37] h-[36px] ml-0 mt-0 rounded-bl-[30px] rounded-tl-[30px] w-[378.299px]" />
      <div className="[grid-area:1_/_1] bg-[#5400ad] h-[36px] ml-0 mt-0 rounded-bl-[30px] rounded-tl-[30px] w-[374.581px]" />
    </div>
  );
}

function Frame61780() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[36px] items-start leading-[0] left-0 pb-[36px] pt-0 px-0 top-[0.5px] w-[949px]">
      <Group317 />
      <div className="basis-0 flex flex-col font-['Nunito:Regular',_sans-serif] font-normal grow justify-center mb-[-36px] min-h-px min-w-px relative shrink-0 text-[#efe0ff] text-[0px] text-right tracking-[0.36px] w-[375px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px]">30%</p>
      </div>
    </div>
  );
}

function Frame61781() {
  return (
    <div className="h-[36px] relative shrink-0 w-[949px]">
      <Frame61780 />
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="content-stretch flex h-[41px] items-center justify-between relative shrink-0 w-[1120px]" data-name="Progress Bar">
      <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#4f4f4f] text-[18px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Overall Progress</p>
      </div>
      <Frame61781 />
    </div>
  );
}

function Frame61820() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <DashboardFilters />
      <ProgressBar />
    </div>
  );
}

function Frame3814() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Student</p>
      </div>
    </div>
  );
}

function Frame3815() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Proficiency</p>
      </div>
    </div>
  );
}

function Frame3817() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Time Spent</p>
      </div>
    </div>
  );
}

function Frame3818() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap text-right w-[127px]">
        <p className="[white-space-collapse:collapse] font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] overflow-ellipsis overflow-hidden text-[16px]">Resources</p>
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
          <Frame3818 />
        </div>
      </div>
    </div>
  );
}

function Frame3816() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Forces</p>
      </div>
    </div>
  );
}

function Frame3819() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">90%</p>
      </div>
    </div>
  );
}

function Frame3820() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">20 min</p>
      </div>
    </div>
  );
}

function Frame3821() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[#782acb] text-[14px] underline whitespace-pre">Check the Rhymes</p>
      </div>
    </div>
  );
}

function RawTable() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3816 />
          <Frame3819 />
          <Frame3820 />
          <Frame3821 />
        </div>
      </div>
    </div>
  );
}

function Frame3822() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Frictions</p>
      </div>
    </div>
  );
}

function Frame3823() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #E51D37)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">10%</p>
      </div>
    </div>
  );
}

function Frame3824() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">12 min</p>
      </div>
    </div>
  );
}

function Frame3825() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3822 />
          <Frame3823 />
          <Frame3824 />
          <Frame3825 />
        </div>
      </div>
    </div>
  );
}

function Frame3826() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Properties of Matter</p>
      </div>
    </div>
  );
}

function Frame3827() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">75%</p>
      </div>
    </div>
  );
}

function Frame3828() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">22 min</p>
      </div>
    </div>
  );
}

function Frame3829() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#782acb] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[#4f4f4f] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3826 />
          <Frame3827 />
          <Frame3828 />
          <Frame3829 />
        </div>
      </div>
    </div>
  );
}

function Frame3830() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">{`Speed & Direction`}</p>
      </div>
    </div>
  );
}

function Frame3831() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function Frame3832() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">22 min</p>
      </div>
    </div>
  );
}

function Frame3833() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3830 />
          <Frame3831 />
          <Frame3832 />
          <Frame3833 />
        </div>
      </div>
    </div>
  );
}

function Frame3834() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Waves</p>
      </div>
    </div>
  );
}

function Frame3835() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">79%</p>
      </div>
    </div>
  );
}

function Frame3836() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">20 min</p>
      </div>
    </div>
  );
}

function Frame3837() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3834 />
          <Frame3835 />
          <Frame3836 />
          <Frame3837 />
        </div>
      </div>
    </div>
  );
}

function Frame3838() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">{`Push & Pull`}</p>
      </div>
    </div>
  );
}

function Frame3839() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">59%</p>
      </div>
    </div>
  );
}

function Frame3840() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">20 min</p>
      </div>
    </div>
  );
}

function Frame3841() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3838 />
          <Frame3839 />
          <Frame3840 />
          <Frame3841 />
        </div>
      </div>
    </div>
  );
}

function Frame3842() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Mass</p>
      </div>
    </div>
  );
}

function Frame3843() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">75%</p>
      </div>
    </div>
  );
}

function Frame3844() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">32 min</p>
      </div>
    </div>
  );
}

function Frame3845() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3842 />
          <Frame3843 />
          <Frame3844 />
          <Frame3845 />
        </div>
      </div>
    </div>
  );
}

function Frame3846() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Gravity</p>
      </div>
    </div>
  );
}

function Frame3847() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #E51D37)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">35%</p>
      </div>
    </div>
  );
}

function Frame3848() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">12 min</p>
      </div>
    </div>
  );
}

function Frame3849() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3846 />
          <Frame3847 />
          <Frame3848 />
          <Frame3849 />
        </div>
      </div>
    </div>
  );
}

function Frame3850() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Space</p>
      </div>
    </div>
  );
}

function Frame3851() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">65%</p>
      </div>
    </div>
  );
}

function Frame3852() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">38 min</p>
      </div>
    </div>
  );
}

function Frame3853() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3850 />
          <Frame3851 />
          <Frame3852 />
          <Frame3853 />
        </div>
      </div>
    </div>
  );
}

function Frame3855() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Sound</p>
      </div>
    </div>
  );
}

function Frame3856() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">65%</p>
      </div>
    </div>
  );
}

function Frame3857() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">24 min</p>
      </div>
    </div>
  );
}

function Frame3858() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3855 />
          <Frame3856 />
          <Frame3857 />
          <Frame3858 />
        </div>
      </div>
    </div>
  );
}

function Frame3859() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Universe</p>
      </div>
    </div>
  );
}

function Frame3860() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #01BE85)" id="Ellipse 19" r="9" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">90%</p>
      </div>
    </div>
  );
}

function Frame3861() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">38 min</p>
      </div>
    </div>
  );
}

function Frame3862() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3859 />
          <Frame3860 />
          <Frame3861 />
          <Frame3862 />
        </div>
      </div>
    </div>
  );
}

function Frame3863() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Fungi</p>
      </div>
    </div>
  );
}

function Frame3864() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[18px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" id="Ellipse 19" r="8.5" stroke="var(--stroke-0, #434343)" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">0%</p>
      </div>
    </div>
  );
}

function Frame3865() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[14px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Not started</p>
      </div>
    </div>
  );
}

function Frame3866() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-end min-h-px min-w-px relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Nunito:Bold',_sans-serif] font-bold leading-[24px] text-[14px] underline whitespace-pre">Assign</p>
      </div>
    </div>
  );
}

function RawTable11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Raw Table">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(184,178,232,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
          <Frame3863 />
          <Frame3864 />
          <Frame3865 />
          <Frame3866 />
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Info">
      <RawTable />
      <RawTable1 />
      <RawTable2 />
      <RawTable3 />
      <RawTable4 />
      <RawTable5 />
      <RawTable6 />
      <RawTable7 />
      <RawTable8 />
      <RawTable9 />
      <RawTable10 />
      <RawTable11 />
    </div>
  );
}

function ArrowsCaretLeft() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="arrows/caret-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="arrows/caret-left">
          <path d={svgPaths.p2351d500} fill="var(--fill-0, #858585)" id="Vector" />
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
          <path d={svgPaths.p15959880} fill="var(--fill-0, #858585)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3868() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <ArrowsCaretLeft />
      <div className="font-['Nunito:Light',_sans-serif] font-light leading-[0] relative shrink-0 text-[#858585] text-[13px] tracking-[0.78px] w-[38px]">
        <p className="leading-[1.65]">1 of 1</p>
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
          <Frame3868 />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start overflow-clip pb-0 pt-[12px] px-0 relative rounded-[24px] shrink-0 w-full" data-name="Table">
      <ColumnInfo />
      <Info />
      <Showing />
    </div>
  );
}

function ClassProgress() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative rounded-[24px] shrink-0 w-[649px]" data-name="class progress">
      <Table />
    </div>
  );
}

function Frame61795() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Weekly Screen Time</p>
      </div>
    </div>
  );
}

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

function Frame61805() {
  return (
    <div className="h-[139px] relative shrink-0 w-full">
      <Frame61803 />
      <Frame61804 />
    </div>
  );
}

function Frame61789() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[49.5px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[9px] relative w-[15px]" data-name="Path">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 9">
              <path d={svgPaths.pfdc03f0} fill="var(--fill-0, #01BE85)" id="Path" />
            </svg>
          </div>
        </div>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#01be85] text-[0px] text-nowrap tracking-[0.12px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[18px] text-[12px] whitespace-pre">2.4%</p>
      </div>
    </div>
  );
}

function Frame61790() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Weekly Usage</p>
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
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">12h 15m</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61808() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[49.5px]">
      <div className="h-[9px] relative shrink-0 w-[14px]" data-name="Path">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
          <path d={svgPaths.p33732b80} fill="var(--fill-0, #FB2047)" id="Path" />
        </svg>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#01be85] text-[0px] text-nowrap tracking-[0.12px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[18px] text-[#fb2047] text-[12px] whitespace-pre">4.3%</p>
      </div>
    </div>
  );
}

function Frame61809() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Avg. Session</p>
      </div>
      <Frame61808 />
    </div>
  );
}

function Frame61792() {
  return (
    <div className="basis-0 bg-white grow h-[57px] min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(211,171,252,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between px-[12px] py-[10px] relative w-full">
          <Frame61809 />
          <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap text-right tracking-[0.36px]">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">3h 12m</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61794() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
      <Frame61791 />
      <Frame61792 />
    </div>
  );
}

function Frame61806() {
  return (
    <div className="h-[280px] relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col h-[280px] items-start justify-between pb-[16px] pt-[24px] px-[15px] relative w-full">
          <Frame61795 />
          <Frame61805 />
          <Frame61794 />
        </div>
      </div>
    </div>
  );
}

function Frame61807() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] items-start relative rounded-[24px] shrink-0 w-full">
      <Frame61806 />
    </div>
  );
}

function Frame61788() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre">Total Screen Time</p>
      </div>
    </div>
  );
}

function Frame61785() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[0] relative shrink-0 text-[#4f4f4f] w-[100px]">
      <div className="font-['Nunito:Bold',_sans-serif] font-bold h-[27px] relative shrink-0 text-[24px] w-full">
        <p className="leading-[normal]">18h 45m</p>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal relative shrink-0 text-[12px] w-full">
        <p className="leading-[24px]">Total Screen Time</p>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute left-0 size-[183px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 183 183">
        <g id="Group 12">
          <path d={svgPaths.p15759180} fill="var(--fill-0, #782ACB)" id="Ellipse 16" />
          <path d={svgPaths.p68b1d00} fill="var(--fill-0, #E6B100)" id="Ellipse 18" />
          <path d={svgPaths.p4382800} fill="var(--fill-0, #FF0037)" id="Ellipse 17" />
          <path d={svgPaths.p3a50c680} fill="var(--fill-0, #F4EBFF)" id="Ellipse 19" />
        </g>
      </svg>
    </div>
  );
}

function Group315() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group12 />
    </div>
  );
}

function Frame61786() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-center px-[38px] py-[60px] relative shrink-0 size-[183px]">
      <Frame61785 />
      <Group315 />
    </div>
  );
}

function Dot() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Dot">
          <path d={svgPaths.p10453ef0} fill="var(--fill-0, #9E9E9E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Tag() {
  return (
    <div className="box-border content-stretch flex items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[8px] shrink-0" data-name="Tag">
      <Dot />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Warm Up</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0" data-name="Text">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black tracking-[0.12px] w-full">
        <p className="leading-[18px]">5h 20m</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-center flex flex-wrap gap-[48px] items-center justify-between relative rounded-[8px] shrink-0 w-full" data-name="Content">
      <Tag />
      <Text />
    </div>
  );
}

function Dot1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Dot">
          <path d={svgPaths.p10453ef0} fill="var(--fill-0, #E3B10E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Tag1() {
  return (
    <div className="box-border content-stretch flex items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[8px] shrink-0" data-name="Tag">
      <Dot1 />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Challenges</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0" data-name="Text">
      <div className="css-8kj6t4 font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black tracking-[0.12px] w-full">
        <p className="leading-[18px]">3h 15m</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-center flex flex-wrap gap-[48px] items-center justify-between relative rounded-[8px] shrink-0 w-full" data-name="Content">
      <Tag1 />
      <Text1 />
    </div>
  );
}

function Dot2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Dot">
          <path d={svgPaths.p10453ef0} fill="var(--fill-0, #B8B2E8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Tag2() {
  return (
    <div className="box-border content-stretch flex items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[8px] shrink-0" data-name="Tag">
      <Dot2 />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Master</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0" data-name="Text">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black tracking-[0.12px] w-full">
        <p className="leading-[18px]">2h 09m</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-center flex flex-wrap gap-[48px] items-center justify-between relative rounded-[8px] shrink-0 w-full" data-name="Content">
      <Tag2 />
      <Text2 />
    </div>
  );
}

function Dot3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Dot">
          <path d={svgPaths.p10453ef0} fill="var(--fill-0, #FF0037)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Tag3() {
  return (
    <div className="box-border content-stretch flex items-center pl-[4px] pr-[8px] py-[2px] relative rounded-[8px] shrink-0" data-name="Tag">
      <Dot3 />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Practice</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0" data-name="Text">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black tracking-[0.12px] w-full">
        <p className="leading-[18px]">0h 48m</p>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-center flex flex-wrap gap-[48px] items-center justify-between relative rounded-[8px] shrink-0 w-full" data-name="Content">
      <Tag3 />
      <Text3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[124px] items-start relative rounded-[16px] shrink-0 w-full" data-name="Frame">
      <Content />
      <Content1 />
      <Content2 />
      <Content3 />
    </div>
  );
}

function Frame61783() {
  return (
    <div className="bg-white h-[48px] relative rounded-[5px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
      <div className="absolute font-['Nunito:Bold',_sans-serif] font-['Nunito:Regular',_sans-serif] font-bold font-normal leading-[18px] left-[14px] text-[0px] text-[12px] text-black text-nowrap top-[6.21px] tracking-[0.12px] whitespace-pre">
        <p className="mb-0">
          <span className="text-[#782acb]">Recommended Section:</span>
          <span className="text-[#848484]"> </span>
        </p>
        <p className="text-[#4f4f4f]">Practice</p>
      </div>
    </div>
  );
}

function Frame61784() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-[180px]">
      <Frame />
      <Frame61783 />
    </div>
  );
}

function Frame61787() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame61786 />
      <Frame61784 />
    </div>
  );
}

function Frame61810() {
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

function Frame61811() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Problem Solving</p>
      </div>
      <Frame61810 />
    </div>
  );
}

function Frame61812() {
  return (
    <div className="basis-0 bg-white grow h-[57px] min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(211,171,252,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between px-[12px] py-[10px] relative w-full">
          <Frame61811 />
          <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap text-right tracking-[0.36px]">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">3h 15m</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61813() {
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

function Frame61814() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[12px] text-nowrap tracking-[0.12px]">
        <p className="leading-[18px] whitespace-pre">Logical Thinking</p>
      </div>
      <Frame61813 />
    </div>
  );
}

function Frame61815() {
  return (
    <div className="basis-0 bg-white grow h-[57px] min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(211,171,252,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between px-[12px] py-[10px] relative w-full">
          <Frame61814 />
          <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#4f4f4f] text-[0px] text-nowrap text-right tracking-[0.36px]">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[18px] whitespace-pre">2h 40m</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61793() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
      <Frame61812 />
      <Frame61815 />
    </div>
  );
}

function Frame61816() {
  return (
    <div className="bg-white h-[362px] relative rounded-[24px] shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col h-[362px] items-start justify-between pb-[16px] pt-[24px] px-[15px] relative w-full">
          <Frame61788 />
          <Frame61787 />
          <Frame61793 />
        </div>
      </div>
    </div>
  );
}

function Frame61817() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame61816 />
    </div>
  );
}

function Graphs() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow h-full items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Graphs">
      <Frame61807 />
      <Frame61817 />
    </div>
  );
}

function Info1() {
  return (
    <div className="content-stretch flex gap-[28px] items-end justify-end relative shrink-0 w-full" data-name="Info">
      <ClassProgress />
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <Graphs />
      </div>
    </div>
  );
}

function Table1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Table">
      <Info1 />
    </div>
  );
}

function Frame3854() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Table1 />
    </div>
  );
}

export default function Frame3593() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-0 py-[32px] relative rounded-[24px] size-full">
      <Frame61820 />
      <Frame3854 />
    </div>
  );
}