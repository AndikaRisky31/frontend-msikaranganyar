import { useEffect, useRef } from "react";

const useDocument = () => {
  const documentRef = useRef(document);

  useEffect(() => {
    documentRef.current = document;
  }, []);

  return documentRef;
};

export default useDocument;