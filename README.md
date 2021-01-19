# Use State Promise

[![Star IT Ltd](https://staritltd.com/wp-content/uploads/2019/10/Web_Logo_of_Star_IT_158x80.png)](https://staritltd.com)

An enhanced version of useState hook that returns asynchronous setter. Written in TS.

## Installation & Usage

`yarn add use-state-promise`

```tsx
import useStatePromise from 'use-state-promise';

export default function App() {
  const [data, setDataPromise, setData] = useStatePromise(10);
  return (
    <>
      <p>{data}</p>
      <button
        onClick={() =>
          setDataPromise((curr) => curr + 1).then((state) => console.log('dom updated', state))
        }
      >
        click me!
      </button>
    </>
  );
}
```
