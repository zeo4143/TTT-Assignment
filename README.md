# TTT-Assignment 

The assignment has been deployed on Netlify : https://steady-buttercream-2b781e.netlify.app/ 

Modules Used
Axios, Chart.js, file-saver

1.Create a normal react application  using npm create vite@latest and go to the src folder wherein in App.jsx we will be doing all the modifications.

2.Fetch the contents from https://www.terriblytinytales.com/test.txt, we will use the module called axios and store it in an object response and then we can use .trim() function to remove any trailing or ending white spaces and then .split() to split them into an array of       substrings.

Then, create and empty object called wordCounts. Then initialize a for loop that iterates over each element in the words array using the :for...of" loop syntax. Inside the loop, check whether the current word is a key in the wordCounts object using the "in" operator. If the word already exists increment it's count otherwise put 1.

After the loop, create a new variable called "sortedWordCounts" using the "Object.entries()" method, which returns an array of key-value pairs from the "wordCounts" object. This array can then be sorted in descending order based on the count (the second element of each key-value pair) using the ".sort()" method and a comparison function that compares the second element of each array. Then the sorted array is sliced to the first 20 elements using the ".slice()" method.

The resulting "sortedWordCounts" array is then passed as an argument to the "setData()" function.

Now call a function "handleExport", this function exports data in CSV format.

It first maps the data array to a new array called "csvData", which contains each element of "data" as a comma-separated string using template literals.
It then creates a new Blob object using the "Blob" constructor, which takes "csvData" as its first argument and an object with a "type" property set to "text/csv;charset=utf-8;" as its second argument. A Blob represents raw data that can be stored in a file. 

The saveAs() function from the FileSaver.js library is used to save the Blob object as a file.
The first argument blob is the Blob object representing the CSV data.
The second argument 'histogram.csv' specifies the desired filename for the saved file.

Then we use the "useEffect" hook to create and destroy a bar chart using the Chart.js library. The "useEffect" hook takes two arguments: a function and a dependency array. Then the function is executed when the component mounts or when the dependencies change. In this case, the function creates a new "Chart" object and renders it to a canvas element with the ID "chart". The chart is a bar chart that displays the frequency of words in the data passed to the component.

"if (data)" then statement checks if there is data passed to the component. If there is no data, the function does not create a chart. If there is data, the function destroys any existing chart and creates a new one based on the data. The dependency array "data" specifies that the function should be executed whenever the "data" prop changes. This will ensure that the chart is updated whenever the data changes.

