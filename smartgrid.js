module.exports = {
    outputStyle: 'scss', 
    columns: 16,
    offset: "16px", //Межколонник
    container: {
        maxWidth: "1872px",
        fields: "23px" //Отступ по краю контейнера
    },
    breakPoints: {
        p22: {
            width: "2200px"            
        },
        p20: {
            width: "2050px"            
        },
        p19: {
            width: "1900px"
        },
        p17: {
            width: "1750px"
        },
        p16: {
            width: "1600px"
        },
        p13: {
            width: "1350px"
        },
        p12: {
            width: "1188px"
        },
        p10: {
            width: "1040px",
            offset: "18px",
            fields: "25px"
        },
        p7: {
            width: "760px",
            offset: "10px",
            fields: "16px"
        },
        p5: {
            width: "570px",
            offset: "5px",
            fields: "16px"
        }
    },
    mixinNames: {
        container: 'container'
    }
};