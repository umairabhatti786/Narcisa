import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import HomeHeader from "../../../components/HomeHeader";
import sizeHelper from "../../../utils/Helpers";
import { colors } from "../../../utils/Themes";
import CustomSearch from "../../../components/Search";
import CustomButtom from "../../../components/Button";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { icons } from "../../../assets/icons";
import ClientCard from "../../../components/ClientCard";
import EditClientModal from "./EditClientModal";
import { ApiServices } from "../../../api/ApiServices";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";

const ClientsScreen = ({ navigation }: any) => {
  const token = useSelector(getToken);
  const [isEditModal, setIsEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [isMessage, setIsMessage] = useState(false);
  const [Clients, setClients] = useState([]);

  useEffect(() => {
    GetClientData();
  }, []);

  const GetClientData = () => {
    setLoading(true);

    try {
      ApiServices.GetClients(token, ({ isSuccess, response, status }: any) => {
        console.log("cdknvkndk", response, status);
        setLoading(false);

        if (!isSuccess) {
          console.log("Client--------Api--------Error");
          return;
        }
        if (!response?.success) {
          setMessage(response?.message?.info || "Something went wrong");
          setToastColor(colors.red);
          return;
        }

        if (status == 200) {
          setClients(response?.message?.data);
          return;
        } else {
          setMessage(response?.message?.info);
          setToastColor(colors.red);
          setIsMessage(true);
        }
      });
    } catch (error) {
      console.log("Client--------Api--------Error", error);
    }
  };

  const ClientData = [
    {
      id: 1,
      name: "Jessica Miller",
      time: "3 days ago",
      price: "$125.00",
      short_name: "JM",
    },

    {
      id: 2,
      name: "Emily Johnson",
      time: "1 week ago",
      price: "$42.00",
      short_name: "EJ",
    },

    {
      id: 3,
      name: "Sarah Davis",
      time: "Today",
      price: "$28.00",
      short_name: "SD",
    },

    {
      id: 5,
      name: "Katherine Smith",
      time: "1 month ago",
      price: "$350.00",
      short_name: "KS",
    },
  ];
  return (
    <>
      <ScreenLayout style={{ paddingHorizontal: -1, gap: 0 }}>
        <View
          style={{
            padding: sizeHelper.calWp(35),
            backgroundColor: colors.white,
          }}
        >
          <HomeHeader />
        </View>
        <View style={styles.line} />

        <View
          style={{
            padding: sizeHelper.calWp(35),
            backgroundColor: colors.white,
            gap: sizeHelper.calHp(30),
          }}
        >
          <CustomSearch placeholder={"Search clients..."} />

          <CustomButtom
            bgColor={colors.primary + "10"}
            borderWidth={1}
            onPress={() => {
              setIsEditModal(true);
            }}
            borderColor={colors.primary + "50"}
            width={"100%"}
          >
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
              <Image
                source={icons.add_client}
                style={{
                  width: sizeHelper.calWp(40),
                  height: sizeHelper.calWp(40),
                  marginTop: sizeHelper.calHp(8),
                }}
                resizeMode={"contain"}
              />
              <CustomText
                text={"Add new client"}
                color={colors.primary}
                size={27}
                fontWeight={"700"}
                fontFam={fonts.Inter_Bold}
              />
            </View>
          </CustomButtom>
        </View>
        <View style={styles.line} />
        {loading ? (
          <>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          </>
        ) : (
          <>
            <FlatList
              data={Clients}
              style={{ padding: sizeHelper.calWp(35) }}
              contentContainerStyle={{
                gap: sizeHelper.calWp(30),
                paddingBottom: sizeHelper.calHp(180),
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "50%",
                    }}
                  >
                    <CustomText
                      text={"No Clients Are Available"}
                      color={colors.primary}
                      size={27}
                      fontWeight={"700"}
                      fontFam={fonts.Inter_Bold}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }: any) => {
                return (
                  <>
                    <ClientCard
                      item={item}
                      onEdit={() => setIsEditModal(true)}
                    />
                  </>
                );
              }}
            />
          </>
        )}
      </ScreenLayout>
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        backgroundColor={toastColor}
      />
      <EditClientModal
        modalVisible={isEditModal}
        onGetClient={() => {
          console.log("ckdnbckdbcbd");
          GetClientData();
        }}
        setModalVisible={setIsEditModal}
      />
    </>
  );
};

export default ClientsScreen;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
  },
});
