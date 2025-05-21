import { motion } from "framer-motion"; 
// Importing the 'motion' component from the 'framer-motion' library to enable animations.

const Touchable = ({ children, onClick, className = "", ...rest }) => (
    <motion.div
        // Applies a reduced opacity when the element is tapped/clicked.
        whileTap={{ opacity: 0.5 }}
        
        // Applies a slightly reduced opacity when the element is hovered over.
        whileHover={{ opacity: 0.8 }}
        
        // Sets the duration of the hover/tap animations to 0.2 seconds.
        transition={{ duration: 0.2 }}
        
        // Adds a pointer cursor to indicate the element is clickable.
        style={{ cursor: "pointer" }}
        
        // Handles the click event passed as a prop.
        onClick={onClick}
        
        // Allows additional CSS classes to be passed and applied to the component.
        className={className}
        
        // Spreads any additional props passed to the component onto the motion.div.
        {...rest}
    >
        {children}
        {/* Renders any child elements or components passed inside the Touchable component. */}
    </motion.div>
);

export default Touchable;
// Exports the Touchable component for use in other parts of the application.