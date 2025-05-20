export const pageTransitionX = {
    initial: { x: "100%", opacity: 0.5 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }, // swipe out to the left
    transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.5,
    },
};

export const pageTransitionY = {
    initial: { y: "100%", opacity: 0.5 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
    transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.5,
    },
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Stagger animation for child elements
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};