import { useState, useEffect, useRef } from "react";
import './App.css';


function App() {
  const [cols, setCols] = useState(0);
  const [numbers, setNumbers] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'])
  const [shuffledArray, setShuffledArr] = useState([])
  const [puzzle, setpuzzle] = useState(false);
  const inputRef = useRef(null)
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [drag, setDrag] = useState(false)
  const [model, setmodel] = useState(false)

  useEffect(() => {
    let Puzzle = JSON.parse(localStorage.getItem("puzzle"));
    setShuffledArr(Puzzle)

    if (localStorage.getItem("puzzle")) {
      if (Puzzle.length === 4) {
        setCols(2)
      } else if (Puzzle.length === 9) {
        setCols(3)
      } else if (Puzzle.length === 16) {
        setCols(4)
      } else if (Puzzle.length === 25) {
        setCols(5)
      } else if (Puzzle.length === 36) {
        setCols(6)
      }

    }

    if (Puzzle) {
      setpuzzle(true)
    }
  }, [])

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    console.log(draggingItem.current, 'kekw')
    setDrag(true)
  }

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(dragOverItem.current, '2123')
  }

  const puzzleOrder = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (i > 0 && arr[i - 1] > arr[i]) {
        return false;
      }
    }
    setmodel(true)
    localStorage.removeItem("puzzle")
  }

  const handleResetPuzzle = () => {
    setpuzzle(false)
    setmodel(false)
    localStorage.removeItem("puzzle")
  }

  const handleDragEnd = (e) => {
    const puzzlelist = [...shuffledArray]
    const draggingItemContent = puzzlelist[draggingItem.current];
    const dragOverItemCurrent = puzzlelist[dragOverItem.current];
    console.log(puzzlelist, 'before')
    puzzlelist[draggingItem.current] = dragOverItemCurrent;
    puzzlelist[dragOverItem.current] = draggingItemContent;
    draggingItem.current = null;
    dragOverItem.current = null;
    setShuffledArr(puzzlelist);
    localStorage.setItem("puzzle", JSON.stringify(puzzlelist));
    puzzleOrder(puzzlelist)
    setDrag(false)
  }


  // console.log(model)

  // const colsSet = (e) => {
  //   if (inputRef.current.value <= 6 && inputRef.current.value >= 2) {
  //     if (e.key === 'Enter' && e.target.value <= 6 && e.target.value >= 2) {
  //       setCols(e.target.value)
  //     } else if (e.type === 'click') {
  //       const current = inputRef.current.value;
  //       setCols(current)
  //     }
  //   }
  //   e.target.value = '';
  // }
  
  const setColsVal = (e) => {
    e.preventDefault()
    console.log('hello')
    const current = inputRef.current.value;
    setCols(current);
    setpuzzle(true);
    const newCols = current;
    if (newCols >= 2 && newCols <= 6) {
      const newnums = numbers.slice(0, newCols * newCols);
      setShuffledArr(newnums.sort((a, b) => 0.5 - Math.random()));
      const newShuffledArr = newnums.sort((a, b) => 0.5 - Math.random());
      localStorage.setItem("puzzle", JSON.stringify(newShuffledArr));
    }
  }

  return (
    <div className="w-full p-7 relative">
      {model && <div className="h-screen bg-[gray]/20 inset-0 w-screen absolute">
        <div className="m-auto mt-[200px] flex flex-col items-center w-fit">
          <h1 className="text-[60px] font-bold">Welcome to the team!</h1>
          <button onClick={handleResetPuzzle} className="bg-[white] max-w-[100px] rounded-[8px] py-[8px] w-full">Close</button>
        </div>
      </div>}
      <div className="w-full  p-[12px]">
        <form onSubmit={setColsVal} className="flex items-center justify-center">
          <h1 className="text-red-400 font-bold text-[20px] mr-[8px]">ENTER PUZZLE SIZE :</h1>
          <input  ref={inputRef} onSubmit={setColsVal} className="max-w-[320px] w-full border-[1px] mr-[6px] p-4 max-h-[48px] outline-none border-solid border-[#ef4444] rounded-[8px]" placeholder="Enter Puzzle Size" type="number" min={2} max={6} />
          <button onSubmit={setColsVal} className="p-1 min-h-[48px] font-semibold max-w-[96px] w-full text-white bg-red-400 rounded-[8px]">Create!</button>
        </form>
      </div>
      <br />
      {puzzle && cols == '2' && <div className={`${drag ? "bg-[gray]/10" : ""} grid p-[24px] justify-items-center gap-[24px] grid-cols-2 max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400`}>
        {shuffledArray.map((num, index) => {
          return (
            <div onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd} onDragEnter={(e) => handleDragEnter(e, index)} onDragStart={(e) => handleDragStart(e, index)} draggable={true} key={index} className="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
              <p className="mt-[25px]">{num}</p>
            </div>
          )
        })}
      </div>}
      {puzzle && cols == '3' && <div className={`${drag ? "bg-[gray]/10" : ""} grid p-[24px] justify-items-center gap-[24px] grid-cols-3 max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400`}>
        {shuffledArray.map((num, index) => {
          return (
            <div onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd} onDragEnter={(e) => handleDragEnter(e, index)} onDragStart={(e) => handleDragStart(e, index)} draggable={true} key={index} className="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
              <p className="mt-[25px]">{num}</p>
            </div>
          )
        })}
      </div>}
      {puzzle === true && cols == '4' && <div className={`${drag ? "bg-[gray]/10" : ""} grid p-[24px] justify-items-center gap-[24px] grid-cols-4 max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400`}>
        {shuffledArray.map((num, index) => {
          return (
            <div onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd} onDragEnter={(e) => handleDragEnter(e, index)} onDragStart={(e) => handleDragStart(e, index)} draggable={true} key={index} className="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
              <p className="mt-[25px]">{num}</p>
            </div>
          )
        })}
      </div>}
      {puzzle && cols == '5' && <div className={`${drag ? "bg-[gray]/10" : ""} grid p-[24px] justify-items-center gap-[24px] grid-cols-5 max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400`}>
        {shuffledArray.map((num, index) => {
          return (
            <div onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd} onDragEnter={(e) => handleDragEnter(e, index)} onDragStart={(e) => handleDragStart(e, index)} draggable={true} key={index} className="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
              <p className="mt-[25px]">{num}</p>
            </div>
          )
        })}
      </div>}
      {puzzle && cols == '6' && <div className={`${drag ? "bg-[gray]/10" : ""} grid p-[24px] justify-items-center gap-[24px] grid-cols-6 max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400`}>
        {shuffledArray.map((num, index) => {
          return (
            <div onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd} onDragEnter={(e) => handleDragEnter(e, index)} onDragStart={(e) => handleDragStart(e, index)} draggable={true} key={index} className="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
              <p className="mt-[25px]">{num}</p>
            </div>
          )
        })}
      </div>}
    </div>
  );
};

export default App;
