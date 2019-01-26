const userPlan = {
    maxBorrowing: (plan) => {
        if(plan == 'silver'){
            return 3
        }else
        if(plan == 'gold')
            return 10;
        
        return 20
    },
    validity: (plan) => {
        if(plan == 'silver'){
            return 3
        }else
        if(plan == 'gold')
            return 7    ;
        
        return 15
    }
}
module.exports = userPlan;