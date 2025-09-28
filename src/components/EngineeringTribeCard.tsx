import engineeringImage from "../assets/a8874300174de4824a1addb97775a9cd28f6f762.png";

export default function EngineeringTribeCard() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#4c1d95] to-[#7c3aed] rounded-[24px] overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={engineeringImage} 
          alt="Engineering Tribe" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}