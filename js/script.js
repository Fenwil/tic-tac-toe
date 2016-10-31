var board = ["", "", "", "", "", "", "", "", ""]
var choosed = ""
var filled = 1

function chooseContrary(xor) {
    if (xor === "X") {
        return "O"
    } else if (xor === "O") {
        return "X"
    }
}

function insertXOR(xor, pos) {
    board[pos] = xor
}

function setFirstXOR(xor) {
    $("td").eq(4).text(xor).css("cursor", "default").addClass("filled " + xor)
    insertXOR(xor, 4)
}

function emptyText() {
    $("td").empty()
}

function emptyFilledClass() {
    $("td").removeClass()
}

function emptyCellCursor() {
    $("td").css("cursor", "pointer")
}

function resetBoard() {
    for (var i = 0; i < board.length; i++) {
        board[i] = ""
    }
}

function resetClick() {
    $("td").css("pointer-events", "all")
}

function reset() {
    filled = 1
    resetBoard()
    emptyText()
    emptyFilledClass()
    emptyCellCursor()
    resetClick()
    setFirstXOR(chooseContrary(choosed))
}

function resetOnModalClose() {
    $(".winner,.loser,.tie").on($.modal.AFTER_CLOSE, function (event, modal) {
        reset()
    })
}

function fillCellUser(xor) {
    $("td").not(".filled").on("click", function () {
        $(this).text(xor).css("pointer-events", "none").addClass("filled " + xor);
        insertXOR(xor, $(this).data("index"));
        ++filled
        if (!checkWinOrLose(xor, ".winner")) {
            fillCellPC(chooseContrary(choosed))
        }
    })
}

function fillCellPC(xor) {
    setTimeout(function () {
        ++filled
        var arrayTD = $("td").not(".filled")
        var arrayRandom = []
        for (var i = 0; i < arrayTD.length; i++) {
            arrayRandom.push(i)
        }
        var randomNumber = arrayRandom[Math.floor(Math.random() * arrayRandom.length)]
        var $td = $("td").not(".filled").eq(randomNumber)
        var t = $td.data("index")
        $td.text(xor).addClass("filled " + xor).css("pointer-events", "none")
        insertXOR(xor, t)
        checkWinOrLose(xor, ".loser")
    }, 500);
}

function openModal(modalClass) {
    if (modalClass === ".winner" || modalClass === ".loser" || modalClass === ".tie") {
        $(modalClass).modal({
            showClose: false,
        })
    } else if (modalClass === ".pick") {
        $(modalClass).modal({
            showClose: false,
            closeExisting: false,
            escapeClose: false,
            clickClose: false,
        })
    }
}

function insertLine(initialPosition, rotateDegrees, width, marginTop, marginLeft) {
    $("td").eq(initialPosition).append('<img src="img/line.svg" alt="Line" class="line">')
    if (rotateDegrees === 135) {
        $(".line").css("transform-origin", "50% 50% 0")
    }
    $(".line").css("transform", "rotate(" + rotateDegrees + "deg)")
    $(".line").css("width", width + "%")
    $(".line").css("margin-top", marginTop + "%")
    $(".line").css("margin-left", marginLeft + "%")
}

function checkWinOrLose(xor, modalName) {
    if ([board[0], board[1], board[2]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(0, 0, 80, 16, 10)
        return true
    } else if ([board[3], board[4], board[5]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(3, 0, 80, 49.5, 10)
        return true
    } else if ([board[6], board[7], board[8]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(6, 0, 80, 82, 10)
        return true
    } else if ([board[0], board[3], board[6]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(0, 90, 90, 5, 17.8)
        return true
    } else if ([board[1], board[4], board[7]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(1, 90, 90, 5, 50.6)
        return true
    } else if ([board[2], board[5], board[8]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(2, 90, 90, 5, 83.6)
        return true
    } else if ([board[0], board[4], board[8]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(0, 45, 115, 9, 10.3)
        return true
    } else if ([board[2], board[4], board[6]].every(elem => elem === xor)) {
        openModal(modalName)
        insertLine(2, 135, 115, 49, -8)
        return true
    } else if (filled === 9) {
        openModal(".tie")
        return true
    }
}

function pickXOR() {
    openModal(".pick")
    $("button").click(function () {
        if ($(this).attr("id") === "choosed-x") {
            choosed = "X"
            $.modal.close()
        } else if ($(this).attr("id") === "choosed-o") {
            choosed = "O"
            $.modal.close()
        }
    })
}

function start() {
    $(".pick").on($.modal.CLOSE, function () {
        reset()
        fillCellUser(choosed)
        resetOnModalClose()
    })
}

$(function () {
    pickXOR()
    start()
})