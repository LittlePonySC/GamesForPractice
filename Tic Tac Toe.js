jQuery(document).ready(function() {
    var mass = []; // массив всех занятых клеток
    var mass_x = []; // массив клеток с "x"
    var mass_o = []; // массив клеток с "0"

    jQuery(".cell").on("click", function() {
        var cell_text = jQuery(this).text();
        if (cell_text !== "") {
            alert("Клетка занята");
        } else {
            jQuery(this).text("x");
            var id_cell = parseInt(jQuery(this).attr('id'));
            mass.push(id_cell);
            mass_x.push(id_cell);

            if (victory(mass_x, "Игрок")) {
                return;
            }

            if (mass.length < 9) {
                computer();
            } else {
                noneVictory();
            }
        }
    });

    // Проверка на победу
    function victory(metka, user) {
        var winConditions = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // строки
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // столбцы
            [1, 5, 9], [3, 5, 7] // диагонали
        ];

        for (var condition of winConditions) {
            if (condition.every(num => metka.includes(num))) {
                jQuery(".victory").text("Победил " + user).css("display", "block");
                victoryBegin(user);
                return true;
            }
        }
        return false;
    }

    // действия в случае победы
    function victoryBegin(user) {
        setTimeout(function() {
            jQuery(".victory").css("display", "none");
            jQuery(".cell").text("");

            var raund = parseInt(jQuery(".statistics span").text()) + 1;
            jQuery(".statistics span").text(raund);

            if (user === "Компьютер") {
                var num = parseInt(jQuery(".num_c").text()) + 1;
                jQuery(".num_c").text(num);
            } else {
                var num = parseInt(jQuery(".num_u").text()) + 1;
                jQuery(".num_u").text(num);
            }

            mass.length = 0;
            mass_x.length = 0;
            mass_o.length = 0;
        }, 1000);
    }

    // Ход Компьютера
    function computer() {
        var number;

        while (true) {
            number = getRandomInRange(1, 9);
            if (!mass.includes(number)) {
                jQuery("#" + number).text("0");
                mass.push(number);
                mass_o.push(number);
                break;
            }
        }

        if (victory(mass_o, "Компьютер")) {
            return;
        }

        if (mass.length === 9) {
            noneVictory();
        }
    }

    function noneVictory() {
        alert("Ничья!");
        jQuery(".cell").text("");
        mass.length = 0;
        mass_x.length = 0;
        mass_o.length = 0;
    }

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});