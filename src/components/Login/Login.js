import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import Layout from "../../screens/Layout";
import colors from "../../assets/colors/colors";
import Icon from "react-native-vector-icons/FontAwesome";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {};

  const handlePasswordChange = (val) => {};

  const updateSecureTextEntry = () => {};

  const handleValidUser = (val) => {};

  const loginHandle = (userName, password) => {};

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.green} barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome Back!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.black,
                fontWeight: "bold",
              },
            ]}
          >
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.black} size={20} />
            <TextInput
              placeholder="Your Username"
              style={[
                styles.textInput,
                {
                  color: colors.white,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.black,
                marginTop: 15,
                fontWeight: "bold",
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.black} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor={colors.grey}
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.black,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color={colors.grey} size={20} />
              ) : (
                <Feather name="eye" color={colors.grey} size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity>
            <Text style={{ color: colors.grey, marginVertical: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  width: "100%",
                },
              ]}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: colors.white,
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log("pressed");
              }}
              style={[
                styles.signIn,
                {
                  backgroundColor: colors.white,
                  borderColor: colors.green,
                  borderWidth: 1,
                  marginVertical: 15,
                  width: "100%",
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: colors.green,
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={{ color: colors.grey, marginVertical: 15 }}>
                Use Alternatives
              </Text>
            </TouchableOpacity>
            <ScrollView styles={styles.socialLogin} horizontal>
              <TouchableOpacity
                onPress={() => {
                  console.log("pressed");
                }}
                style={[
                  styles.signIn,
                  {
                    backgroundColor: colors.white,
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: colors.red,
                    },
                  ]}
                >
                  <Icon name="google-plus" size={20} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("pressed");
                }}
                style={[
                  styles.signIn,
                  {
                    backgroundColor: colors.white,
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: colors.red,
                    },
                  ]}
                >
                  <Icon name="facebook" size={20} />
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animatable.View>
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: colors.white,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
    paddingBottom: 5,
  },
  textInput: {
    marginVertical: 10,
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    padding: 10,
    color: colors.white,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  errorMsg: {
    color: colors.red,
    fontSize: 14,
  },
  button: {
    alignItems: "center",
  },
  signIn: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  socialLogin: {
    flexDirection: "row",
    height: 15,
  },
});