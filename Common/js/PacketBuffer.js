define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){

	/**
	  * PacketBuffer is an interface to the browsers built-in DataView and ArrayBuffer
	  * structures. It provides easy read/write access through TCP-like serialization
	  * @constructor
	  */
	var PacketBuffer = function(data) {
		this.cursor = 0;
		this.writable = false;
	
		if(typeof data === 'number')
		{
			this.packetLength = data; // Data is a packet length here
			this.buffer = new ArrayBuffer(this.packetLength);
			this.data = new DataView(this.buffer);
			this.writable = true;
		}
		else if(typeof data === 'object')
		{
			this.buffer = data;
			this.packetLength = this.buffer.byteLength;
			this.data = new DataView(this.buffer);
		}
	};	

	/**
	 * Enum to map string types to sizes
	 * @enum
	 */
	PacketBuffer.prototype.VarType = Object.freeze({
		"char" : { size : 1, name : "char" },
		"uchar" : { size : 1, name : "uchar" },
		"ushort" : { size : 2, name : "ushort" },
		"short" : { size : 2, name : "short" },
		"uint" : { size : 4, name : "uint" },
		"int" : { size : 4, name : "int" },
		"float" : { size : 4, name : "float" }
	});

	/**
	  * Writes a variable of a certain size into the buffer
	  * @export
	  */
	PacketBuffer.prototype.write = function(variable, type) {
		if(this.writable == false)
			return false;
		
		if(typeof variable === 'number')
		{
			switch(type.size)
			{
				case 1:
					if(type.name === "uchar")
						this.data.setUint8(this.cursor, variable, true);
					else
						this.data.setInt8(this.cursor, variable, true);
					break;
				
				case 2:
					if(type.name === "ushort")
						this.data.setUint16(this.cursor, variable, true);
					else
						this.data.setInt16(this.cursor, variable, true);
					break;
				
				case 4:
					if(type.name === "uint")
						this.data.setUint32(this.cursor, variable, true);
					else
						this.data.setInt32(this.cursor, variable, true);
					break;
			}
			this.cursor += type.size;
		}
		else if(typeof variable === 'string')
		{
			for(var i = 0; i < variable.length; i++)
				this.data.setUint8(this.cursor+i, variable.charCodeAt(i), true);
			this.cursor += variable.length;
		}
	};

	/**
	  * Returns a value at a certain offset without modifying the read position of the buffer
	  * @export
	  */
	PacketBuffer.prototype.peek = function(offset, type, amount) {
		switch(type.name)
		{
			case "char":
				if(typeof amount === 'undefined')
					return this.data.getInt8(offset, true);
				else
				{
					// For now we'll assume that if a number of characters are requested, that
					// we should also encode it as a string object using 'fromCharCode()'
					var ret = "";
					for(var i = 0; i < amount; i++)
						ret += String.fromCharCode(this.data.getUint8(offset+i, true));
					return ret;
				}
				break;
			case "uchar":
				if(typeof amount === 'undefined')
					return this.data.getUint8(offset, true);
				else
				{
					var ret = "";
					for(var i = 0; i < amount; i++)
						ret += String.fromCharCode(this.data.getUint8(offset+i, true));
					return ret;
				}
				break;
			case "ushort":
				return this.data.getUint16(offset, true);
				break;
			case "short":
				return this.data.getInt16(offset, true);
				break;
			case "int":
				return this.data.getInt32(offset, true);
				break;
			case "uint":
				return this.data.getUint32(offset, true);
				break;
			case "float":
				return this.data.getInt32(offset, true);
				break;
		}
	};
	
	/**
	  * Returns the internal ArrayBuffer object
	  * @export
	  */
	PacketBuffer.prototype.get = function() {
		return this.buffer;
	};
	
	/**
	  * Creates a new PacketBuffer by either supplying a size for
	  * the new buffer, or an object containing data to serialize
	  * @export
	  */
	var Create = function (data) {
		return new PacketBuffer(data);
	}

	/**
	  * API Mapping
	  * @return
	  */
	return {
		Create: Create
	};
});