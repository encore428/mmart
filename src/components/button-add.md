```jsx
const Demo = () => {

    const goPick = (objid) => {
        alert(`You have clicked the button and invoked goPick function`);
    }

  return (
    <>
      <ButtonAdd
        goPick={goPick}
      />
    </>
  );
};

<div>
    <Demo />
</div>;
```
