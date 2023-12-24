import { InvokeArgs, invoke } from "@tauri-apps/api/tauri";
import { UseQueryOptions, useQuery } from "react-query";

export const useCommand = <T, P extends InvokeArgs | undefined = undefined>({
  command,
  payload,
  ...options
}: { command: string; payload?: P } & UseQueryOptions<T, Error>) => {
  const queryResult = useQuery<T, Error>({
    queryKey: command,
    queryFn: () => invoke(command, payload),
    ...options,
  });

  return queryResult;
};

export const useCommandLazy = <T, P extends InvokeArgs | undefined = undefined>({
  command,
  payload,
  ...options
}: {
  command: string;
  payload?: P;
} & UseQueryOptions<T, Error>) => {
  const queryResult = useQuery<T, Error>({
    queryKey: command,
    queryFn: () => invoke(command, payload),
    enabled: false,
    ...options,
  });
  return queryResult;
};
