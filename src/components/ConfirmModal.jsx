// components/ConfirmModal.jsx
import { AnimatePresence, motion } from "framer-motion";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    onReject,
    type = "delete", // or 'backlog'
    
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-[#00000073] flex items-center justify-center z-[1000] px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="btn btn-sm btn-circle bg-black absolute right-2 top-2"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-lg mb-4 text-center text-accent2">
                            {type === "delete" ? "Delete Student" : "Add to Backlog"}
                        </h3>
                        <p className="py-2 text-center text-accent2">
                            {type === "delete"
                                ? `Are you sure you want to delete this student?`
                                : `Do you want to add this student to backlog?`}
                        </p>
                        <div className="modal-action mt-6 flex justify-center gap-2">
                            <button
                                className="btn rounded-xl h-[45px] max-w-[120px] w-full bg-[#F4400B] text-white shadow-md"
                                onClick={onReject}
                            >
                                Reject
                            </button>
                            <button
                                className="btn rounded-xl h-[45px] max-w-[120px] w-full bg-transparent text-[#151515] border-[1.5px] border-[#F4400B] shadow-md"
                                onClick={onConfirm}
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

export default ConfirmModal;
