import { SafeAreaView, View } from "react-native";
import React, { useMemo, useCallback } from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { colors } from "../../utils/Themes";

const CustomBottomSheet = (props: any) => {
  const {
    bottomSheetModalRef,
    snapTo,
    onDismiss,
    children,
    snap,
    handleSheetChanges,
    backgroundColor,
    snapPoints,
    onBackDrop,
    scrollEnabled,
    enableContentPanningGesture
  } = props;

  // const snapPoints = useMemo(() => ["55%", "55%"], []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (onBackDrop) {
          onBackDrop(); // Make sure onBackDrop is defined before calling it
        }

        bottomSheetModalRef.current?.close();
      };
    }, [])
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableContentPanningGesture={false} // Disable content drag
      backdropComponent={(props) => (
        <Backdrop {...props} bottomSheetModalRef={bottomSheetModalRef} />
      )}
      snapPoints={snapPoints}
      index={0}
      onDismiss={props?.onDismiss}
      backgroundStyle={{
        borderTopLeftRadius: 25,  // Top left radius
        borderTopRightRadius: 25, // Top right radius
        backgroundColor:backgroundColor ||colors.white

      }}
    >
      <BottomSheetScrollView 
    scrollEnabled={false}
   
      showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={{ paddingBottom: 30 }}>{children}</View>
        </SafeAreaView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const Backdrop = ({ animatedIndex, bottomSheetModalRef, style }: any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1],
      [1, 1],
      Extrapolate.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View
      onTouchStart={() => bottomSheetModalRef.current?.close()}
      style={containerStyle}
    />
  );
};
export default CustomBottomSheet;
