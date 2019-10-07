module.exports = function main(inputs) {
    console.log("Debug Info");
    return printReceipt(inputs);

    function printReceipt(inputs) {
        let output = "***<store earning no money>Receipt ***\n";
        let uniqueBarcodes = [];
        let uniqueItems = [];

        inputs.forEach(function(input) {
            if(!uniqueBarcodes.includes(input.Barcode)) {
                uniqueItems.push(input);
                uniqueBarcodes.push(input.Barcode);
            }
        });

        let totalPrice = 0;
        uniqueItems.forEach(function(item) {
            let items = inputs.filter(input => input.Barcode == item.Barcode);
            let subTotalPrice = getSubTotalPrice(items);
            totalPrice += subTotalPrice;
            let unit = getUnit(item.Unit, items.length);
            output += "Name: " + item.Name + ", Quantity: " + items.length + unit + ", Unit price: " + item.Price.toFixed(2) + " (yuan), Subtotal: " + subTotalPrice.toFixed(2) + " (yuan)\n";
        });

        output += "----------------------\n";
        output += "Total: " + totalPrice.toFixed(2) + " (yuan)\n";
        output += "**********************\n";

        return output;
    }

    function getSubTotalPrice(items) {
        return items.map(item => item.Price)
            .reduce((a, b) => a + b, 0);
    }

    function getUnit(unitName, itemQty){
        if (unitName == "a") {
            return "";
        }
        if (itemQty > 1) {
            return " " + unitName + "s";
        } else {
            return " " + unitName;
        }
    }
};

