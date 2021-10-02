CollItem example:

```js
const myColl = [
   {objId: '437329'
   },
   {objId: '70242'
   },
   {objId: '53245'
   },
   {objId: '452142'
   },
   {objId: '52495'
   }
];

const Demo = () => {
    const object='437329';

    const deleObj = (objid) => {
        alert(`artwork of objectID ${objid} will be removed from your collection`);
    }
    const pickObj = (objid) => {
        alert(`artwork of objectID ${objid} will be added to your collection`);
    }
    return (
        <div className="mt-2 flex">

            {myColl.map(object => (
                <CollItem
                    objId={object.objId}
                    key={object.objId}
                    goDele={() => deleObj(object.objId)}
                    goPick={() => pickObj(object.objId)}
                />
            ))}
        </div>
    )
}

<Demo />;
```