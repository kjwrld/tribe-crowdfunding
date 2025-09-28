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

export default function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative size-full" data-name="Text">
      <Frame61772 />
    </div>
  );
}