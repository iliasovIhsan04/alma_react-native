import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import { stylesAll } from "@/style";

const ProductGiven = () => {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [borderColor, setBorderColor] = useState("#7ED957");
  const [scaleAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;

    setScanned(true);
    setBorderColor("#68B936");

    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const productExists = await checkProduct(data);
    router.push(`/details/BarrCodeId/${data}`);
  };

  const checkProduct = async (data) => {
    return false;
  };

  if (hasPermission === null) {
    return <Text>Запрашиваем доступ к камере...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Нет доступа к камере</Text>;
  }
  return (
    <>
      <View style={stylesAll.container}>
        <View style={[stylesAll.header, styles.header_given]}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("/")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Сканировать</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
      </View>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.scannerFrame,
              {
                borderColor,
                transform: [{ scale: scaleAnimation }],
              },
            ]}
          />
        </View>
        {scanned && (
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Сканировать снова</Text>
          </TouchableOpacity>
        )}
        <View style={styles.instruction_block}>
          <Text style={styles.instructionText}>
            Наведите на штрих код товара
          </Text>
          <Text style={styles.subInstructionText}>
            Мы найдем этот товар у нас
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header_given: {
    paddingBottom: 10,
  },
  instruction_block: {
    marginTop: 280,
  },
  instructionText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700",
  },
  subInstructionText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "400",
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerFrame: {
    width: 250,
    height: 200,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 2,
    borderRadius: 15,
    position: "relative",
    borderStyle: "dashed",
  },
  scanAgainButton: {
    marginTop: 350,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#68B936",
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductGiven;
