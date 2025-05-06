/* eslint-disable @typescript-eslint/no-unused-expressions */
 
import { useEffect, useRef } from "react";

import { type MutableRefObject } from "react";

export interface UseClickOutsideConfig {
  onOutside: () => void;
}

export interface UseClickOutsideReturn<T extends HTMLElement> {
  ref: MutableRefObject<T | null>;
}

const assertIsNode = (target: EventTarget | Node | null): target is Node =>
  !!target && "nodeType" in target;

export const useClickOutside = <T extends HTMLElement>({
  onOutside,
}: UseClickOutsideConfig) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      (assertIsNode(target) && ref.current?.contains(target)) || onOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref };
};
