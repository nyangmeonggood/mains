function wheelEvent(
  startNum,
  axis,
  speed,
  loop,
  afterFunc,
  wheel,
  pointer,
  touch
) {
  target = document.querySelector(".slideContainer");

  var i = startNum;

  var i, prevX, nextX, prevY, nextY;
  var isLock = false;

  var touchstartX,
    touchstartY,
    touchendX,
    touchendY,
    touchoffsetX,
    touchoffsetY;

  var $targetLength = target.children.length;

  if (!afterFunc) afterFunc = function () {};

  const setClass = (target) => {
    Object.values(target.children).map((item) => {
      item.classList.remove("active");
    });
    Object.values(target.children)[i].classList.add("active");
    isLock = true;

    setTimeout(() => (isLock = false), speed);
  };

  if (wheel) {
    window.addEventListener("wheel", function (event) {
      if (!isLock) {
        if (event.deltaY < 0) {
          i--;
        } else if (event.deltaY > 0) {
          i++;
        }
        if (i < 0) {
          loop ? (i = $targetLength - 1) : (i = 0);
        }
        if (i >= $targetLength) {
          loop ? (i = 0) : (i = $targetLength - 1);
        }
        setClass(target);

        afterFunc(i);
      }
    });
  }

  if (pointer) {
    target.addEventListener("pointerdown", function (event) {
      event.preventDefault();

      prevX = event.clientX;
      prevY = event.clientY;
    });
    target.addEventListener("pointermove", function (event) {
      event.preventDefault();

      nextX = event.clientX;
      nextY = event.clientY;
    });
    target.addEventListener("pointerup", function (event) {
      if (
        (axis === "y" && prevY - nextY < 100 && prevY - nextY > -100) ||
        (axis === "x" && prevX - nextX < 100 && prevX - nextX > -100)
      ) {
        return;
      }

      if (axis === "x") {
        if (prevX > nextX) {
          i++;
          if (i >= $targetLength) {
            loop ? (i = 0) : (i = $targetLength - 1);
          }
          setClass(target);
          afterFunc(i);
        }
        if (prevX < nextX) {
          i--;

          if (i < 0) {
            loop ? (i = $targetLength - 1) : (i = 0);
          }
          setClass(target);
          afterFunc(i);
        }
      } else if (axis === "y") {
        if (prevY > nextY) {
          i++;
          if (i >= $targetLength) {
            loop ? (i = 0) : (i = $targetLength - 1);
          }
          setClass(target);
          afterFunc(i);
        }
        if (prevY < nextY) {
          i--;

          if (i < 0) {
            loop ? (i = $targetLength - 1) : (i = 0);
          }
          setClass(target);
          afterFunc(i);
        }
      }

      prevX = nextX = prevY = nextY = 0;
    });
  }

  if (touch) {
    window.addEventListener(
      "touchstart",
      function (event) {
        var touch = event.touches[0];
        touchstartX = touch.clientX;
        touchstartY = touch.clientY;
      },
      false
    );
    window.addEventListener(
      "touchend",
      function (event) {
        if (event.touches.length == 0) {
          var touch = event.changedTouches[event.changedTouches.length - 1];
          touchendX = touch.clientX;
          touchendY = touch.clientY;

          touchoffsetX = touchendX - touchstartX;
          touchoffsetY = touchendY - touchstartY;

          if (axis === "x") {
            if (Math.abs(touchoffsetX) > 100) {
              if (touchoffsetX > 100) {
                i--;

                if (i < 0) {
                  loop ? (i = $targetLength - 1) : (i = 0);
                }
                setClass(target);
                afterFunc(i);
              }
              if (touchoffsetX < 100) {
                i++;
                if (i >= $targetLength) {
                  loop ? (i = 0) : (i = $targetLength - 1);
                }
                setClass(target);
                afterFunc(i);
              }
            }
          }

          if (axis === "y") {
            if (Math.abs(touchoffsetY) > 100) {
              if (touchoffsetY > 100) {
                i--;

                if (i < 0) {
                  loop ? (i = $targetLength - 1) : (i = 0);
                }
                setClass(target);
                afterFunc(i);
              }
              if (touchoffsetY < 100) {
                i++;
                if (i >= $targetLength) {
                  loop ? (i = 0) : (i = $targetLength - 1);
                }
                setClass(target);
                afterFunc(i);
              }
            }
          }
        }
      },
      false
    );
  }
}
