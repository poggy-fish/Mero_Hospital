import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import Axios from "../../data/axios";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../assets/colors/colors";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    email: "",
    name: "",
    address: "",
    phone: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidEmail: false,
    isValidPhone: false,
    errorMessagePhone: null,
    errorMessagePw: null,
    errorMessageEmail: null,
    registerMessage: null,
    userMessage: null,
  });

  const textInputChange = (val) => {
    setData({ ...data, username: val });
  };

  const inputChangeName = (val) => {
    setData({ ...data, name: val });
  };

  const InputaddressChange = (val) => {
    setData({ ...data, address: val });
  };

  const handlePhoneChange = (val) => {
    if (val.length !== 10) {
      setData({
        ...data,
        isValidPhone: false,
        errorMessagePhone: "Not a Valid Phone Number",
      });
    } else {
      setData({
        ...data,
        phone: val,
        isValidPhone: true,
        errorMessagePhone: null,
      });
    }
  };

  const handlePasswordChange = (val) => {
    const hasNumber = /\d/.test(val) ? true : false;
    const hasSixCharacters = val.length >= 6 ? true : false;
    if (hasNumber && hasSixCharacters) {
      setData({
        ...data,
        isValidPassword: true,
        password: val,
        errorMessagePw: null,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
        errorMessagePw:
          "Password must have at least 6 letters including numbers",
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };
  const handleEmailAddress = (val) => {
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        val
      )
        ? true
        : false;

    if (validEmail) {
      setData({
        ...data,
        isValidEmail: true,
        errorMessageEmail: null,
        email: val,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
        errorMessageEmail: "The email Format is incorrect",
      });
    }
  };

  const handleValidUser = (val) => {
    const hasSixCharacters = val.length >= 6 ? true : false;

    if (hasSixCharacters) {
      setData({ ...data, isValidUser: true, userMessage: null });
    } else {
      setData({
        ...data,
        isValidUser: false,
        userMessage: "Username must be of 6 characters",
      });
    }
  };

  const registerHandle = (username, password, email, name, address, phone) => {
    if (
      username !== "" &&
      password !== "" &&
      name !== "" &&
      email !== "" &&
      address !== "" &&
      phone !== "" &&
      data.isValidUser &&
      data.isValidPassword &&
      data.isValidEmail &&
      data.isValidPhone
    ) {
      PostData(username, password, email, name, address, phone);
    } else {
      setData({
        ...data,
        registerMessage: "The registration forms are not complete",
      });
    }
  };
  const PostData = (username, password, email, name, address, phone) => {
    setData({ ...data, registerMessage: null });
    Axios.post("/register", { username, password, email, name, address, phone })
      .then((response) => {
        setData({ ...data, registerMessage: null });
        if (response.data) {
          navigation.navigate({
            name: "login",
            params: { registerMessage: response.data },
          });
        }
      })
      .catch((err) => {
        setData({ ...data, registerMessage: "err" + err });
      });
  };
  return (
    <>
      <View style={styles.container}>
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
            <FontAwesome name="user-o" color={colors.green} size={20} />
            <TextInput
              placeholder="Your Username"
              style={[
                styles.textInput,
                {
                  color: colors.black,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={colors.green} size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.userMessage}</Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.black,
                fontWeight: "bold",
              },
            ]}
          >
            Full-name
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user" color={colors.green} size={20} />
            <TextInput
              placeholder="Your Username"
              style={[
                styles.textInput,
                {
                  color: colors.black,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => inputChangeName(val)}
            />
          </View>

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
            <Feather name="lock" color={colors.green} size={20} />
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
              <Text style={styles.errorMsg}>{data.errorMessagePw}</Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.black,
                fontWeight: "bold",
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <Feather name="mail" color={colors.green} size={20} />
            <TextInput
              placeholder="Your Email"
              keyboardType="email-address"
              autoCompleteType="email"
              style={[
                styles.textInput,
                {
                  color: colors.black,
                },
              ]}
              autoCapitalize="none"
              onEndEditing={(e) => handleEmailAddress(e.nativeEvent.text)}
              onChangeText={(val) => handleEmailAddress(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.errorMessageEmail}</Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.black,
                fontWeight: "bold",
              },
            ]}
          >
            Phone
          </Text>
          <View style={styles.action}>
            <Feather name="phone" color={colors.green} size={20} />
            <TextInput
              placeholder="Your Phone Number"
              keyboardType="number-pad"
              autoCompleteType="tel"
              style={[
                styles.textInput,
                {
                  color: colors.black,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(e) => handlePhoneChange(e)}
            />
          </View>
          {data.isValidPhone ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.errorMessagePhone}</Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.black,
                fontWeight: "bold",
              },
            ]}
          >
            City
          </Text>
          <View style={styles.action}>
            <Feather name="home" color={colors.green} size={20} />
            <TextInput
              placeholder="Your City"
              autoCompleteType="street-address"
              style={[
                styles.textInput,
                {
                  color: colors.black,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(e) => InputaddressChange(e)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.errorMessageEmail}</Text>
            </Animatable.View>
          )}
          {data.registerMessage ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.registerMessage}</Text>
            </Animatable.View>
          ) : null}
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  width: "100%",
                },
              ]}
              onPress={() => {
                registerHandle(
                  data.username,
                  data.password,
                  data.email,
                  data.name,
                  data.address,
                  data.phone
                );
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
                Register
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("login");
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
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    flex: 1,
  },

  header: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  footer: {
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
