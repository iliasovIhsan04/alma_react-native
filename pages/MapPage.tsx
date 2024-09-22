import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { stylesAll } from "@/style";

type LocationType = {
  id: string;
  address: string;
  lat: number;
  lon: number;
  time: string;
};

type CoordinatesType = {
  latitude: number;
  longitude: number;
};

const sections = [
  { id: "section1", title: "Список" },
  { id: "section2", title: "Карта" },
];

const screenWidth = Dimensions.get("window").width;

export default function MapPage() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null
  );
  const [currentCoordinates, setCurrentCoordinates] = useState<CoordinatesType>(
    {
      latitude: 42.8746,
      longitude: 74.5698,
    }
  );
  const [locations, setLocations] = useState<LocationType[]>([]);

  const get2GISURL = (latitude: number, longitude: number) => {
    return `https://2gis.kz/almaty/geo/${longitude},${latitude}`;
  };

  const handleMarkerPress = (latitude: number, longitude: number) => {
    const url = get2GISURL(latitude, longitude);
    Linking.openURL(url);
  };

  const handleLocationPress = (location: LocationType) => {
    setSelectedLocation(location);
    smoothScroll("section2");
    handleMarkerPress(location.lat, location.lon);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });
      setCurrentCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    axios
      .get<LocationType[]>("https://alma-market.online/map/")
      .then((response) => {
        setLocations(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      sections.forEach((section, index) => {
        const sectionOffset = index * screenWidth;
        if (value >= sectionOffset && value < sectionOffset + screenWidth) {
          setActiveSection(section.id);
        }
      });
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, [scrollX]);

  const smoothScroll = (targetId: string) => {
    const sectionIndex = sections.findIndex(
      (section) => section.id === targetId
    );
    if (sectionIndex !== -1) {
      Animated.timing(scrollX, {
        toValue: sectionIndex * screenWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        scrollViewRef.current?.scrollTo({
          x: sectionIndex * screenWidth,
          animated: false,
        });
      });
    }
  };

  const indicatorWidth = screenWidth / sections.length;

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => smoothScroll(section.id)}
            style={styles.navItem}
          >
            <Text
              style={[
                styles.navText,
                activeSection === section.id && styles.activeNavText,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [0, screenWidth],
                    outputRange: [0, indicatorWidth],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {sections.map((section) => (
            <View
              key={section.id}
              style={[styles.container, { width: screenWidth }]}
            >
              {section.id === "section1" ? (
                <View style={stylesAll.container}>
                  <View style={styles.sectionMaps}>
                    {locations.length > 0 ? (
                      locations.map((location) => (
                        <TouchableOpacity
                          key={location.id}
                          onPress={() => handleLocationPress(location)}
                          style={styles.section_map_block}
                        >
                          <View style={styles.mapItem}>
                            <Image
                              style={styles.maps}
                              source={require("./../assets/images/maps.png")}
                            />
                            <Text style={styles.navTextAdres}>
                              {location.address}
                            </Text>
                          </View>
                          <View style={styles.mapItem}>
                            <Image
                              style={styles.maps}
                              source={require("./../assets/images/timer.png")}
                            />
                            <Text style={styles.timerText}>
                              График работы:{" "}
                              <Text style={styles.span}>{location.time}</Text>
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text>Нет доступных данных</Text>
                    )}
                  </View>
                </View>
              ) : (
                <View style={styles.container}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: currentCoordinates.latitude,
                      longitude: currentCoordinates.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    region={
                      selectedLocation
                        ? {
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }
                        : undefined
                    }
                  >
                    {locations.map((location) => (
                      <Marker
                        key={location.id}
                        coordinate={{
                          latitude: location.lat,
                          longitude: location.lon,
                        }}
                        pinColor="blue"
                        title={location.address}
                        onPress={() =>
                          handleMarkerPress(location.lat, location.lon)
                        }
                      />
                    ))}
                    {selectedLocation && (
                      <Marker
                        coordinate={{
                          latitude: selectedLocation.lat,
                          longitude: selectedLocation.lon,
                        }}
                        pinColor="blue"
                        title={selectedLocation.address}
                        onPress={() =>
                          handleMarkerPress(
                            selectedLocation.lat,
                            selectedLocation.lon
                          )
                        }
                      />
                    )}
                  </MapView>
                  <Text>Map</Text>
                </View>
              )}
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maps: {
    width: 30,
    height: 30,
  },
  timer: {
    width: 22,
    height: 22,
  },
  span: {
    fontSize: 14,
    color: "#68B936",
    fontWeight: "500",
  },
  navItem: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
  },
  navText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 20,
  },
  navTextAdres: {
    color: "#191919",
    fontWeight: "700",
    fontSize: 16,
    width: "88%",
  },
  activeNavItem: {
    borderBottomWidth: 3,
    borderBottomColor: "#DC0200",
  },
  activeNavText: {
    color: "#000",
  },
  map: {
    width: screenWidth,
    height: "100%",
  },
  mapItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timerText: {
    color: "#6B6B6B",
    fontSize: 12,
    fontWeight: "400",
  },
  section_map_block: {
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 14,
    flexDirection: "column",
    gap: 8,
  },
  sectionMaps: {
    marginTop: 100,
    flexDirection: "column",
    gap: 10,
  },
  nav: {
    position: "absolute",
    paddingTop: 30,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: "#DC0200",
    left: 20,
    right: 20,
    width: "45%",
  },
});
