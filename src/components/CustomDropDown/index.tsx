import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import CustomText from "../Text";
import sizeHelper from "../../utils/Helpers";
import { useState } from "react";
import { appStyles } from "../../utils/GlobalStyles";
import { images } from "../../assets/images";
import { fonts } from "../../utils/Themes/fonts";
import { colors } from "../../utils/Themes";
import { icons } from "../../assets/icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const Dropdown = ({
  height,
  width,
  borderRadius,
  backgroundColor,
  onRightSource,
  placeholder,
  value,
  top,
  label,
  onActions,
  leftSource,
  tintColor,
  data,
  error,
  disabled,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

 console.log("cldmclkdmcld",value)
  return (
    <View
      style={{
        width: width || "100%",
      }}
    >
      {label && (
        <View
          style={{
            marginBottom: sizeHelper.calHp(10),
          }}
        >
          <CustomText
            text={label}
            fontWeight={"700"}
            size={21}
            color={colors.text_grey}
            fontFam={fonts.Inter_Bold}
          />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        
        onPress={() => setIsOpen(!isOpen)}
      disabled={disabled}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: sizeHelper.calWp(20),
          height: sizeHelper.calHp(height || 85),
          alignItems: "center",
          borderWidth: 1,
          borderRadius: borderRadius || sizeHelper.calWp(25),
          borderColor: colors.border,

          gap: sizeHelper.calWp(10),
          backgroundColor: backgroundColor || colors.background,
        }}
      >
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
          {leftSource && (
            <Image
              source={leftSource}
              style={{
                width: sizeHelper.calWp(35),
                height: sizeHelper.calWp(35),
                tintColor: tintColor || colors.black,
              }}
              resizeMode={"contain"}
            />
          )}
          {value?.name ? (
            <View style={{ ...appStyles.row }}>
              <CustomText text={value?.name} 
              textTransform={"capitalize"}
              color={colors.black} size={24} />
            </View>
          ) : (
            <CustomText text={placeholder} color={colors.text_grey} size={22} />
          )}
        </View>

        <TouchableOpacity
          onPress={onRightSource}
          disabled={disabled}
          activeOpacity={0.3}
        >
          <Image
            source={isOpen ? icons.drop_up : icons?.down_arrow}
            style={{
              width: sizeHelper.calWp(27),
              height: sizeHelper.calWp(27),
              tintColor: colors.primary,
            }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            width: "100%",
            maxHeight: sizeHelper.calWp(300),
            position: "absolute",
            zIndex: 999,
            top: sizeHelper.calHp(top || 140),
            borderWidth: 1,
            borderRadius: borderRadius || sizeHelper.calWp(25),
            borderColor: colors.border,
            backgroundColor: colors.background,
          }}
        >
          <ScrollView 
            nestedScrollEnabled={true}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
          >
            
           
              {data?.map((item: any, index: any) => {
                return (
                  <View
                  key={index}
                  >
                    <TouchableOpacity
                      key={index.toString()}
                      onPress={() => {
                        onActions?.(item);
                        setIsOpen(false);
                      }}
                      style={{
                        gap: sizeHelper.calHp(20),
                        // borderBottomWidth: data.length - 1 != index ? 1 : -1,
                        // borderBottomColor: colors.border,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          onActions?.(item);
                          setIsOpen(false);
                        }}
                        style={{
                          ...appStyles.row,
                          gap: sizeHelper.calWp(20),
                          padding: sizeHelper.calWp(25),
                        }}
                      >
                        <CustomText
                                      textTransform={"capitalize"}

                          text={item?.name}
                          color={colors.black}
                          size={22}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                    {data.length - 1 != index && (
                      <View
                        style={{
                          width: "100%",
                          height: 1,
                          backgroundColor: colors.border,
                        }}
                      />
                    )}
                  </View>
                );
              })}
          
          </ScrollView>
        </View>
      )}

      {error && (
          <View
            style={{
              marginTop: sizeHelper.calHp(10),
              // alignItems: "flex-end",
            }}
          >
            <CustomText size={18} text={error} color={colors.red} />
          </View>
        )}
      
    </View>
  );
};
export default Dropdown;
