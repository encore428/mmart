```jsx
const Demo = () => {

    const goDele = (objid) => {
        alert(`You have clicked the button and invoked goDele function`);
    }

  return (
    <>
      <ButtonBin
        goDele={goDele}
      />
    </>
  );
};

<div>
    <Demo />
</div>;
```
