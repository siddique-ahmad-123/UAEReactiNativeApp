// App.tsx
import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import BorrowerIncomeScreen from './creditCard/incomeDetail/borrower';
import CoBorrowerIncomeScreen from './creditCard/incomeDetail/coBorrower';


export default function CreditCard() {
  const { stepIndex } = useApplicationStore();

  const steps = [
    <BorrowerIncomeScreen key="borrowerIncome" />,
    <CoBorrowerIncomeScreen key="coBorrowerIncome"/>
  ];

  return steps[stepIndex];
}
