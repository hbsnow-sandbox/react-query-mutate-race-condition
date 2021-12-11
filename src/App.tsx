import { useEffect } from "react";

import { useMutation } from "react-query";

import { Button } from "./components/Button";
import { useCount } from "./hooks/useCount";

export const App = (): JSX.Element => {
  const [count, { countUp }] = useCount();

  const { mutateAsync, data, status } = useMutation(async (data) => {
    const res = await fetch("http://localhost:3000/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    return json;
  });

  useEffect(() => {
    const fn = async () => {
      if (count > 0) {
        await mutateAsync({ count } as any);
      }
    };

    fn();
  }, [count, mutateAsync]);

  return (
    <main>
      <p>
        <Button onClick={() => countUp()}>count up</Button>
      </p>

      <p>count is: {count}</p>
      <div>
        <pre>{JSON.stringify(status)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </main>
  );
};
