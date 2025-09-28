import svgPaths from "./svg-u6n8qa4seb";

function Title() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Title">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[51px] text-[34px] whitespace-pre">
          <span>{`Our `}</span>
          <span className="text-[#a047ff]">Solution</span>
        </p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Text">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[18px] text-center tracking-[0.36px] w-full">
        <p className="leading-[27px]">
          Immersive quests. Diverse heroes. Fun science.
          <br aria-hidden="true" />
          {` Kids explore, experiment, and earn rewards while building real STEM skills.`}
        </p>
      </div>
    </div>
  );
}

function Frame61772() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
      <Title />
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Text">
      <Frame61772 />
    </div>
  );
}

function Frame61799() {
  return (
    <div className="relative shrink-0 size-[45.935px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
        <g id="Frame 61799">
          <path d={svgPaths.p7114900} fill="var(--fill-0, #3C007A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconGame() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.38px] h-[43.979px] items-center justify-center overflow-clip p-[3.19px] relative shrink-0 w-[42.107px]" data-name="Icon/game">
      <Frame61799 />
    </div>
  );
}

function Frame61815() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[141px]">
      <IconGame />
      <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#a047ff] text-[18px] text-center tracking-[0.36px]" style={{ width: "min-content" }}>
        <p className="leading-[20px]">Immersive Gameplay</p>
      </div>
    </div>
  );
}

function Frame61809() {
  return (
    <div className="bg-white h-full relative rounded-[24px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-[32px] h-full items-center justify-center overflow-clip p-[24px] relative">
        <Frame61815 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c685ff] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Layer1() {
  return (
    <div className="absolute left-[12px] size-[50.05px] top-[9.81px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 51">
        <g clipPath="url(#clip0_31_586)" id="Layer_1">
          <path d={svgPaths.p118c5ac0} id="Vector" stroke="var(--stroke-0, #3C007A)" strokeMiterlimit="10" strokeWidth="4.16757" />
          <path d={svgPaths.p2ca46d80} id="Vector_2" stroke="var(--stroke-0, #3C007A)" strokeMiterlimit="10" strokeWidth="4.16757" />
          <path d="M25.0272 2.0838V47.9706" id="Vector_3" stroke="var(--stroke-0, #3C007A)" strokeMiterlimit="10" strokeWidth="4.16757" />
          <path d="M2.08389 25.0272H47.9707" id="Vector_4" stroke="var(--stroke-0, #3C007A)" strokeMiterlimit="10" strokeWidth="4.16757" />
          <path d={svgPaths.p2b0e7640} id="Vector_5" stroke="var(--stroke-0, #3C007A)" strokeMiterlimit="10" strokeWidth="4.16757" />
          <path d={svgPaths.p220c7380} id="Vector_6" stroke="var(--stroke-0, #3C007A)" strokeMiterlimit="10" strokeWidth="4.16757" />
        </g>
        <defs>
          <clipPath id="clip0_31_586">
            <rect fill="white" height="50.05" width="50.05" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame61800() {
  return (
    <div className="relative shrink-0 size-[72px]">
      <Layer1 />
    </div>
  );
}

function IconWeb() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[5px] relative shrink-0 w-[54px]" data-name="Icon/web">
      <Frame61800 />
    </div>
  );
}

function Frame61816() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[141px]">
      <IconWeb />
      <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#a047ff] text-[18px] text-center tracking-[0.36px] w-[158px]">
        <p className="leading-[20px]">Culturally Relevant Stories</p>
      </div>
    </div>
  );
}

function Frame61810() {
  return (
    <div className="bg-white h-full relative rounded-[24px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-[32px] h-full items-center justify-center overflow-clip p-[24px] relative">
        <Frame61816 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c685ff] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Layer2() {
  return (
    <div className="absolute h-[44.538px] left-[3.21px] top-[4.3px] w-[46.796px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 45">
        <g clipPath="url(#clip0_31_575)" id="Layer_1">
          <path d={svgPaths.p7c62780} id="Vector" stroke="var(--stroke-0, #D5ADFF)" strokeMiterlimit="10" strokeWidth="4.43675" />
          <path d={svgPaths.p162f6080} id="Vector_2" stroke="var(--stroke-0, #D5ADFF)" strokeMiterlimit="10" strokeWidth="4.43675" />
          <path d={svgPaths.p1b46f40} id="Vector_3" stroke="var(--stroke-0, #D5ADFF)" strokeMiterlimit="10" strokeWidth="4.43675" />
          <path d={svgPaths.p3007bc00} fill="var(--fill-0, #5400AD)" id="Vector_4" />
          <path d={svgPaths.p16b82d00} fill="var(--fill-0, #5400AD)" id="Vector_5" />
          <path d={svgPaths.pc37d900} fill="var(--fill-0, #5400AD)" id="Vector_6" />
          <path d={svgPaths.p3ce21180} fill="var(--fill-0, #5400AD)" id="Vector_7" />
          <path d={svgPaths.p14a6bb40} fill="var(--fill-0, #5400AD)" id="Vector_8" />
          <path d={svgPaths.p14705880} fill="var(--fill-0, #5400AD)" id="Vector_9" />
        </g>
        <defs>
          <clipPath id="clip0_31_575">
            <rect fill="white" height="44.5376" width="46.7959" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame61801() {
  return (
    <div className="relative shrink-0 size-[53.241px]">
      <Layer2 />
    </div>
  );
}

function IconPowered() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[7.395px] h-[61.786px] items-center justify-center overflow-clip p-[3.697px] relative shrink-0 w-[59.157px]" data-name="Icon/Powered">
      <Frame61801 />
    </div>
  );
}

function Frame61817() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[141px]">
      <IconPowered />
      <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#a047ff] text-[18px] text-center tracking-[0.36px]" style={{ width: "min-content" }}>
        <p className="leading-[20px]">Cross-Cultural Community</p>
      </div>
    </div>
  );
}

function Frame61811() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-[32px] items-center justify-center overflow-clip p-[24px] relative">
        <Frame61817 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c685ff] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Frame61802() {
  return (
    <div className="relative shrink-0 size-[45.935px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
        <g id="Frame 61799">
          <path d={svgPaths.p16e9aa80} fill="var(--fill-0, #3C007A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconGame1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.38px] h-[43.979px] items-center justify-center overflow-clip p-[3.19px] relative shrink-0 w-[42.107px]" data-name="Icon/game">
      <Frame61802 />
    </div>
  );
}

function Frame61818() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[141px]">
      <IconGame1 />
      <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#a047ff] text-[18px] text-center tracking-[0.36px]" style={{ width: "min-content" }}>
        <p className="leading-[20px]">Music + Sports Connections</p>
      </div>
    </div>
  );
}

function Frame61812() {
  return (
    <div className="bg-white h-full relative rounded-[24px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-[32px] h-full items-center justify-center overflow-clip p-[24px] relative">
        <Frame61818 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c685ff] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Frame61813() {
  return (
    <div className="content-stretch flex gap-[31px] items-center justify-center relative shrink-0 w-full">
      <div className="absolute h-0 left-[270px] top-[89px] w-[660px]">
        <div className="absolute inset-[-1px_-0.15%]" style={{ "--stroke-0": "rgba(120, 42, 203, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 662 2">
            <path d="M1 1H661" id="Line 1" stroke="var(--stroke-0, #782ACB)" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame61809 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame61810 />
      </div>
      <Frame61811 />
      <div className="flex flex-row items-center self-stretch">
        <Frame61812 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[-0.02%_-0.26%_-0.31%_-0.11%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Group">
          <path d={svgPaths.p52586c0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p25aa0500} fill="var(--fill-0, #4E4E4E)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function N7Iyze() {
  return (
    <div className="absolute contents inset-[-0.02%_-0.26%_-0.31%_-0.11%]" data-name="N7Iyze">
      <Group />
    </div>
  );
}

function Layer3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Layer_1">
      <N7Iyze />
    </div>
  );
}

function InterfaceEarthScience() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip relative shrink-0 size-[24px]" data-name="interface/Earth Science">
      <Layer3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 box-border content-stretch flex grow h-[65px] items-center justify-between min-h-px min-w-px px-0 py-[15px] relative rounded-[12px] shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[normal] whitespace-pre">Explore Features</p>
      </div>
      <InterfaceEarthScience />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#782acb] box-border content-stretch flex h-[65px] items-center justify-between px-[24px] py-[15px] relative rounded-[12px] shadow-[0px_46px_13px_0px_rgba(120,43,201,0),0px_30px_12px_0px_rgba(120,43,201,0.01),0px_17px_10px_0px_rgba(120,43,201,0.05),0px_7px_7px_0px_rgba(120,43,201,0.09),0px_2px_4px_0px_rgba(120,43,201,0.1)] shrink-0 w-[237px]" data-name="Button">
      <Frame5 />
    </div>
  );
}

export default function OurSolution() {
  return (
    <div className="backdrop-blur-[11.5px] backdrop-filter box-border content-stretch flex flex-col gap-[56px] items-center overflow-clip px-0 py-[58px] relative rounded-[24px] size-full" data-name="Our Solution">
      <Text1 />
      <Frame61813 />
      <Button />
    </div>
  );
}