// src/store/applicationStore.ts
import { create } from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApplicationState {
  stepIndex: number;
  formData: Record<string, any>;
  updateField: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      stepIndex: 0,
      formData: {},
      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      nextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
      prevStep: () => set((state) => ({ stepIndex: state.stepIndex - 1 })),
      resetForm: () => set({ stepIndex: 0, formData: {} }),
    }),
    {
      name: 'loan-application',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
