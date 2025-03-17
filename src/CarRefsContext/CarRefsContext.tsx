import { createContext, useRef, ReactNode, useMemo } from 'react';

type CarRefsContextType = {
  carRefs: React.MutableRefObject<{ [id: number]: HTMLSpanElement | null }>;
};

export const CarRefsContext = createContext<CarRefsContextType | null>(null);

export const CarRefsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const carRefs = useRef<{ [id: number]: HTMLSpanElement | null }>({});
  const value = useMemo(() => ({ carRefs }), [carRefs]);

  return <CarRefsContext.Provider value={value}>{children}</CarRefsContext.Provider>;
};
