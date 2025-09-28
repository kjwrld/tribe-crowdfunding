import svgPaths from "./svg-jkbx1njzf9";

function InterfaceLightning() {
  return (
    <div className="relative shrink-0 size-[21.269px]" data-name="interface/lightning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="interface/lightning">
          <g id="Vector">
            <path d={svgPaths.p1902a600} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-3 items-center justify-start px-0 py-[13.293px] relative rounded-[10.634px] shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14.179px] text-neutral-100 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Launch great ideas</p>
      </div>
      <InterfaceLightning />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#782acb] box-border content-stretch flex gap-[8.862px] h-[54px] items-center justify-center px-[41.652px] py-[10.634px] rounded-[10.634px] shadow-[0px_40.766px_11.521px_0px_rgba(120,43,201,0),0px_26.586px_10.634px_0px_rgba(120,43,201,0.01),0px_15.066px_8.862px_0px_rgba(120,43,201,0.05),0px_6.203px_6.203px_0px_rgba(120,43,201,0.09),0px_1.772px_3.545px_0px_rgba(120,43,201,0.1)] top-[457px] translate-x-[-50%]" data-name="Button" style={{ left: "calc(50% - 1.41px)" }}>
      <Frame5 />
    </div>
  );
}

export default function Frame61559() {
  return (
    <div className="relative size-full">
      <div className="absolute object-cover rounded-[46.083px] size-[470.576px] translate-x-[-50%] translate-y-[-50%]" data-name="laughing 1" style={{ top: "calc(50% - 21.712px)", left: "calc(50% - 10.192px)" }} />
      <Button />
    </div>
  );
}