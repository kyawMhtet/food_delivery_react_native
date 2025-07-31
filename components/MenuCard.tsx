import { MenuItem } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

export default function MenuCard({
  item: { image_url, name, price },
}: {
  item: MenuItem;
}) {
  // const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

  // console.log(image_url);
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: image_url }}
        onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />

      <Text
        className="text-dark-100 text-center base-bold mt-2"
        numberOfLines={1}
      >
        {name}
      </Text>

      <Text className="body-regular text-gray-500 mb-4">
        From {price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Text>

      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => console.log("Add to cart pressed")}
      >
        <Ionicons name="add" size={16} color="#FE8C00" className="font-quicksand-bold" />

        <Text className="paragraph-bold text-primary ">
        Add to Cart 

        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
