import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // for navigation
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Step route list (must match your folder-based routes)
const stepRoutes = [
  "/(journey)/creditCard/selectCreditCard",
  "/(journey)/creditCard/selectRequiredAmount",
  "/(journey)/creditCard/personalDetail/borrowerDetails",
  "/(journey)/creditCard/personalDetail/coBorrowerDetails",
  "/(journey)/creditCard/incomeDetail/borrower",
  "/(journey)/creditCard/incomeDetail/coBorrower",
  "/(journey)/creditCard/expenseDetail/expenseDetails",
  "/(journey)/creditCard/additionalDocuments/additionalDocUpload",
  "/(journey)/creditCard/dispatchDetail/dispatchDetails",
  "/(journey)/creditCard/applicationSummary/applicationSummary",
  "/(journey)/creditCard/applicationSummary/dispatchSummary",
] as const;

interface ApplicationState {
  stepIndex: number;
  formData: Record<string, any>;
  updateField: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  resetForm: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
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
        console.log("Navigating to:", stepIndex, next, stepRoutes.length);

        if (next < stepRoutes.length) {
          set({ stepIndex: next });

          router.push(stepRoutes[next]); // <-- navigate
        }
      },

      prevStep: () => {
        const { stepIndex } = get();
        const prev = stepIndex - 1;
        if (prev >= 0) {
          set({ stepIndex: prev });
          router.push(stepRoutes[prev]); // <-- navigate
        }
      },

      goToStep: (index) => {
        if (index >= 0 && index < stepRoutes.length) {
          set({ stepIndex: index });
          router.push(stepRoutes[index]);
        }
      },

      resetForm: () => {
        set({ stepIndex: 0, formData: {} });
        // router.push(stepRoutes[0]); // <-- reset navigation
        router.push("/");
      },
    }),
    {
      name: "loan-application",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
