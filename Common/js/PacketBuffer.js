define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){


	/**
	  * PacketBuffer is an interface to the browsers built-in DataView and ArrayBuffer
	  * structures. It provides easy read/write access through TCP-like serialization
	  * @closure
	  */
	var PacketBuffer = (function() {

		/**
		  * Initialize this packet buffer
		  * @constructor
		  */
		function PacketBuffer(Data) {

			/**
			  * Instance variables for this packet buffer
			  * @private
			  */
			var cursor = 0,
				writable = false,
				packetLength,
				buffer,
				data;
		
			/**
			  * Initialize basic data for this packet buffer
			  */		
			if(typeof Data === 'number')
			{
				packetLength = Data; // Data is a packet length here
				writable = true;

				buffer = new ArrayBuffer(packetLength);
				data = new DataView(buffer);
			}
			else if(typeof Data === 'object')
			{
				buffer = Data;
				packetLength = buffer.byteLength;
				data = new DataView(buffer);
			}

			/**
			  * Accessors to internal properties
			  * @public
			  */
			this.getCursor = function() {
				return cursor;
			};

			this.setCursor = function(newCursor) {
				cursor = newCursor || 0;
			}

			this.isWritable = function() {
				return writable;
			};

			this.getBuffer = function() {
				return buffer;
			};

			this.getData = function() {
				return data;
			};
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
			if(this.isWritable() == false)
				return false;
			
			if(typeof variable === 'number')
			{
				switch(type.size)
				{
					case 1:
						if(type.name === "uchar")
							this.getData().setUint8(this.getCursor(), variable, true);
						else
							this.getData().setInt8(this.getCursor(), variable, true);
						break;
					
					case 2:
						if(type.name === "ushort")
							this.getData().setUint16(this.getCursor(), variable, true);
						else
							this.getData().setInt16(this.getCursor(), variable, true);
						break;
					
					case 4:
						if(type.name === "uint")
							this.getData().setUint32(this.getCursor(), variable, true);
						else
							this.getData().setInt32(this.getCursor(), variable, true);
						break;
				}
				this.setCursor( this.getCursor() + type.size);
			}
			else if(typeof variable === 'string')
			{
				for(var i = 0; i < variable.length; i++)
					this.getData().setUint8(this.getCursor()+i, variable.charCodeAt(i), true);
				this.setCursor( this.getCursor() + variable.length);
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
						return this.getData().getInt8(offset, true);
					else
					{
						// For now we'll assume that if a number of characters are requested, that
						// we should also encode it as a string object using 'fromCharCode()'
						var ret = "";
						for(var i = 0; i < amount; i++)
							ret += String.fromCharCode(this.getData().getUint8(offset+i, true));
						return ret;
					}
					break;
				case "uchar":
					if(typeof amount === 'undefined')
						return this.getData().getUint8(offset, true);
					else
					{
						var ret = "";
						for(var i = 0; i < amount; i++)
							ret += String.fromCharCode(this.getData().getUint8(offset+i, true));
						return ret;
					}
					break;
				case "ushort":
					return this.getData().getUint16(offset, true);
					break;
				case "short":
					return this.getData().getInt16(offset, true);
					break;
				case "int":
					return this.getData().getInt32(offset, true);
					break;
				case "uint":
					return this.getData().getUint32(offset, true);
					break;
				case "float":
					return this.getData().getInt32(offset, true);
					break;
			}
		};
		
		/**
		  * Returns the constructor
		  */
		return PacketBuffer;
	})();

	/**
	  * Creates a new PacketBuffer by either supplying a size for
	  * the new buffer, or an object containing data to serialize
	  * @export
	  */
	var Create = function (data) {
		return new PacketBuffer(data);
	}

	/**
	  * Public API Mapping to this object
	  * @return
	  */
	return {
		Create: Create
	};
});