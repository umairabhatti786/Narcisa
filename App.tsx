import "react-native-reanimated";
import React, { useEffect } from "react";
import RootNavigator from "./src/routes/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";

const App = ({}: any) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomSheetModalProvider>
            <RootNavigator />
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
