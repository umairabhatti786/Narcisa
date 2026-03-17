import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    StyleProp,
    ViewStyle,
} from "react-native";
import sizeHelper, { screenWidth, screentHeight } from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import CustomText from "../Text";
import { appStyles } from "../../utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../assets/images";
import { icons } from "../../assets/icons";
import { colors } from "../../utils/Themes";

const ServiceCard = ({ item, isAway ,deleteService}: any) => {
    const navigation = useNavigation();
    return (
        <>
            <View
                style={{
                    padding: sizeHelper.calWp(34),
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: sizeHelper.calWp(30),
                    gap: sizeHelper.calHp(20),
                    elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                    <View style={{ ...appStyles.row, gap: sizeHelper.calWp(30) }}>
                        <View style={styles.circle}>
                            <Image
                                style={{
                                    width: sizeHelper.calWp(50),
                                    resizeMode: "contain",
                                    height: sizeHelper.calWp(50),
                                    tintColor: colors.primary
                                }}
                                source={icons.service}
                            />
                        </View>
                        <View>
                            <CustomText
                                text={item?.serviceName}
                                fontWeight="700"
                                fontFam={fonts.Inter_Bold}
                                color={colors.black}
                                size={28}
                            />
                            <View style={[appStyles.row, { gap: sizeHelper.calWp(8) }]}>
                                <View style={[appStyles.row, { gap: sizeHelper.calWp(8) }]}>
                                    <Image
                                        style={{
                                            width: sizeHelper.calWp(20),
                                            height: sizeHelper.calWp(20),
                                            resizeMode: "contain",
                                            tintColor: colors.text_grey
                                        }}
                                        source={icons.duration}
                                    />
                                    <CustomText
                                        text={item?.duration?.name}
                                        fontWeight="700"
                                        fontFam={fonts.Inter_Bold}
                                        color={colors.text_grey}
                                        size={23}
                                    />
                                </View>
                                <View style={[appStyles.row, { gap: sizeHelper.calWp(8) }]}>
                                    <Image
                                        style={{
                                            width: sizeHelper.calWp(20),
                                            height: sizeHelper.calWp(20),
                                            resizeMode: "contain",
                                            tintColor: colors.text_grey
                                        }}
                                        source={icons.tags}
                                    />
                                    <CustomText
                                        text={item?.category?.name}
                                        fontWeight="700"
                                        fontFam={fonts.Inter_Bold}
                                        color={colors.text_grey}
                                        size={23}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        <CustomText
                            text={`$${item?.price}`}
                            fontWeight="700"
                            fontFam={fonts.Inter_Bold}
                            color={colors.primary}
                            size={30}
                        />
                    </View>
                </View>
                <View style={styles.line} />
                <View style={appStyles.rowjustify}>
                    <View style={{ ...appStyles.row, gap: sizeHelper.calWp(25) }}>
                        <CustomText
                            text={item?.availity}
                            fontWeight="600"
                            fontFam={fonts.Inter_Medium}
                            color={colors.text_grey}
                            size={25}
                        />
                    </View>
                    <View style={[appStyles.rowjustify,{gap:sizeHelper.calWp(30)}]}>
                        <View style={[appStyles.row, styles.buttons, { backgroundColor: colors.light_blue }]}>
                            <Image
                                style={{
                                    width: sizeHelper.calWp(30),
                                    height: sizeHelper.calWp(30),
                                    resizeMode: "contain",
                                }}
                                source={icons.edit}
                            />
                            <CustomText
                                text={"Edit"}
                                size={26}
                                color={colors.primary}
                                fontWeight="700"
                                textAlign={"center"}
                                fontFam={fonts.InterTight_Bold}
                            />
                        </View>
                        <TouchableOpacity onPress={deleteService} style={[appStyles.row, styles.buttons, { backgroundColor: colors.rare, width:sizeHelper.calWp(180) }]}>
                            <Image
                                style={{
                                    width: sizeHelper.calWp(30),
                                    height: sizeHelper.calWp(30),
                                    resizeMode: "contain",
                                }}
                                source={icons.trash}
                            />
                            <CustomText
                                text={"Delete"}
                                size={26}
                                color={colors.red}
                                fontWeight="700"
                                fontFam={fonts.InterTight_Bold}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </>
    );
};
export default ServiceCard;

const styles = StyleSheet.create({
    circle: {
        width: sizeHelper.calWp(100),
        height: sizeHelper.calWp(100),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.light_blue,
        borderRadius: sizeHelper.calWp(34),
    },
    calendarContainer: {
        width: sizeHelper.calWp(75),
        height: sizeHelper.calWp(75),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.light_blue,
        borderRadius: sizeHelper.calWp(30),
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: colors.border,
    },
    buttons: {
        width: sizeHelper.calWp(150),
        borderRadius: sizeHelper.calWp(24),
        gap: sizeHelper.calWp(20),
        paddingHorizontal: sizeHelper.calWp(20),
        paddingVertical: sizeHelper.calWp(12),
    }
});