import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import * as Sentry from '@sentry/react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

const submit = () => {
  if(!form.email || !form.password) {
   return Alert.alert('Invalid input', 'Please fill all the fields')
  }

  setIsSubmitting(true);

  try {
    
    Alert.alert('success', 'Successfully signed in');
    router.replace('/');
    setIsSubmitting(false);
  } catch (error: any) {
    Alert.alert('error', error.message);
    Sentry.captureEvent(error);
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <View className='gap-6 bg-white rounded-g p-5 mt-5'>

           <CustomInput 
          placeholder='Enter your email'
          label='Email Address'
          onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
          value={form.email}
          secureTextEntry={false}
          keyboardType='email-address'
        />

         <CustomInput 
          placeholder='Enter your password'
          label='Password'
          onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
          value={form.password}
          secureTextEntry={true}
          keyboardType='default'
        />


        <CustomButton 
          title='Sign In'
          onPress={submit}
          isLoading={isSubmitting}

         />

         <View className='flex-row gap-2 items-center justify-center'>
          <Text className='base-regular text-gray-100'>
            Don&apos;t have an account?
          </Text>
          <Link href={'/sign-up'} className='base-bold text-primary'>
            Sign Up
          </Link>
         </View>
      
    </View>
  )
}