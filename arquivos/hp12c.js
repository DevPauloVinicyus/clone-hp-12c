var PLATINUM = 0;
if (window.is_platinum) {
    PLATINUM = 1;
}

function badnumber(A) {
    return (isNaN(A) || !isFinite(A));
}

function binary_sgn(A) {
    return (A >= 0 ? 1 : -1);
}

function cl5_round(C, A) {
    if (A > 11) {
        return C;
    }
    var B = Math.pow(10, A);
    return Math.round(Math.abs(C) * B) / B * binary_sgn(C);
}

function trim(A) {
    return A.replace(/^\s+|\s+$/g, "");
}
var x = 0;
var y = 0;
var z = 0;
var w = 0;
var last_x = 0;
var alg_op = 0;
var decimals = 2;
var decimal_point_is_comma = 0;
var stomemory = [];
var ram = [];
var begin = 0;
var dmy = 0;
var compoundf = 0;
var finmemory = [];
var njmemory = [];
var algmode = 0;
var program_mode = 0;
var instruction_pointer = 0;
var pushed = 0;
var gtoxx = "";
var modifier = 0;
var do_fincalc = 0;
var xmode = -1;
var error_in_display = 0;
var ALG_PLUS = 1;
var ALG_MINUS = 2;
var ALG_MULTIPLY = 3;
var ALG_DIVIDE = 4;
var ALG_POWER = 5;
var FIN_N = 0;
var FIN_I = 1;
var FIN_PV = 2;
var FIN_PMT = 3;
var FIN_FV = 4;
var INTERPOLATION = 50;
var FF = 1;
var GG = 2;
var STO = 4;
var RCL = 8;
var STO2 = 16;
var RCL2 = 32;
var RCL_GG = 64;
var STO_PLUS = 128;
var STO_MINUS = 256;
var STO_TIMES = 512;
var STO_DIVIDE = 1024;
var GTO = 2048;
var GTO_MOVE = 4096;
var STAT_N = 1;
var STAT_X = 2;
var STAT_X2 = 3;
var STAT_Y = 4;
var STAT_Y2 = 5;
var STAT_XY = 6;
var INTERACTIVE = 0;
var PROGRAMMING = 1;
var RUNNING = 2;
var RUNNING_STEP = 3;

function clear_fin() {
    for (var A = 0; A < 5; ++A) {
        finmemory[A] = 0;
    }
}

function clear_statistics() {
    for (var A = 1; A <= 6; ++A) {
        stomemory[A] = 0;
    }
}
var ram_MAX = 100;
var ram_ADDR_SIZE = 2;
var GTO00 = "43.33.00";
var INSTRUCTION_SIZE = 2;
if (PLATINUM) {
    ram_MAX = 400;
    ram_ADDR_SIZE = 3;
    GTO00 = "43.33.000";
}

function clear_prog() {
    ram[0] = "";
    for (var A = 1; A < ram_MAX; ++A) {
        ram[A] = GTO00;
    }
    instruction_pointer = 0;
}
var MEM_MAX = 20;
if (PLATINUM) {
    MEM_MAX = 30;
}

function clear_sto() {
    for (var A = 0; A < MEM_MAX; ++A) {
        stomemory[A] = 0;
        njmemory[A] = 1;
    }
}
var display;
var pointer_div;
var dbegin;
var ddmyc;
var dmodifier;
var pgrm;
var lcd = [];
var has_lcd = 0;
var LCD_A = 1;
var LCD_B = 2;
var LCD_C = 4;
var LCD_D = 8;
var LCD_E = 16;
var LCD_F = 32;
var LCD_G = 64;
var LCD_P = 128;
var LCD_T = 256;

function zeropad(A, B) {
    A = "" + A;
    while (A.length < B) {
        A = "0" + A;
    }
    return A;
}

function init_lcd() {
    if (window.lcd_broken) {
        return;
    }
    if (!document.getElementById("lcd0a")) {
        return;
    }
    has_lcd = 1;
    for (var A = 0; A <= 10; ++A) {
        lcd[A] = [];
        lcd[A][0] = 0;
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "a");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "b");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "c");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "d");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "e");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "f");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "g");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "p");
        lcd[A][lcd[A].length] = document.getElementById("lcd" + A + "t");
    }
}
var lcdmap = [];
lcdmap["0"] = LCD_A | LCD_B | LCD_C | LCD_E | LCD_F | LCD_G;
lcdmap["1"] = LCD_C | LCD_F;
lcdmap["2"] = LCD_A | LCD_C | LCD_D | LCD_E | LCD_G;
lcdmap["3"] = LCD_A | LCD_C | LCD_D | LCD_F | LCD_G;
lcdmap["4"] = LCD_B | LCD_C | LCD_D | LCD_F;
lcdmap["5"] = LCD_A | LCD_B | LCD_D | LCD_F | LCD_G;
lcdmap["6"] = LCD_A | LCD_B | LCD_D | LCD_E | LCD_F | LCD_G;
lcdmap["7"] = LCD_A | LCD_C | LCD_F;
lcdmap["8"] = LCD_A | LCD_B | LCD_C | LCD_D | LCD_E | LCD_F | LCD_G;
lcdmap["9"] = LCD_A | LCD_B | LCD_C | LCD_D | LCD_F | LCD_G;
lcdmap[" "] = 0;
lcdmap["."] = LCD_P;
lcdmap[","] = LCD_P | LCD_T;
lcdmap.r = LCD_A | LCD_B;
lcdmap.u = LCD_B | LCD_C | LCD_D;
lcdmap.n = LCD_B | LCD_C | LCD_A;
lcdmap.i = LCD_B;
lcdmap.g = LCD_A | LCD_B | LCD_C | LCD_D | LCD_F | LCD_G;
lcdmap["-"] = LCD_D;
lcdmap.E = LCD_A | LCD_B | LCD_D | LCD_E | LCD_G;
lcdmap.e = LCD_A | LCD_B | LCD_D | LCD_E | LCD_G;
lcdmap.O = LCD_D | LCD_E | LCD_F | LCD_G;
lcdmap.R = LCD_D | LCD_E;

function lcd_display_digit(E, G, F) {
    if (!lcdmap[E]) {
        E = " ";
    }
    var D = lcdmap[E];
    var A = lcd[G];
    var C;
    var B = 1;
    for (C = 1; C < A.length; ++C) {
        A[C].style.visibility = (D & B) ? "visible" : ((F && A[C].style.visibility == "visible") ? "visible" : "hidden");
        B <<= 1;
    }
}

function lcd_display(A) {
    var B = -1;
    for (var D = 0; D < A.length && B < lcd.length; ++D) {
        var C = A.charAt(D);
        ++B;
        if (C == "." || C == ",") {
            --B;
            lcd_display_digit(C, B, 1);
        } else {
            lcd_display_digit(C, B, 0);
        }
    }
    for (++B; B < lcd.length; ++B) {
        lcd_display_digit(" ", B, 0);
    }
}

function lcd_clear() {
    for (var B = 0; B < lcd.length; ++B) {
        for (var A = 1; A < lcd[B].length; ++A) {
            lcd[B][A].style.visibility = "hidden";
        }
    }
}
instruction_table = "0123456789_-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
addr_prefix = "$";

function compress_opcode(E) {
    var C = "";
    var A = E.split(".");
    var B;
    for (var D = 0; D < A.length; ++D) {
        B = A[D];
        nkey = parseInt(B, 10);
        if (B.length == INSTRUCTION_SIZE && nkey >= 0 && nkey <= 49) {
            C += instruction_table[nkey];
        } else {
            if (B.length == ram_ADDR_SIZE) {
                C += addr_prefix;
                if (nkey < 64) {
                    C += instruction_table[nkey];
                } else {
                    C += instruction_table[Math.floor(nkey / 64)];
                    C += instruction_table[nkey % 64];
                }
            } else {
                return compress_opcode(GTO00);
            }
        }
    }
    return C;
}

function decompress_opcode(B) {
    var H = "";
    var D = [];
    var G;
    var C = 0;
    var F = 0;
    var A = 0;
    for (var E = 0; E < B.length; ++E) {
        G = B.charAt(E);
        if (G == addr_prefix) {
            if ((D.length < 1) || (F > 0)) {
                C = 1;
                break;
            }
            F = 1;
            continue;
        }
        ncc = instruction_table.indexOf(G);
        if (ncc < 0) {
            C = 1;
            break;
        }
        if (F) {
            A = (A * 64) + ncc;
            if (A > (Math.pow(10, ram_ADDR_SIZE) - 1)) {
                C = 1;
                break;
            }
            if (F == 1) {
                D.push(zeropad(A, ram_ADDR_SIZE));
            } else {
                D[D.length - 1] = zeropad(A, ram_ADDR_SIZE);
            }
            F += 1;
        } else {
            if (ncc > 49) {
                C = 1;
                break;
            }
            D.push(zeropad(ncc, INSTRUCTION_SIZE));
        }
    }
    if (C) {
        H = GTO00;
    } else {
        if (D.length > 3 || D.length < 1) {
            H = GTO00;
        } else {
            H = D.join(".");
        }
    }
    return H;
}

function assert_compression() {
    if (PLATINUM) {
        if (compress_opcode("43.33.000") != "Fv$0") {
            alert("Opcode 43.33.000 compression error: returning " + compress_opcode("43.33.000"));
        }
        if (compress_opcode("43.33.099") != "Fv$1x") {
            alert("Opcode 43.33.099 compression error: returning " + compress_opcode("43.33.099"));
        }
        if (decompress_opcode(compress_opcode("43.33.000")) != "43.33.000") {
            alert("Opcode 43.33.000 decompression error: returning " + decompress_opcode(compress_opcode("43.33.000")));
        }
        if (decompress_opcode(compress_opcode("43.33.099")) != "43.33.099") {
            alert("Opcode 43.33.099 decompression error: returning " + decompress_opcode(compress_opcode("43.33.099")));
        }
    } else {
        if (compress_opcode("43.33.00") != "Fv0") {
            alert("Opcode compression error: returning '" + compress_opcode("43.33.00") + "'");
        }
        if (compress_opcode("43.33.99") != "Fv$1x") {
            alert("Opcode 43.33.99 compression error: returning " + compress_opcode("43.33.99"));
        }
        if (decompress_opcode(compress_opcode("43.33.00")) != "43.33.00") {
            alert("Opcode 43.33.00 decompression error: returning " + decompress_opcode(compress_opcode("43.33.00")));
        }
        if (decompress_opcode(compress_opcode("43.33.99")) != "43.33.99") {
            alert("Opcode 43.33.99 decompression error: returning " + decompress_opcode(compress_opcode("43.33.99")));
        }
    }
}

function marshal_array(A, D) {
    var B = "A" + D;
    for (var C = 0; C < A.length; ++C) {
        data = A[C];
        if (D == "X") {
            data = compress_opcode(data);
        }
        B += "!" + data;
    }
    return B;
}

function unmarshal_array(F, B) {
    if (B.length < 2) {
        return;
    }
    var E = window[F];
    var D = B.charAt(1);
    B = B.slice(3);
    var A = B.split("!");
    for (var C = 0; C < A.length && C < E.length; ++C) {
        if (D == "N") {
            E[C] = parseFloat(A[C]);
            if (badnumber(E[C])) {
                E[C] = 0;
            }
        } else {
            if (C > 0) {
                E[C] = decompress_opcode(A[C]);
            }
        }
    }
    return;
}

function save_memory2() {
    var A = new Date();
    A.setTime(A.getTime() + 7 * 24 * 60 * 60 * 1000);
    var B = "hp12c" + (PLATINUM ? "pl" : "") + "=x:" + x + " y:" + y + " z:" + z + " w:" + w + " last_x:" + last_x + " alg_op:" + alg_op + " algmode:" + algmode + " decimals:" + decimals + " decimal_point_is_comma:" + decimal_point_is_comma + " begin:" + begin + " dmy:" + dmy + " compoundf:" + compoundf + " stomemory:" + marshal_array(stomemory, "N") + " finmemory:" + marshal_array(finmemory, "N") + " njmemory:" + marshal_array(njmemory, "N") + " ram:" + marshal_array(ram, "X") + " ; expires=" + A.toGMTString() + "; path=/";
    return B;
}

function save_memory() {
    document.cookie = save_memory2();
}

function recover_memory2(G) {
    var C = G.split(";");
    for (var D = 0; D < C.length; ++D) {
        var B = C[D].split("=");
        if (B.length != 2) {
            continue;
        }
        B[0] = trim(B[0]);
        B[1] = trim(B[1]);
        if (B[0] != ("hp12c" + (PLATINUM ? "pl" : ""))) {
            continue;
        }
        var F = B[1].split(" ");
        for (var E = 0; E < F.length; ++E) {
            var A = F[E].split(":");
            if (A.length == 2 && window[A[0]] !== undefined) {
                if (A[1].length >= 2 && A[1].charAt(0) == "A") {
                    unmarshal_array(A[0], A[1]);
                } else {
                    window[A[0]] = parseFloat(A[1]);
                    if (badnumber(window[A[0]])) {
                        window[A[0]] = 0;
                    }
                }
            }
        }
    }
}

function recover_memory() {
    recover_memory2(document.cookie);
}

function close_hp12c() {
    if (!close_hp12c.done) {
        save_memory();
        close_hp12c.done = 1;
    }
}
close_hp12c.done = 0;

function show(A) {
    if (has_lcd) {
        lcd_display(A);
    } else {
        display.innerHTML = A;
    }
}
var keyboard = 0;

function cli() {
    keyboard = 0;
}

function sti() {
    keyboard = 1;
}
var display_max = 9999999999;
var display_min = 1e-10;
var value_max = 9.9999999 * Math.pow(10, 99);
var value_min = Math.pow(10, -99);
var display_digits = 11;

function i18n(A) {
    var C = A.indexOf(".");
    if (C == -1) {
        A += ".";
        C = A.length - 1;
    }
    if (decimal_point_is_comma) {
        A = A.slice(0, C) + "," + A.slice(C + 1);
    }
    var B = decimal_point_is_comma ? "." : ",";
    for (var D = C - 3; D > 0 + (A.charAt(0) == "-" ? 1 : 0); D -= 3) {
        A = A.slice(0, D) + B + A.slice(D);
    }
    return A;
}

function format_result(B) {
    var C = "";
    var E = Math.abs(B);
    var G = decimals;
    var D = E >= value_min ? Math.floor(Math.log(E) / Math.log(10)) : -9999;
    if (E > display_max) {
        G = 100;
    } else {
        if (E >= value_min && D < -9) {
            G = 100;
        } else {
            if (E >= value_min && G < (-D)) {
                G = -D;
            }
        }
    }
    if (G == 100) {
        if (E < value_min) {
            C = i18n("0");
        } else {
            var A = B / Math.pow(10, D);
            if (D < 0) {
                C = i18n(A.toFixed(6)) + "-" + zeropad((-D).toFixed(0), 2);
            } else {
                C = i18n(A.toFixed(6)) + " " + zeropad(D.toFixed(0), 2);
            }
        }
    } else {
        var H = Math.max(0, G);
        var F = B.toFixed(H).length - (H > 0 ? 1 : 0);
        if (F > display_digits) {
            H -= (F - display_digits);
            H = Math.max(0, H);
        }
        C = i18n(B.toFixed(H));
    }
    return C;
}

function displayX3() {
    if (isNaN(x)) {
        x = 0;
    } else {
        if (x > value_max) {
            x = value_max;
        } else {
            if (x < -value_max) {
                x = -value_max;
            } else {
                if (Math.abs(x) < value_min) {
                    x = 0;
                }
            }
        }
    }
    if (xmode < 0) {
        var A = format_result(x);
        show(A);
    } else {
        if (xmode < 100) {
            var F = Math.max(0, xmode - 1);
            var D = x.toFixed(F).length - (F > 0 ? 1 : 0);
            if (D > display_digits) {
                F -= (D - display_digits);
                F = Math.max(0, F);
            }
            show(i18n(x.toFixed(F)));
        } else {
            if (x === 0) {
                show(i18n("0"));
            } else {
                var E = Math.abs(x);
                var C = Math.floor(Math.log(E) / Math.log(10));
                var B = x / Math.pow(10, C);
                if (C < 0) {
                    show(i18n(B.toFixed(6)) + "-" + zeropad((-C).toFixed(0), 2));
                } else {
                    show(i18n(B.toFixed(6)) + " " + zeropad(C.toFixed(0), 2));
                }
            }
        }
    }
}

function displayX2() {
    sti();
    displayX3();
}

function displayX() {
    cli();
    show("");
    window.setTimeout(displayX2, 25);
}

function display_result() {
    xmode = -1;
    pushed = 0;
    displayX();
}

function prog_pse2() {
    sti();
    display_result();
}

function prog_pse() {
    cli();
    window.setTimeout(prog_pse2, 1000);
}

function toogle_decimal_character() {
    decimal_point_is_comma = decimal_point_is_comma ? 0 : 1;
    display_result();
}

function date_gen(A) {
    if (dmy) {
        return A.getDate() + (A.getMonth() + 1) / 100 + A.getFullYear() / 1000000;
    } else {
        return (A.getMonth() + 1) + A.getDate() / 100 + A.getFullYear() / 1000000;
    }
}

function date_show(A) {
    var B = A.getDay();
    if (B === 0) {
        B = 7;
    }
    return date_gen(A).toFixed(6) + "  " + B;
}

function display_result_date(A) {
    xmode = -1;
    pushed = 0;
    show(date_show(A));
}

function clear_reg() {
    alg_op = last_x = x = y = z = w = 0;
    clear_fin();
    clear_sto();
}

function display_pgrm() {
    var A = "";
    if (program_mode == PROGRAMMING) {
        A = "PGRM";
    } else {
        if (program_mode >= RUNNING) {
            A = "RUN " + zeropad(instruction_pointer.toFixed(0), 2);
        }
    }
    pgrm.innerHTML = A;
}

function display_algmode() {
    if (PLATINUM) {
        var A = (algmode ? "ALG" : "RPN");
        rpnalg.innerHTML = A;
    }
}

function display_error(A) {
    show("ERROR " + A);
    xmode = -1;
    if (program_mode >= RUNNING) {
        program_mode = INTERACTIVE;
        instruction_pointer = 0;
        display_pgrm();
    }
    error_in_display = 1;
}

function display_modifier2(B) {
    var A = "";
    if (B == FF) {
        A = "f";
    } else {
        if (B == GG) {
            A = "g";
        } else {
            if (B == STO) {
                A = "STO";
            } else {
                if (B == STO2) {
                    A = "STO★";
                } else {
                    if (B == RCL) {
                        A = "RCL";
                    } else {
                        if (B == RCL2) {
                            A = "RCL★";
                        } else {
                            if (B == RCL_GG) {
                                A = "RCL g";
                            } else {
                                if (B == STO_PLUS) {
                                    A = "STO+";
                                } else {
                                    if (B == STO_MINUS) {
                                        A = "STO-";
                                    } else {
                                        if (B == STO_TIMES) {
                                            A = "STO×";
                                        } else {
                                            if (B == STO_DIVIDE) {
                                                A = "STO÷";
                                            } else {
                                                if (B == GTO) {
                                                    A = "GTO";
                                                } else {
                                                    if (B == GTO_MOVE) {
                                                        A = "GTO★";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    dmodifier.innerHTML = A;
}

function display_modifier() {
    display_modifier2(modifier);
}

function display_begin() {
    var A = "";
    if (begin) {
        A = "BEGIN";
    }
    dbegin.innerHTML = A;
}

function display_dmyc() {
    var A = "";
    if (dmy) {
        A += "D.MY";
    }
    if (compoundf) {
        A += "&nbsp;&nbsp;C";
    }
    ddmyc.innerHTML = A;
}

function set_dmy(A) {
    dmy = A;
    display_dmyc();
    display_result();
}

function rpn_mode() {
    algmode = 0;
    alg_op = 0;
    display_algmode();
    display_result();
}

function algebraic_mode() {
    algmode = 1;
    alg_op = 0;
    display_algmode();
    display_result();
}

function toogle_compoundf() {
    compoundf = compoundf ? 0 : 1;
    display_dmyc();
    display_result();
}

function set_begin(A) {
    begin = A;
    display_begin();
    display_result();
}

function set_modifier(A, B) {
    modifier = A;
    display_modifier();
}

function set_decimals(A) {
    decimals = A;
    display_result();
}

function set_decimals_exponential() {
    decimals = 100;
    display_result();
}

function rst_modifier(A) {
    if (A) {
        do_fincalc = 0;
    }
    set_modifier(0, A);
}

function push() {
    w = z;
    z = y;
    y = x;
    pushed = 1;
}

function digit_add(D) {
    var B;
    if (xmode == -1) {
        if (!pushed) {
            push();
        }
        xmode = 0;
        x = D;
    } else {
        if (xmode === 0) {
            B = binary_sgn(x);
            x = Math.abs(x);
            if (x < display_max) {
                x = Math.floor(x) * 10 + D;
            }
            x = B * x;
        } else {
            if (xmode <= 15) {
                B = binary_sgn(x);
                x = Math.abs(x);
                x += D / Math.pow(10, xmode);
                x = B * x;
                ++xmode;
            } else {
                if (xmode == 100) {
                    var C = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
                    var A = x / Math.pow(10, C);
                    C = (C * 10 + D) % 100;
                    x = A * Math.pow(10, C);
                }
            }
        }
    }
    displayX();
}

function digit_delete() {
    var B;
    if (xmode == -1) {
        return;
    }
    if (xmode === 0) {
        B = binary_sgn(x);
        x = Math.abs(x);
        x = Math.floor(x / 10);
        x = B * x;
    } else {
        if (xmode == 1) {
            xmode = 0;
            B = binary_sgn(x);
            x = B * Math.floor(Math.abs(x));
        } else {
            if (xmode <= 15) {
                B = binary_sgn(x);
                x = Math.abs(x);
                x = Math.floor(x * Math.pow(10, xmode - 2));
                x = x / Math.pow(10, xmode - 2);
                x = B * x;
                --xmode;
            } else {
                if (xmode == 100) {
                    var C = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
                    var A = x / Math.pow(10, C);
                    x = A;
                    xmode = 6;
                    var D = x.toFixed(xmode);
                    x = parseFloat(D);
                }
            }
        }
    }
    displayX();
}

function input_exponential() {
    if (xmode == -1) {
        if (!pushed) {
            push();
        }
        x = 1;
    } else {
        if (xmode != 100) {
            if (Math.abs(x) < value_min) {
                x = 1;
            }
        }
    }
    xmode = 100;
    displayX();
}

function decimal_point_mode() {
    if (xmode == -1) {
        if (!pushed) {
            push();
        }
        xmode = 1;
        x = 0;
    } else {
        if (xmode <= 0) {
            xmode = 1;
        }
    }
    displayX();
}

function chs() {
    if (xmode == -1) {
        x = -x;
        display_result();
    } else {
        if (xmode == 100) {
            var B = Math.floor(Math.log(Math.abs(x)) / Math.log(10));
            var A = x / Math.pow(10, B);
            x = A * Math.pow(10, -B);
            displayX();
        } else {
            x = -x;
            displayX();
        }
    }
}

function pop() {
    x = y;
    y = z;
    z = w;
}

function save_lastx() {
    if (!algmode) {
        last_x = x;
    }
}

function lstx() {
    push();
    x = last_x;
    display_result();
}

function clear_prefix2() {
    sti();
    display_result();
}

function clear_prefix() {
    cli();
    var A = decimals;
    decimals = display_digits + 1;
    displayX3();
    decimals = A;
    setTimeout(clear_prefix2, 1000);
}

function x_exchange_y() {
    var A = x;
    x = y;
    y = A;
    display_result();
}

function r_down() {
    var A = x;
    x = y;
    y = z;
    z = w;
    w = A;
    display_result();
}

function clx() {
    x = 0;
    display_result();
    pushed = 1;
}

function arithmetic(A) {
    save_lastx();
    pop();
    x = A;
    display_result();
}

function alg_resolve() {
    var B;
    var A = 1;
    if ((!algmode) || (alg_op <= 0)) {
        return A;
    }
    rst_modifier(1);
    if (alg_op == ALG_PLUS) {
        arithmetic(y + x);
    } else {
        if (alg_op == ALG_MINUS) {
            arithmetic(y - x);
        } else {
            if (alg_op == ALG_MULTIPLY) {
                arithmetic(y * x);
            } else {
                if (alg_op == ALG_DIVIDE) {
                    B = y / x;
                    if (badnumber(B)) {
                        display_error(0);
                        A = 0;
                    } else {
                        arithmetic(B);
                    }
                } else {
                    if (alg_op == ALG_POWER) {
                        B = Math.pow(y, x);
                        if (badnumber(B)) {
                            display_error(0);
                            A = 0;
                        } else {
                            arithmetic(B);
                        }
                    }
                }
            }
        }
    }
    alg_op = 0;
    return A;
}

function enter(A) {
    if (algmode && alg_op) {
        alg_resolve();
    } else {
        if (!algmode || !A) {
            push();
            display_result();
            pushed = 1;
        } else {
            display_result();
        }
    }
}

function plus() {
    if (algmode) {
        if (!alg_resolve()) {
            return;
        }
        alg_op = ALG_PLUS;
        push();
        display_result();
    } else {
        arithmetic(y + x);
    }
}

function minus() {
    if (algmode) {
        if (!alg_resolve()) {
            return;
        }
        alg_op = ALG_MINUS;
        push();
        display_result();
    } else {
        arithmetic(y - x);
    }
}

function multiply() {
    if (algmode) {
        if (!alg_resolve()) {
            return;
        }
        alg_op = ALG_MULTIPLY;
        push();
        display_result();
    } else {
        arithmetic(y * x);
    }
}

function divide() {
    if (algmode) {
        if (!alg_resolve()) {
            return;
        }
        alg_op = ALG_DIVIDE;
        push();
        display_result();
    } else {
        var A = y / x;
        if (badnumber(A)) {
            display_error(0);
        } else {
            arithmetic(A);
        }
    }
}

function poweryx() {
    if (algmode) {
        if (!alg_resolve()) {
            return;
        }
        alg_op = ALG_POWER;
        push();
        display_result();
    } else {
        var A = Math.pow(y, x);
        if (badnumber(A)) {
            display_error(0);
        } else {
            arithmetic(A);
        }
    }
}

function inverse() {
    var A = 1 / x;
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function square() {
    var A = Math.pow(x, 2);
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function sqroot() {
    var A = Math.pow(x, 0.5);
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function exp() {
    var A = Math.exp(x);
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function ln() {
    var A = Math.log(x);
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function intg() {
    save_lastx();
    x = Math.floor(Math.abs(x)) * binary_sgn(x);
    display_result();
}

function rnd() {
    save_lastx();
    x = cl5_round(x, decimals);
    display_result();
}

function fatorial() {
    if (x < 0 || x != Math.floor(x) || x > 80) {
        display_error(0);
    } else {
        save_lastx();
        var A = 1;
        for (var B = 2; B <= x; ++B) {
            A *= B;
        }
        x = A;
        display_result();
    }
}

function frac() {
    save_lastx();
    x = (Math.abs(x) - Math.floor(Math.abs(x))) * binary_sgn(x);
    display_result();
}

function percent() {
    var A = y * x / 100;
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function percentT() {
    if (!alg_resolve()) {
        return;
    }
    var A = 100 * x / y;
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function deltapercent() {
    if (!alg_resolve()) {
        return;
    }
    var A = 100 * (x / y) - 100;
    if (badnumber(A)) {
        display_error(0);
    } else {
        save_lastx();
        x = A;
        display_result();
    }
}

function sto(A) {
    stomemory[A] = x;
    display_result();
}

function stoinfix(C, B) {
    var A = stomemory[C];
    if (B == STO_PLUS) {
        A += x;
    } else {
        if (B == STO_MINUS) {
            A -= x;
        } else {
            if (B == STO_TIMES) {
                A *= x;
            } else {
                if (B == STO_DIVIDE) {
                    A /= x;
                    if (badnumber(A)) {
                        display_error(0);
                        return;
                    }
                }
            }
        }
    }
    if (Math.abs(A) > value_max) {
        display_error(1);
        return;
    }
    stomemory[C] = A;
    display_result();
}

function stoCF0() {
    stomemory[0] = x;
    finmemory[FIN_N] = 0;
    display_result();
}

function stoCFj() {
    if (finmemory[FIN_N] != Math.floor(finmemory[FIN_N]) || finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX) {
        display_error(6);
    } else {
        finmemory[FIN_N]++;
        stomemory[finmemory[FIN_N]] = x;
        njmemory[finmemory[FIN_N]] = 1;
        display_result();
    }
}

function rclCFj() {
    if (finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX || Math.floor(finmemory[FIN_N]) != finmemory[FIN_N]) {
        display_error(6);
    } else {
        push();
        x = stomemory[finmemory[FIN_N]];
        --finmemory[FIN_N];
        display_result();
    }
}

function rclNj() {
    if (finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX || Math.floor(finmemory[FIN_N]) != finmemory[FIN_N]) {
        display_error(6);
    } else {
        push();
        x = njmemory[finmemory[FIN_N]];
        display_result();
    }
}

function stoNj() {
    if (finmemory[FIN_N] != Math.floor(finmemory[FIN_N]) || finmemory[FIN_N] < 0 || finmemory[FIN_N] >= MEM_MAX || x != Math.floor(x) || x <= 0) {
        display_error(6);
    } else {
        njmemory[finmemory[FIN_N]] = x;
        display_result();
    }
}

function stofin(A) {
    finmemory[A] = x;
    display_result();
    pushed = 1;
}

function ston_12x() {
    var A = x * 12;
    if (Math.abs(A) > value_max) {
        display_error(1);
        return;
    }
    x = A;
    stofin(0);
}

function stoi_12div() {
    x /= 12;
    stofin(1);
}

function rcl(A) {
    push();
    x = stomemory[A];
    display_result();
}

function rclfin(A) {
    push();
    x = finmemory[A];
    display_result();
}

function stat_sigma_plus() {
    if (!alg_resolve()) {
        return;
    } ++stomemory[STAT_N];
    stomemory[STAT_X] += x;
    stomemory[STAT_X2] += x * x;
    stomemory[STAT_Y] += y;
    stomemory[STAT_Y2] += y * y;
    stomemory[STAT_XY] += x * y;
    save_lastx();
    x = stomemory[STAT_N];
    display_result();
    pushed = 1;
}

function stat_sigma_minus() {
    if (!alg_resolve()) {
        return;
    } --stomemory[STAT_N];
    stomemory[STAT_X] -= x;
    stomemory[STAT_X2] -= x * x;
    stomemory[STAT_Y] -= y;
    stomemory[STAT_Y2] -= y * y;
    stomemory[STAT_XY] -= x * y;
    save_lastx();
    x = stomemory[STAT_N];
    display_result();
    pushed = 1;
}

function stat_avgw() {
    alg_op = 0;
    if (stomemory[STAT_X] === 0) {
        display_error(2);
    } else {
        save_lastx();
        x = stomemory[STAT_XY] / stomemory[STAT_X];
        display_result();
    }
}

function stat_avg() {
    alg_op = 0;
    if (stomemory[STAT_N] === 0) {
        display_error(2);
    } else {
        save_lastx();
        x = stomemory[STAT_X] / stomemory[STAT_N];
        y = stomemory[STAT_Y] / stomemory[STAT_N];
        display_result();
    }
}

function stat_stddev() {
    alg_op = 0;
    if (stomemory[STAT_N] <= 1 || (stomemory[STAT_N] * stomemory[STAT_X2] - stomemory[STAT_X] * stomemory[STAT_X]) < 0 || (stomemory[STAT_N] * stomemory[STAT_Y2] - stomemory[STAT_Y] * stomemory[STAT_Y]) < 0) {
        display_error(2);
    } else {
        save_lastx();
        x = Math.pow((stomemory[STAT_N] * stomemory[STAT_X2] - stomemory[STAT_X] * stomemory[STAT_X]) / (stomemory[STAT_N] * (stomemory[STAT_N] - 1)), 0.5);
        y = Math.pow((stomemory[STAT_N] * stomemory[STAT_Y2] - stomemory[STAT_Y] * stomemory[STAT_Y]) / (stomemory[STAT_N] * (stomemory[STAT_N] - 1)), 0.5);
        display_result();
    }
}

function stat_kr(I, D) {
    if (stomemory[STAT_N] <= 0) {
        return [0, 1];
    }
    if (I) {
        if ((stomemory[STAT_N] * stomemory[STAT_X2] - stomemory[STAT_X] * stomemory[STAT_X]) < 0) {
            return [0, 2];
        }
    } else {
        if ((stomemory[STAT_N] * stomemory[STAT_Y2] - stomemory[STAT_Y] * stomemory[STAT_Y]) < 0) {
            return [0, 3];
        }
    }
    var H = stomemory[STAT_X] / stomemory[STAT_N];
    var G = stomemory[STAT_Y] / stomemory[STAT_N];
    var E = stomemory[STAT_XY] - stomemory[STAT_X] * stomemory[STAT_Y] / stomemory[STAT_N];
    E /= stomemory[STAT_X2] - stomemory[STAT_X] * stomemory[STAT_X] / stomemory[STAT_N];
    if (badnumber(E)) {
        return [0, 4];
    }
    var F = G - E * H;
    var N = stomemory[STAT_XY] - stomemory[STAT_X] * stomemory[STAT_Y] / stomemory[STAT_N];
    N *= N;
    var M = stomemory[STAT_X2] - stomemory[STAT_X] * stomemory[STAT_X] / stomemory[STAT_N];
    var L = stomemory[STAT_Y2] - stomemory[STAT_Y] * stomemory[STAT_Y] / stomemory[STAT_N];
    if (M === 0 || L === 0) {
        return [0, 5];
    }
    var J = N / (M * L);
    if (badnumber(J) || J < 0) {
        return [0, 6];
    }
    var C = Math.pow(J, 0.5);
    var K;
    if (I) {
        if (E === 0) {
            return [0, 7];
        }
        K = (D - F) / E;
    } else {
        K = F + E * D;
    }
    if (badnumber(K)) {
        return [0, 8];
    }
    return [1, K, C];
}

function stat_lr(B) {
    alg_op = 0;
    var A = stat_kr(B, x);
    if (!A[0]) {
        display_error(2);
    } else {
        save_lastx();
        push();
        push();
        x = A[1];
        y = A[2];
        display_result();
    }
}

function simple_interest() {
    if (!alg_resolve()) {
        return;
    }
    var C = finmemory[FIN_N];
    var A = finmemory[FIN_I] / 100;
    var B = finmemory[FIN_PV];
    push();
    push();
    push();
    x = C / 360 * -B * A;
    y = -B;
    z = C / 365 * -B * A;
    display_result();
}

function remap_key(B) {
    var C = B + 11;
    var A = (C % 10);
    if (A === 0) {
        C -= 10;
    }
    var D = Math.floor(C / 10);
    if (C == 47) {
        C = 0;
    } else {
        if (A >= 7 && A <= 9 && C != 48 && C != 49) {
            C = A - 3 * (D - 1);
        }
    }
    if (C == 46) {
        C = 36;
    }
    return C;
}
var memwin = null;

function show_memory2() {
    if (!memwin || !memwin.document) {
        memwin = null;
        return;
    }
    var B = memwin.document;
    var A = new Date();
    var D = B.getElementById("tt");
    var C;
    if (D) {
        D.innerHTML = "HP-12C memory at " + A;
        for (C = 0; C < finmemory.length; ++C) {
            B.getElementById("finmemory" + C).innerHTML = format_result(finmemory[C]);
        }
        for (C = 0; C < stomemory.length; ++C) {
            B.getElementById("stomemory" + C).innerHTML = format_result(stomemory[C]);
        }
        for (C = 0; C < njmemory.length; ++C) {
            B.getElementById("njmemory" + C).innerHTML = format_result(njmemory[C]);
        }
        B.getElementById("x").innerHTML = format_result(x);
        B.getElementById("last_x").innerHTML = format_result(last_x);
        B.getElementById("y").innerHTML = format_result(y);
        B.getElementById("z").innerHTML = format_result(z);
        B.getElementById("w").innerHTML = format_result(w);
        for (C = 0; C < ram.length; ++C) {
            B.getElementById("ram" + C).innerHTML = ram[C];
        }
    }
    window.setTimeout(show_memory2, 1000);
}

function show_memory() {
    memwin = window.open("hp12c" + (PLATINUM ? "-platinum" : "") + "_memory.html");
    window.setTimeout(show_memory2, 1000);
}

function solve_infinity(A) {
    if (A > Math.pow(10, 95)) {
        A = Math.pow(10, 95);
    } else {
        if (A < -Math.pow(10, 95)) {
            A = -Math.pow(10, 95);
        }
    }
    return A;
}

function comppmtlim(A, B) {
    if (Math.abs(A) < 1e-8) {
        return B;
    } else {
        return (1 - Math.pow(1 + (A / 100), -B)) / (A / 100);
    }
}

function calcNPV(E) {
    var F = finmemory[FIN_N];
    var A = finmemory[FIN_I];
    var C = finmemory[FIN_PV];
    var B = finmemory[FIN_PMT];
    var D = finmemory[FIN_FV];
    if (F == Math.floor(F) || E) {
        return C + (1 + (A / 100) * (begin ? 1 : 0)) * B * comppmtlim(A, F) + D * Math.pow(1 + (A / 100), -F);
    } else {
        if (!compoundf) {
            return C * (1 + ((A / 100) * (F - Math.floor(F)))) + (1 + (A / 100) * (begin ? 1 : 0)) * B * comppmtlim(A, Math.floor(F)) + D * Math.pow(1 + (A / 100), -Math.floor(F));
        } else {
            return C * Math.pow(1 + (A / 100), (F - Math.floor(F))) + (1 + (A / 100) * (begin ? 1 : 0)) * B * comppmtlim(A, Math.floor(F)) + D * Math.pow(1 + (A / 100), -Math.floor(F));
        }
    }
}

function financecalc(L) {
    var F = 0;
    if (L === 0) {
        F = F || finmemory[FIN_I] <= -100;
    } else {
        if (L == 2) {
            F = F || finmemory[FIN_I] <= -100;
        } else {
            if (L == 3) {
                F = F || finmemory[FIN_I] <= -100;
                F = F || finmemory[FIN_N] === 0;
            } else {
                if (L == 4) {
                    F = F || finmemory[FIN_I] <= -100;
                }
            }
        }
    }
    if (F) {
        return 5;
    }
    var I;
    var A;
    var J;
    var E;
    var D;
    var K = finmemory[L];
    var C = INTERPOLATION;
    var G = 1.25e-10;
    var B = 0;
    if (L != FIN_PV) {
        B += Math.abs(finmemory[FIN_PV]);
    }
    if (L != FIN_PMT) {
        B += Math.abs(finmemory[FIN_PMT]);
    }
    if (L != FIN_N && L != FIN_PMT) {
        B += Math.abs(finmemory[FIN_N] * finmemory[FIN_PMT]);
    }
    if (L != FIN_FV) {
        B += Math.abs(finmemory[FIN_FV]);
    }
    if (B > 0) {
        G *= B;
    }
    if (L == FIN_N || L == FIN_I || B <= 0) {
        D = 1;
    } else {
        D = B;
    }
    J = 0;
    while (--C >= 0) {
        E = D;
        D = J;
        finmemory[L] = E;
        if (finmemory[FIN_I] <= -100) {
            break;
        }
        I = calcNPV(L === 0);
        finmemory[L] = D;
        if (finmemory[FIN_I] <= -100) {
            break;
        }
        A = calcNPV(L === 0);
        if (Math.abs(A) < G) {
            if (L === 0) {
                if ((D - Math.floor(D)) > 0.003) {
                    finmemory[L] = Math.floor(finmemory[L]) + 1;
                } else {
                    finmemory[L] = Math.floor(finmemory[L]);
                }
            }
            return -1;
        }
        var H = (A - I) / (D - E);
        J = I - E * H;
        J /= -H;
        J = solve_infinity(J);
    }
    finmemory[L] = K;
    return 5;
}

function fincalc2(B) {
    sti();
    var A = financecalc(B, finmemory);
    if (A == -1) {
        push();
        x = finmemory[B];
        display_result();
    } else {
        display_error(A);
    }
}

function sto_or_calc_fin(A) {
    if (!alg_resolve()) {
        return;
    }
    if (!do_fincalc) {
        stofin(A);
        do_fincalc = 1;
    } else {
        cli();
        show("running");
        window.setTimeout(function () {
            fincalc2(A);
        }, 200);
    }
}

function inner_npv() {
    var B = stomemory[0];
    var G = finmemory[FIN_N];
    var A = finmemory[FIN_I];
    var C = 0;
    for (var F = 1; F <= G; ++F) {
        var E = stomemory[F];
        for (var D = 1; D <= njmemory[F]; ++D) {
            ++C;
            B += E / Math.pow(1 + (A / 100), C);
        }
    }
    return B;
}

function npv() {
    alg_op = 0;
    x = inner_npv();
    display_result();
}

function inner_npvsum() {
    var A = Math.abs(stomemory[0]);
    var C = finmemory[FIN_N];
    for (var B = 1; B <= C; ++B) {
        A += Math.abs(stomemory[B]);
    }
    return A;
}

function inner_irr() {
    var H;
    var A;
    var I;
    var E;
    var C;
    var D = INTERPOLATION;
    var F = 1.25e-10;
    var B = inner_npvsum();
    if (B > 0) {
        F *= B;
    }
    if (finmemory[FIN_I] <= -100 || finmemory[FIN_I] > 10000000000) {
        finmemory[FIN_I] = 0;
    }
    E = finmemory[FIN_I] + 1;
    C = finmemory[FIN_I];
    while (--D > 0) {
        finmemory[FIN_I] = E;
        H = inner_npv();
        finmemory[FIN_I] = C;
        A = inner_npv();
        if (finmemory[FIN_I] < -100 || finmemory[FIN_I] > 10000000000) {
            return 3;
        }
        if (Math.abs(A) < F) {
            return -1;
        }
        var G = (A - H) / (C - E);
        I = H - E * G;
        I /= -G;
        I = solve_infinity(I);
        E = C;
        C = I;
    }
    return 7;
}

function irr() {
    alg_op = 0;
    show("running");
    var A = inner_irr();
    if (A != -1) {
        display_error(A);
    } else {
        push();
        x = finmemory[FIN_I];
        display_result();
    }
}

function tzoffset(A) {
    return A.getTimezoneOffset() * 60000;
}

function date_check(C, D, B) {
    var A = 31;
    if (D == 4 || D == 6 || D == 9 || D == 11) {
        A = 30;
    } else {
        if (D == 2) {
            A = 28;
            if ((C % 4) === 0 && (((C % 100) !== 0) || ((C % 400) === 0))) {
                A = 29;
            }
        }
    }
    if (B <= 0 || B > A || C <= 0 || C > 9999 || D <= 0 || D > 12) {
        return 0;
    }
    return 1;
}

function date_interpret(E) {
    E = Math.round(Math.abs(E) * 1000000);
    var A = Math.round(E / 1000000) % 100;
    var D = Math.round(E / 10000) % 100;
    var C = Math.round(E % 10000);
    if (!dmy) {
        var B = A;
        A = D;
        D = B;
    }
    if (!date_check(C, D, A)) {
        return null;
    }
    return new Date(C, D - 1, A, 12, 0, 0);
}

function date_diff(B, A) {
    return Math.round(((A.getTime() - tzoffset(A)) - (B.getTime() - tzoffset(B))) / 86400000);
}

function date_add(A, B) {
    A.setTime(A.getTime() + Math.floor(B) * 86400000);
}

function date_diff30(H, F) {
    var C = H.getDate();
    var A = F.getDate();
    var G = C;
    var E = A;
    if (C == 31) {
        G = 30;
    }
    if (A == 31) {
        if (C >= 30) {
            E = 30;
        }
    }
    var D = 360 * H.getFullYear() + 30 * (H.getMonth() + 1) + G;
    var B = 360 * F.getFullYear() + 30 * (F.getMonth() + 1) + E;
    return B - D;
}

function date_date() {
    alg_op = 0;
    var A = date_interpret(y);
    if (A === null) {
        display_error(8);
        return;
    }
    date_add(A, x);
    pop();
    x = date_gen(A);
    display_result_date(A);
}

function date_dys() {
    alg_op = 0;
    var A = date_interpret(x);
    var B = date_interpret(y);
    if ((B === null) || (A === null)) {
        display_error(8);
        return;
    }
    x = date_diff(B, A);
    y = date_diff30(B, A);
    display_result();
}

function amortization() {
    alg_op = 0;
    var A = x;
    var C = finmemory[FIN_N];
    var E = finmemory[FIN_I] / 100;
    var J = cl5_round(finmemory[FIN_PV], decimals);
    finmemory[FIN_PV] = J;
    var D = cl5_round(finmemory[FIN_PMT], decimals);
    finmemory[FIN_PMT] = D;
    if (A <= 0 || A != Math.floor(A) || E <= -1) {
        display_error(5);
        return;
    }
    var B = 0;
    var H = 0;
    for (var G = 1; G <= A; ++G) {
        var I = cl5_round(-J * E, decimals);
        if (G == 1 && begin && C <= 0) {
            I = 0;
        }
        var F = D - I;
        B += I;
        H += F;
        J += F;
    }
    push();
    push();
    push();
    x = B;
    y = H;
    z = A;
    finmemory[FIN_N] += A;
    finmemory[FIN_PV] += H;
    display_result();
}

function bond_previous_coupon(C, B) {
    var F = 0;
    var A = new Date(B);
    var E;
    while (A > C) {
        E = new Date(A);
        ++F;
        A.setDate(1);
        A.setMonth(A.getMonth() - 6);
        var D = A.getMonth();
        A.setDate(B.getDate());
        if (A.getMonth() != D) {
            return null;
        }
    }
    return [A, E, F];
}

function _bond_price(F, L, I, A) {
    var K;
    var C;
    var B = A;
    var D = date_diff(I, A);
    if (D <= 0) {
        return null;
    }
    var N = bond_previous_coupon(I, A);
    if (N === null) {
        return null;
    }
    var O = date_diff(N[0], N[1]);
    var J = date_diff(I, N[1]);
    var G = N[2];
    var H = O - J;
    if (D <= O) {
        K = (100 * (100 + L / 2)) / (100 + ((D / O) * F / 2));
    } else {
        K = 100 / Math.pow(1 + F / 200, G - 1 + J / O);
        for (var M = 1; M <= G; ++M) {
            K += (L / 2) / Math.pow(1 + F / 200, M - 1 + J / O);
        }
    }
    C = (L / 2) * H / O;
    K -= C;
    if (badnumber(K) || badnumber(C)) {
        return null;
    }
    return [K, C];
}

function bond_price() {
    alg_op = 0;
    var C = finmemory[FIN_I];
    if (C <= -100) {
        display_error(5);
        return;
    }
    var A = finmemory[FIN_PMT];
    var D = date_interpret(y);
    if (D === null) {
        display_error(8);
        return;
    }
    var B = date_interpret(x);
    if (B === null) {
        display_error(8);
        return;
    }
    res = _bond_price(C, A, D, B);
    if (!res) {
        display_error(5);
        return;
    }
    push();
    push();
    finmemory[FIN_N] = x = res[0];
    y = res[1];
    display_result();
}

function bond_yield() {
    alg_op = 0;
    var C;
    var J = finmemory[FIN_PMT];
    var G = date_interpret(y);
    if (G === null) {
        display_error(8);
        return;
    }
    var A = date_interpret(x);
    if (A === null) {
        display_error(8);
        return;
    }
    var I = finmemory[FIN_PV];
    if (I <= 0) {
        display_error(5);
        return;
    }
    var L;
    var B;
    var M;
    var F;
    var E;
    var D = INTERPOLATION;
    var H = 1.25e-10 * Math.abs(I);
    F = 0;
    E = F + 1;
    while (--D > 0) {
        res = _bond_price(F, J, G, A);
        if (!res) {
            display_error(5);
            return;
        }
        L = res[0] - I;
        res = _bond_price(E, J, G, A);
        if (!res) {
            display_error(5);
            return;
        }
        B = res[0] - I;
        if (F < -100 || F > 10000000000) {
            display_error(5);
            return;
        }
        if (Math.abs(B) < H) {
            C = E;
            break;
        }
        var K = (B - L) / (E - F);
        M = L - F * K;
        M /= -K;
        M = solve_infinity(M);
        F = E;
        E = M;
    }
    push();
    push();
    finmemory[FIN_I] = x = C;
    display_result();
}

function depreciation_sl() {
    alg_op = 0;
    var F = finmemory[FIN_PV];
    var D = finmemory[FIN_FV];
    var C = finmemory[FIN_N];
    var B = x;
    var E = 0;
    var A = F - D;
    if (B < 0 || B != Math.floor(B) || C <= 0 || C > Math.pow(10, 10)) {
        display_error(5);
        return;
    }
    while (--B >= 0) {
        E = (F - D) / C;
        if (badnumber(E)) {
            display_error(0);
            return;
        }
        A -= E;
    }
    push();
    push();
    x = E;
    y = A;
    display_result();
}

function depreciation_soyd() {
    alg_op = 0;
    var H = finmemory[FIN_PV];
    var F = finmemory[FIN_FV];
    var E = finmemory[FIN_N];
    var D = x;
    var G = 0;
    var C = H - F;
    if (D < 0 || D != Math.floor(D) || E <= 0 || E > Math.pow(10, 10)) {
        display_error(5);
        return;
    }
    var B = 0;
    var A = E * (E + 1) / 2;
    while (--D >= 0) {
        G = (H - F) * (E - (++B) + 1) / A;
        if (badnumber(G)) {
            display_error(0);
            return;
        }
        C -= G;
    }
    push();
    push();
    x = G;
    y = C;
    display_result();
}

function depreciation_db() {
    alg_op = 0;
    var G = finmemory[FIN_PV];
    var E = finmemory[FIN_FV];
    var D = finmemory[FIN_N];
    var A = finmemory[FIN_I] / 100;
    var C = x;
    var F = 0;
    var B = G - E;
    if (C < 0 || C != Math.floor(C) || D <= 0 || D > Math.pow(10, 10)) {
        display_error(5);
        return;
    }
    while (--C >= 0) {
        F = (B + E) * A / D;
        if (badnumber(F)) {
            display_error(0);
            return;
        }
        B -= F;
    }
    push();
    push();
    x = F;
    y = B;
    display_result();
}

function display_program_opcode() {
    var A = zeropad(instruction_pointer.toFixed(0), ram_ADDR_SIZE) + "-" + ram[instruction_pointer];
    show(A);
}

function prog_pr() {
    if (program_mode == INTERACTIVE) {
        program_mode = PROGRAMMING;
        display_pgrm();
        display_program_opcode();
    }
}

function prog_bst2() {
    sti();
    display_result();
}

function prog_bst() {
    if (instruction_pointer > 0) {
        --instruction_pointer;
    }
    display_program_opcode();
    cli();
    window.setTimeout(prog_bst2, 200);
}

function program_stop() {
    program_mode = INTERACTIVE;
    display_pgrm();
    display_result();
}
var opcodes = [];
opcodes[0] = "";
opcodes[FF] = "42.";
opcodes[GG] = "43.";
opcodes[STO] = "44.";
opcodes[STO2] = "44.48.";
opcodes[STO_PLUS] = "44.40.";
opcodes[STO_MINUS] = "44.30.";
opcodes[STO_TIMES] = "44.20.";
opcodes[STO_DIVIDE] = "44.10.";
opcodes[RCL] = "45.";
opcodes[RCL2] = "45.48.";
opcodes[RCL_GG] = "45.43.";
opcodes[GTO] = "43.33.";
opcodes[GTO_MOVE] = "43.33.48.";

function program_poke(A) {
    if ((instruction_pointer + 1) >= ram_MAX) {
        display_error(4);
        return;
    } ++instruction_pointer;
    ram[instruction_pointer] = A;
}
var program_execute = null;

function program_sched() {
    if (program_mode >= RUNNING) {
        display_pgrm();
        window.setTimeout(program_execute, 200);
    }
}
program_execute = function () {
    if (program_mode < RUNNING) {
        return;
    }
    if (!keyboard) {
        program_sched();
        return;
    }
    if (instruction_pointer <= 0) {
        instruction_pointer = 1;
        display_pgrm();
    }
    var B = ram[instruction_pointer].split(".");
    var A;
    for (A = 0; A < B.length; ++A) {
        B[A] = parseInt(B[A], 10);
    }
    if (B.length == 3 && B[0] == 43 && B[1] == 33) {
        instruction_pointer = B[2];
    } else {
        if (B.length == 2 && B[0] == 43 && B[1] == 34) {
            instruction_pointer += (x <= y ? 1 : 2);
        } else {
            if (B.length == 2 && B[0] == 43 && B[1] == 35) {
                instruction_pointer += (x === 0 ? 1 : 2);
            } else {
                if (B.length == 1 && B[0] == 31) {
                    ++instruction_pointer;
                    program_stop();
                } else {
                    if (B.length == 2 && B[0] == 42 && B[1] == 31) { } else {
                        if (B.length == 2 && B[0] == 42 && B[1] == 31) { } else {
                            for (A = 0; A < B.length; ++A) {
                                if (window["kk" + B[A]]) {
                                    window["kk" + B[A]]();
                                }
                            } ++instruction_pointer;
                        }
                    }
                }
            }
        }
    }
    if (instruction_pointer <= 0) {
        program_stop();
    } else {
        if (instruction_pointer > (ram_MAX - 1)) {
            instruction_pointer = 0;
            program_stop();
        } else {
            if (program_mode == RUNNING_STEP) {
                program_mode = INTERACTIVE;
                display_pgrm();
            } else {
                program_sched();
            }
        }
    }
};

function program_run_step() {
    program_mode = RUNNING_STEP;
    if (instruction_pointer <= 0) {
        instruction_pointer = 1;
    }
    display_pgrm();
    program_sched();
}

function prog_sst() {
    if (program_mode == INTERACTIVE) {
        program_run_step();
    }
}

function program_run() {
    program_mode = RUNNING;
    if (instruction_pointer <= 0) {
        instruction_pointer = 1;
    }
    display_pgrm();
    program_sched();
}

function prog_rs() {
    if (program_mode == INTERACTIVE) {
        display_result();
        program_run();
    } else {
        program_stop();
    }
}

function program_type(B) {
    if (B == 31 && modifier == FF) {
        rst_modifier(1);
        program_mode = INTERACTIVE;
        instruction_pointer = 0;
        display_pgrm();
        display_modifier();
        display_result();
        return;
    } else {
        if (B == 32 && !modifier) {
            if (++instruction_pointer >= ram_MAX) {
                instruction_pointer = 0;
            }
            rst_modifier(1);
        } else {
            if ((B == 32 && modifier == GG) || B == 98) {
                if (--instruction_pointer < 0) {
                    instruction_pointer = 99;
                }
                rst_modifier(1);
            } else {
                if (B == 33 && modifier == FF) {
                    clear_prog();
                    rst_modifier(1);
                } else {
                    if (B == 42) {
                        set_modifier(FF, 1);
                    } else {
                        if (B == 43) {
                            if (modifier != RCL) {
                                set_modifier(GG, 1);
                            } else {
                                set_modifier(RCL_GG, 1);
                            }
                        } else {
                            if (B == 44) {
                                set_modifier(STO, 1);
                            } else {
                                if (B == 45) {
                                    set_modifier(RCL, 1);
                                } else {
                                    if (B == 48 && modifier == STO) {
                                        set_modifier(STO2, 1);
                                    } else {
                                        if (B == 48 && modifier == RCL) {
                                            set_modifier(RCL2, 1);
                                        } else {
                                            if ((B == 40) && modifier == STO) {
                                                set_modifier(STO_PLUS, 1);
                                            } else {
                                                if ((B == 30) && modifier == STO) {
                                                    set_modifier(STO_MINUS, 1);
                                                } else {
                                                    if ((B == 20) && modifier == STO) {
                                                        set_modifier(STO_TIMES, 1);
                                                    } else {
                                                        if ((B == 10) && modifier == STO) {
                                                            set_modifier(STO_DIVIDE, 1);
                                                        } else {
                                                            if (modifier == GTO_MOVE && B >= 0 && B < 10) {
                                                                gtoxx = "" + gtoxx + B.toFixed(0);
                                                                if (gtoxx.length >= ram_ADDR_SIZE) {
                                                                    instruction_pointer = parseInt(gtoxx, 10);
                                                                    gtoxx = "";
                                                                    rst_modifier(1);
                                                                }
                                                            } else {
                                                                if (modifier == GTO && B == 48) {
                                                                    set_modifier(GTO_MOVE, 1);
                                                                } else {
                                                                    if (modifier == GTO && B >= 0 && B < 10) {
                                                                        gtoxx = "" + gtoxx + B.toFixed(0);
                                                                        if (gtoxx.length >= ram_ADDR_SIZE) {
                                                                            program_poke(opcodes[modifier] + gtoxx);
                                                                            gtoxx = "";
                                                                            rst_modifier(1);
                                                                        }
                                                                    } else {
                                                                        if (modifier == GG && B == 33) {
                                                                            set_modifier(GTO, 1);
                                                                            gtoxx = "";
                                                                        } else {
                                                                            if (!(window["kk" + B].valid_modifiers & modifier)) {
                                                                                modifier = 0;
                                                                            }
                                                                            var A = opcodes[modifier] + zeropad(B.toFixed(0), INSTRUCTION_SIZE);
                                                                            program_poke(A);
                                                                            rst_modifier(1);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    display_program_opcode();
}

function kk11() {
    if (modifier == FF) {
        amortization();
        rst_modifier(1);
    } else {
        if (modifier == GG) {
            ston_12x();
            rst_modifier(0);
        } else {
            if (modifier == RCL) {
                rclfin(0);
                rst_modifier(1);
            } else {
                if (modifier == STO) {
                    stofin(0);
                    rst_modifier(0);
                } else {
                    sto_or_calc_fin(0);
                    rst_modifier(0);
                }
            }
        }
    }
}
kk11.valid_modifiers = FF | GG | STO | RCL;

function kk12() {
    if (modifier == FF) {
        simple_interest();
        rst_modifier(1);
    } else {
        if (modifier == GG) {
            stoi_12div();
            rst_modifier(0);
        } else {
            if (modifier == RCL) {
                rclfin(1);
                rst_modifier(1);
            } else {
                if (modifier == STO) {
                    stofin(1);
                    rst_modifier(0);
                } else {
                    sto_or_calc_fin(1);
                    rst_modifier(0);
                }
            }
        }
    }
}
kk12.valid_modifiers = FF | GG | STO | RCL;

function kk13() {
    if (modifier == FF) {
        npv();
        rst_modifier(1);
    } else {
        if (modifier == GG) {
            stoCF0();
            rst_modifier(1);
        } else {
            if (modifier == RCL) {
                rclfin(2);
                rst_modifier(1);
            } else {
                if (modifier == STO) {
                    stofin(2);
                    rst_modifier(0);
                } else {
                    sto_or_calc_fin(2);
                    rst_modifier(0);
                }
            }
        }
    }
}
kk13.valid_modifiers = FF | GG | STO | RCL;

function kk14() {
    if (modifier == FF) {
        rnd();
        rst_modifier(1);
    } else {
        if (modifier == RCL_GG) {
            rclCFj();
            rst_modifier(1);
        } else {
            if (modifier == GG) {
                stoCFj();
                rst_modifier(1);
            } else {
                if (modifier == RCL) {
                    rclfin(3);
                    rst_modifier(1);
                } else {
                    if (modifier == STO) {
                        stofin(3);
                        rst_modifier(0);
                    } else {
                        sto_or_calc_fin(3);
                        rst_modifier(0);
                    }
                }
            }
        }
    }
}
kk14.valid_modifiers = FF | GG | STO | RCL | RCL_GG;

function kk15() {
    if (modifier == FF) {
        irr();
        rst_modifier(1);
    } else {
        if (modifier == RCL_GG) {
            rclNj();
            rst_modifier(1);
        } else {
            if (modifier == GG) {
                stoNj();
                rst_modifier(1);
            } else {
                if (modifier == RCL) {
                    rclfin(4);
                    rst_modifier(1);
                } else {
                    if (modifier == STO) {
                        stofin(4);
                        rst_modifier(0);
                    } else {
                        sto_or_calc_fin(4);
                        rst_modifier(0);
                    }
                }
            }
        }
    }
}
kk15.valid_modifiers = FF | GG | STO | RCL | RCL_GG;

function kk16() {
    if (modifier == GG) {
        date_date();
    } else {
        if (PLATINUM && modifier == FF) {
            rpn_mode();
        } else {
            chs();
        }
    }
    rst_modifier(1);
}
kk16.valid_modifiers = FF | GG;

function kk7() {
    if (modifier == FF) {
        set_decimals(7);
        rst_modifier(1);
    } else {
        if (modifier == GG) {
            set_begin(1);
            rst_modifier(0);
        } else {
            if (modifier == STO) {
                sto(7);
                rst_modifier(1);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(7, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(7);
                        rst_modifier(1);
                    } else {
                        if (modifier == STO2) {
                            sto(17);
                            rst_modifier(1);
                        } else {
                            if (modifier == RCL2) {
                                rcl(17);
                                rst_modifier(1);
                            } else {
                                digit_add(7);
                                rst_modifier(1);
                            }
                        }
                    }
                }
            }
        }
    }
}
kk7.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk8() {
    if (modifier == FF) {
        set_decimals(8);
        rst_modifier(1);
    } else {
        if (modifier == GG) {
            set_begin(0);
            rst_modifier(0);
        } else {
            if (modifier == STO) {
                sto(8);
                rst_modifier(1);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(8, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(8);
                        rst_modifier(1);
                    } else {
                        if (modifier == STO2) {
                            sto(18);
                            rst_modifier(1);
                        } else {
                            if (modifier == RCL2) {
                                rcl(18);
                                rst_modifier(1);
                            } else {
                                digit_add(8);
                                rst_modifier(1);
                            }
                        }
                    }
                }
            }
        }
    }
}
kk8.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk9() {
    if (modifier == FF) {
        set_decimals(9);
    } else {
        if (modifier == GG) { } else {
            if (modifier == STO) {
                sto(9);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(9, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(9);
                    } else {
                        if (modifier == STO2) {
                            sto(19);
                        } else {
                            if (modifier == RCL2) {
                                rcl(19);
                            } else {
                                digit_add(9);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk9.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk10() {
    if (modifier == STO) {
        set_modifier(STO_DIVIDE, 1);
    } else {
        divide();
        rst_modifier(1);
    }
}
kk10.valid_modifiers = 0;

function kk21() {
    if (modifier == FF) {
        bond_price();
    } else {
        if (modifier == GG) {
            sqroot();
        } else {
            poweryx();
        }
    }
    rst_modifier(1);
}
kk21.valid_modifiers = FF | GG;

function kk22() {
    if (modifier == FF) {
        bond_yield();
    } else {
        if (modifier == GG) {
            exp();
        } else {
            inverse();
        }
    }
    rst_modifier(1);
}
kk22.valid_modifiers = FF | GG;

function kk23() {
    if (modifier == FF) {
        depreciation_sl();
    } else {
        if (modifier == GG) {
            ln();
        } else {
            percentT();
        }
    }
    rst_modifier(1);
}
kk23.valid_modifiers = FF | GG;

function kk24() {
    if (modifier == FF) {
        depreciation_soyd();
    } else {
        if (modifier == GG) {
            frac();
        } else {
            deltapercent();
        }
    }
    rst_modifier(1);
}
kk24.valid_modifiers = FF | GG;

function kk25() {
    if (modifier == FF) {
        depreciation_db();
    } else {
        if (modifier == GG) {
            intg();
        } else {
            percent();
        }
    }
    rst_modifier(1);
}
kk25.valid_modifiers = FF | GG;

function kk26() {
    if (modifier == GG) {
        date_dys();
    } else {
        if (PLATINUM && modifier == FF) {
            algebraic_mode();
        } else {
            if (modifier == STO) {
                toogle_compoundf();
            } else {
                input_exponential();
            }
        }
    }
    rst_modifier(1);
}
kk26.valid_modifiers = FF | GG | STO;

function kk4() {
    if (modifier == FF) {
        set_decimals(4);
    } else {
        if (modifier == GG) {
            set_dmy(1);
        } else {
            if (modifier == STO) {
                sto(4);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(4, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(4);
                    } else {
                        if (modifier == STO2) {
                            sto(14);
                        } else {
                            if (modifier == RCL2) {
                                rcl(14);
                            } else {
                                digit_add(4);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk4.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk5() {
    if (modifier == FF) {
        set_decimals(5);
    } else {
        if (modifier == GG) {
            set_dmy(0);
        } else {
            if (modifier == STO) {
                sto(5);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(5, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(5);
                    } else {
                        if (modifier == STO2) {
                            sto(15);
                        } else {
                            if (modifier == RCL2) {
                                rcl(15);
                            } else {
                                digit_add(5);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk5.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk6() {
    if (modifier == FF) {
        set_decimals(6);
    } else {
        if (modifier == GG) {
            stat_avgw();
        } else {
            if (modifier == STO) {
                sto(6);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(6, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(6);
                    } else {
                        if (modifier == STO2) {
                            sto(16);
                        } else {
                            if (modifier == RCL2) {
                                rcl(16);
                            } else {
                                digit_add(6);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk6.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk20() {
    if (modifier == STO) {
        set_modifier(STO_TIMES, 1);
    } else {
        if (PLATINUM && modifier == GG) {
            square();
            rst_modifier(1);
        } else {
            multiply();
            rst_modifier(1);
        }
    }
}
kk20.valid_modifiers = 0;
if (PLATINUM) {
    kk20.valid_modifiers = GG;
}

function kk31() {
    if (modifier == GG) {
        prog_pse();
    } else {
        if (modifier == FF) {
            prog_pr();
        } else {
            prog_rs();
        }
    }
    rst_modifier(1);
}
kk31.valid_modifiers = FF | GG;

function kk32() {
    if (modifier == FF) {
        clear_statistics();
        display_result();
    } else {
        if (modifier == GG) {
            prog_bst();
        } else {
            prog_sst();
        }
    }
    rst_modifier(1);
}
kk32.valid_modifiers = FF | GG;

function kk33() {
    if (modifier == FF) {
        clear_prog();
        display_result();
    } else {
        if (modifier == GG) {
            display_result();
        } else {
            r_down();
        }
    }
    rst_modifier(1);
}
kk33.valid_modifiers = FF | GG;

function kk34() {
    if (modifier == FF) {
        clear_fin();
        display_result();
    } else {
        if (modifier == GG) {
            display_result();
        } else {
            x_exchange_y();
        }
    }
    rst_modifier(1);
}
kk34.valid_modifiers = FF | GG;

function kk35() {
    if (modifier == FF) {
        clear_reg();
        display_result();
    } else {
        if (modifier == GG) {
            display_result();
        } else {
            clx();
        }
    }
    rst_modifier(1);
}
kk35.valid_modifiers = FF | GG;

function kk36() {
    if (modifier == FF) {
        clear_prefix();
    } else {
        if (modifier == GG) {
            if (PLATINUM) {
                enter(1);
            } else {
                lstx();
            }
        } else {
            enter(0);
        }
    }
    rst_modifier(1);
}
kk36.valid_modifiers = FF | GG;

function kk1() {
    if (modifier == FF) {
        set_decimals(1);
    } else {
        if (modifier == GG) {
            stat_lr(1);
        } else {
            if (modifier == STO) {
                sto(1);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(1, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == STO2) {
                        sto(11);
                    } else {
                        if (modifier == RCL) {
                            rcl(1);
                        } else {
                            if (modifier == RCL2) {
                                rcl(11);
                            } else {
                                digit_add(1);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk1.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk2() {
    if (modifier == FF) {
        set_decimals(2);
    } else {
        if (modifier == GG) {
            stat_lr(0);
        } else {
            if (modifier == STO) {
                sto(2);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(2, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(2);
                    } else {
                        if (modifier == STO2) {
                            sto(12);
                        } else {
                            if (modifier == RCL2) {
                                rcl(12);
                            } else {
                                digit_add(2);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk2.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk3() {
    if (modifier == FF) {
        set_decimals(3);
    } else {
        if (modifier == GG) {
            fatorial();
        } else {
            if (modifier == STO) {
                sto(3);
            } else {
                if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                    stoinfix(3, modifier);
                    rst_modifier(1);
                } else {
                    if (modifier == RCL) {
                        rcl(3);
                    } else {
                        if (modifier == STO2) {
                            sto(13);
                        } else {
                            if (modifier == RCL2) {
                                rcl(13);
                            } else {
                                digit_add(3);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk3.valid_modifiers = FF | GG | STO | STO2 | RCL | RCL2 | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk30() {
    if (modifier == STO) {
        set_modifier(STO_MINUS, 1);
    } else {
        minus();
        rst_modifier(1);
    }
}
kk30.valid_modifiers = 0;

function kk41() {
    toogle_decimal_character();
    rst_modifier(1);
    save_memory();
}
kk41.valid_modifiers = 0;

function kk42() {
    set_modifier(FF, 1);
}
kk42.valid_modifiers = 0;

function kk43() {
    if (modifier == RCL) {
        set_modifier(RCL_GG, 1);
    } else {
        set_modifier(GG, 1);
    }
}
kk43.valid_modifiers = 0;

function kk44() {
    set_modifier(STO, 1);
}
kk44.valid_modifiers = 0;

function kk45() {
    set_modifier(RCL, 1);
}
kk45.valid_modifiers = 0;

function kk0() {
    if (modifier == FF) {
        set_decimals(0);
    } else {
        if (modifier == GG) {
            stat_avg();
        } else {
            if (modifier == STO) {
                sto(0);
            } else {
                if (modifier == STO2) {
                    sto(10);
                } else {
                    if (modifier == STO_PLUS || modifier == STO_MINUS || modifier == STO_TIMES || modifier == STO_DIVIDE) {
                        stoinfix(0, modifier);
                        rst_modifier(1);
                    } else {
                        if (modifier == RCL) {
                            rcl(0);
                        } else {
                            if (modifier == RCL2) {
                                rcl(10);
                            } else {
                                digit_add(0);
                            }
                        }
                    }
                }
            }
        }
    }
    rst_modifier(1);
}
kk0.valid_modifiers = FF | GG | STO | STO2 | RCL | STO_PLUS | STO_MINUS | STO_TIMES | STO_DIVIDE;

function kk48() {
    if (modifier == FF) {
        set_decimals_exponential();
        rst_modifier(1);
    } else {
        if (modifier == GG) {
            stat_stddev();
            rst_modifier(1);
        } else {
            if (modifier == STO) {
                set_modifier(STO2, 1);
            } else {
                if (modifier == RCL) {
                    set_modifier(RCL2, 1);
                } else {
                    decimal_point_mode();
                    rst_modifier(1);
                }
            }
        }
    }
}
kk48.valid_modifiers = FF | GG;

function kk49() {
    if (modifier == GG) {
        stat_sigma_minus();
    } else {
        stat_sigma_plus();
    }
    rst_modifier(1);
}
kk49.valid_modifiers = GG;

function kk40() {
    if (modifier == STO) {
        set_modifier(STO_PLUS, 1);
    } else {
        if (PLATINUM && modifier == GG) {
            lstx();
            rst_modifier(1);
        } else {
            plus();
            rst_modifier(1);
        }
    }
}
kk40.valid_modifiers = 0;
if (PLATINUM) {
    kk40.valid_modifiers = GG;
}

function kk98() {
    digit_delete();
}
kk98.valid_modifiers = 0;

function dispatch(A) {
    var B = "kk" + A;
    if (A == 99) {
        show_memory();
    } else {
        if (window[B]) {
            if (program_mode == INTERACTIVE && keyboard) {
                if (error_in_display) {
                    error_in_display = 0;
                    display_result();
                } else {
                    window[B]();
                }
            } else {
                if (program_mode == PROGRAMMING) {
                    program_type(A);
                } else {
                    if (program_mode >= RUNNING) {
                        program_stop();
                    }
                }
            }
        }
    }
}
var xoff, yoff, xl, yl, xd, yd;
var kbdtable = {};
kbdtable["0"] = 0;
kbdtable["."] = 48;
kbdtable[","] = 48;
kbdtable["1"] = 1;
kbdtable["2"] = 2;
kbdtable["3"] = 3;
kbdtable["4"] = 4;
kbdtable["5"] = 5;
kbdtable["6"] = 6;
kbdtable["7"] = 7;
kbdtable["8"] = 8;
kbdtable["9"] = 9;
kbdtable["+"] = 40;
kbdtable["-"] = 30;
kbdtable["*"] = 20;
kbdtable["/"] = 10;
kbdtable["\r"] = 36;
kbdtable["\n"] = 36;
kbdtable["="] = 36;
kbdtable.c = 35;
kbdtable.C = 35;
kbdtable.h = 16;
kbdtable.H = 16;
kbdtable.e = 26;
kbdtable.E = 26;
kbdtable.f = 42;
kbdtable.F = 42;
kbdtable.g = 43;
kbdtable.G = 43;
kbdtable.s = 44;
kbdtable.S = 44;
kbdtable.r = 45;
kbdtable.R = 45;
kbdtable.n = 11;
kbdtable.N = 11;
kbdtable.i = 12;
kbdtable.I = 12;
kbdtable.p = 13;
kbdtable.P = 13;
kbdtable.m = 14;
kbdtable.M = 14;
kbdtable.v = 15;
kbdtable.V = 15;
kbdtable["#"] = 23;
kbdtable["$"] = 24;
kbdtable["%"] = 25;
kbdtable["!"] = 21;
kbdtable["\\"] = 22;
kbdtable.x = 34;
kbdtable.X = 34;
kbdtable.d = 33;
kbdtable.D = 33;
kbdtable.w = 49;
kbdtable.W = 49;
kbdtable.o = 41;
kbdtable.O = 41;
kbdtable["["] = 31;
kbdtable["]"] = 32;
kbdtable["?"] = 99;
kbdtable[String.fromCharCode(8)] = 98;

function key_pressed(E) {
    var C = (E.offsetX ? E.offsetX : (E.pageX - pointer_div.offsetLeft)) - xoff;
    var B = (E.offsetY ? E.offsetY : (E.pageY - pointer_div.offsetTop)) - yoff;
    if (C < 0 || B < 0 || C >= xd * 10 || B >= yd * 4) {
        return;
    }
    var D = Math.floor(C / xd) + 10 * Math.floor(B / yd);
    while (C > xd) {
        C -= xd;
    }
    while (B > yd) {
        B -= yd;
    }
    var A = (C < xl) && ((B < yl) || D == 25);
    if (A) {
        dispatch(remap_key(D));
    }
}

function kbd(C) {
    var E;
    var D;
    var B;
    if (window.event) {
        C = window.event;
        E = window.event.keyCode;
    } else {
        if (C.which) {
            E = C.which;
        } else {
            return true;
        }
    }
    D = String.fromCharCode(E);
    var A = kbdtable[D];
    if (A !== undefined && A !== null) {
        dispatch(kbdtable[D]);
        C.returnValue = false;
        if (C.preventDefault) {
            C.preventDefault();
        }
        return false;
    }
    return true;
}

function Init_hp12c() {
    clear_prog();
    clear_sto();
    clear_fin();
    display = document.getElementById("display");
    pointer_div = document.getElementById("pointer_div");
    var B = parseInt(pointer_div.style.width, 10) / 700;
    var A = parseInt(pointer_div.style.height, 10) / 438;
    xoff = 44 * B;
    yoff = 151 * A;
    xl = 54 * B;
    yl = 50 * A;
    xd = (606 - 44) / 9 * B;
    yd = (364 - 151) / 3 * A;
    dbegin = document.getElementById("begin");
    ddmyc = document.getElementById("dmyc");
    dmodifier = document.getElementById("modifier");
    pgrm = document.getElementById("pgrm");
    if (PLATINUM) {
        rpnalg = document.getElementById("rpnalg");
    }
    init_lcd();
    if (has_lcd) {
        lcd_clear();
    }
    recover_memory();
    displayX();
    display_modifier();
    display_begin();
    display_dmyc();
    display_pgrm();
    display_algmode();
    sti();
    document.onkeypress = kbd;
    window.onunload = close_hp12c;
    window.beforenunload = close_hp12c;
    document.onunload = close_hp12c;
    document.beforeunload = close_hp12c;
}