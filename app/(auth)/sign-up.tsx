import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

const submit = async() => {
  const { name, email, password } = form;

  if(!name || !email || !password) {
    return Alert.alert('Invalid input', 'Please fill all the fields');
  }

  setIsSubmitting(true);

  try {
    
    await createUser({
      name,
      email,
      password
    })
    router.replace('/');
    setIsSubmitting(false);
  } catch (error: any) {
    Alert.alert('Error', error.message);
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <View className='gap-6 bg-white rounded-g p-5 mt-5'>
        <CustomInput 
          placeholder='Enter full name'
          label='Name'
          onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
          value={form.name}
          secureTextEntry={false}
          keyboardType='default'
        />

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
          title='Sign Up'
          onPress={submit}
          isLoading={isSubmitting}
          
         />

         <View className='flex-row gap-2 items-center justify-center'>
          <Text className='base-regular text-gray-100'>
            Already have an account?
          </Text>
          <Link href={'/sign-in'} className='base-bold text-primary'>
            Sign In
          </Link>
         </View>
      
    </View>
  )
}