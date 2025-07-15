import React, { useState } from "react";
import { MotionConfig, motion } from "framer-motion";

export const Example = () => {
    return (
        <div className="grid h-screen place-content-center bg-gradient-to-br from-violet-500 to-indigo-500">
            <AnimatedHamburgerButton />
        </div>
    );
};

const AnimatedHamburgerButton = ({ isOpen, setIsOpen, className = "" }) => {
    const [active, setActive] = useState(false);
    const controlled = typeof isOpen === "boolean" && typeof setIsOpen === "function";
    const open = controlled ? isOpen : active;
    const toggle = controlled ? () => setIsOpen(!isOpen) : () => setActive((pv) => !pv);
    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.button
                initial={false}
                animate={open ? "open" : "closed"}
                onClick={toggle}
                className={`relative h-10 w-10 rounded-full bg-white/0 transition-colors hover:bg-white/20 flex items-center justify-center ${className}`}
                aria-label="Open menu"
            >
                <motion.span
                    variants={VARIANTS.top}
                    className="absolute h-1 w-8 !bg-white"
                    style={{ y: "-50%", left: "50%", x: "-50%", top: "28%", background: '#fff' }}
                />
                <motion.span
                    variants={VARIANTS.middle}
                    className="absolute h-1 w-8 !bg-white"
                    style={{ left: "50%", x: "-50%", top: "50%", y: "-50%", background: '#fff' }}
                />
                <motion.span
                    variants={VARIANTS.bottom}
                    className="absolute h-1 w-8 !bg-white"
                    style={{ left: "50%", x: "-50%", top: "72%", background: '#fff' }}
                />
            </motion.button>
        </MotionConfig>
    );
};

const VARIANTS = {
    top: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            top: ["28%", "50%", "50%"],
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            top: ["50%", "50%", "28%"],
        },
    },
    middle: {
        open: {
            rotate: ["0deg", "0deg", "-45deg"],
            opacity: [1, 1, 0],
        },
        closed: {
            rotate: ["-45deg", "0deg", "0deg"],
            opacity: [0, 1, 1],
        },
    },
    bottom: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            top: ["72%", "50%", "50%"],
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            top: ["50%", "50%", "72%"],
        },
    },
};

export default AnimatedHamburgerButton;