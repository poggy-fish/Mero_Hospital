import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";

const StoreHeading = ({ topic }) => {
  const topic_array = topic.split(" ");
  return (
    <View style={styles.greetingUser}>
      <Text style={styles.heading}>
        {topic_array[0] + " "}
        <Text style={styles.redColor}>{topic_array[1]} </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingUser: {
    marginVertical: 10,
  },
  redColor: {
    color: colors.green,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
  },
});

export default StoreHeading;
