import React from 'react'
import { useState } from 'react';
import Element from './Element';
import { generateArray, bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '../utils';

function Main() {
    const [algorithm, setAlgorithm] = useState('bubble');
    const [array, setArray] = useState([9, 2, 5, 3, 4]);
    const [arraySize, setArraySize] = useState(5); // Default array size
    const [isSorting, setIsSorting] = useState(false);

   
    return (
        <div className='flex flex-col text-black h-full justify-center items-center'>
            <div className='flex gap-3 lg:gap-8 py-4'>

                <div className='rounded-2xl py-0 px-2 outline-none max-w-fit bg-white relative '>
                    <select id='algorithms' value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isSorting} className='outline-none flex items-center py-1 rounded-2xl'>
                        <option value='bubble'>Bubble Sort</option>
                        <option value='selection'>Selection Sort</option>
                        <option value='insertion'>Insertion Sort</option>
                        <option value='merge'>Merge Sort</option>
                        <option value='quick'>Quick Sort</option>
                    </select>
                </div>

                <div className='rounded-2xl py-0 px-2 outline-none max-w-fit bg-white relative '>
                    <select id='algorithms' value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} disabled={isSorting} className='outline-none flex items-center py-1 rounded-2xl'>
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <button className='cursor-pointer hover:bg-blue-700 duration-150 py-1 px-4 bg-blue-500 text-white font-semibold rounded-2xl' onClick={() => generateArray(array, setArray, arraySize)} disabled={isSorting}>Generate Array</button>
                
                <button className='cursor-pointer hover:bg-blue-700 duration-150 py-1 px-4 bg-blue-500 text-white font-semibold rounded-2xl' 
                    disabled={isSorting || array.length === 0}
                    onClick={() => {
                        if(algorithm == 'bubble') bubbleSort(array, setArray, setIsSorting);
                        else if(algorithm == 'selection') selectionSort(array, setArray, setIsSorting);
                        else if(algorithm == 'insertion') insertionSort(array, setArray, setIsSorting);
                        else if(algorithm == 'merge') mergeSort(array, setArray, setIsSorting);
                        else if(algorithm == 'quick') quickSort(array, setArray, setIsSorting);
                    }}
                > 
                    Sort 
                </button>

            </div>

            <div className='array-circles flex gap-5 lg:gap-8 justify-center items-center h-full w-full'>
                {array.map((value, idx) => (
                    <Element value={value} key={idx}/>
                ))}
            </div>

        </div>
    )
}

export default Main