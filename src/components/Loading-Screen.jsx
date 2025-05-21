import React from "react";

export default function LoadingScreen({ visible }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black opacity-40 flex items-center justify-center z-50">
            <span className="loading loading-bars loading-xl text-accent2"></span>
        </div>
    );
}
