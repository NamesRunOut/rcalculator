function printAllKLengthRec(tab, set, prefix, n, k) {
    if (k === 0) {
        tab.push(prefix)
        return
    }
    for (let i = 0; i < n; i++) {
        let newPrefix
        newPrefix = prefix + set[i]
        printAllKLengthRec(tab, set, newPrefix, n, k - 1)
    }

}

function printAllKLength(set) {
    let tab = []
    printAllKLengthRec(tab, set, "", set.length, 2)
    return tab
}

export default printAllKLength