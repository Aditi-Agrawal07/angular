const data = [
    {
    "_id": "6608f5d8077085b247784f5c",
    "first_number": "290",
    "second_number": "11",
    "third_number": "100",
    "active": false,
    "market_id": "6600f139f03d4f7c7b9c13c9",
    "createdAt": "2024-03-31T05:34:16.294Z",
    "updatedAt": "2024-03-31T05:34:16.294Z",
    "__v": 0
    },
    {
    "_id": "660796e34a80ba842aa42401",
    "first_number": "390",
    "second_number": "2",
    "third_number": "",
    "active": false,
    "market_id": "6600f139f03d4f7c7b9c13c9",
    "createdAt": "2024-03-30T04:36:51.915Z",
    "updatedAt": "2024-03-30T04:36:51.915Z",
    "__v": 0
    },
    {
    "_id": "660652f54a80ba842aa4185c",
    "first_number": "230",
    "second_number": "51",
    "third_number": "290",
    "active": false,
    "market_id": "6600f139f03d4f7c7b9c13c9",
    "createdAt": "2024-03-29T05:34:45.540Z",
    "updatedAt": "2024-03-29T05:34:45.540Z",
    "__v": 0
    },
    {
    "_id": "6604f3b5f03d4f7c7b9c382b",
    "first_number": "470",
    "second_number": "1",
    "third_number": "",
    "active": false,
    "market_id": "6600f139f03d4f7c7b9c13c9",
    "createdAt": "2024-03-28T04:36:05.594Z",
    "updatedAt": "2024-03-28T04:36:05.594Z",
    "__v": 0
    },
    {
    "_id": "6603a1d5f03d4f7c7b9c27d2",
    "first_number": "560",
    "second_number": "1",
    "third_number": "",
    "active": false,
    "market_id": "6600f139f03d4f7c7b9c13c9",
    "createdAt": "2024-03-27T04:34:29.897Z",
    "updatedAt": "2024-03-27T04:34:29.897Z",
    "__v": 0
    },
    {
    "_id": "66025136f03d4f7c7b9c1712",
    "first_number": "390",
    "second_number": "21",
    "third_number": "290",
    "active": false,
    "market_id": "6600f139f03d4f7c7b9c13c9",
    "createdAt": "2024-03-26T04:38:14.725Z",
    "updatedAt": "2024-03-30T05:34:35.543Z",
    "__v": 0
    }
    ]

// Step 1: Sort the array based on the date
const sortedData = data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
console.log(sortedData)
// Step 2: Iterate through the sorted array and group entries by week
const groupedByWeek = {};
data.forEach(item => {
    const dateKey = Object.values(item)[6];
    
    const date = new Date(dateKey);

    const weekDays = [0, 1, 2, 3, 4, 5, 6];
    
    const weekNumber = getWeekNumber(date);
console.log("Date"+ date+ "weekNumber"+ weekNumber)


    if (!groupedByWeek[weekNumber]) {
        groupedByWeek[weekNumber] = [];
     
    }

    groupedByWeek[weekNumber].push(item);
});

// Step 3: Define a function to get the week number of a given date
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset = firstDayOfYear.getDay() - 1;
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setDate(firstMonday.getDate() + (daysOffset > 0 ? 7 - daysOffset : 0));

    
    const diffInDays = Math.floor((date - firstMonday) / (1000 * 60 * 60 * 24));
    console.log(Math.floor((diffInDays+1)/7))
    return Math.floor((diffInDays + 1) / 7);
}

// Step 4: Store each week's entries in a separate array
const weeksArray = Object.values(groupedByWeek);

console.log(weeksArray);