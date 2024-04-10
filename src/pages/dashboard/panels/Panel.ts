import React from "react";

interface PanelInfo {
  title: string
  maxW?: number;
  maxH?: number;
  minW?: number;
  minH?: number;
}

export interface Panel {
  info: PanelInfo;
  element: React.ReactNode;
}
