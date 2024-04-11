import React, {useEffect, useState} from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import RGL, {Layout, WidthProvider} from "react-grid-layout";
import {useTheme} from "@mui/material";
import {tokens} from "../../Theme";
import DashboardItem from "./DashboardItem";
import {infoPanel} from "./panels/InfoPanel";
import {Panel} from "./panels/Panel";
import {linePanel} from "./panels/LineGraphPanel";

const ReactGridLayout = WidthProvider(RGL);
let idCounter = 0;

interface PanelState extends Layout {
  key?: string;
  type: string;
}

const panels = {
  "info": infoPanel,
  "line": linePanel
} as {[key: string]: Panel};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [layout, setLayout] = useState([] as PanelState[]);

  useEffect(() => {
    const info = {
      type: "line",
      static: true,
      x: 0,
      y: 0,
      w: 6,
      h: 3,
    } as PanelState
    addItem(info)
  }, [])

  function addItem(info: PanelState) {
    const key = (idCounter++).toString()
    info.key = key
    setLayout(old => [...old, info])
  }

  function updateItem(layout: Layout[]) {
    setLayout(old => old.map((item, index) => {
      console.log(item, layout[index])
      return {
        ...item,
        ...layout[index]
      }
    }))
  }

  function createPanelElement(info: PanelState): React.ReactNode {
    const panel = panels[info.type];
    return (
      <div key={info.key} data-grid={info}>
        <DashboardItem title={panel.info.title}>
          {
            panel.element
          }
        </DashboardItem>
      </div>
    )
  }

  return (
    <div>
      <ReactGridLayout
        onLayoutChange={updateItem}
      >
        {layout.map(item => createPanelElement(item))}
      </ReactGridLayout>
    </div>
  );
};

export default Dashboard;