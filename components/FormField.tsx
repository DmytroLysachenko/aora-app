import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-red-100 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center">
        <TextInput
          className="flex-1 flex-row text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
