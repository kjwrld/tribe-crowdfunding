import svgPaths from "./svg-5yrfzz9814";

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

function Layer1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Layer_1">
      <N7Iyze />
    </div>
  );
}

function InterfaceEarthScience() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip relative shrink-0 size-[24px]" data-name="interface/Earth Science">
      <Layer1 />
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

export default function Button() {
  return (
    <div className="bg-[#782acb] relative rounded-[12px] shadow-[0px_46px_13px_0px_rgba(120,43,201,0),0px_30px_12px_0px_rgba(120,43,201,0.01),0px_17px_10px_0px_rgba(120,43,201,0.05),0px_7px_7px_0px_rgba(120,43,201,0.09),0px_2px_4px_0px_rgba(120,43,201,0.1)] size-full" data-name="Button">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[24px] py-[15px] relative size-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}