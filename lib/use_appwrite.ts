import { useEffect, useState } from "react";
import { Alert } from "react-native";

type UseAppwrite<T> = {
  data: Array<T>;
  isloading?: boolean;
  refetch: () => Promise<void>;
}


const useAppwrite = <T>(fn: Promise<Array<T>>): UseAppwrite<T> => {
  const [data, setData] = useState(Array<any>);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn;
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, refetch };

}

export default useAppwrite;