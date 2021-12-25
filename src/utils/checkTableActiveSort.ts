export const checkTableActiveSort = (sortMethod: string | undefined, selectedSort: string) => {
    if (sortMethod) return sortMethod.slice(1) === selectedSort
}