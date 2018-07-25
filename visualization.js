const onDomLoaded = () => {
    d3.csv('./h2020.csv', data => { console.log(data) });
//
//    const promise = fetch('./h2020.csv')
//          .then(response => response.text())
//          .then(console.log)
//          .catch(e => console.log)
}
document.addEventListener("DOMContentLoaded", onDomLoaded);
