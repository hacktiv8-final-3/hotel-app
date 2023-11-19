import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { fetchHotelDetails } from "../redux/actions/hotelAction";
import { AirbnbRating } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchResult({ navigation, route }) {
  const { location, checkInDate, checkOutDate, searchResults } = route.params;
  const dispatch = useDispatch();

  const handleCardPress = (hotel) => {
    dispatch(fetchHotelDetails(hotel.hotelId));
    navigation.navigate("Hotel Details", {
      hotel,
      price: hotel.ratesSummary.minPrice,
      checkInDate,
      checkOutDate,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="where do you want to go?"
            placeholderTextColor="black"
            value={location}
          />
        </View>
        {/* Date Check-In & Check-Out */}
        <View style={styles.inputContainer}>
          <Feather name="calendar" size={24} color="black" />
          <Pressable style={styles.dateInput}>
            <Text>{checkInDate.toLocaleDateString()}</Text>
          </Pressable>
          <Feather name="calendar" size={24} color="black" />
          <Pressable style={styles.dateInput}>
            <Text>{checkOutDate.toLocaleDateString()}</Text>
          </Pressable>
        </View>

        {/* Search Results */}
        {searchResults &&
          searchResults.hotels &&
          searchResults.hotels.length > 0 &&
          searchResults.hotels.map((result) => (
            <Pressable
              key={result.hotelId}
              style={styles.cardContainer}
              onPress={() => handleCardPress(result)}
            >
              <View style={styles.iconContainer}>
                <FontAwesome name="heart-o" size={24} color="red" />
              </View>
              <Image
                source={
                  result.media && result.media.url
                    ? { uri: result.media.url }
                    : null
                }
                style={styles.hotelImage}
              />

              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Text style={styles.hotelName}>{result.name}</Text>
                  <View style={{ marginLeft: 0, flexDirection: "row", gap: 4 }}>
                    <AirbnbRating
                      count={5}
                      defaultRating={result.starRating}
                      size={14}
                      showRating={false}
                      isDisabled
                    />
                    <Text>{result.starRating}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <FontAwesome name="map-marker" size={16} color="black" />
                    {result.location && result.location.address && (
                      <Text style={styles.location}>
                        {" "}
                        {result.location.address.cityName}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={styles.price}>
                  ${result.ratesSummary.minPrice}
                </Text>
                <Text> /per night</Text>
              </View>
            </Pressable>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFC72C",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
  },
  cardContainer: {
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#EEF5FF",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  hotelImage: {
    width: "auto",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 16,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "tomato",
  },
});