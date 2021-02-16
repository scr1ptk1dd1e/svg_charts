function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function Cursor() {
    this.pointEl = document.querySelector('.cursor-point');
    this.pointW = this.pointEl.offsetWidth;
    this.pointH = this.pointEl.offsetHeight;
    this.circleEl = document.querySelector('.cursor-circle');
    this.circleX = 0;
    this.circleY = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    this.updatePoint = function () {
        let x = this.mouseX - this.pointW / 2;
        let y = this.mouseY - this.pointH / 2;
        this.pointEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    this.updateCircle = function () {
        this.circleX = lerp(this.circleX, this.mouseX, 0.15);
        this.circleY = lerp(this.circleY, this.mouseY, 0.15);

        let x = this.circleX - this.circleEl.offsetWidth / 2;
        let y = this.circleY - this.circleEl.offsetHeight / 2;

        this.circleEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        requestAnimationFrame(this.updateCircle)
    }

    this.addEvents = function () {
        document.body.querySelectorAll('input').forEach(input => {
            input.addEventListener("mouseover", (e) => {
                this.circleEl.style.visibility = 'hidden';
                this.pointEl.style.backgroundColor = '#136edd'
                input.focus();
            })
            input.addEventListener("mouseout", (e) => {
                this.circleEl.style.visibility = 'visible';
                this.pointEl.style.backgroundColor = '#fff'
                input.blur();
            })
        });

        document.body.querySelectorAll('button').forEach(button => {
            button.addEventListener("mouseover", () => {
                this.circleEl.style.visibility = 'hidden';
            })

            button.addEventListener("mouseout", () => {
                this.circleEl.style.visibility = 'visible';
            })
        })
    }
}

let cursor = new Cursor();
cursor.updateCircle = cursor.updateCircle.bind(cursor);

document.body.addEventListener("mousemove", (e) => {
    cursor.mouseX = e.clientX;
    cursor.mouseY = e.clientY;

    cursor.updatePoint();
})

requestAnimationFrame(cursor.updateCircle)

setTimeout(() => {
    cursor.addEvents();
}, 100)
