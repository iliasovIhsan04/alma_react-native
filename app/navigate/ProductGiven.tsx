import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { Camera } from "expo-camera"; // expo-camera импорттоо
import { useRouter } from "expo-router"; // router'ди колдонуу
import { stylesAll } from "@/style";

const ProductGiven = () => {
  const [hasPermission, setHasPermission] = useState(null); // Камера уруксаты
  const [scanned, setScanned] = useState(false); // Сканерленгенби текшерүү
  const [borderColor, setBorderColor] = useState("#7ED957"); // Рамка түсү
  const [scaleAnimation] = useState(new Animated.Value(1)); // Анимация

  const router = useRouter(); // Router
  const handleBarCodeScanned = async ({ data }) => {
    if (scanned || !data) return;

    setScanned(true);
    setBorderColor("#68B936");

    // Анимация
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

    // Продукциянын бар-жогун текшерүү
    const productExists = await checkProduct(data);

    if (productExists) {
      router.push(`/details/BarrCodeId/${data}`); // Баракка өтүү
    } else {
      console.log("Өзгөчөлүк табылган жок");
    }
  };

  const checkProduct = async (data) => {
    // Продукцияны текшерүү
    return false; // Бул жерде логикаңызды кошуңуз
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Камера уруксатын сурайт
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Loading...</Text>; // Уруксаттын статусы өтүнүчү күтүүдө
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>; // Камерага уруксат берилген эмес
  }

  return (
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

      <View style={styles.scannerContainer}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Баркод сканерлөө
          style={StyleSheet.absoluteFillObject}
          type={Camera.Constants.Type.back} // Камеранын түрү
        />
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.scannerFrame,
              { borderColor, transform: [{ scale: scaleAnimation }] },
            ]}
          />
        </View>
        {scanned && (
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => setScanned(false)} // Сканерди кайра жандандыруу
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
    </View>
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
