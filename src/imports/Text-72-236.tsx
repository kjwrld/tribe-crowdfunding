function Title() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Title">
      <div className="font-['Nunito:Bold',_sans-serif] font-bold h-[139px] leading-[0] relative shrink-0 text-[#d5adff] text-[59.044px] w-[434px]">
        <p className="leading-[59.044px]">
          <span>{`STEM, but `}</span>
          <span className="text-[#29ffe7]">Supercharged.</span>
        </p>
      </div>
      <div className="absolute bg-[#1f002e] blur-[26.25px] filter h-[150px] left-[364px] rounded-[18px] top-0 w-[88px]" />
    </div>
  );
}

export default function Text() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative size-full" data-name="TEXT">
      <Title />
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[18px] tracking-[0.36px] w-[396px]">
        <p className="leading-[27px]">NGSS-aligned learning, powered by heroes who reflect every child’s identity and potential.</p>
      </div>
    </div>
  );
}