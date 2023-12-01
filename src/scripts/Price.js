const Price = (() => {
    function calculateSubtotal(qty, price) {
        return (Math.round((Number(qty) * Number(price)) * 100) / 100).toFixed(2);
    }

    function calculateDiscountPrice(discount, qty, price) {
        const originalPrice = calculateSubtotal(qty, price);
        const discountDecimal = Number(discount) / 100;

        return Math.round(originalPrice * (1 - discountDecimal)).toFixed(2);
    }

    function calculateTotalPrice(items) {
        const subtotals = items.map((item) => {
            if (item.discountPercentage > 0) {
                const originalPrice = (Math.round(
                    (Number(item.quantity) * Number(item.price)) * 100) / 100
                );
                const discountDecimal = Number(item.discountPercentage) / 100;

                return Math.round(originalPrice * (1 - discountDecimal));
            } else {
                return (Math.round(
                    (Number(item.quantity) * Number(item.price)) * 100) / 100
                );
            }
        });
        
        return subtotals.reduce((prev, current) => {
            return prev + current;
        }, 0).toFixed(2);
    }

    return { calculateSubtotal, calculateDiscountPrice, calculateTotalPrice };
})();

export default Price;