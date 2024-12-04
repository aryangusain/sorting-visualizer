//Function to Generate a new Array
const generateArray = (array, setArray, arraySize) => {
    const circles = document.getElementsByClassName("array-circle");

    for (let i = 0; i < array.length; i++) {
        circles[i].classList.remove("bg-green-500");
        circles[i].classList.add('bg-yellow-500');
    }

    const size = Math.max(1, Math.min(10, arraySize)); // Restrict size to 1-10
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1);
    setArray(newArray);
}

//Bubble Sort
const bubbleSort = async (array, setArray, setIsSorting) => {
    setIsSorting(true);
    const arr = [...array];
    const circles = document.getElementsByClassName("array-circle");

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            circles[j].classList.remove("bg-yellow-500");
            circles[j + 1].classList.remove("bg-yellow-500");
            circles[j].classList.add("bg-red-500");
            circles[j + 1].classList.add("bg-red-500");

            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                setArray([...arr]); // Update state for visualization
                await new Promise((resolve) => setTimeout(resolve, 800));
            }
            
            circles[j].classList.add("bg-yellow-500");
            circles[j + 1].classList.add("bg-yellow-500");
            circles[j].classList.remove("bg-red-500");
            circles[j + 1].classList.remove("bg-red-500");
        }
        circles[arr.length - i - 1].classList.remove("bg-yellow-500");
        circles[arr.length - i - 1].classList.add("bg-green-500"); // Mark sorted
    }

    setIsSorting(false);
}

//Selection Sort
const selectionSort = async (array, setArray, setIsSorting) => {
    setIsSorting(true);
    const arr = [...array];
    const circles = document.getElementsByClassName("array-circle");

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        circles[i].classList.remove("bg-yellow-500");
        circles[i].classList.add("bg-red-500");

        for (let j = i + 1; j < arr.length; j++) {
            circles[j].classList.remove("bg-yellow-500");
            circles[j].classList.add("bg-red-500");

            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            circles[j].classList.remove("bg-red-500");
            circles[j].classList.add("bg-yellow-500");
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, 800));
        }

        circles[i].classList.remove("bg-yellow-500");
        circles[i].classList.remove("bg-red-500");
        circles[i].classList.add("bg-green-500");
    }

    setIsSorting(false);
};


//Insertion Sort
const insertionSort = async (array, setArray, setIsSorting) => {
    setIsSorting(true);
    const arr = [...array];
    const circles = document.getElementsByClassName("array-circle");

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        circles[i].classList.remove("bg-yellow-500");
        circles[i].classList.add("bg-red-500");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        while (j >= 0 && arr[j] > key) {
            circles[j].classList.remove("bg-yellow-500");
            circles[j].classList.add("bg-red-500");
            await new Promise((resolve) => setTimeout(resolve, 800));
            
            arr[j + 1] = arr[j];
            j--;

            setArray([...arr]);

            circles[j + 1]?.classList.remove("bg-red-500");
            circles[j + 1]?.classList.add("bg-yellow-500");
        }

        arr[j + 1] = key;
        setArray([...arr]);

        circles[i].classList.remove("bg-red-500");
        circles[i].classList.add("bg-yellow-500");
    }

    for(let i = 0; i < arr.length; i++) {
        circles[i].classList.remove("bg-yellow-500");
        circles[i].classList.add("bg-green-500");
    }

    setIsSorting(false);
};


//Merge Sort
const mergeSort = async (array, setArray, setIsSorting) => {
    setIsSorting(true);

    const mergeHelper = async (arr, start, mid, end) => {
        const circles = document.getElementsByClassName("array-circle");
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            circles[k].classList.remove("bg-yellow-500");
            circles[k].classList.add("bg-red-500");

            await new Promise((resolve) => setTimeout(resolve, 800));

            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }

            setArray([...arr]);

            circles[k-1].classList.remove("bg-red-500");
            circles[k-1].classList.add("bg-green-500");
        }

        while (i < left.length) {
            arr[k++] = left[i++];
            setArray([...arr]);
            circles[k-1].classList.remove("bg-yellow-500");
            circles[k-1].classList.remove("bg-red-500");
            circles[k-1].classList.add("bg-green-500");
            await new Promise((resolve) => setTimeout(resolve, 800));
        }

        while (j < right.length) {
            arr[k++] = right[j++];
            setArray([...arr]);
            circles[k-1].classList.remove("bg-yellow-500");
            circles[k-1].classList.remove("bg-red-500");
            circles[k-1].classList.add("bg-green-500");
            await new Promise((resolve) => setTimeout(resolve, 800));
        }
    };

    const mergeSortHelper = async (arr, start, end) => {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(arr, start, mid);
        await mergeSortHelper(arr, mid + 1, end);
        await mergeHelper(arr, start, mid, end);
    };

    await mergeSortHelper([...array], 0, array.length - 1);

    setIsSorting(false);
};


//Quick Sort
const quickSort = async (array, setArray, setIsSorting) => {
    setIsSorting(true);
    const circles = document.getElementsByClassName("array-circle");

    const partition = async (arr, low, high) => {
        const pivot = arr[high];

        let i = low - 1;

        for (let j = low; j < high; j++) {
            circles[j].classList.remove("bg-yellow-500");
            circles[j].classList.add("bg-red-500");

            await new Promise((resolve) => setTimeout(resolve, 800));

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, 800));
            }

            circles[j].classList.remove("bg-red-500");
            circles[j].classList.add("bg-yellow-500");
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);

        return i + 1;
    };

    const quickSortHelper = async (arr, low, high) => {
        if (low < high) {
            const pivotIndex = await partition(arr, low, high);
            circles[pivotIndex].classList.remove("bg-yellow-500");
            circles[pivotIndex].classList.add("bg-green-500");
            await quickSortHelper(arr, low, pivotIndex - 1);
            await quickSortHelper(arr, pivotIndex + 1, high);
        }
    };

    await quickSortHelper([...array], 0, array.length - 1);

    for(let i=0; i<array.length; i++) {
        circles[i].classList.remove("bg-yellow-500");
        circles[i].classList.add("bg-green-500");
    }

    setIsSorting(false);
};

export { generateArray, bubbleSort, selectionSort, insertionSort, mergeSort, quickSort };