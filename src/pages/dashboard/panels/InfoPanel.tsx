import React from 'react';
import {Panel} from "./Panel";

const InfoPanelElement = () => {
  return (
    <div>
      Information here

      <p>
        More information here
      </p>
    </div>
  );
};

export const infoPanel = {
  info: {
    title: "Information",
    minW: 3,
    minH: 2,
  },
  element: <InfoPanelElement />
} as Panel;