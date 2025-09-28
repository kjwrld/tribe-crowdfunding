import svgPaths from "./svg-l6jo3f130c";
import imgLaughing1 from "../assets/8d5a368abcc2f3aae0405a99719edc7142e70ae2.png";

function Frame61861() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Nunito:Regular',_sans-serif] font-normal gap-[24px] items-start justify-center leading-[0] left-[-4px] text-nowrap top-0 w-[593px]">
      <div className="relative shrink-0 text-[#d5adff] text-[59.044px] whitespace-pre">
        <p className="leading-[59.044px] mb-0">
          <span className="font-['Nunito:Bold',_sans-serif] font-bold">{` Empower `}</span>
          <span>{`every kid `}</span>
        </p>
        <p className="leading-[59.044px]">
          <span>{`to win in `}</span>
          <span className="font-['Nunito:Bold',_sans-serif] font-bold text-[#8614ff]">STEM</span>
        </p>
      </div>
      <div className="leading-[27px] relative shrink-0 text-[#8c92ab] text-[18px] text-center tracking-[0.36px] whitespace-pre">
        <p className="mb-0">{`Making STEM culturally relevant, so every kid, `}</p>
        <p>everywhere, can see themselves and succeed.</p>
      </div>
    </div>
  );
}

function Frame61564() {
  return (
    <div className="h-[210px] relative shrink-0 w-[619px]">
      <Frame61861 />
      <div className="absolute bg-[rgba(255,255,255,0.8)] blur-[26.25px] filter h-[184px] left-[492px] rounded-[23px] top-[-32.5px] w-[154px]" />
      <div className="absolute bg-white blur-[26.25px] filter h-[120px] left-[-108px] rounded-[23px] top-[-32.5px] w-[154px]" />
    </div>
  );
}

function InterfaceLightning() {
  return (
    <div className="relative shrink-0 size-[21.269px]" data-name="interface/lightning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="interface/lightning">
          <g id="Vector">
            <path d={svgPaths.p1b7e40c0} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-0 py-[13.293px] relative rounded-[10.634px] shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14.179px] text-neutral-100 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Launch great ideas</p>
      </div>
      <InterfaceLightning />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#782acb] box-border content-stretch flex gap-[8.862px] h-[54px] items-center justify-center px-[41.652px] py-[10.634px] relative rounded-[10.634px] shadow-[0px_40.766px_11.521px_0px_rgba(120,43,201,0),0px_26.586px_10.634px_0px_rgba(120,43,201,0.01),0px_15.066px_8.862px_0px_rgba(120,43,201,0.05),0px_6.203px_6.203px_0px_rgba(120,43,201,0.09),0px_1.772px_3.545px_0px_rgba(120,43,201,0.1)] shrink-0" data-name="Button">
      <Frame5 />
    </div>
  );
}

function Frame61862() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0 z-[2]">
      <Frame61564 />
      <Button />
    </div>
  );
}

function Frame61559() {
  return (
    <div className="h-[352px] relative shrink-0 w-[500px] z-[1]">
      <div className="absolute bg-center bg-contain bg-no-repeat left-1/2 size-[434px] translate-x-[-50%] translate-y-[-50%]" data-name="laughing 1" style={{ top: "calc(50% + 23px)", backgroundImage: `url('${imgLaughing1}')` }} />
    </div>
  );
}

export default function HeroBanner() {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative size-full" data-name="Hero Banner">
      <Frame61862 />
      <Frame61559 />
    </div>
  );
}