// ApiResponseContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ApiResponse {
  data: any;
  error: string | null;
}

interface ApiResponses {
  [key: string]: ApiResponse | null;
}

interface ApiResponseContextType {
  apiResponses: ApiResponses;
  fetchApiData: (apiKey: string, fetchFunc: () => Promise<any>) => Promise<void>;
  clearApiResponses: () => void;
  removeApiResponse: (apiKey: string) => void;  // Nueva función para eliminar por llave
}

const ApiResponseContext = createContext<ApiResponseContextType | undefined>(undefined);

export const ApiResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiResponses, setApiResponses] = useState<ApiResponses>({});

  const fetchApiData = async (apiKey: string, fetchFunc: () => Promise<any>) => {
    try {
      const data = await fetchFunc();
      setApiResponses(prevResponses => ({
        ...prevResponses,
        [apiKey]: { data, error: null }
      }));
    } catch (error) {
      setApiResponses(prevResponses => ({
        ...prevResponses,
        [apiKey]: { data: null, error: (error as Error).message }
      }));
    }
  };

  const clearApiResponses = () => {
    setApiResponses({});
  };

  // Nueva función para eliminar una entrada específica
  const removeApiResponse = (apiKey: string) => {
    setApiResponses(prevResponses => {
      const { [apiKey]: _, ...rest } = prevResponses;  // Desestructuramos y excluimos `apiKey`
      return rest;
    });
  };

  return (
    <ApiResponseContext.Provider value={{ apiResponses, fetchApiData, clearApiResponses, removeApiResponse }}>
      {children}
    </ApiResponseContext.Provider>
  );
};

export const useApiResponseContext = () => {
  const context = useContext(ApiResponseContext);
  if (!context) {
    throw new Error("useApiResponseContext must be used within an ApiResponseProvider");
  }
  return context;
};
