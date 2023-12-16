    async function getData(){
        try {
            const res = await fetch("https://api.coronavirus.data.gov.uk/v1/data");
            const result = await res.findAll({
                where: {
                    phase: "BEFORE"
                }
            });
            return result;
        } catch (error) {
            console.log("Not able to fetch the details of contest");
        return res.status(404).json({
            message: 'Not able to fetch',
        });
    }
}