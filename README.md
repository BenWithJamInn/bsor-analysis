# BSOR Analysis Tool (BeatLeader)

### TODO:
- Make panel system better
  - Allows panels to self define parameters such as min width and height etc
  - Add a settings menu that can be controlled by the panel
  - Only drag when the user is selecting the bar at the top of each panel ✅
  - Add a button that allows you to add new panels
  - Save panels and configuration to localstorage
- Data handling
  - Add metadata to each entry in time series, allows storing Note for each entry
  - IMPORTANT: Handle misses when processing note data
  - Make a simple api for components to retrieve data such as all right hand notes
  - Fix time series data for left and right hand not lining up to time (when the other hand is being recorded)
  - Add the ability to add rolling average and other filters to data
- Charts
  - Centralise common options such as formatting accuracy, tooltip, etc
  - Centralise graph zooming 
  - Style the graph