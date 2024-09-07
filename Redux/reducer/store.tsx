import { configureStore } from "@reduxjs/toolkit";
import ActivationReducerSlice from "./slice/ActivationReducerSlice";
import UserInfoSlice from "./slice/UserInfoSlice";

// Создание Redux store
const store = configureStore({
  reducer: {
    auth: ActivationReducerSlice,
    users: UserInfoSlice,
  },
});

// Экспорт типов RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
