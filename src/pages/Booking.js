import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const Booking = ({ navigation, route }) => {
  const { hotelId, price, checkInDate, checkOutDate } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+62");
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const daysDifference = Math.floor(
        (endDate - startDate) / (24 * 60 * 60 * 1000)
      );
      setNumberOfDays(daysDifference + 1);
    }
  }, [checkInDate, checkOutDate]);

  const totalPayment = () => {
    return price * numberOfDays;
  };

  const handlePressCheckout = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>CONTACT INFORMATION</Text>
      <Text style={styles.textLabel}>Full name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.textLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.textLabel}>Phone number</Text>
      <View style={styles.phoneContainer}>
        <View style={styles.countryCodeContainer}>
          <Text style={styles.countryCodeText}>{countryCode}</Text>
        </View>
        <Picker
          style={styles.picker}
          selectedValue={countryCode}
          onValueChange={(itemValue) => setCountryCode(itemValue)}
        >
          <Picker.Item label="Indonesia (+62)" value="+62" />
          <Picker.Item label="United States (+1)" value="+1" />
          <Picker.Item label="United Kingdom (+44)" value="+44" />
          <Picker.Item label="Australia (+61)" value="+61" />
          <Picker.Item label="China (+86)" value="+86" />
        </Picker>
        <TextInput
          style={[styles.input, styles.phoneInput]}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.textTitle}>BOOKING SUMMARY</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.textSubtitle}>
          Number of days: {numberOfDays} days
        </Text>
        <View style={styles.underline} />
        <View style={styles.priceInformationContainer}>
          <Text style={styles.textTotal}>Total Payment</Text>
          <Text style={styles.textPrice}>$ {totalPayment()}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handlePressCheckout}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EEF5FF",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
    marginBottom: 15,
  },
  textSubtitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 15,
    borderRadius: 7,
    marginVertical: 5,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    backgroundColor: "#fff",
    width: 40,
  },
  countryCodeContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 7,
  },
  countryCodeText: {
    fontSize: 15,
  },
  phoneInput: {
    flex: 1,
    marginLeft: 10,
  },
  summaryContainer: {
    borderRadius: 7,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 20,
  },
  priceInformationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  textPrice: {
    fontSize: 18,
    color: "tomato",
    fontWeight: "bold",
  },
  textTotal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  underline: {
    borderBottomWidth: 2,
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: "tomato",
    paddingVertical: 15,
    borderRadius: 7,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Booking;