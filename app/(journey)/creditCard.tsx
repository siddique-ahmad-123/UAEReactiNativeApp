// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { useApplicationStore } from '@/store/applicationStore';
import { IncomeDetailForm } from '@/forms/incomeDetails';


export default function CreditCard() {
  const { stepIndex } = useApplicationStore();

  const steps = [
    <IncomeDetailForm key="personal" />,
  ];

  return <SafeAreaView style={{ flex: 1 }}>{steps[stepIndex]}</SafeAreaView>;
}
