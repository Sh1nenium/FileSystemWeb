import { useState } from "react";

export type StateObject<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>
}

export function useStateObject<T>(property?: T) {
  const [value, setValue] = useState<T | undefined>(property);
  
  return {
    value: value,
    setValue: setValue
  } as StateObject<T>
}