"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import HomeApp from "./HomeApp";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <HomeApp>{children}</HomeApp>
    </Provider>
  );
}
