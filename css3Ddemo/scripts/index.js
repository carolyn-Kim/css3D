const box = document.getElementById('box');
const arrli = box.getElementsByTagName('li');
const audio = document.getElementById('audio');
/**
 * 计算半径，translatez的值
 * @param {图片宽度} length 
 * @param {图片切片数} total 
 */
let calculateRadius = (length, total) => Math.round(length / 2 / Math.tan(Math.PI / total)) - 3;

/**
 * 在li标签中加入图片，并且旋转
 */
for (let index = 0; index < arrli.length; index++) {
    arrli[index].style.background = 'url("./images/p' + (index + 1) + '.png")';
    arrli[index].style.WebkitTransform = 'rotateY(' + 360 / arrli.length * index + 'deg) translatez(' + calculateRadius(129, 20) + 'px)';
}

let startX = 0,
    x = 0,
    endX = 0,
    flag = true;
$('#box').on('touchstart', event => {
    event.preventDefault();
    const touch = event.targetTouches[0];
    startX = touch.pageX - x;
    // console.log(startX);
});

$('#box').on('touchmove', event => {
    if (flag) {
        event.preventDefault();

        const touch = event.targetTouches[0];
        endX = touch.pageX;
        x = endX - startX;
        box.style.WebkitTransform = 'rotateY(' + x + 'deg)';
        // console.log(x);
    }
    else {
        return false
    }
})

window.addEventListener('deviceorientation', event => {
    const gamma = event.gamma;
    if (Math.abs(gamma) > 1) {
        flag = false;
        box.style.WebkitTransform = 'rotateY(' + gamma * 3 + 'deg)';
    } else {
        flag = true;
    }
}, true);


//小喇叭
$('#horn').on('tap',event=>{
    if (audio.paused) {
        audio.play();
        $('#horn').text('🎺');
    }else{
        audio.pause();
        $('#horn').text('⏸');
    }
})

