var video = null;
video = document.querySelector('video');
if (video != null) {
    class Debugger {
        static log(msg) {
            if (debug) {
                console.log(new Date().format('yyyy-MM-dd hh:mm:ss') + ' ' + msg);
            }
        }
    }
    Debugger.log('videojs loaded');
    const apihost = "app.ylwang.me"

    const CLOSEDCODE = "-1";
    const DISCONNECTCODE = "-2";
    const HELLOCODE = "-3";
    const PLAYCODE = "-4";
    const PAUSECODE = "-5";

    const STATUSSTART = "start"
    const STATUSEND = "end"

    const OPPAUSE = "pause"
    const OPPLAY = "play"
    const OPSYNC = "synctime"

    //connect to server
    const STATUSCONNECT = "connect"
    //connect to partner
    const STATUSSYNC = "sync"
    const STATUSASK = "ask"

    var status = STATUSEND;
    var websocket = null;
    var operationFlag = 0;
    var timer = null;
    var debug = true;

    var operation = null;

    var codelist = [];
    var codeMaxLength = 10;
    var codeMinInterval = 5 * 1000;
    var codeCoolingTime = 3 * 1000;

    // check connection every 30s.
    setInterval(function () {
        isOpen(websocket) ? status = STATUSSYNC : status = STATUSEND;
    }, 1000 * 30);

    Date.prototype.format = function (formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

        str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
        str = str.replace(/M/g, this.getMonth());

        str = str.replace(/w|W/g, Week[this.getDay()]);

        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());

        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());

        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());

        return str;
    }

    class SyncHelper {

        static notification(msg) {
            // this.isFullScreen() && this.exitFullscreen();
            swal(msg, {
                buttons: false,
                timer: 3000,
            });
        }

        static addCode(code) {
            codelist.push([code, Date.now()]);
            if (codelist.length > codeMaxLength) {
                codelist.shift();
            }
        }

        static isFrequent() {
            if (codelist.length == 0) return false;
            // Debugger.log(codelist.length);
            // Debugger.log(Date.now() - codelist[0][1] - codeMinInterval);
            return codelist.length == codeMaxLength && (Date.now() - codelist[0][1]) < codeMinInterval;
        }

        static coolDown() {
            setTimeout(
                function () {
                    codelist = [];
                }, codeCoolingTime);
        }

        static codeMessage(code) {
            let ALLCODE = {
                "-1": "CLOSEDCODE",
                "-2": "DISCONNECTCODE",
                "-3": "HELLOCODE",
                "-4": "PLAYCODE",
                "-5": "PAUSECODE"
            };
            if (ALLCODE.hasOwnProperty(code)) {
                return ALLCODE[code];
            } else {
                return "CURRENT TIME";
            }
        }

        static send(code) {
            if (status != STATUSSYNC) {
                if (status == STATUSCONNECT) {
                    SyncHelper.notification("not connected to other partner, please wait and pause the video");
                    Debugger.log(`WAITING FOR THE PARTNER`);
                }
                return;
            }

            if (isOpen(websocket) && operationFlag >= 0) {
                if (this.isFrequent()) {
                    websocket.send(PAUSECODE);
                    video.pause();
                    SyncHelper.notification("the operation is too frequent, please waiting for " + codeCoolingTime / 1000 + "s.");
                    SyncHelper.coolDown();
                    Debugger.log(`WAITING FOR COOLING TIME`);
                    return;
                }
                SyncHelper.addCode(code);
                Debugger.log("send message: " + code + ", " + SyncHelper.codeMessage(code));
                websocket.send(code);
            } else {
                operationFlag++;
            }
        }

        static isFullScreen() {
            return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
        }

        static exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            Debugger.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
            if (request.status === STATUSSTART) {
                Debugger.log(`RECEIVED sessionID ${request.body}`);
                let url = `wss://${apihost}/ws/?id=${request.body}`;
                if (websocket) { websocket.close(); }
                websocket = new WebSocket(url);
                if (request.message && request.message.beginFlag) {
                    timer = setInterval(function () {
                        if (isOpen(websocket)) {
                            clearInterval(timer);
                            Debugger.log('sent hello code');
                            websocket.send(HELLOCODE);
                            SyncHelper.notification("connected to other partner successfully, now you both can enjoy yourselves");
                            status = STATUSSYNC;
                        }
                    }, 500);
                } else {
                    SyncHelper.notification(`Room created and room code copied to clipboard`);
                    status = STATUSCONNECT;
                }
                video = document.querySelector('video');
                handleOnSessions(websocket, video);
            }

            if (request.status === STATUSEND) {
                websocket.send(CLOSEDCODE);
                Debugger.log(`SENT CLOSEDCODE`);
                Debugger.log("socket connection closed");
                websocket.close();
                status = STATUSEND;
            }

            if (request.status == STATUSASK) {
                Debugger.log("ask for status: " + status);
                sendResponse({ "status": STATUSASK, "body": status });
            }

        });


    function isOpen(websocket) {
        return websocket !== null && websocket.readyState === websocket.OPEN;
    }

    function handleOnSessions(websocket, video) {
        video.addEventListener("pause", (e) => {
            e.stopPropagation();
            SyncHelper.send(PAUSECODE);
            // Debugger.log(`SENT PAUSECODE`);
        })

        video.addEventListener("play", (e) => {
            e.stopPropagation();
            SyncHelper.send(video.currentTime)
            // Debugger.log(`SENT CURRENT TIME`);
            SyncHelper.send(PLAYCODE)
            // Debugger.log(`SENT PLAYCODE`);
        })

        video.onseeking = function () {
            SyncHelper.send(video.currentTime);
            // Debugger.log(`SENT CURRENT TIME`);
            video.pause();
        }

        websocket.onmessage = (msg) => {
            Debugger.log("receive message: " + msg.data + ", " + SyncHelper.codeMessage(msg.data));
            switch (msg.data) {
                case CLOSEDCODE:
                    video.pause();
                    SyncHelper.notification("socket connection closed by other partner");
                    Debugger.log("socket connection closed by other partner");
                    websocket.close();
                    status = STATUSEND;
                    return;
                case DISCONNECTCODE:
                    video.pause();
                    SyncHelper.notification("not connected to other partner");
                    websocket.close();
                    status = STATUSEND;
                    return;
                case PAUSECODE:
                    if (!video.paused) {
                        Debugger.log(`RECEIVED PAUSECODE`);
                        operationFlag -= 1;
                        video.pause();
                    }
                    return;
                case PLAYCODE:
                    if (video.paused) {
                        Debugger.log(`RECEIVED PLAYCODE`);
                        operationFlag -= 2;
                        video.play();
                    }
                    return;
                case HELLOCODE:
                    Debugger.log(`RECEIVED HELLOCODE`);
                    SyncHelper.notification("connected to other partner successfully, now you both can enjoy yourselves");
                    status = STATUSSYNC;
                    return;
                default:
                    if (msg.data <= video.duration && msg.data >= 0) {
                        if (Math.abs(msg.data - video.currentTime) > 1) {
                            operationFlag -= 2;
                            video.currentTime = msg.data;
                            Debugger.log(`RECEIVED CURRENT TIME`);
                        }
                    }
                    return;
            }
        }
    }
}