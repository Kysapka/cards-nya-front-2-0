export function createPages(
  pagesItem: Array<number>,
  pagesTotalCount: number,
  activPage: number,
): void {
  console.log(pagesTotalCount, activPage);
  if (pagesTotalCount > 10) {
    if (activPage > 5) {
      for (let i = activPage - 4; i <= activPage + 5; i++) {
        pagesItem.push(i);
        if (i === pagesTotalCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pagesItem.push(i);
        if (i === pagesTotalCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesTotalCount; i++) {
      pagesItem.push(i);
    }
  }
}
