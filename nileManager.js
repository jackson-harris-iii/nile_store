function viewProd(params) {
    console.log('nope')
}

function viewLow(params) {
    console.log('yep')
}

const manager = {
    viewProd: viewProd,
    viewLow: viewLow,
}

module.exports = { manager }