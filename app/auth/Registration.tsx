import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { stylesAll } from "../(tabs)/style";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "@/Redux/reducer/slice/ActivationReducerSlice";
import { url } from "@/Api";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";

interface ErrorActivation {
  last_name?: string[];
  first_name?: string[];
  phone?: string[];
  confirm_password?: string[];
  password?: string[];
}

const Registration = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorActivation, setErrorActivation] = useState<ErrorActivation>({});
  const [userData, setUserData] = useState({
    last_name: "",
    first_name: "",
    phone: "",
    confirm_password: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);

    const phoneNumber =
      "+996 " +
      userData.phone.slice(0, 3) +
      userData.phone.slice(3, 6) +
      userData.phone.slice(6);

    const userDataWithPhone = {
      ...userData,
      phone: phoneNumber,
    };
    await AsyncStorage.setItem("phone", "+996" + userData.phone);

    dispatch(registerStart());
    try {
      const response = await axios.post(
        `${url}/auth/register`,
        userDataWithPhone
      );

      if (response.data.errors || response.data.non_field_errors) {
        const serverErrors =
          response.data.errors || response.data.non_field_errors;
        setErrorActivation(serverErrors);
        Alert.alert(
          "Произошла ошибка!",
          Object.values(serverErrors).join(", ") + "!",
          [{ text: "OK" }]
        );
      } else if (response.data.response === true) {
        await router.push(`/auth/ActivationCode`);
        Alert.alert("Успешно!", response.data.message, [{ text: "OK" }]);
      } else {
        setErrorActivation(response.data);
      }
      dispatch(registerSuccess(response.data));
    } catch (error) {
      let errorMessage = "Пожалуйста, повторите попытку позже.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(error);
      Alert.alert("Произошла ошибка!", errorMessage, [{ text: "OK" }]);
      dispatch(registerFailure(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassword = () => setVisible(!visible);
  const handleConfirmPassword = () => setVisible2(!visible2);

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={[stylesAll.header, stylesAll.header_nav]}>
          <TouchableOpacity style={stylesAll.header_back_btn} />
          <Text style={stylesAll.header_name}>Регистрация</Text>
          <View style={stylesAll.header_back_btn} />
        </View>
        <Text style={stylesAll.auth_text}>
          Зарегистрировавшись у вас создается карта, с помощью которой, вы
          можете получить бонусы
        </Text>
        <View style={stylesAll.input_block_all}>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Имя</Text>
            <TextInput
              style={[stylesAll.input, styles.input_box]}
              placeholder="Имя"
              placeholderTextColor="#888"
              onChangeText={(text) =>
                setUserData({ ...userData, first_name: text })
              }
              value={userData.first_name}
            />
            {errorActivation.first_name && (
              <Text style={styles.error_text_registr}>
                {errorActivation.first_name[0]}
              </Text>
            )}
          </View>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Фамилия</Text>
            <TextInput
              style={[stylesAll.input, styles.input_box]}
              placeholder="Фамилия"
              placeholderTextColor="#888"
              onChangeText={(text) =>
                setUserData({ ...userData, last_name: text })
              }
              value={userData.last_name}
            />
            {errorActivation.last_name && (
              <Text style={styles.error_text_registr}>
                {errorActivation.last_name[0]}
              </Text>
            )}
          </View>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Номер телефона</Text>
            <View style={stylesAll.phone_input_mask_block}>
              <Text>+996</Text>
              <TextInputMask
                type={"custom"}
                options={{
                  mask: "(999) 99-99-99",
                }}
                value={userData.phone}
                onChangeText={(text) =>
                  setUserData({ ...userData, phone: text })
                }
                style={[
                  stylesAll.input,
                  stylesAll.input_mask,
                  styles.input_box,
                ]}
                placeholder="(700) 10-20-30"
                keyboardType="phone-pad"
              />
            </View>

            {errorActivation.phone && (
              <Text style={styles.error_text_registr}>
                {errorActivation.phone[0]}
              </Text>
            )}
          </View>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Пароль</Text>
            <View style={styles.password_container}>
              <TextInput
                style={[
                  stylesAll.input,
                  styles.input_box,
                  styles.password_input,
                ]}
                placeholder="Введите пароль"
                placeholderTextColor="#888"
                secureTextEntry={!visible}
                onChangeText={(text) =>
                  setUserData({ ...userData, password: text })
                }
                value={userData.password}
              />
              <TouchableOpacity onPress={handlePassword}>
                <Ionicons
                  name={visible ? "eye" : "eye-off"}
                  size={20}
                  style={styles.ab_eye}
                />
              </TouchableOpacity>
            </View>
            {errorActivation.password && (
              <Text style={styles.error_text_registr}>
                {errorActivation.password[0]}
              </Text>
            )}
          </View>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Повторите пароль</Text>
            <View style={styles.password_container}>
              <TextInput
                style={[
                  stylesAll.input,
                  styles.input_box,
                  styles.password_input,
                ]}
                placeholder="Повторите пароль"
                placeholderTextColor="#888"
                secureTextEntry={!visible2}
                onChangeText={(text) =>
                  setUserData({ ...userData, confirm_password: text })
                }
                value={userData.confirm_password}
              />
              <TouchableOpacity onPress={handleConfirmPassword}>
                <Ionicons
                  name={visible2 ? "eye" : "eye-off"}
                  size={20}
                  style={styles.ab_eye}
                />
              </TouchableOpacity>
            </View>
            {errorActivation.confirm_password && (
              <Text style={styles.error_text_registr}>
                {errorActivation.confirm_password[0]}
              </Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 20, marginTop: 20 }}>
          <Text style={styles.terms}>
            Нажимая на кнопку “Зарегистрироваться” я принимаю условия
            <Text style={styles.terms_red}> Пользовательского соглашения</Text>
          </Text>
          <View style={{ gap: 10 }}>
            <TouchableOpacity
              style={[stylesAll.button]}
              disabled={isLoading}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={stylesAll.buttonText}>Регистрация</Text>
              )}
            </TouchableOpacity>
            <Text
              style={styles.yes_text}
              onPress={() => router.push("auth/Login")}
            >
              Уже есть аккаунт? <Text style={styles.terms_red}> Войти</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  yes_text: {
    fontSize: 12,
    fontWeight: "400",
    color: "#191919",
    textAlign: "center",
  },
  input_block: {
    flexDirection: "column",
  },
  input_box: {
    backgroundColor: "#F5F7FA",
  },
  password_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  password_input: {
    flex: 1,
    position: "relative",
  },
  ab_eye: {
    position: "absolute",
    top: -10,
    right: 5,
    zIndex: 1,
    width: 24,
    height: 24,
    color: "#AAAAAA",
  },
  terms: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
  },
  terms_red: {
    color: "#DC0200",
  },
  error_text_registr: {
    color: "#DC0200",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Registration;