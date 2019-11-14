var win_size_dom = document.querySelector('.window_size');

var win_size = {
    width: 0,
    height: 0
};

anime({
    targets: win_size,
    width: 400,
    height: 600,
    round: 1,
    easing: 'linear',
    update: function() {
        win_size_dom.innerHTML = win_size.width + ' * ' + win_size.height;
    }
});
function fullScreen() {
    document.getElementById('a').style.left = '0px';
    document.getElementById('a').style.top = '0px';
    document.getElementById('a').style.width = '1400px';
    document.getElementById('a').style.height = '700px';

    anime({
        targets: win_size,
        width: 1400,
        height: 700,
        round: 1,
        easing: 'linear',
        update: function() {
            win_size_dom.innerHTML = win_size.width + '*' + win_size.height;
        }
    });
}

function halfScreen() {
    document.getElementById('a').style.left = '0px';
    document.getElementById('a').style.top = '0px';
    document.getElementById('a').style.width = '700px';
    document.getElementById('a').style.height = '700px';

    anime({
        targets: win_size,
        width: 700,
        height: 700,
        round: 1,
        easing: 'linear',
        update: function() {
            win_size_dom.innerHTML = win_size.width + '*' + win_size.height;
        }
    });
}
function randomPosition1() {
    document.getElementById('a').style.left = '0px';
    document.getElementById('a').style.top = '0px';
    document.getElementById('a').style.width = '200px';
    document.getElementById('a').style.height = '200px';

    anime({
        targets: win_size,
        width: 200,
        height: 200,
        round: 1,
        easing: 'linear',
        update: function() {
            win_size_dom.innerHTML = win_size.width + '*' + win_size.height;
        }
    });
}

function randomPosition2() {
    document.getElementById('a').style.left = '90px';
    document.getElementById('a').style.top = '70px';
    document.getElementById('a').style.width = '200px';
    document.getElementById('a').style.height = '200px';

    anime({
        targets: win_size,
        width: 200,
        height: 200,
        round: 1,
        easing: 'linear',
        update: function() {
            win_size_dom.innerHTML = win_size.width + '*' + win_size.height;
        }
    });
}

document.getElementById('button1').onclick = fullScreen;
document.getElementById('button2').onclick = halfScreen;
document.getElementById('button3').onclick = randomPosition1;
document.getElementById('button4').onclick = randomPosition2;
// document.getElementById('button4').onclick = move4;
//
// document.getElementById('button5').onclick = large_Width;
// document.getElementById('button6').onclick = large_Height;
// document.getElementById('button7').onclick = diminish_Width;
// document.getElementById('button8').onclick = diminish_Height;