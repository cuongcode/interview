export const sortAsc = (arr:any) => {
    return [...arr].sort((a,b) => {
        return a.price-b.price
    })
}

export const sortDes = (arr:any) => {
    return [...arr].sort((a,b) => {
        return b.price-a.price
    })
}