export default async function () {
   return Promise.all([
        fetch(
            new URL('../../assets/regular.woff', import.meta.url),
        ).then((res) => res.arrayBuffer()),
        fetch(
            new URL('../../assets/bold.woff', import.meta.url),
        ).then((res) => res.arrayBuffer())
    ]);
}
