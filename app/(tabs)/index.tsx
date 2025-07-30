import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from "clsx";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {user} = useAuthStore();

  console.log('User:', JSON.stringify(user, null, 2));

  const renderListHeader = () => (
    <View className="flex-between flex-row w-full my-5 px-5">
      <View className="flex-start">
        <Text className="small-bold text-primary">DELIVER TO</Text>
        <TouchableOpacity className="flex-row flex-center gap-x-1 mt-0.5">
          <Text className="paragraph-bold text-dark-100">Regent Home 4</Text>
          <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <CartButton />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        ListHeaderComponent={renderListHeader} 
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View className="p-4 pt-0"> 
              <Pressable
                className={cn('offer-card', isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: '#fffff22' }}
              >
                {({ pressed }) => (
                  <>
                    <View className="h-full w-1/2">
                      <Image source={item.image} className="size-full" resizeMode="contain" />
                    </View>
                    <View className={cn('offer-card__info', isEven ? 'pl-8' : 'pr-8')}>
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor="#ffffff"
                      />
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          )
        }}
        // Add a keyExtractor for performance and to avoid warnings
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}