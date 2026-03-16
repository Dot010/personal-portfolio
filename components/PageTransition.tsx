"use client";


import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation";



const PageTransition = ({ children }: { children: ReactNode }) => {
const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">

           <div key={pathname}>

            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, }}
                exit={{ opacity: 1 }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
                    
                className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
            />
                    {children}
                    </div>    
        </AnimatePresence>
    );
};

export default PageTransition





