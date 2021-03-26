function convert(angka) {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) {
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    }
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',00';
}

console.log(convert(14567534267));

module.exports = convert;