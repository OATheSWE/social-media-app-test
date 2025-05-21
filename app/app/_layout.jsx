import { Slot } from "expo-router";
import React from "react";
import { BottomNav } from "../../src/components";
import { adminBottomNavLinks } from "../../constants";

const Layout = () => {
  return (
    <>
      <Slot />
      <BottomNav items={adminBottomNavLinks} />
    </>
  );
};

export default Layout;
