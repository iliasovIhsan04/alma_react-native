import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import MapView from "react-native-maps";

const sections = [
  { id: "section1", title: "Список" },
  { id: "section2", title: "Карта" },
];

const screenWidth = Dimensions.get("window").width;

export default function MapPage() {
  const scrollViewRef = useRef();
  const [activeSection, setActiveSection] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentCoordinates, setCurrentCoordinates] = useState([
    74.5698, 42.8746,
  ]);

  const getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoordinates([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error("Error requesting location permissions:", error);
    }
  };

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

  const smoothScroll = (targetId) => {
    const sectionIndex = sections.findIndex(
      (section) => section.id === targetId
    );
    if (sectionIndex !== -1) {
      scrollViewRef.current.scrollTo({
        x: sectionIndex * screenWidth,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => smoothScroll(section.id)}
            style={[
              styles.navItem,
              activeSection === section.id && styles.activeNavItem,
            ]}
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
                <View style={styles.sectionItemsa}>
                  <View style={styles.mapItem}>
                    <Image style={styles.maps} />
                    <Text style={styles.navText}>
                      г. Бишкек, ул. Калык Акиева 66, ТЦ Весна
                    </Text>
                  </View>
                  <View style={styles.mapItem}>
                    <Image style={styles.timer} />
                    <Text style={styles.timerText}>
                      График работы:{" "}
                      <Text style={styles.span}>Круглосуточно</Text>
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.container}>
                  <MapView style={styles.map} />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapItem: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 11,
  },
  timerText: {
    color: "#6B6B6B",
    fontSize: 16,
    fontWeight: "400",
  },
  sectionItemsa: {
    backgroundColor: "#F5F7FA",
    padding: 14,
    marginTop: 100,
    borderRadius: 20,
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
  },
  maps: {
    width: 30,
    height: 30,
  },
  timer: {
    width: 22,
    height: 22,
  },
  span: {
    fontSize: 16,
    color: "#68B936",
    fontWeight: "500",
  },
  navItem: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    borderRadius: 5,
  },
  navText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 20,
  },
  activeNavItem: {
    borderBottomWidth: 3,
    borderBottomColor: "#DC0200",
    borderRadius: 0,
  },
  activeNavText: {
    color: "#000",
  },
  map: {
    width: screenWidth,
    height: "100%",
  },
});
