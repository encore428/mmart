
```jsx
  import { useState } from 'react'
  import { Button } from "./button";
  const [goPage, setGoPage] = useState(1);
  const [error, setError] = useState("");
  const pageCnt = 20;
  const isLoading = false;

  <div id="pagination-btns" className="flex justify-between items-center">
    <div className="flex justify-between items-center">
      <NumberControl value={goPage} setValue={setGoPage} 
                      error={error} setError={setError}
                      maxNum={pageCnt} 
      />
      <Button
          type="button"
          variant="primary"
          disabled={isLoading} 
          onClick={() => {setError("");alert(`Jump to page ${goPage}`);}}
      >
            {isLoading?'Loading...':(`Go to page ${goPage}`)}
      </Button>
    </div>
  </div>

```
