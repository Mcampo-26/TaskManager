import { createSlice } from '@reduxjs/toolkit';

const graficoSlice = createSlice({
  name: 'grafico',
  initialState: {
    series: [],
    options: {
      chart: {
        id: 'basic-pie',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
        },
      },
      labels: [], 
    },
    tasksByStateData: {  
      series: [],
      options: {},
    },
  },
  reducers: {
    updateGrafico: (state, action) => {
      state.series = action.payload.series;
      state.options = action.payload.options;
      state.labels = action.payload.labels; 
      state.tasksByStateData = action.payload.tasksByStateData; 
    },
  },
});

export const { updateGrafico } = graficoSlice.actions;
export default graficoSlice.reducer;
