const API = 'https://api.leveranceoxygen.com/seller';

async function httpLoginSeller (sellerCred) {
    const response = await fetch(`${API}/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sellerCred)
    })
    return await response.json()
}

async function httpGetCurrentSellerInfo () {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/sellerinfo`, {
        method: "get",
        headers: {
            "auth-token": `${authToken}`
        }
    })
    return await response.json()
}


async function httpGetProductCategories () {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/products`, {
        method: "get",
        headers: {
            "auth-token": `${authToken}`
        }
    })
    return await response.json()
}

async function httpGetAllSellerOrders () {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/orders`, {
        method: "get",
        headers: {
            "auth-token": `${authToken}`
        }
    })
    return await response.json()
}

async function httpGetAllSellerTransactions () {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/transactions`, {
        method: "get",
        headers: {
            "auth-token": `${authToken}`
        }
    })
    return await response.json()
}

async function httpGetSellerReturnOrders () {
    const authToken = localStorage.getItem("seller");
    const response = await fetch(`${API}/returnorders`, {
        method: "get",
        headers: {
            "auth-token": `${authToken}`
        }
    })
    return await response.json()
}

async function httpAddSellerBalance (transactionDetail) {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/addbalance`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${authToken}`
        },
        body: JSON.stringify(transactionDetail)
    })
    return await response.json()
}

async function httpDemandCylinders (cylinders) {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/demandcylinders`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${authToken}`
        },
        body: JSON.stringify(cylinders)
    })
    return await response.json()
}

async function httpCreateSellerReturnOrder () {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/createreturnorder`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${authToken}`
        },
        body: JSON.stringify({})
    })
    return await response.json()
}


async function httpCreateSellerOrder (orderDetails) {
    const authToken = localStorage.getItem("seller")
    const response = await fetch(`${API}/createsellerorder`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${authToken}`
        },
        body: JSON.stringify(orderDetails)
    })
    return await response.json()
}


export {
    httpLoginSeller,
    httpGetCurrentSellerInfo,
    httpGetProductCategories,
    httpGetAllSellerOrders,
    httpGetAllSellerTransactions,
    httpGetSellerReturnOrders,
    httpAddSellerBalance,
    httpDemandCylinders,
    httpCreateSellerReturnOrder,
    httpCreateSellerOrder,
}