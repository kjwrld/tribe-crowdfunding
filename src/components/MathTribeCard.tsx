import mathImage from "../assets/webp/24ffbe288bce42e59626a63b1da81bcb21dce94f.webp";

export default function MathTribeCard() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-[#4c1d95] to-[#7c3aed] rounded-[24px] overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={mathImage}
                    alt="Math Tribe"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
