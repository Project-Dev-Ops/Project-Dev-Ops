module.exports = function Cart(oldCart) {
    this.records = oldCart.records || {} ;

    this.add = (item) => {
        let record = this.records[item.id];
        if (record == null) {
            this.records[item.id] = item ;
        } 
    }

    this.remove = (id) => {
        let record = this.records[id];
        if (record) {
            delete this.records[id];
        }
    }

    this.toArray = () => {
        let arr = [];
        for(let id in this.records ){
            arr.push(this.records[id])
        }
        return arr ;
    } 

}