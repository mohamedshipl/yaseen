const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('ar-sa',{
        style : "currency",
        currency : 'sar',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayINRCurrency