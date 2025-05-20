import { motion } from "framer-motion";

const Touchable = ({ children, onClick, className = "", ...rest }) => (
    <motion.div
        whileTap={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.2 }}
        style={{ cursor: "pointer" }}
        onClick={onClick}
        className={className}
        {...rest}
    >
        {children}
    </motion.div>
);

export default Touchable;