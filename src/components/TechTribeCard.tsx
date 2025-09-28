import techImage from "../assets/c35a7d3850c13da826eb704ee7b6ff3550e73b52.png";

export default function TechTribeCard() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#4c1d95] to-[#7c3aed] rounded-[24px] overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={techImage} 
          alt="Tech Tribe" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}