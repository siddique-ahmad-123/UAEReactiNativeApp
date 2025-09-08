// src/forms/PersonalForm.tsx
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplicationStore } from '@/store/applicationStore';
import { incomeDetailSchema } from '@/schemas/incomeDetailSchema';

export const IncomeDetailForm = () => {
  const { updateField, nextStep, formData } = useApplicationStore();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(incomeDetailSchema),
    defaultValues: {
      name: formData.name || '',
      dob: formData.dob || '',
      gender: formData.gender || 'Male',
      nationality: formData.nationality || '',
    },
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name</Text>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              style={{ borderWidth: 1, marginBottom: 4, padding: 8 }}
            />
            {fieldState.error && <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>}
          </>
        )}
      />
      <Text>DOB</Text>
      <Controller
        name="dob"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              style={{ borderWidth: 1, marginBottom: 4, padding: 8 }}
            />
            {fieldState.error && <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>}
          </>
        )}
      />
      {/* Add gender, nationality similarly */}
      <Button title="Save & Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
