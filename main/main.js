module.exports = function main(inputs) {
    console.log("Debug Info");
    return printInventory(inputs);

    function printInventory(inputs) {
        var output = "***<store earning no money>Receipt ***\n";
        var uniqueBarcodes = [];
        var uniqueItems = [];

        inputs.forEach(function(input) {
            if(!uniqueBarcodes.includes(input.Barcode)) {
                uniqueItems.push(input);
                uniqueBarcodes.push(input.Barcode);
            }
        });

        var total = 0;
        uniqueItems.forEach(function(item) {
            var items = inputs.filter(input => input.Barcode == item.Barcode);
            var prices = items.map(item => item.Price);
            var reducer = (accumulator, currentValue) => accumulator + currentValue;
            var totalPrice = prices.reduce(reducer);
            total += totalPrice;
            var unit = getUnit(item.Unit, items.length);
            output += "Name: " + item.Name + ", Quantity: " + items.length + unit + ", Unit price: " + item.Price.toFixed(2) + " (yuan), Subtotal: " + totalPrice.toFixed(2) + " (yuan)\n";
        });

        output += "----------------------\n";
        output += "Total: " + total.toFixed(2) + " (yuan)\n";
        output += "**********************\n"

        function getUnit(unitName, itemQty){
            if(itemQty > 1) {
                return " " + unitName + "s";
            } else {
                return "";
            }
        }

        return output;
    }
};

