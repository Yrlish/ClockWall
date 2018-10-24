$(function() {
    var clockMatrix = generateClockMatrix(); // 2D array, [row][column]

    requestAnimationFrame(tick);

    function tick() {
        var date = new Date();
        var hrs = date.getHours().pad(2);
        var min = date.getMinutes().pad(2);
        var sec = date.getSeconds().pad(2);

        animateDigit(0, parseInt(hrs[0]), 2);
        animateDigit(1, parseInt(hrs[1]), 2);
        animateDigit(2, parseInt(min[0]), 2);
        animateDigit(3, parseInt(min[1]), 2);
        animateDigit(4, parseInt(sec[0]), 2);
        animateDigit(5, parseInt(sec[1]), 5);

        requestAnimationFrame(tick)
    }

    function animateDigit(index, digit, step) {
        if (!(step >= 1)) {
            step = 1;
        }

        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 3; j++) {
                var col = index * 3 + j;
                var clock = clockMatrix[i][col];
                var clockP1 = clock.find(".pointer-1");
                var clockP2 = clock.find(".pointer-2");

                var prev1 = getRotationDegrees(clockP1);
                var prev2 = getRotationDegrees(clockP2);
                var next1 = prev1 + step;
                var next2 = prev2 + step;
                var dest1 = digits[digit][i][j][0];
                var dest2 = digits[digit][i][j][1];

                if ((dest1 - next1) < 0 && dest1 !== 0) {
                    next1 = prev1 + Math.abs(dest1 - next1);
                    if (next1 > prev1 + step) {
                        next1 = prev1 + step;
                    }
                }
                if ((dest2 - next2) < 0 && dest2 !== 0) {
                    next2 = prev2 + Math.abs(dest2 - next2);
                    if (next2 > prev2 + step) {
                        next2 = prev2 + step;
                    }
                }

                if (prev1 !== digits[digit][i][j][0]) {
                    clockP1.css("transform", "rotate(" + next1 + "deg)");
                }
                if (prev2 !== digits[digit][i][j][1]) {
                    clockP2.css("transform", "rotate(" + next2 + "deg)");
                }
            }
        }
    }

    function getRotationDegrees(obj) {
        var matrix = obj.css("transform");
        var angle = 0;
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
        return (angle < 0) ? angle + 360 : angle;
    }

    function generateClockMatrix() {
        var _rows = [];

        for (var i = 1; i <= 6; i++) {
            var _row = [];

            for (var j = 1; j <= 6 * 3; j++) {
                var clockName = "clock-" + i + "-" + j;
                var clockEl = $('<div id="' + clockName + '" class="clock"></div>');
                $("#clock-wrapper").append(clockEl);

                _row.push(clockEl);
            }

            _rows.push(_row);
        }

        $(".clock").append('<div class="pointer pointer-1"></div>');
        $(".clock").append('<div class="pointer pointer-2"></div>');

        return _rows
    }

    var digits = {
        0: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0, 180], [180, 180], [  0, 180] ],
            [ [  0, 180], [  0, 180], [  0, 180] ],
            [ [  0, 180], [  0, 180], [  0, 180] ],
            [ [  0, 180], [  0,   0], [  0, 180] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ],
        1: [
            [ [  0,   0], [ 90, 180], [180, 270] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0,  90], [  0, 270] ]
        ],
        2: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [ 90, 180], [  0, 270], [  0, 180] ],
            [ [  0, 180], [ 90, 180], [  0, 270] ],
            [ [  0, 180], [  0,  90], [180, 270] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ],
        3: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [ 90, 180], [  0, 270], [  0, 180] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [ 90, 180], [  0, 270], [  0, 180] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ],
        4: [
            [ [ 90, 180], [180, 180], [180, 270] ],
            [ [  0, 180], [  0, 180], [  0, 180] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0,  90], [  0, 270] ]
        ],
        5: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0, 180], [ 90, 180], [  0, 270] ],
            [ [  0, 180], [  0,  90], [180, 270] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [ 90, 180], [  0, 270], [  0, 180] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ],
        6: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0, 180], [ 90, 180], [  0, 270] ],
            [ [  0, 180], [  0,  90], [180, 270] ],
            [ [  0, 180], [180, 180], [  0, 180] ],
            [ [  0, 180], [  0,   0], [  0, 180] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ],
        7: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0, 180], [  0, 180] ],
            [ [  0,   0], [  0,  90], [  0, 270] ]
        ],
        8: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0, 180], [180, 180], [  0, 180] ],
            [ [  0, 135], [  0,   0], [  0, 225] ],
            [ [ 45, 180], [180, 180], [180, 315] ],
            [ [  0, 180], [  0,   0], [  0, 180] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ],
        9: [
            [ [ 90, 180], [ 90, 270], [180, 270] ],
            [ [  0, 180], [180, 180], [  0, 180] ],
            [ [  0, 180], [  0,   0], [  0, 180] ],
            [ [  0,  90], [180, 270], [  0, 180] ],
            [ [ 90, 180], [  0, 270], [  0, 180] ],
            [ [  0,  90], [ 90, 270], [  0, 270] ]
        ]
    }
});

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};
