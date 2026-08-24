const N_DECIMAL_POINT = 2;
const AVAILABLE_SIZES = ["Regular", "Upgraded", "Jumbo"];

function getMenuPrice(menu) {
    switch (menu) {
        case "Fried Rice":
        case "Hainanese Chicken Rice":
        case "Red BBQ Pork with Rice":
            return 50;
        case "Pad Thai":
            return 60;
        case "Tom Yum Kung":
            return 120;
        default:
            return 0;
    }
}

function getSizeMultiplier(size) {
    switch (size) {
        case "Regular": return 1;
        case "Upgraded": return 1.5;
        case "Jumbo":   return 2;
        default:        return 1;
    }
}

function isOrderValid(orders) {
    return (typeof orders === typeof []
        && orders.length !== 0
    );
}

function isIndividualOrderValid(order) {
    return (typeof order === typeof {}
        && order.hasOwnProperty("menu")
        && order.hasOwnProperty("size")
        && order.hasOwnProperty("qty")
        && getMenuPrice(order.menu) !== 0
        && order.qty > 0
        && Number.isFinite(order.qty)
        && !Number.isNaN(order.qty)
    );
}

function removeMalformedOrders(orders) {
    const validOrders = orders.filter(function(order) {
        return isIndividualOrderValid(order);
    });

    return validOrders;
}

function normaliseImproperSizes(improperSize) {
    let size = improperSize;
    if (!AVAILABLE_SIZES.includes(size)) {
        size = "Regular";
    }

    return size;
}

function calculateTotalOrder(orders) {
    if (!isOrderValid(orders)) {
        return undefined;
    }

    let validOrders = removeMalformedOrders(orders);
    let result = {
        grandTotalTHB: 0.0,
        orders: {}
    };

    validOrders.forEach(function(order) {
        if (!result.orders.hasOwnProperty(order.menu)) {
            result.orders[order.menu] = {
                totalTHB: 0.0,
                qty: 0,
                sizes: { Regular: 0, Upgraded: 0, Jumbo: 0 }
            }
        };

        let currentOrderPrice = Number((getMenuPrice(order.menu) * getSizeMultiplier(order.size) * order.qty).toFixed(N_DECIMAL_POINT));

        let size = normaliseImproperSizes(order.size);

        result.orders[order.menu].sizes[size] += order.qty;
        result.orders[order.menu].qty += order.qty;
        result.orders[order.menu].totalTHB += currentOrderPrice;
        result.grandTotalTHB += currentOrderPrice;
    });

    return result;
}

function formatReceipt(calculatedOrder) {
    let menuList = "";
    for (const [menu, details] of Object.entries(calculatedOrder.orders)) {
        menuList += `\n| # ${menu} *${details.qty}`;

        for (const [size, qty] of Object.entries(details.sizes)) {
            if (qty === 0) {
                continue;
            }

            const perServingPrice = getMenuPrice(menu) * getSizeMultiplier(size);
            menuList += `\n|       |- ${size} *${qty} ${perServingPrice}.-/Serving: ${perServingPrice * qty}.-`
        }
        menuList += `\n| > Menu Total: ${details.totalTHB}.-\n|`
    }

    return `\[ RECEIPT ] =>------------------------------------${menuList}`;
}

(function() {
    const orders = [
        {
            menu: "Pad Thai",
            size: "Upgraded",
            qty: 2
        },
        {
            menu: "Fried Rice",
            size: "Regular",
            qty: 1
        },
        {
            menu: "Tom Yum Kung",
            size: "Jumbo",
            qty: 3
        },
        {
            menu: "Deepfried Anutin",
            size: "I'm So Rich",
            qty: 1
        },
        {
            menu: "Tum Bak Hung",
            size: "Zaab Ely",
            qty: -1
        },
        {
            menu: "Pad Thai",
            size: "Regular",
            qty: 1
        }
    ];

    const orderResult = calculateTotalOrder(orders);
    const receipt = formatReceipt(orderResult);
    console.log(receipt);
})();