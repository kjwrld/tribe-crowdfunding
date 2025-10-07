import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Table from './Table';
import { CursorProvider, Cursor, CursorFollow } from '../components/ui/cursor';
import dashboardImage from '../assets/3606a7520ab77fa7198e35a59aac25f2b54aa822.png';



// Animated Statistics Cards
function StatCard({ 
  title, 
  value, 
  trend, 
  delay = 0, 
  isInView, 
  color = "#8614ff" 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  delay?: number; 
  isInView: boolean; 
  color?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [triggerShimmer, setTriggerShimmer] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    setTriggerShimmer(prev => !prev); // Toggle to trigger shimmer animation
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <motion.div
      className="group relative bg-[#4c1d95]/90 backdrop-blur-sm rounded-[16px] p-4 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 12, 
        scale: isInView ? 1 : 0.96
      }}
      transition={{ 
        duration: 0.7, 
        delay: 0.4 + delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h4 
            className="font-['Nunito:Medium',_sans-serif] text-white text-[12px] uppercase tracking-wider transition-all duration-300"
            style={{
              textShadow: isHovered 
                ? '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.5)'
                : 'none'
            }}
          >
            {title}
          </h4>
          <div className="text-[10px] text-[#70e2d8] font-medium">{trend}</div>
        </div>
        <div 
          className="text-[20px] md:text-[24px] font-['Nunito:Bold',_sans-serif] text-white transition-all duration-300"
          style={{
            textShadow: isHovered 
              ? '0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.6), 0 0 36px rgba(255, 255, 255, 0.3)'
              : '0 0 6px rgba(255, 255, 255, 0.4)'
            }}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
}

// Progress Ring Component
function ProgressRing({ 
  percentage, 
  size = 60, 
  strokeWidth = 6, 
  delay = 0, 
  isInView,
  color = "#8614ff"
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  delay?: number;
  isInView: boolean;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{
            strokeDashoffset: isInView ? strokeDashoffset : circumference
          }}
          transition={{
            duration: 1.5,
            delay: delay + 0.5,
            ease: "easeOut"
          }}
        />
      </svg>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: delay + 1.2 }}
      >
        <span className="text-[12px] font-['Nunito:Bold',_sans-serif] text-[#4c1d95]">
          {percentage}%
        </span>
      </motion.div>
    </div>
  );
}

// Subject Progress Row
function SubjectRow({ 
  subject, 
  proficiency, 
  timeSpent, 
  status, 
  delay = 0, 
  isInView 
}: {
  subject: string;
  proficiency: number;
  timeSpent: string;
  status: 'excellent' | 'good' | 'needs-work' | 'not-started';
  delay?: number;
  isInView: boolean;
}) {
  const statusColors = {
    'excellent': { bg: '#01BE85', text: 'text-green-700' },
    'good': { bg: '#8614ff', text: 'text-purple-700' },
    'needs-work': { bg: '#E51D37', text: 'text-red-700' },
    'not-started': { bg: '#9ca3af', text: 'text-gray-700' }
  };

  const statusColor = statusColors[status];

  return (
    <motion.div
      className="group flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-[12px] border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      initial={{ x: -20, opacity: 0 }}
      animate={{ 
        x: isInView ? 0 : -20, 
        opacity: isInView ? 1 : 0 
      }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ x: 5 }}
    >
      {/* Subject Name */}
      <div className="flex-1 min-w-0">
        <h4 className="font-['Nunito:Medium',_sans-serif] text-[#4c1d95] text-[14px] md:text-[16px] truncate">
          {subject}
        </h4>
        <p className="text-[#6b7280] text-[12px] mt-1">{timeSpent}</p>
      </div>

      {/* Progress Ring */}
      <div className="mx-4">
        <ProgressRing 
          percentage={proficiency} 
          size={50} 
          strokeWidth={4}
          delay={delay}
          isInView={isInView}
          color={statusColor.bg}
        />
      </div>

      {/* Action Button */}
      <motion.button
        className="px-3 py-1.5 rounded-[8px] text-[12px] font-['Nunito:Medium',_sans-serif] bg-[#8614ff] text-white hover:bg-[#7c3aed] transition-colors opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View
      </motion.button>
    </motion.div>
  );
}

// Weekly Summary Chart Component with Interactive Hover Effects
function TimeChart({ isInView }: { isInView: boolean }) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  
  const chartData = [
    { day: 'Mon', hours: 2.9, time: '2h 54m' },
    { day: 'Tue', hours: 3.6, time: '3h 36m' },
    { day: 'Wed', hours: 1.5, time: '1h 30m' },
    { day: 'Thu', hours: 3.3, time: '3h 18m' },
    { day: 'Fri', hours: 2.8, time: '2h 48m' },
  ];

  const maxHours = 4; // Fixed max for consistent scaling

  return (
    <div className="bg-[#4c1d95]/90 backdrop-blur-sm rounded-[16px] p-6 relative overflow-hidden">
      {/* Subtle background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full pointer-events-none" style={{
          backgroundColor: 'rgba(76, 29, 149, 0.03)',
          backgroundImage: `
            linear-gradient(rgba(112, 226, 216, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(134, 20, 255, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          filter: 'none',
          boxShadow: 'none',
          border: 'none',
          outline: 'none'
        }} />
      </div>

      {/* Animated Title with Glow Effect */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ 
          x: isInView ? 0 : -20, 
          opacity: isInView ? 1 : 0 
        }}
        transition={{ 
          duration: 0.6, 
          delay: isInView ? 0.1 : 0,
          ease: "easeOut"
        }}
        className="mb-8"
      >
        <h4 className="font-['Nunito:Bold',_sans-serif] text-white text-[16px] relative">
          <span className="relative z-10">Weekly Summary</span>
          <motion.div
            className="absolute inset-0 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(213, 173, 255, 0.15), transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </h4>
      </motion.div>
      
      {/* Y-axis Labels */}
      <div className="absolute left-2 top-[60px] flex flex-col gap-[6px] text-[12px] text-white font-['Nunito:Regular',_sans-serif]">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ 
            x: isInView ? 0 : -10, 
            opacity: isInView ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5, 
            delay: isInView ? 0.3 : 0,
            ease: "easeOut"
          }}
        >
          3h
        </motion.div>
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ 
            x: isInView ? 0 : -10, 
            opacity: isInView ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5, 
            delay: isInView ? 0.4 : 0,
            ease: "easeOut"
          }}
        >
          2h
        </motion.div>
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ 
            x: isInView ? 0 : -10, 
            opacity: isInView ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5, 
            delay: isInView ? 0.5 : 0,
            ease: "easeOut"
          }}
        >
          1h
        </motion.div>
      </div>

      {/* Dotted Grid Lines */}
      <div className="absolute left-[31px] right-6 top-[60px] h-[87px] pointer-events-none">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute w-full h-[1px] border-t border-dashed border-[#BDB9E4] opacity-30"
            style={{ top: `${index * 30.5}px` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: isInView ? 1 : 0, 
              opacity: isInView ? 0.3 : 0 
            }}
            transition={{ 
              duration: 0.8, 
              delay: isInView ? 0.6 + index * 0.1 : 0,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Chart Container */}
      <div className="flex items-end justify-between h-[87px] gap-[16px] ml-[31px] relative">
        {chartData.map((data, index) => {
          const height = (data.hours / maxHours) * 87;
          const isHovered = hoveredBar === data.day;
          
          return (
            <div key={data.day} className="flex flex-col items-center gap-[7px] w-[30px] relative">
              {/* Hover Tooltip */}
              {isHovered && (
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white rounded-[8px] px-3 py-2 shadow-xl border border-white/20 backdrop-blur-sm z-20 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="text-[11px] font-['Nunito:Bold',_sans-serif] font-bold">
                    {data.day}
                  </div>
                  <div className="text-[10px] font-['Nunito:Medium',_sans-serif] font-medium text-white/90">
                    {data.time}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                </motion.div>
              )}

              {/* Interactive Bar */}
              <motion.div
                className="rounded-[10px] w-full relative cursor-pointer group/bar"
                initial={{ height: 4 }}
                animate={{ height: isInView ? Math.max(height, 4) : 4 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + index * 0.12,
                  ease: "easeOut"
                }}
                onMouseEnter={() => setHoveredBar(data.day)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{
                  background: isHovered 
                    ? '#8614ff'
                    : '#d1aeff',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Subtle shine effect on hover */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 rounded-[10px] opacity-30"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                      animation: 'subtle-shine 2s ease-in-out infinite'
                    }}
                  />
                )}
              </motion.div>

              {/* Day Label with Glow Effect */}
              <motion.div
                className="font-['Nunito:Regular',_sans-serif] font-normal text-[12px] text-[#4f4f4f] relative group/label"
                initial={{ y: 10, opacity: 0 }}
                animate={{ 
                  y: isInView ? 0 : 10, 
                  opacity: isInView ? 1 : 0 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.2 + index * 0.08,
                  ease: "easeOut"
                }}
              >
                <span 
                  className="relative z-10 transition-all duration-200"
                  style={{
                    color: 'white',
                    fontWeight: isHovered ? '600' : '400',
                    textShadow: isHovered ? '0 0 8px rgba(209, 174, 255, 0.8), 0 0 16px rgba(209, 174, 255, 0.6), 0 0 24px rgba(209, 174, 255, 0.4)' : 'none'
                  }}
                >
                  {data.day}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Enhanced Footer Stats */}
      <motion.div 
        className="flex justify-between mt-4 text-[12px] relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: isInView ? 0 : 20, 
          opacity: isInView ? 1 : 0 
        }}
        transition={{ 
          duration: 0.6, 
          delay: isInView ? 1.6 : 0,
          ease: "easeOut"
        }}
      >
        <span className="text-white font-['Nunito:Medium',_sans-serif] relative group/total">
          <span 
            className="relative z-10 transition-all duration-300"
            style={{
              textShadow: '0 0 0px rgba(255, 255, 255, 0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 0 0px rgba(255, 255, 255, 0)';
            }}
          >
            14h 6m total
          </span>

        </span>
        <span className="text-[#10b981] font-['Nunito:Medium',_sans-serif] relative group/trend flex items-center gap-1">
          <span className="relative z-10">↗ 2.4%</span>
          <div 
            className="absolute inset-0 rounded-[4px] opacity-0 group-hover/trend:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.35), transparent 60%)',
              filter: 'blur(10px)',
              transform: 'scale(1.5)'
            }}
          />
        </span>
      </motion.div>
    </div>
  );
}

// Donut Chart Component
function DonutChart({ isInView }: { isInView: boolean }) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  // Combined chart data for Recharts
  const chartData = [
    {
      id: 'self',
      name: 'Self Study',
      value: 25,
      time: '4h 20m',
      title: 'Self Study',
      description: 'Independent learning and self-paced exploration',
      centerLabel: 'Self Study Time',
      color: '#1ffde6',
      gradient: 'url(#selfGrad)'
    },
    {
      id: 'course',
      name: 'Course Study',
      value: 35,
      time: '6h 15m',
      title: 'Course Study',
      description: 'Structured curriculum and guided lessons',
      centerLabel: 'Course Time',
      color: '#deb62a',
      gradient: 'url(#courseGrad)'
    },
    {
      id: 'project',
      name: 'Project Work',
      value: 25,
      time: '5h 30m',
      title: 'Project Work',
      description: 'Hands-on projects and real-world applications',
      centerLabel: 'Project Time',
      color: '#ff003e',
      gradient: 'url(#projectGrad)'
    },
    {
      id: 'review',
      name: 'Review Sessions',
      value: 15,
      time: '2h 40m',
      title: 'Review Sessions',
      description: 'Assessment preparation and knowledge reinforcement',
      centerLabel: 'Review Time',
      color: '#307bff',
      gradient: 'url(#reviewGrad)'
    }
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <div className="bg-[#4c1d95]/90  backdrop-blur-sm rounded-[16px] border border-white/0">
      <div className="content-stretch flex flex-col h-auto items-start justify-center pb-[28px] pt-[28px] px-[15px] relative w-full gap-6">
        
        {/* Title */}
        <motion.div 
          className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full"
          initial={{ x: -20, opacity: 0 }}
          animate={{ 
            x: isInView ? 0 : -20, 
            opacity: isInView ? 1 : 0 
          }}
          transition={{ 
            duration: 0.6, 
            delay: isInView ? 0.1 : 0,
            ease: "easeOut"
          }}
        >
          <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[0px] text-nowrap">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[normal] text-[16px] whitespace-pre text-white font-normal">Screen Time</p>
          </div>
        </motion.div>

        {/* Professional Recharts Donut Chart with Legend */}
        <div className="flex items-center justify-center gap-6 relative shrink-0 w-full h-[180px] overflow-visible">
          
          {/* Chart Container */}
          <motion.div
            className="relative w-[180px] h-[180px] flex-shrink-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isInView ? 1 : 0, 
              opacity: isInView ? 1 : 0
            }}
            transition={{ 
              duration: 0.8, 
              delay: isInView ? 0.3 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Chart Container - Absolutely Centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PieChart width={325} height={325}>
                <defs>
                  <radialGradient id="selfGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#1ffde6" />
                    <stop offset="100%" stopColor="#14d4cc" />
                  </radialGradient>
                  <radialGradient id="courseGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#f6e2a7" />
                    <stop offset="100%" stopColor="#deb62a" />
                  </radialGradient>
                  <radialGradient id="projectGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#ff003e" />
                    <stop offset="100%" stopColor="#d1002e" />
                  </radialGradient>
                  <radialGradient id="reviewGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#307bff" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </radialGradient>
                </defs>
                
                <Pie
                  data={chartData}
                  cx={163}
                  cy={163}
                  innerRadius={100}
                  outerRadius={119}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={isInView ? 200 : 0}
                  animationDuration={1500}
                  onMouseEnter={(data) => setHoveredSection(data.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.gradient}
                      stroke={hoveredSection === entry.id ? entry.color : 'transparent'}
                      strokeWidth={hoveredSection === entry.id ? 2 : 0}
                      style={{
                        filter: hoveredSection === entry.id 
                          ? `drop-shadow(0 0 12px ${entry.color}90) drop-shadow(0 0 20px ${entry.color}50) drop-shadow(0 0 30px ${entry.color}30)`
                          : `drop-shadow(0 0 6px ${entry.color}40) drop-shadow(0 0 10px ${entry.color}20)`,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>

            {/* Center Display Text - Absolutely Centered with Flexbox */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                className="flex flex-col items-center text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isInView ? 1 : 0, 
                  opacity: isInView ? 1 : 0 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: isInView ? 1.8 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <div className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[12px] leading-tight">
                  18h 45m
                </div>
                <div className="font-['Nunito:Regular',_sans-serif] font-normal text-white/60 text-[8px] leading-tight mt-0.5">
                  Total Screen Time
                </div>
              </motion.div>
            </div>

          </motion.div>

          {/* Legend */}
          <motion.div
            className="flex flex-col gap-2.5 justify-center flex-shrink-0 max-w-[120px] overflow-visible"
            initial={{ x: 20, opacity: 0 }}
            animate={{ 
              x: isInView ? 0 : 20, 
              opacity: isInView ? 1 : 0
            }}
            transition={{ 
              duration: 0.8, 
              delay: isInView ? 0.6 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {chartData.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="flex items-center gap-2 cursor-pointer group transition-all duration-300"
                initial={{ x: 20, opacity: 0 }}
                animate={{ 
                  x: isInView ? 0 : 20, 
                  opacity: isInView ? 1 : 0
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: isInView ? 0.8 + index * 0.1 : 0,
                  ease: "easeOut"
                }}
                onMouseEnter={() => setHoveredSection(entry.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Color Indicator */}
                <div 
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{ 
                    backgroundColor: entry.color,
                    boxShadow: hoveredSection === entry.id 
                      ? `0 0 12px ${entry.color}80, 0 0 20px ${entry.color}40`
                      : 'none',
                    transform: hoveredSection === entry.id ? 'scale(1.2)' : 'scale(1)',
                    overflow: 'visible'
                  }}
                />
                
                {/* Legend Text */}
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <div 
                    className="font-['Nunito:Medium',_sans-serif] font-medium text-[9px] leading-tight text-white transition-all duration-300 truncate"
                    style={{
                      textShadow: hoveredSection === entry.id 
                        ? `0 0 8px ${entry.color}cc, 0 0 16px ${entry.color}80, 0 0 24px ${entry.color}40`
                        : 'none',
                      transform: hoveredSection === entry.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {entry.title}
                  </div>
                  <div 
                    className="font-['Nunito:Regular',_sans-serif] font-normal text-[7px] leading-tight text-white/70 transition-all duration-300 truncate"
                    style={{
                      textShadow: hoveredSection === entry.id 
                        ? `0 0 6px ${entry.color}99, 0 0 12px ${entry.color}60`
                        : 'none'
                    }}
                  >
                    {entry.time} ({entry.value}%)
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </div>
  );
}

// Main Dashboard Component
export default function ClassProgress() {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);
  const mobileInView = useInView(mobileRef, { once: true, margin: "-20%" });
  const desktopInView = useInView(desktopRef, { once: true, margin: "-30%" });
  const [currentSection, setCurrentSection] = useState<string>('');
  const [delayedSection, setDelayedSection] = useState<string>('');

  // Delay the tooltip appearance to prevent fly-in effect
  useEffect(() => {
    if (currentSection) {
      const timer = setTimeout(() => {
        setDelayedSection(currentSection);
      }, 300); // Increased to 300ms delay to completely hide fly-in effect
      return () => clearTimeout(timer);
    } else {
      setDelayedSection('');
    }
  }, [currentSection]);

  const subjects = [
    { name: 'Forces', proficiency: 90, time: '20 min', status: 'excellent' as const },
    { name: 'Frictions', proficiency: 10, time: '12 min', status: 'needs-work' as const },
    { name: 'Properties of Matter', proficiency: 75, time: '22 min', status: 'good' as const },
    { name: 'Speed & Direction', proficiency: 80, time: '22 min', status: 'excellent' as const },
    { name: 'Waves', proficiency: 79, time: '20 min', status: 'excellent' as const },
    { name: 'Push & Pull', proficiency: 59, time: '20 min', status: 'good' as const },
    { name: 'Mass', proficiency: 75, time: '32 min', status: 'good' as const },
    { name: 'Gravity', proficiency: 35, time: '12 min', status: 'needs-work' as const },
  ];

  return (
    <div className="w-full max-w-full lg:max-w-6xl mx-auto px-1 xs:px-2 sm:px-4 md:px-6 py-4 sm:py-6 relative overflow-hidden">
      {/* Mobile/Tablet: Dashboard Image (below 1024px) */}
      <div className="block lg:hidden w-full max-w-full overflow-hidden flex justify-center">
        <motion.div
          ref={mobileRef}
          className="relative rounded-[12px] overflow-hidden shadow-lg"
          style={{ 
            maxWidth: '90vw',
            width: '100%'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            y: 0
          }}
          transition={{ 
            duration: 0.6, 
            delay: 0.1, 
            ease: "easeOut" 
          }}
        >
          <img 
            src={dashboardImage} 
            alt="YGBVerse Dashboard Overview" 
            className="block w-full h-auto rounded-[12px] mx-auto"
            style={{ 
              maxHeight: '25vh', 
              minHeight: '80px',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxWidth: '100%',
              display: 'block'
            }}
          />
        </motion.div>
      </div>

      {/* Desktop: Full Interactive Dashboard (1024px and above) */}
      <CursorProvider className="hidden lg:block w-full relative">
        <div ref={desktopRef} className="w-full h-full">
        {/* Gentle Background Glow Animation */}
        <motion.div
          className="absolute inset-[-20px] rounded-[20px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(134, 20, 255, 0.02), transparent 70%)',
            filter: 'blur(20px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: desktopInView ? 1 : 0, scale: desktopInView ? 1 : 0.8 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Modern Teal Cursor - Positioned for accurate pointer alignment */}
        <Cursor className="flex items-start justify-start">
          <motion.div 
            className="relative"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(0, 255, 230, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 230, 0.3))',
              transform: 'translate(6px, 6px)' // Fine-tune cursor tip alignment - moved even further down and right
            }}
            animate={{ 
              filter: [
                'drop-shadow(0 0 8px rgba(0, 255, 230, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 230, 0.3))',
                'drop-shadow(0 0 12px rgba(0, 255, 230, 0.8)) drop-shadow(0 0 24px rgba(0, 255, 230, 0.4))',
                'drop-shadow(0 0 8px rgba(0, 255, 230, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 230, 0.3))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Modern Cursor with Teal Border */}
            <svg
              className="size-6 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              fill="none"
              stroke="#00ffe6"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              {/* Main cursor path - transparent with teal border */}
              <path
                d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                fill="rgba(0, 255, 230, 0.1)"
                stroke="#00ffe6"
                strokeWidth="1.5"
              />
              {/* Inner highlight for depth */}
              <path
                d="M3.5 6.2 6.5 32.8c.2 1.2 1.8 1.6 2.5.6l2.8-4.1c1.2-1.8 3.2-2.9 5.4-3.1l4.9-.4c1.3-.1 1.8-1.7.8-2.5L7.5 4.8c-1-.8-2.5 0-2.3 1.4Z"
                fill="rgba(0, 255, 230, 0.2)"
                stroke="rgba(0, 255, 230, 0.6)"
                strokeWidth="0.8"
              />
            </svg>
          </motion.div>
        </Cursor>

        {/* Global CSS override for instant cursor tooltips */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .cursor-tooltip-instant,
            .cursor-tooltip-instant * {
              animation: none !important;
              transition: none !important;
              transform-origin: center !important;
            }
            
            .cursor-tooltip-instant[data-state="open"] {
              animation: none !important;
              transition: none !important;
            }
            
            .cursor-tooltip-instant[data-side] {
              animation: none !important;
              transition: none !important;
            }
          `
        }} />

        {/* Cursor Follow Descriptor - Always visible, just changes content */}
        <CursorFollow 
          align="bottom-right" 
          sideOffset={45}
          className="px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-white text-sm whitespace-nowrap cursor-tooltip-instant"
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 230, 0.3)',
            transform: 'translateX(12px) translateY(9px)', // Adjusted to match updated cursor positioning
            animation: 'none !important',
            transition: 'none !important'
          }}
        >
          {currentSection || 'Dashboard Navigation'}
        </CursorFollow>

        {/* Main Dashboard Container with Gentle Float-In */}
        <motion.div
          className="relative bg-white/5 backdrop-blur-sm rounded-[16px] p-8"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ 
            opacity: desktopInView ? 1 : 0,
            y: desktopInView ? 0 : 20, 
            scale: desktopInView ? 1 : 0.98
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.1, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        >

        {/* Statistics Cards with Gentle Wave Animation */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          onMouseEnter={() => setCurrentSection('Performance Overview')}
          onMouseLeave={() => setCurrentSection('')}
        >
          <div onMouseEnter={() => setCurrentSection('Overall Progress')}>
            <StatCard 
              title="Overall Progress" 
              value="72%" 
              trend="↗ 8%" 
              delay={0.1}
              isInView={desktopInView}
              color="#8614ff"
            />
          </div>
          <div onMouseEnter={() => setCurrentSection('Active Subjects')}>
            <StatCard 
              title="Active Subjects" 
              value="8" 
              trend="↗ 2" 
              delay={0.15}
              isInView={desktopInView}
              color="#70e2d8"
            />
          </div>
          <div onMouseEnter={() => setCurrentSection('Study Time')}>
            <StatCard 
              title="Study Time" 
              value="18h 45m" 
              trend="↗ 2.4%" 
              delay={0.2}
              isInView={desktopInView}
              color="#2e7cff"
            />
          </div>
          <div onMouseEnter={() => setCurrentSection('Completion Rate')}>
            <StatCard 
              title="Completion Rate" 
              value="85%" 
              trend="↗ 12%" 
              delay={0.25}
              isInView={desktopInView}
              color="#00c1ad"
            />
          </div>
        </div>

        {/* Main Content Grid with Synchronized Gentle Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Progress List */}
          <div 
            className="lg:col-span-2"
            onMouseEnter={() => setCurrentSection('Subject Progress Table')}
            onMouseLeave={() => setCurrentSection('')}
          >
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ 
                opacity: desktopInView ? 1 : 0, 
                y: desktopInView ? 0 : 15, 
                scale: desktopInView ? 1 : 0.98 
              }}
              transition={{ 
                duration: 0.7, 
                delay: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
            >
              <Table />
            </motion.div>
          </div>

          {/* Charts Column with Staggered Gentle Animation */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ 
                opacity: desktopInView ? 1 : 0, 
                y: desktopInView ? 0 : 15, 
                scale: desktopInView ? 1 : 0.98 
              }}
              transition={{ 
                duration: 0.7, 
                delay: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              onMouseEnter={() => setCurrentSection('Screen Time Overview')}
              onMouseLeave={() => setCurrentSection('')}
            >
              <TimeChart isInView={desktopInView} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ 
                opacity: desktopInView ? 1 : 0, 
                y: desktopInView ? 0 : 15, 
                scale: desktopInView ? 1 : 0.98 
              }}
              transition={{ 
                duration: 0.7, 
                delay: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              onMouseEnter={() => setCurrentSection('Screen Time Breakdown')}
              onMouseLeave={() => setCurrentSection('')}
            >
              <DonutChart isInView={desktopInView} />
            </motion.div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <motion.div
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: desktopInView ? 0 : 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          onMouseEnter={() => setCurrentSection('Dashboard Actions')}
          onMouseLeave={() => setCurrentSection('')}
        >
          <motion.button
            className="w-12 h-12 bg-[#8614ff] hover:bg-[#7c3aed] rounded-[8px] shadow-lg flex items-center justify-center text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCurrentSection('View Details')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.button>
          
          <motion.button
            className="w-12 h-12 bg-[#70e2d8] hover:bg-[#5dd8ce] rounded-[8px] shadow-lg flex items-center justify-center text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCurrentSection('Share Progress')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 010-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </motion.button>
        </motion.div>
        </motion.div>
        </div>
      </CursorProvider>
    </div>
  );
}