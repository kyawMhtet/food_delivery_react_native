import { images } from '@/constants';
import useAuthStore from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function AuthLayout() {
  const { height } = Dimensions.get('screen');

  const {isAuthenticated} = useAuthStore();

  if(isAuthenticated) return <Redirect href="/" />

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      >
        <View className='relative w-full' style={{ height: height / 2.25}}>
          <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' />
          <Image source={images.logo} className='absolute self-center size-48 -bottom-16 z-10'/>
        </View>

       
    <Slot />

      </ScrollView>

    </KeyboardAvoidingView>
    
  )
}