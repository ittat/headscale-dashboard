import "./App.css";

import {
  // createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routerData } from "./routers";

import { PartialTheme, ThemeProvider } from '@fluentui/react';


const lightTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: "white",
    bodyText: "black",
  },
};

const darkTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: "black",
    bodyText: "white",
  },
};
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <RouterProvider router={routerData} />
      </ThemeProvider>
    </>
  );
}

export default App;
