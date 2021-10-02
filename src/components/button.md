```jsx
const Demo = () => {

  return (
    <>
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={false}
      >
        primary
      </Button>
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={false}
      >
        outline
      </Button>
    </>
  );
};

<div className="max-w-md mx-auto m-6 shadow">
  <div className="space-y-6">
    <Demo />
  </div>
</div>;
```