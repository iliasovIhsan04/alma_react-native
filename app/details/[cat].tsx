import { url } from "@/Api";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { stylesAll } from "../(tabs)/style";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCartContext } from "../_layout";

interface Tab {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface CatalogDetailsParams {
  cat: string;
  saveToLocalStorage: (id: number) => void;
}

type CartItem = {
  id: number;
};

const CatalogDetails: React.FC = ({}) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [subCat, setSubCat] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [isDataAvailable, setIsDataAvailable] = useState<boolean>(true);
  const [favoriteItems, setFavoriteItems] = useState<Set<number>>(new Set());

  const route =
    useRoute<RouteProp<Record<string, CatalogDetailsParams>, string>>();
  const { cat } = route.params || {};
  const { saveToLocalStorage } = useCartContext();

  const toggleFavorite = async (id: number) => {
    let updatedFavorites = new Set(favoriteItems);
    if (favoriteItems.has(id)) {
      updatedFavorites.delete(id);
    } else {
      updatedFavorites.add(id);
    }
    setFavoriteItems(updatedFavorites);
    saveToLocalStorage(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/product/list?cat=${cat}`);
        setData(response.data);
        setIsDataAvailable(response.data.length > 0);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat]);

  const fetchCategoryData = async (dataID: number) => {
    try {
      const response = await axios.get(`${url}/product/list?cat=${dataID}`);
      setData(response.data);
      setIsDataAvailable(response.data.length > 0);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  const handleCategorySelection = () => {
    setSubCat(0);
    setSelectedIndex(-1);
    fetchCategoryData(parseInt(cat));
  };

  const fetchSubCategoryData = async (subCatId: number) => {
    try {
      const response = await axios.get(
        `${url}/product/list?sub_cat=${subCatId}`
      );
      setData(response.data);
      setIsDataAvailable(response.data.length > 0);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleTabClick = (selectedId: number) => {
    setSubCat(selectedId);
    setSelectedIndex(selectedId);
    fetchSubCategoryData(selectedId);
  };

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/product/sub-categories/${cat}`);
      setTabs(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [cat]);

  interface Product {
    id: number;
    title: string;
    preview_img: string;
    price: number;
    old_price: string;
    wholesale_price: number;
    description: string;
    sales: number;
    status: boolean;
    sub_cat: number;
    created_at: string;
    updated_at: string;
    quantity: number | null;
    price_for: string;
  }

  return (
    <View style={stylesAll.container}>
      <View style={styles.header_block_fixed}>
        <View style={stylesAll.header}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.back()}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Каталог товары</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={styles.catalog_details_search}>
          <Ionicons name="search" size={24} />
          <TextInput
            style={[stylesAll.input, styles.input_from_catalog]}
            placeholder="Поиск товаров"
            value={value}
            onChangeText={setValue}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.catalog_tab_block}>
            <TouchableOpacity
              style={[styles.tab, selectedIndex === -1 && styles.activeTab]}
              onPress={handleCategorySelection}
            >
              <Text
                style={[
                  styles.tab_text,
                  selectedIndex === -1 && styles.tab_text_active,
                ]}
              >
                Все
              </Text>
            </TouchableOpacity>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  selectedIndex === tab.id && styles.activeTab,
                ]}
                onPress={() => handleTabClick(tab.id)}
              >
                <Text
                  style={[
                    styles.tab_text,
                    selectedIndex === tab.id && styles.tab_text_active,
                  ]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.sort_filter_block}>
          <View style={styles.sort_box}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/filter.png")}
            />
            <Text style={styles.sort_text}>Фильтр</Text>
          </View>
          <View style={styles.sort_box}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/sort.png")}
            />
            <Text style={styles.sort_text}>Сортировка</Text>
          </View>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          style={stylesAll.loading_catalog}
          color="red"
          size="small"
        />
      ) : (
        <View style={styles.catalog_block_all}>
          {data
            .filter((obj) =>
              obj.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            )
            .map((el, id) => (
              <Pressable
                style={styles.catalog_box}
                key={id}
                onPress={() => router.push(`/details/ProductId/${el.id}`)}
              >
                <Pressable
                  onPress={() => toggleFavorite(el.id)}
                  style={styles.heart_img_box}
                >
                  <Image
                    style={styles.heart_img}
                    source={
                      favoriteItems.has(el.id)
                        ? require("../../assets/images/active_heard.png")
                        : require("../../assets/images/heart_card.png")
                    }
                  />
                </Pressable>

                <View style={styles.catgalog_img_box}>
                  <Image
                    source={{ uri: el.preview_img }}
                    style={styles.catgalog_img}
                  />
                </View>
                <Text style={styles.catalog_title} numberOfLines={1}>
                  {el.title}
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.catalog_name}>1 {el.price_for}</Text>
                    <Text style={styles.catlaog_price}>{el.price} сом</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.catalog_name}>По карте</Text>
                    <Text style={styles.catlaog_old_price}>
                      {el.old_price} сом
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heart_img_box: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    zIndex: 9999,
  },
  heart_img: {
    width: "100%",
    height: "100%",
  },
  catlaog_price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191919",
  },
  catlaog_old_price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FE211F",
  },
  catalog_name: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6B6B6B",
  },

  catalog_title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#191919",
  },
  catgalog_img: {
    width: "100%",
    height: "100%",
  },
  catgalog_img_box: {
    width: "100%",
    height: 140,
    borderRadius: 14,
    overflow: "hidden",
  },
  catalog_block_all: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  catalog_box: {
    width: "48%",
    height: 230,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 14,
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  catalog_tab_block: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  sort_tab: {
    backgroundColor: "#ededed",
    height: 36,
    paddingHorizontal: 18,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  filter_text_tab: {
    color: "#191919",
    fontSize: 14,
    fontWeight: "400",
  },
  tab: {
    backgroundColor: "#EAEAEA",
    height: 36,
    borderRadius: 50,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#DC0200",
    height: 36,
    borderRadius: 50,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  tab_text: {
    color: "#191919",
    fontSize: 14,
    fontWeight: "400",
  },
  tab_text_active: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  catalog_details_search: {
    width: "100%",
    height: 45,
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  input_from_catalog: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    marginLeft: 10,
  },
  sort_filter_block: {
    flexDirection: "row",
    marginTop: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
  },
  sort_box: {
    width: "50%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  sort_text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#191919",
  },
  header_block_fixed: {
    position: "static",
    paddingBottom: 20,
  },
});

export default CatalogDetails;