import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const totalItems = 10;
  return (
    <TouchableOpacity className='card-btn' onPress={() => {}}>
        {/* <Image 
        source={images.bag}
        className='size-5' resizeMode='contain' /> */}
        <Ionicons name="bag-outline" className='bg-dark-100 p-1.5 rounded-full' size={17} color="white" />
        {totalItems > 0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>{totalItems}</Text>
            </View>
        )}
    </TouchableOpacity>
  )
}

export default CartButton