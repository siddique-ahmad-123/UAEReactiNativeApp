// stores/autoLoanStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Step route list for auto loan (must match folder structure)
const autoLoanRoutes = [
//   "/(journey)/autoLoan/selectVehicle",
//   "/(journey)/autoLoan/loanDetails",
//   "/(journey)/autoLoan/personalDetail/borrowerDetails",
//   "/(journey)/autoLoan/personalDetail/coBorrowerDetails",
//   "/(journey)/autoLoan/incomeDetail/borrower",
//   "/(journey)/autoLoan/incomeDetail/coBorrower",
//   "/(journey)/autoLoan/expenseDetail/expenseDetails",
//   "/(journey)/autoLoan/additionalDocuments/upload",
//   "/(journey)/autoLoan/dispatchDetail/dispatchDetails",
//   "/(journey)/autoLoan/applicationSummary/summary",
//   "/(journey)/autoLoan/submitApplication/applicationApproved",
//   "/(journey)/autoLoan/submitApplication/congratulations",
] as const;

interface AutoLoanState {
  stepIndex: number;
  formData: Record<string, any>;
  updateField: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  resetForm: () => void;
}

export const useAutoLoanStore = create<AutoLoanState>()(
  persist(
    (set, get) => ({
      stepIndex: 0,
      formData: {},

      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      nextStep: () => {
        const { stepIndex } = get();
        const next = stepIndex + 1;
        if (next < autoLoanRoutes.length) {
          set({ stepIndex: next });
          router.push(autoLoanRoutes[next]);
        }
      },

      prevStep: () => {
        const { stepIndex } = get();
        const prev = stepIndex - 1;
        if (prev >= 0) {
          set({ stepIndex: prev });
          router.push(autoLoanRoutes[prev]);
        }
      },

      goToStep: (index) => {
        if (index >= 0 && index < autoLoanRoutes.length) {
          set({ stepIndex: index });
          router.push(autoLoanRoutes[index]);
        }
      },

      resetForm: () => {
        set({ stepIndex: 0, formData: {} });
        router.push("/"); // or autoLoanRoutes[0] if you want direct restart
      },
    }),
    {
      name: "auto-loan-application",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
