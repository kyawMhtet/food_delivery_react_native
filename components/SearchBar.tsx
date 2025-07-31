import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchBar() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  const handleSearch = (text?: string) => {
    setQuery(text || "");
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query: query.trim() });
    else router.setParams({ query: undefined });
  };

  const clearSearch = () => {
    setQuery("");
    router.setParams({ query: undefined });
    router.setParams({ category: undefined });
  };

  return (
    <>
      <View className="searchbar">
        <TextInput
          className="flex-1 p-5"
          placeholder="Search for food, drinks, etc."
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity
          className="pr-5"
          onPress={() => router.setParams({ query: query.trim() })}
        >
          <Image
            source={images.search}
            className="size-7"
            resizeMode="contain"
            tintColor={"#5D5F6D"}
          />
        </TouchableOpacity>
      </View>
      {query.length > 0 && (
        <TouchableOpacity onPress={clearSearch} className="flex-row-reverse">
          <Text className="text-primary text-small-bold ">Clear search</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
