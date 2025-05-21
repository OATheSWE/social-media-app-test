// components/ConfirmModal.jsx
import { AnimatePresence, motion } from "framer-motion"; // Importing animation components from framer-motion

// ConfirmModal Component
// Props:
// - isOpen: Boolean to control the visibility of the modal
// - onClose: Function to handle closing the modal
// - onConfirm: Function to handle the confirm action
// - onReject: Function to handle the reject action
// - type: String to determine the type of modal ("delete" or "backlog"), default is "delete"
const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    onReject,
    type = "delete", // Default type is "delete"
}) => {
    return (
        <AnimatePresence>
            {/* Render the modal only if isOpen is true */}
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-[#00000073] flex items-center justify-center z-[1000] px-6" // Full-screen overlay with semi-transparent background
                    initial={{ opacity: 0 }} // Initial animation state (fully transparent)
                    animate={{ opacity: 1 }} // Animation to fully visible
                    exit={{ opacity: 0 }} // Exit animation back to fully transparent
                    onClick={onClose} // Close modal when clicking outside the modal content
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative" // Modal content container with styling
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} // Initial animation state (slightly scaled down, transparent, and shifted down)
                        animate={{ scale: 1, opacity: 1, y: 0 }} // Animation to full size, visible, and centered
                        exit={{ scale: 0.95, opacity: 0, y: 20 }} // Exit animation back to initial state
                        transition={{ duration: 0.25 }} // Animation duration
                        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the content
                    >
                        {/* Close button */}
                        <button
                            className="btn btn-sm btn-circle bg-black absolute right-2 top-2" // Small circular button positioned at the top-right corner
                            onClick={onClose} // Close modal when clicking the button
                        >
                            ✕
                        </button>

                        {/* Modal title */}
                        <h3 className="font-bold text-lg mb-4 text-center text-accent2">
                            {type === "delete" ? "Delete" : ""} {/* Dynamic title based on the type prop */}
                        </h3>

                        {/* Modal description */}
                        <p className="py-2 text-center text-accent2">
                            {type === "delete"
                                ? `Are you sure you want to logout?` // Message for delete type
                                : ``}
                        </p>

                        {/* Action buttons */}
                        <div className="modal-action mt-6 flex justify-center gap-2">
                            {/* Reject button */}
                            <button
                                className="btn rounded-xl h-[45px] max-w-[120px] w-full bg-[#F4400B] text-white shadow-md" // Styled button for rejecting
                                onClick={onReject} // Trigger onReject function when clicked
                            >
                                Reject
                            </button>

                            {/* Confirm button */}
                            <button
                                className="btn rounded-xl h-[45px] max-w-[120px] w-full bg-transparent text-[#151515] border-[1.5px] border-[#F4400B] shadow-md" // Styled button for confirming
                                onClick={onConfirm} // Trigger onConfirm function when clicked
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal; // Exporting the ConfirmModal component for use in other parts of the application
