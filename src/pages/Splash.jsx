import React from 'react';
import { motion } from 'framer-motion';
import { ImageCollection } from '../../assets';

const Splash = () => {


    return (
        <div
            className={`h-screen w-screen bg-cover bg-center flex items-center justify-center`}
            style={{
                backgroundImage: `url(${ImageCollection.splash})`,
              }}
        >
            <motion.h1
                className="text-black text-4xl font-bold"
                initial={{ y: '50vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
                Olofoofo
            </motion.h1>
        </div>
    );
};

export default Splash;
