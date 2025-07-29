import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function SignIn() {
  return (
    <View>
      <Text className='text-dark-100'>Sign In</Text>

      <Button title='Sign Up' onPress={() => router.push('/sign-up')} />
    </View>
  )
}