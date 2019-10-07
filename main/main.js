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

        // inputs.forEach(function(input) {
        //     output += "Name: " + input.Name + ", Quantity: " + input.Unit + ", Unit price: " + input.Price + "(yuan)" + "\n";
        // });
        uniqueItems.forEach(function(item) {
            var items = inputs.filter(input => input.Barcode == item.Barcode);
            var prices = items.map(item => item.Price);
            var reducer = (accumulator, currentValue) => accumulator + currentValue;
            var totalPrice = prices.reduce(reducer);
            output += "Name: " + item.Name + ", Quantity: " + items.length + " " + item.Unit + ", Unit price: " + item.Price.toFixed(2) + " (yuan), Subtotal: " + totalPrice.toFixed(2) + " (yuan)\n";
        });

        return output;
    }
};

