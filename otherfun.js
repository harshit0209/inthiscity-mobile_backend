console.log("testjs started");
module.exports = {
    getRanKey: function() {
        for (var j = 0; j < 10; j++) {
            var v = '';
            var d = new Date();
            var n = (d.getTime()).toString();
            for (var i = 0; i < 10; i++)
                v += String.fromCharCode(65 + parseInt(n.charAt(i)));
            console.log("Randome Key Genrated is : " + v);
            return v;
        }

    }

};