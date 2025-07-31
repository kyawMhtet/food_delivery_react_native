import { Category } from '@/type';
import cn from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native';

export default function Filter({ categories }: { categories?: Category[] }) {
  const params = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState(params.category || '');
  const flatListRef = useRef<FlatList>(null);

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: '', name: 'All' }, ...categories]
    : [{ $id: '', name: 'All' }];

  const handlePress = (id: string, index: number) => {
    setActiveCategory(id);
    // flatListRef.current?.scrollToIndex({ index, animated: true });

    if (id === 'all') router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  return (
    <FlatList
      ref={flatListRef}
      data={filterData}
      horizontal
      keyExtractor={(item) => item.$id}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 px-3"
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={item.$id}
          className={cn(
            'filter',
            activeCategory === item.$id ? 'bg-amber-500' : 'bg-white'
          )}
          style={Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787' } : {}}
          onPress={() => handlePress(item.$id, index)}
        >
          <Text
            className={cn(
              'body-medium',
              activeCategory === item.$id ? 'text-white' : 'text-gray-200'
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
