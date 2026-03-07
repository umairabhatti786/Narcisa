
import 'react-native-reanimated';
import React, { useEffect } from "react";
import RootNavigator from "./src/routes/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider} from "react-redux";
import store from "./src/redux/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const App = ({}: any) => {
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>

                 <Provider store={store}>
                <SafeAreaProvider>
            <RootNavigator />
      </SafeAreaProvider>

</Provider>

</BottomSheetModalProvider>
       
  
    </GestureHandlerRootView>
  );
};

export default App;
