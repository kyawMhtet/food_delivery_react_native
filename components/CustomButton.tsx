import cn from 'clsx'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

export default function CustomButton({
  onPress,
  style,
  textStyle,
  title = "Click Me",
  leftIcon,
  isLoading = false
}) {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
      {leftIcon}
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}