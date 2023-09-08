import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  titulo: "",
  descripcion: "",
  fecha: "",
  prioridad: "Medium",
  done: false,
  pending: true,
  newStatus: "pending", 
  showModal: false, 
};

const formSlice = createSlice({
  name: "form",
  initialState: initialFormState,
  reducers: {
    updateTitulo: (state, action) => {
      state.titulo = action.payload;
    },
    updateDescripcion: (state, action) => {
      state.descripcion = action.payload;
    },
    updateFecha: (state, action) => {
      state.fecha = action.payload;
    },
    updatePrioridad: (state, action) => {
      state.prioridad = action.payload;
    },
    updateDone: (state, action) => {
      state.done = action.payload;
    },
    updatePending: (state, action) => {
      state.pending = action.payload;
    },
    setNewStatus: (state, action) => {
      state.newStatus = action.payload; 
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const {
  updateTitulo,
  updateDescripcion,
  updateFecha,
  updatePrioridad,
  updateDone,
  updatePending,
  setNewStatus, 
  setShowModal,
} = formSlice.actions;




export default formSlice.reducer;
