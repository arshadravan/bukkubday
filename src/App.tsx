import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  PartyPopper,
  Heart,
  ArrowLeft,
  ArrowRight,
  Send,
  Plus,
  ImageIcon,
  Cake,
  ChevronRight,
  Moon,
  Sun,
  ShieldCheck,
  Star
} from 'lucide-react';

function handleApiError(error: any, operation: string) {
  console.error(`API Error (${operation}):`, error);
}

const IMAGES = {
  moment1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd3LjHTl1j6t_RJI74M2w3O8HCXoxvTZZShG52Ir5Vx4bo6Zg1F6Gsp0sBwuy5_ARNNmoqWuZMaRNUiFi8jfrFBIm0vGt_RTKbnS9zo_oQHdXoaV_IpOsjJD2iTtzxwceb6-JZ9DzuoTe0TLE-qxpW9GSpaIHXcDKShDkpULxyH5R2u5thZwx8-drf-v6LfQXqhqPgS6siv1w1ol13lePBBI9cznAxN9mugXR2Cg9li1u_pm_myJPvQaIWKl7YwIV-d_BFb3sG9Qv7",
  moment2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp-EK5DT1wyLwzKVaR3df12C4Iv5kRIsI802T1SokK6Hhas2N15bFha_7OhqBuioTsFhRx0_ZU_2m2cO28_kSjAMppTCMT1PPmsGo9IRnMmupMUeOoxmshu32iNyQTlr_MRZDcnZoRTwsttyjfzHUhmhd46jlVbtEl_3HfsLR02MK_W01vifhRt4Cwj0Lhu3hYPjJI_O0GArL6oeikGjnzfQVgd69y-RBD_aAs0SZUlLYYGfJuu32vpZdaWHAt_aOa5jX2w5gwudPD",
  moment3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOioGCSvbVyEYlJdcAXAhSX4ghZp5PX7g2Uc4iT0iRFOqagYuwlmk9dxHZots6TwaOn0zRZ_CCwyjbUBM5Cg3WQrL9xIWw23gCxrAc4rgM2tOqlgYyB9IQLuFHCV4340Z-XMR17vFUWI0gwj6CiVD7qi4zpc9T191229bynbQw0Gfu7xWBLL8BJaqMHWXzd2ozoCM3C3blF35ejHXxFUaSO53QX3dlpC_wCElX_gzr3JzG4CLsxNJGj6i8FHJo1iIAut5zm-1xNVXK",
  moment4: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb4hWs59h99yGK2HeKFS58Ht9UfEaU5lABW8KFbsTjiHNVcXKuCn6jnBxFScStHeu5m2z8USfewLOfnjI2Qm_yqyny0TY01IQmMf44GZHlrMJM3EMfU-YFg_z7JjEWvxliAW_RTloOjgSrBygA6suUVuMv31wHVksiJPPu0JrARmNTkn0OM-Gm1ik6u3ghkOB_4ECwOthXaGax1Jm8OwKJdD9y6yEWrgZ4Oy5GI4ahv0XP0Lc0MHFCQDkdqYqHQFihneHVq88rfeVf"
};

const FallingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ['text-red-400', 'text-pink-400', 'text-orange-400', 'text-red-300', 'text-pink-300', 'text-orange-300'];
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      color: colors[i % colors.length],
      size: 16 + Math.random() * 16
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.sin(heart.id) * 40],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute ${heart.color} drop-shadow-sm`}
          style={{ 
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

const WindEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -100, opacity: 0, y: 100 + i * 80 }}
          animate={{
            x: ['0vw', '110vw'],
            opacity: [0, 0.3, 0.3, 0],
            y: [100 + i * 80, 100 + i * 80 + (Math.sin(i) * 50)],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          className="absolute"
        >
          <svg width="200" height="20" viewBox="0 0 200 20" fill="none">
            <path 
              d="M0 10 Q50 0 100 10 T200 10" 
              stroke="rgba(244, 63, 94, 0.1)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeDasharray="10 20"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const GrassForeground = () => (
  <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
    <svg 
      viewBox="0 0 1440 160" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-32 md:h-48"
    >
      <defs>
        <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path 
        d="M0,160 C150,140 300,180 450,150 C600,120 750,180 900,150 C1050,120 1200,180 1350,150 C1400,140 1440,160 1440,160 L1440,200 L0,200 Z" 
        fill="url(#grassGrad)" 
      />
      {/* Animated Grass Blades */}
      {[...Array(20)].map((_, i) => (
        <motion.path
          key={i}
          d={`M${i * 75 + 20},160 Q${i * 75 + 30},120 ${i * 75 + 50},160`}
          stroke="#f43f5e"
          strokeWidth="3"
          strokeOpacity="0.2"
          fill="none"
          animate={{ d: [`M${i * 75 + 20},160 Q${i * 75 + 25},120 ${i * 75 + 50},160`, `M${i * 75 + 20},160 Q${i * 75 + 35},120 ${i * 75 + 50},160`, `M${i * 75 + 20},160 Q${i * 75 + 25},120 ${i * 75 + 50},160`] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  </div>
);


const MemoryCard = ({ image, title, date }: { image: string; title: string; date: string; key?: any }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="min-w-[320px] md:min-w-[400px] snap-center p-3"
  >
    <div className="glass-card p-4 rounded-[32px] overflow-hidden group shadow-xl">
      <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[4/3]">
        <img 
          src={image} 
          alt={title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>
      <div className="px-2">
        <h3 className="text-xl font-semibold text-on-surface mb-1 lowercase">{title}</h3>
        <p className="text-sm font-medium text-on-surface-variant lowercase tracking-widest">{date}</p>
      </div>
    </div>
  </motion.div>
);

const BirthdayCake = () => (
  <div className="relative w-64 h-64 mx-auto mb-12">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
    <svg className="w-full h-full relative" viewBox="0 0 200 200">
      {/* Cake Base */}
      <path d="M40,160 L160,160 L160,100 L40,100 Z" fill="rgba(244, 63, 94, 0.1)" />
      <path d="M30,100 L170,100 L170,60 L30,60 Z" fill="rgba(249, 115, 22, 0.15)" />
      {/* Drip Frosting */}
      <path 
        d="M30,60 Q30,75 45,75 Q60,75 60,60 Q60,75 75,75 Q90,75 90,60 Q90,75 105,75 Q120,75 120,60 Q120,75 135,75 Q150,75 150,60 Q150,75 170,75 L170,60 L30,60 Z" 
        fill="#f43f5e" 
      />
      {/* Candles */}
      <g>
        <rect fill="rgba(0,0,0,0.1)" height="30" rx="2" width="6" x="65" y="30" />
        <rect fill="rgba(0,0,0,0.1)" height="35" rx="2" width="6" x="97" y="25" />
        <rect fill="rgba(0,0,0,0.1)" height="30" rx="2" width="6" x="129" y="30" />
        {/* Flames */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <path d="M68,20 Q73,30 68,35 Q63,30 68,20 Z" fill="#f59e0b" />
          <path d="M100,15 Q105,25 100,30 Q95,25 100,15 Z" fill="#f59e0b" />
          <path d="M132,20 Q137,30 132,35 Q127,30 132,20 Z" fill="#f59e0b" />
        </motion.g>
      </g>
    </svg>
  </div>
);

const ShootingStar = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <motion.div
        initial={{ x: "-20%", y: "10%", opacity: 0 }}
        animate={{
          x: ["-10%", "110%"],
          y: ["10%", "40%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "linear",
        }}
        className="absolute w-1 h-1"
      >
        <div className="relative">
          {/* Bright Star Head */}
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#fff,0_0_40px_#fff]" />
          {/* Long Elegant Trail */}
          <div 
            className="absolute top-1/2 right-full -translate-y-1/2 h-[1px] w-48 bg-gradient-to-r from-transparent via-white/50 to-white" 
            style={{ 
              transform: 'rotate(15deg)', 
              transformOrigin: 'right center',
              filter: 'blur(0.5px)' 
            }}
          />
        </div>
      </motion.div>

      {/* Second Star - different path */}
      <motion.div
        initial={{ x: "120%", y: "5%", opacity: 0 }}
        animate={{
          x: ["110%", "-10%"],
          y: ["5%", "35%"],
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 7,
          delay: 2,
          ease: "linear",
        }}
        className="absolute w-1 h-1"
      >
        <div className="relative">
          <div className="w-1.5 h-1.5 bg-rose-200 rounded-full shadow-[0_0_15px_#fda4af]" />
          <div 
            className="absolute top-1/2 left-full -translate-y-1/2 h-[1px] w-32 bg-gradient-to-l from-transparent via-rose-200/50 to-rose-200" 
            style={{ 
              transform: 'rotate(-15deg)', 
              transformOrigin: 'left center' 
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const NightSky = () => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: Math.random() * 80,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Blue Night Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1a44]" />
      
      {/* Wishing Star Layer */}
      <ShootingStar />
      
      {/* Silvery Moon */}
      <motion.div 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-16 right-[12%] w-28 h-28 rounded-full bg-[#f8fafc] shadow-[0_0_100px_rgba(186,230,253,0.3)]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-transparent to-blue-200/20 blur-sm" />
        {/* Subtle Crater Textures */}
        <div className="absolute top-6 left-10 w-4 h-4 bg-slate-200/30 rounded-full blur-xs" />
        <div className="absolute bottom-10 right-8 w-6 h-6 bg-slate-200/20 rounded-full blur-xs" />
      </motion.div>

      {/* Shimmering Stars */}
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bg-white rounded-full shadow-[0_0_8px_white]"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Atmospheric Glows - Pink and Orange highlights back-lighting the scene */}
      <div className="absolute top-1/4 left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[140px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[80%] h-[60%] bg-secondary/15 rounded-full blur-[160px] opacity-30" />
    </div>
  );
};

const HeroHeartShower = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 15
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110%", opacity: 0, rotate: 0 }}
          animate={{
            y: "-10vh",
            x: [0, Math.sin(heart.id) * 30, 0],
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{ left: `${heart.left}%` }}
        >
          <Heart 
            size={heart.size} 
            className="text-rose-300 fill-rose-300/10 blur-[0.5px]" 
          />
        </motion.div>
      ))}
    </div>
  );
};

const TwinklingStarsHeader = () => {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 5 + Math.random() * 7, // Reduced from 8-20 to ~5-12 (approx 40% less)
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
            rotate: [0, 180]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ left: `${star.left}%`, top: `${star.top}%` }}
        >
          <Star 
            size={star.size} 
            className="text-red-500 fill-red-500/40 blur-[0.5px]" 
          />
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = ({ image, isDarkMode, onUploadClick }: { image: string; isDarkMode: boolean; onUploadClick: () => void }) => (
  <section className="relative h-[90vh] w-full overflow-hidden">
    <motion.div 
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <img 
        src={image} 
        alt="Celebration Hero" 
        className="w-full h-full object-cover object-center opacity-60 dark:opacity-100 dark:brightness-110 dark:contrast-110 mix-blend-multiply dark:mix-blend-normal transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-surface dark:to-surface/5 transition-colors duration-700" />
      
      {/* Decorative lite glow for day mode */}
      {!isDarkMode && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      )}
    </motion.div>

    {/* Hero Heart Shower */}
    <HeroHeartShower />

    {/* Floating elements */}
    <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 md:pb-4 px-6 text-center z-10">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl text-center py-12"
      >
        <TwinklingStarsHeader />
        <h1 className="text-4xl md:text-6xl font-cursive text-white tracking-wide drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] relative z-10 filter blur-[0.2px]">
          Twinkling <span className="text-red-500 animate-pulse inline-block">Stars</span>
        </h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 1.5, duration: 2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-6"
        />
      </motion.div>
    </div>

    {/* Small Corner Action Trigger */}
    <motion.button 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      onClick={onUploadClick}
      className="absolute bottom-6 right-6 z-30 p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white/70 border border-white/20 shadow-xl hover:bg-white/20 hover:text-white transition-all active:scale-95 group"
      title="Change Hero Image"
    >
      <ImageIcon size={16} className="group-hover:scale-110 transition-transform" />
    </motion.button>
  </section>
);

const InstagramSlider = ({ images, onAddPhotoClick, profilePic, onProfilePicClick }: { images: string[], onAddPhotoClick: () => void, profilePic: string, onProfilePicClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prev();
    } else if (info.offset.x < -threshold) {
      next();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-xl mx-auto overflow-hidden rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(244,63,94,0.3)] border-4 border-white/80 bg-white/30 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-4 p-5 border-b border-white/20">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProfilePicClick}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[3px] cursor-pointer group"
        >
           <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
             <img src={profilePic} alt="Avatar" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
               <Plus size={16} className="text-white" />
             </div>
           </div>
        </motion.div>
        <div className="flex-1">
          <p className="text-base font-bold text-on-surface">twinkle special</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] text-on-surface-variant/60 font-bold tracking-widest uppercase">papa's special child</p>
          </div>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onAddPhotoClick}
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all border border-primary/10"
        >
          <Plus size={20} />
        </motion.button>
      </div>
      
      <div className="relative aspect-[4/5] overflow-hidden bg-on-surface/5">
        <AnimatePresence mode="wait">
          {images.length > 0 ? (
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, x: 100, scale: 1.1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
              referrerPolicy="no-referrer"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/40 p-12 text-center">
              <Plus size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium lowercase">no moments archived yet</p>
              <button 
                onClick={onAddPhotoClick}
                className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold active:scale-95 transition-all lowercase"
              >
                add your first photo
              </button>
            </div>
          )}
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); prev(); }} 
              className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xl text-white flex items-center justify-center border border-white/20 hover:bg-white/40 transition-all active:scale-90 z-20"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); next(); }} 
              className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xl text-white flex items-center justify-center border border-white/20 hover:bg-white/40 transition-all active:scale-90 z-20"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
        
        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-8 shadow-[0_0_10px_white]' : 'bg-white/30 w-2'}`} 
              />
            ))}
          </div>
        )}

        {/* Gradient Overlay */}
        {images.length > 0 && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        )}
      </div>
      
      <div className="p-8 bg-white/10">
        <div className="flex gap-6 mb-6">
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart className="text-primary fill-primary" size={30} />
          </motion.div>
          <motion.div whileTap={{ scale: 0.8 }}>
            <Send className="text-on-surface" size={28} />
          </motion.div>
        </div>
        <div className="space-y-2">
          <p className="text-lg text-on-surface leading-snug font-light">
            <span className="font-bold mr-2 text-primary">twinkle special</span>
            {images.length > 0 
              ? "found these in our secret stash. some moments are just too beautiful to keep hidden." 
              : "wait, the archive is empty! add some special moments above."
            } ❤️
          </p>
          {images.length > 0 && (
            <>
              <p className="text-xs text-on-surface-variant font-medium tracking-tight opacity-60 lowercase">view all {images.length + 5} comments</p>
              <p className="text-[10px] text-on-surface-variant/40 font-bold lowercase tracking-widest mt-4">just updated</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Header = ({ isDarkMode, toggleDarkMode, isAdmin, setIsAdmin }: { isDarkMode: boolean; toggleDarkMode: () => void; isAdmin: boolean; setIsAdmin: (val: boolean) => void }) => (
  <header className="fixed top-0 w-full z-50 glass-main transition-colors duration-500">
    <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <div 
          onClick={() => {
            // Secret gesture: Click logo 5 times within 3 seconds
            // Simplified for now: just a toggle for demonstration if needed, 
            // but let's use a hidden trigger.
          }}
          className="hover:opacity-80 transition-opacity duration-300 scale-95 active:scale-100 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-primary to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <PartyPopper className="text-white w-5 h-5" />
          </div>
        </div>
        <div 
          onClick={toggleDarkMode}
          className="w-10 h-10 glass-card rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/80 dark:hover:bg-white/20 transition-all active:scale-95"
        >
          {isDarkMode ? <Sun size={20} className="text-orange-400" /> : <Moon size={20} className="text-primary" />}
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded-full border border-red-500/20">
            <ShieldCheck size={12} />
            Admin Mode
          </div>
        )}
      </div>
      <h1 className="text-2xl font-light tracking-tight text-on-surface lowercase">
        twin's birthday <span className="font-semibold text-primary">celebration</span>
      </h1>
      <div 
        onClick={() => {
          // Secret toggle: Click the heart 5 times
          const now = Date.now();
          const lastClick = (window as any)._lastHeartClick || 0;
          const count = (window as any)._heartCount || 0;
          if (now - lastClick < 1000) {
            (window as any)._heartCount = count + 1;
            if ((window as any)._heartCount >= 5) {
              setIsAdmin(!isAdmin);
              (window as any)._heartCount = 0;
            }
          } else {
            (window as any)._heartCount = 1;
          }
          (window as any)._lastHeartClick = now;
        }}
        className="hover:opacity-80 transition-opacity duration-300 scale-95 active:scale-100 cursor-pointer"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/10">
          <Heart className={`text-primary w-5 h-5 ${isAdmin ? 'fill-primary animate-pulse' : 'fill-primary/20'}`} />
        </div>
      </div>
    </div>
  </header>
);

const triggerConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  
  // Create a heart shape from SVG path
  const heart = confetti.shapeFromPath({ 
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' 
  });

  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 100,
    shapes: [heart],
    scalar: 2 // Make them a bit bigger so they look like hearts
  };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({ 
      ...defaults, 
      particleCount, 
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#fb7185', '#ec4899']
    });
    confetti({ 
      ...defaults, 
      particleCount, 
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#fb7185', '#ec4899']
    });
  }, 250);
};

// Main application view

export default function App() {
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [note, setNote] = useState("");
  const [liveMessage, setLiveMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [heroImage, setHeroImage] = useState("https://lh3.googleusercontent.com/pw/AP1GczNiWix0N9WvNqQByID7vA0nE6ZJm9V7X83Y9V5A-eFvM5uPzLID7vXvzN7Xv83Y9V5A=w1000");
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [archiveImages, setArchiveImages] = useState<string[]>([]);
  const [archiveProfilePic, setArchiveProfilePic] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=Princess");
  const [showPopup, setShowPopup] = useState(false);

  const lastMessageId = useRef<string | null>(null);
  const isFirstLoadGallery = useRef(true);
  const isFirstLoadArchive = useRef(true);
  const isFirstLoadMessages = useRef(true);

  const galleryRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const archiveFileInputRef = useRef<HTMLInputElement>(null);
  const archiveProfileFileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/db');
        const data = await res.json();
        
        if (data.settings) {
          setHeroImage(data.settings.heroImage);
          setArchiveProfilePic(data.settings.archiveProfilePic);
          setIsDarkMode(data.settings.isDarkMode);
          if (data.settings.isDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        
        if (data.gallery) {
           setGalleryImages(data.gallery);
           if (isFirstLoadGallery.current && data.gallery.length > 0) {
              setTimeout(() => {
                if (galleryRef.current) {
                  galleryRef.current.scrollTo({ left: galleryRef.current.scrollWidth, behavior: 'auto' });
                  isFirstLoadGallery.current = false;
                }
              }, 500);
           }
        }

        if (data.archive) {
          const newArchive = data.archive.map((a: any) => a.image);
          if (!isFirstLoadArchive.current && newArchive.length > archiveImages.length) {
            triggerConfetti();
          }
          setArchiveImages(newArchive);
          isFirstLoadArchive.current = false;
        }

        if (data.messages && data.messages.length > 0) {
          const lMessage = data.messages[data.messages.length - 1];
          if (lMessage.id !== lastMessageId.current) {
            if (!isFirstLoadMessages.current && lMessage.author === "Him") {
              setLiveMessage(lMessage.text);
              setShowPopup(true);
              triggerConfetti();
            } else if (isFirstLoadMessages.current) {
               setLiveMessage(lMessage.text);
            }
            lastMessageId.current = lMessage.id;
            isFirstLoadMessages.current = false;
          }
        }
      } catch (err) {
        console.error("Fetch data failed", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 4000); 
    return () => clearInterval(interval);
  }, [archiveImages.length]);

  const handleNotify = async (msg: string) => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
    } catch (err) {
      console.error("Notification failed", err);
    }
  };

  useEffect(() => {
    handleNotify("She opened the website! ❤️");
  }, []);

  const handleSendMessage = async () => {
    if (!note.trim()) return;
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: note, author: isAdmin ? "Admin" : "Me" })
      });
      const data = await res.json();
      setGalleryImages(prev => [...prev, { ...data }]);
      setNote("");
      triggerConfetti();
    } catch (error) {
       console.error("Send message failed", error);
    }
  };

  const compressImage = (base64Str: string, maxWidth = 1200, maxHeight = 1200, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string);
        try {
          await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ heroImage: compressed })
          });
          setHeroImage(compressed);
        } catch (error) {
           console.error("Hero upload failed", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const compressed = await compressImage(reader.result as string);
          try {
            const res = await fetch('/api/gallery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: compressed })
            });
            const data = await res.json();
            setGalleryImages(prev => [...prev, data]);
          } catch (err) {
            console.error("Gallery upload failed", err);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddArchiveImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const compressed = await compressImage(reader.result as string);
          try {
            const res = await fetch('/api/archive', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: compressed })
            });
            const data = await res.json();
            setArchiveImages(prev => [...prev, data.image]);
          } catch (err) {
             console.error("Archive upload failed", err);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUpdateArchiveProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string);
        try {
          await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ archiveProfilePic: compressed })
          });
          setArchiveProfilePic(compressed);
        } catch (error) {
           console.error("Profile pic update failed", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDarkMode: newMode })
      });
    } catch (e) {
      console.error("Toggle dark mode failed", e);
    }
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.8;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen bg-surface text-on-surface relative overflow-x-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      {isQuotaExceeded && (
        <div className="fixed top-0 left-0 right-0 z-[999] bg-amber-500/90 text-white text-[10px] py-1 px-4 text-center font-medium shadow-lg backdrop-blur-sm">
          ⚠️ connection slow (free tier limit reached). showing saved content.
        </div>
      )}
      {/* Sky Background */}
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="night"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 pointer-events-none z-0"
          >
            <NightSky />
          </motion.div>
        ) : (
          <motion.div
            key="day"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 pointer-events-none z-0"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-100 via-orange-50 to-white" />
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-200/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-100/30 rounded-full blur-[120px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      <input 
        type="file" 
        ref={galleryFileInputRef} 
        onChange={handleAddGalleryImage} 
        accept="image/*" 
        multiple
        className="hidden" 
      />

      <input 
        type="file" 
        ref={archiveFileInputRef} 
        onChange={handleAddArchiveImage} 
        accept="image/*" 
        multiple
        className="hidden" 
      />

      <input 
        type="file" 
        ref={archiveProfileFileInputRef} 
        onChange={handleUpdateArchiveProfilePic} 
        accept="image/*" 
        className="hidden" 
      />

      <HeroSection 
        image={heroImage} 
        isDarkMode={isDarkMode} 
        onUploadClick={() => fileInputRef.current?.click()}
      />

      <main className="relative z-10 pt-12 px-6 overflow-hidden">
        <FallingHearts />
        <WindEffect />
        <div className="w-full max-w-7xl mx-auto relative z-20 min-h-[70vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-cursive text-on-surface mb-6 leading-relaxed">
              twinkle's birthday <br /><span className="text-primary">celebration</span>
            </h2>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl mx-auto font-light leading-relaxed mb-12 lowercase">
              every moment is a heartbeat and every second holds a precious memory.
            </p>
            
            <div className="max-w-md mx-auto lg:mx-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="glass-card p-6 rounded-[2rem] border border-white/80 shadow-xl mb-8 bg-white/20 backdrop-blur-md"
              >
                <p className="text-lg text-on-surface italic leading-relaxed font-light lowercase">
                  "may your day be as bright as your smile and as warm as the love we share."
                </p>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(244, 63, 94, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerConfetti();
                    document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-semibold transition-all shadow-lg text-lg"
                >
                  celebrate now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <GrassForeground />

        {/* Instagram Archive Section */}
        <section className="py-24 relative z-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
               <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
               >
                 Insta Memories
               </motion.div>
               <h2 className="text-4xl md:text-5xl font-light tracking-tight text-on-surface lowercase">twin's <span className="font-semibold">archive</span></h2>
             </div>
             <InstagramSlider 
               images={archiveImages} 
               onAddPhotoClick={() => archiveFileInputRef.current?.click()} 
               profilePic={archiveProfilePic}
               onProfilePicClick={() => archiveProfileFileInputRef.current?.click()}
             />
          </div>
        </section>
      </main>

      <section id="memories" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <p className="text-primary/60 text-sm font-bold tracking-[0.2em] lowercase mb-2">a lifetime of joy</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-on-surface lowercase">twin's <span className="font-semibold">moments</span></h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => scrollGallery('left')}
                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-primary hover:bg-white transition-all shadow-md"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-primary hover:bg-white transition-all shadow-md"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </header>

          <div 
            ref={galleryRef}
            className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x scroll-px-6"
          >
            {galleryImages.map((item: any) => (
              <MemoryCard 
                key={item.id} 
                image={item.image} 
                title={item.title} 
                date={item.date} 
              />
            ))}
            
            {/* Add New Moment Card */}
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => galleryFileInputRef.current?.click()}
              className="min-w-[320px] md:min-w-[400px] snap-center p-3 cursor-pointer"
            >
              <div className="glass-card p-4 rounded-[32px] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center min-h-[300px] group hover:border-primary/50 transition-all hover:bg-white/40">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-primary lowercase">add new moment</h3>
                <p className="text-sm text-on-surface-variant font-light mt-1 lowercase">upload a precious memory</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="wishes" className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-secondary text-xs font-bold lowercase tracking-[0.3em] mb-4">a special wish</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-on-surface lowercase">happy <span className="font-semibold">birthday</span></h2>
          
          <BirthdayCake />

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            onViewportEnter={() => triggerConfetti()}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card p-10 md:p-16 rounded-[40px] border border-white/80 shadow-2xl bg-white/40 backdrop-blur-xl"
          >
            <p className="text-2xl md:text-3xl text-on-surface mb-8 font-light tracking-tight lowercase">happy birthday, <span className="font-semibold text-primary">my dearest!</span></p>
            <p className="text-lg md:text-xl text-on-surface-variant italic leading-relaxed font-light">
              "May your day be as bright as your smile, as warm as your heart, and as beautiful as the love we share. Every year with you is a gift that I treasure more than words can say."
            </p>
            <div className="mt-10 h-1.5 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2.5 }}
                className="h-full bg-gradient-to-r from-primary to-orange-400"
              />
            </div>
          </motion.div>

          <div className="mt-20 max-w-lg mx-auto text-left">
            <label className="text-primary/40 text-xs font-bold lowercase tracking-[0.2em] ml-4 mb-4 block">
              {isAdmin ? "send new message to her" : "personal message"}
            </label>
            <div className="relative">
              <textarea 
                value={isAdmin ? note : (liveMessage || note)}
                onChange={(e) => setNote(e.target.value)}
                readOnly={!isAdmin && !!liveMessage}
                className={`w-full glass-card rounded-[32px] p-8 text-on-surface text-lg outline-none placeholder:text-on-surface-variant/30 transition-all h-48 resize-none focus:bg-white/80 border border-white/20 ${!isAdmin && liveMessage ? 'italic text-primary font-medium' : ''}`} 
                placeholder={isAdmin ? "type a message she will see live..." : "write something sweet..."}
              />
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#e11d48" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="absolute bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg transition-colors"
              >
                <Send size={24} />
              </motion.button>
            </div>
            {!isAdmin && liveMessage && (
              <p className="text-center mt-4 text-primary/60 text-xs font-bold uppercase tracking-widest animate-pulse">
                new live message from bukku's world ❤️
              </p>
            )}
          </div>
        </div>
      </section>

      <footer className="relative z-40 py-24 px-6 text-center border-t border-primary/5 bg-white/20 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
             <Heart className="text-primary fill-primary w-6 h-6" />
             <span className="text-xl font-light tracking-widest lowercase">twin's story</span>
          </div>
          <p className="text-on-surface-variant/40 text-[10px] font-bold tracking-[0.4em] lowercase">
            © 2026 always be happy, keep smiling • twin's world
          </p>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 w-full z-50 glass-main border-t border-white/50 rounded-t-[32px] md:hidden px-6 pb-8 pt-4">
        <div className="flex justify-around items-center">
          <a href="#" className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-1 group-active:scale-90 transition-transform">
              <Heart size={24} />
            </div>
            <span className="text-[10px] text-primary/60 lowercase tracking-widest font-bold">home</span>
          </a>
          <a href="#memories" className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 bg-on-surface/5 text-on-surface-variant rounded-2xl flex items-center justify-center mb-1 group-active:scale-90 transition-transform">
              <ImageIcon size={24} />
            </div>
            <span className="text-[10px] text-on-surface-variant/60 lowercase tracking-widest font-bold">moments</span>
          </a>
          <a href="#wishes" className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 bg-on-surface/5 text-on-surface-variant rounded-2xl flex items-center justify-center mb-1 group-active:scale-90 transition-transform">
              <Cake size={24} />
            </div>
            <span className="text-[10px] text-on-surface-variant/60 lowercase tracking-widest font-bold">wishes</span>
          </a>
        </div>
      </nav>

      {/* New Message Popup */}
      <AnimatePresence>
        {showPopup && liveMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="glass-main p-8 md:p-12 rounded-[40px] border-2 border-primary/30 shadow-[0_30px_100px_rgba(244,63,94,0.3)] max-w-lg w-full text-center pointer-events-auto relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/10">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: 0 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="h-full bg-primary"
                  onAnimationComplete={() => setShowPopup(false)}
                />
              </div>

              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 animate-bounce">
                <Heart size={40} className="fill-primary" />
              </div>

              <h3 className="text-2xl font-bold text-on-surface mb-2 lowercase">new note from bukku's world ❤️</h3>
              <p className="text-sm text-primary font-bold lowercase tracking-widest mb-6 px-4 py-1 bg-primary/5 rounded-full inline-block">just received</p>
              
              <div className="relative mb-10">
                <p className="text-xl md:text-2xl text-on-surface italic leading-relaxed font-light">
                  "{liveMessage}"
                </p>
                <div className="absolute -bottom-4 -right-2 opacity-10">
                  <Heart size={64} className="fill-primary" />
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowPopup(false);
                  document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 text-lg lowercase"
              >
                open message box
              </button>
            </motion.div>

            {/* Backdrop for click away */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md -z-10 pointer-events-auto"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
