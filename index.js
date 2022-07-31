    let year1Data = data.slice(0, 12);
    year1Data = year1Data.map((v) => {
        return {
            label: v.Month.split('-')[1],
            value: v.Sales
        };
    })
    let year2Data = data.slice(12, 24);
    year2Data = year2Data.map((v) => {
        return {
            label: v.Month.split('-')[1],
            value: v.Sales
        };
    })
    let year3Data = data.slice(24, 36);
    year3Data = year3Data.map((v) => {
        return {
            label: v.Month.split('-')[1],
            value: v.Sales
        };
    })
    console.log("year1Data = ", year1Data)
    console.log("year2Data = ", year2Data)
    console.log("year3Data = ", year3Data)
