let tab = []

function printAllKLengthRec(set, prefix, n, k) {
    if (k === 0) {
        tab.push(prefix)
        return
    }
    for (let i = 0; i < n; i++) {
        let newPrefix
        newPrefix = prefix + set[i]
        printAllKLengthRec(set, newPrefix, n, k - 1)
    }

}

function printAllKLength(set) {
    printAllKLengthRec(set, "", set.length, 2)
    return tab
}

export default printAllKLength