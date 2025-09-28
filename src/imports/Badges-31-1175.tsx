function Label() {
  return (
    <div className="bg-[rgba(198,133,255,0.3)] box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[3px] relative rounded-[12px] shrink-0" data-name="Label">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#a047ff] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">{`Reach  Out`}</p>
      </div>
    </div>
  );
}

function Frame61808() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Label />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#a047ff] text-[0px] text-nowrap tracking-[1.02px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[51px] text-[34px] whitespace-pre">We’d love to hear from you.</p>
      </div>
    </div>
  );
}

export default function Badges() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[10px] relative size-full" data-name="Badges">
      <Frame61808 />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#737992] text-[18px] tracking-[0.36px]" style={{ width: "min-content" }}>
        <p className="leading-[27px]">Have questions, ideas, or partnership opportunities? Our team is here to connect, collaborate, and share more about how we’re making STEM engaging, inclusive, and inspiring for kids everywhere.</p>
      </div>
    </div>
  );
}