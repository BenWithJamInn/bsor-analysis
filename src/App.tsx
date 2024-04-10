import React from 'react';
import './App.css';
import {ColorModeContext, useMode} from "./Theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./pages/global/TopBar";
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import Dashboard from "./pages/dashboard";
import {store} from "./state/store";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Provider store={store} >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  );
}

export default App;
