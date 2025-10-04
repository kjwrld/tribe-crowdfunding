import imgLaughing1 from "../assets/19dbf2dbedb00b9e97d44bc39a5ca3e1cbafd48e.png";

function Frame61858() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start leading-[0] relative shrink-0 w-[458px]">
      <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[59.044px] relative shrink-0 text-[#d5adff] text-[59.044px] text-nowrap whitespace-pre">
        <p className="mb-0">
          <span>{`Bringing `}</span>
          <span className="text-[#8614ff]">{`culture `}</span>
        </p>
        <p>to STEM</p>
      </div>
      <div className="font-['Nunito:Regular',_sans-serif] font-normal relative shrink-0 text-[#8c92ab] text-[0px] tracking-[0.36px] w-[505px]">
        <p className="leading-[27px] text-[18px]">
          <span className="font-['Nunito:Bold',_sans-serif] font-bold tracking-[0.36px]">{`Be part of our journey! `}</span>Get updates and opportunities to help us grow through our Facebook Group and Newsletter.
        </p>
      </div>
    </div>
  );
}

function Frame3572() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#737992] text-[18px] text-nowrap tracking-[0.36px]">
        <p className="leading-[normal] whitespace-pre">Full Name</p>
      </div>
    </div>
  );
}

function Frame4044() {
  return (
    <div className="bg-[#f0f2f6] h-[64px] relative rounded-[15px] shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[64px] items-center px-[15px] py-[12px] relative w-full">
          <Frame3572 />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[15px] shrink-0 w-full" data-name="Input">
      <Frame4044 />
    </div>
  );
}

function Frame3573() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#737992] text-[18px] text-nowrap tracking-[0.36px]">
        <p className="leading-[normal] whitespace-pre">Email</p>
      </div>
    </div>
  );
}

function Frame4045() {
  return (
    <div className="bg-[#f0f2f6] h-[64px] relative rounded-[15px] shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[64px] items-center px-[15px] py-[12px] relative w-full">
          <Frame3573 />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[15px] shrink-0 w-full" data-name="Input">
      <Frame4045 />
    </div>
  );
}

function Frame61860() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Input />
      <Input1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center px-0 py-[13.293px] relative rounded-[10.634px] shrink-0">
      <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14.179px] text-neutral-100 text-nowrap">
        <p className="leading-[normal] whitespace-pre">Join the community</p>
      </div>
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

function Frame61859() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[493px] z-[2]">
      <Frame61858 />
      <Frame61860 />
      <Button />
    </div>
  );
}

function Frame61559() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0 w-[707px] z-[1]">
      <div className="bg-center bg-contain bg-no-repeat h-[517px] rounded-[46.083px] shrink-0 w-[750px]" data-name="laughing 1" style={{ backgroundImage: `url('${imgLaughing1}')` }} />
    </div>
  );
}

export default function HeroBanner() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" data-name="Hero Banner">
      <Frame61559 />
      <Frame61859 />
    </div>
  );
}