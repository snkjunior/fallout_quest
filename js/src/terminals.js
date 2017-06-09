var Terminals = {
	terminals: {
		1: [
			{
				name: 'Терминал смотрителя',
				messages: []
			},
		],
		2: [
			{
				name: 'Терминал Джона',
				messages: [
					{
						name: 'Сбои в системе защиты',
						text: 'День прошел практически без происшествий, произошло всего пару сбоев при проверки работы системы дронов - мы отправили техника, чтобы он все исправил.'
					},
					{
						name: 'Cмена пароля',
						text: 'Так, ребятки, вот новые пароли от терминала системы безопасности - f238dn2np.'
					}
				]
			},			
			{
				name: 'Терминал системы безопасности',
				messages: []
			}
		]
	},
	
	init() {
		
	},
	
	show() {
		this.renderTerminalsList();
	},
	
	renderTerminalsList() {
		var html = '';
		for (var locationId in this.terminals) {
			html += '<div style="padding-top: 20px; border-bottom: 1px solid #20d972;">'+Map.getLocation(locationId).name+'</div>';
			for (var i = 0; i < this.terminals[locationId].length; i++) {
				html += '<div onclick="Terminals.renderMessagesList('+locationId+', '+i+')" style="padding-left: 20px; padding-top: 5px; cursor: pointer">'+this.terminals[locationId][i].name+'</div>';
			}
		}
		$('#terminalsContent').html(html);
	},
	
	renderMessagesList(locationId, terminalNum) {
		if (!this.terminals[locationId] || !this.terminals[locationId][terminalNum])
			return;
		
		var terminal = this.terminals[locationId][terminalNum];
		var html = '';
		html += '<div onclick="Terminals.renderTerminalsList()" style="padding-top: 20px; border-bottom: 0px solid #20d972; cursor: pointer">../</div>';
		for (var i = 0; i < terminal.messages.length; i++) {
			html += '<div onclick="Terminals.renderMessage('+locationId+', '+terminalNum+', '+i+')" style="padding-left: 20px; padding-top: 5px; cursor: pointer">'+terminal.messages[i].name+'</div>';
		}
		$('#terminalsContent').html(html);
	},
	
	renderMessage(locationId, terminalNum, messageNum) {
		if (!this.terminals[locationId] || !this.terminals[locationId][terminalNum] || !this.terminals[locationId][terminalNum].messages[messageNum])
			return;
		
		var message = this.terminals[locationId][terminalNum].messages[messageNum];
		var html = '';
		html += '<div onclick="Terminals.renderMessagesList('+locationId+', '+terminalNum+')" style="padding-top: 20px; border-bottom: 0px solid #20d972; cursor: pointer">../</div>';
		html += '<div style="padding-left: 20px; padding-top: 5px;">'+message.text+'</div>'
		$('#terminalsContent').html(html);
	}
}