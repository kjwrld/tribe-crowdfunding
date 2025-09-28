import EngineeringTribeCard from "./EngineeringTribeCard";
import TechTribeCard from "./TechTribeCard";
import MathTribeCard from "./MathTribeCard";
import { motion } from 'motion/react';

export default function TribeCardStack() {
  const cards = [
    { id: 1, component: MathTribeCard, rotation: -8, zIndex: 1 },
    { id: 2, component: TechTribeCard, rotation: 3, zIndex: 2 },
    { id: 3, component: EngineeringTribeCard, rotation: -2, zIndex: 3 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {cards.map((card, index) => {
        const CardComponent = card.component;
        return (
          <motion.div
            key={card.id}
            className="absolute w-[280px] h-[400px]"
            style={{
              zIndex: card.zIndex,
              transform: `rotate(${card.rotation}deg)`,
            }}
            initial={{ 
              opacity: 0, 
              y: 50,
              rotate: card.rotation + 10,
            }}
            animate={{ 
              opacity: 1, 
              y: index * -8,
              rotate: card.rotation,
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: "easeOut"
            }}
            whileHover={{
              y: index * -8 - 10,
              rotate: card.rotation + 2,
              transition: { duration: 0.3 }
            }}
          >
            <div 
              className="w-full h-full rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden"
              style={{
                filter: `drop-shadow(0 ${4 + index * 2}px ${8 + index * 4}px rgba(0,0,0,0.1))`,
              }}
            >
              <CardComponent />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}