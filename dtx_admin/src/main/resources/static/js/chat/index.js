var socket = new WebSocket("ws://10.10.30.39:8080/websocket");

$(function() {
    //��ʼ������listen����
    listen();
})

//��ͻ��˷�����Ϣ�����ﶨ����һЩ��������������Ϣ����ɫ���壬������ʱû�õ�����Ȥ�Ŀ����Լ�ʵ��
function emit() {

    //encodeScript��������ת��<>��ǩ����ֹ�ű����룬����������core.js����
    var text = encodeScript($("#msg").val());
    var msg = {
        "msgBody" : text,
       
    };
    msg = JSON.stringify(msg);
    //�����˷�����Ϣ
    socket.send(msg);

    //���Լ����͵���Ϣ���ݾ�̬���ص�html�ϣ������ʵ���Լ����͵���Ϣ�������͸��Լ�
    $("#content").append("<kbd style='color: #" + "CECECE" + ";float: right; font-size: " + 12 + ";'>" + text +  "</kbd><br/>");
    //����Ϣ�ı������
    $("#msg").val("");
}

function listen() {
    //������ʱ����
    socket.onopen = function() {
        $("#content").append("<kbd>Welcome!</kbd></br>");
    };
    //�յ���Ϣʱ����
    socket.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
		 $("#content").append("<kbd >" + " Say: " + data.msgBody + "</kbd></br>");
         $("#content").append("<kbd style='color: #" + data.color + ";font-size: " + data.fontSize + ";margin-top: 10px;'>" + data.userName + " Say: " + data.msgBody + "</kbd></br>");
    };
    //�ر�����ʱ����
    socket.onclose = function(evt) {
        $("#content").append("<kbd>" + "Close!" + "</kbd></br>");
    }
    //���Ӵ���ʱ����
    socket.onerror = function(evt) {
        $("#content").append("<kbd>" + "ERROR!" + "</kbd></br>");
    }
}
//���»س���ʱ����������Ϣ����
document.onkeydown = function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode == 13){ // enter ��
        emit();
    }
}; 