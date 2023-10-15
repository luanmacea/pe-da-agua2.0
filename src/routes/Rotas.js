import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// import TabRoutes from "./tab.routes";
import DrawerRoutes from './drawer.routes'

export default function Rotas() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}
